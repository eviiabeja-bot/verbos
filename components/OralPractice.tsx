
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, Blob } from '@google/genai';
import { VerbData } from '../types.ts';

interface OralPracticeProps {
  verb: VerbData;
  isGlobalFullscreen?: boolean;
}

function decode(base64: string) {
  const binaryString = window.atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function encode(bytes: Uint8Array) {
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer, data.byteOffset, data.length / 2);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const OralPractice: React.FC<OralPracticeProps> = ({ verb, isGlobalFullscreen }) => {
  const [isActive, setIsActive] = useState(false);
  const [userTranscription, setUserTranscription] = useState('');
  const [aiInstruction, setAiInstruction] = useState('Pulsa el botón para empezar el examen oral.');
  const [requestedTense, setRequestedTense] = useState('');
  const [status, setStatus] = useState<'idle' | 'connecting' | 'listening' | 'speaking'>('idle');
  
  const sessionRef = useRef<any>(null);
  const audioContextsRef = useRef<{ input: AudioContext; output: AudioContext; outputGain: GainNode } | null>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef<number>(0);

  const stopSession = () => {
    if (sessionRef.current) {
      try { sessionRef.current.close(); } catch(e) {}
      sessionRef.current = null;
    }
    setIsActive(false);
    setStatus('idle');
    setAiInstruction('Examen terminado.');
    setRequestedTense('');
    setUserTranscription('');
    
    if (audioContextsRef.current) {
      try { audioContextsRef.current.input.close(); } catch(e) {}
      try { audioContextsRef.current.output.close(); } catch(e) {}
      audioContextsRef.current = null;
    }
    
    sourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
    sourcesRef.current.clear();
    nextStartTimeRef.current = 0;
  };

  const startSession = async () => {
    setStatus('connecting');
    setAiInstruction('Conectando con el Profe...');

    const apiKey = (window as any).process?.env?.API_KEY || "";
    if (!apiKey) {
      setAiInstruction('Error: No se encontró la API KEY.');
      setStatus('idle');
      return;
    }

    const ai = new GoogleGenAI({ apiKey });
    const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
    const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    const outputGain = outputCtx.createGain();
    outputGain.connect(outputCtx.destination);
    
    audioContextsRef.current = { input: inputCtx, output: outputCtx, outputGain };
    
    await inputCtx.resume();
    await outputCtx.resume();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setStatus('listening');
            const inCtx = audioContextsRef.current?.input;
            if (!inCtx) return;

            const source = inCtx.createMediaStreamSource(stream);
            const scriptProcessor = inCtx.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob: Blob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              sessionPromise.then(s => s?.sendRealtimeInput({ media: pcmBlob }));
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(inCtx.destination);

            sessionPromise.then(s => {
              const silentBuffer = new Int16Array(1600); 
              s.sendRealtimeInput({ media: { data: encode(new Uint8Array(silentBuffer.buffer)), mimeType: 'audio/pcm;rate=16000' } });
            });
          },
          onmessage: async (message: LiveServerMessage) => {
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio) {
              const outCtx = audioContextsRef.current?.output;
              const gain = audioContextsRef.current?.outputGain;
              if (!outCtx || !gain) return;

              setStatus('speaking');
              
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outCtx.currentTime);
              const audioBuffer = await decodeAudioData(decode(base64Audio), outCtx, 24000, 1);
              const source = outCtx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(gain);
              
              source.onended = () => {
                sourcesRef.current.delete(source);
                if (sourcesRef.current.size === 0) setStatus('listening');
              };

              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }

            if (message.serverContent?.outputAudioTranscription) {
              setAiInstruction(message.serverContent.outputAudioTranscription.text);
            }
            
            if (message.serverContent?.inputAudioTranscription) {
              setUserTranscription(message.serverContent.inputAudioTranscription.text);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
              setStatus('listening');
            }
          },
          onclose: () => stopSession(),
          onerror: (e) => stopSession(),
        },
        config: {
          responseModalities: [Modality.AUDIO],
          inputAudioTranscription: {},
          outputAudioTranscription: {},
          systemInstruction: `ERES EL 'PROFE CONJUGACIÓN'. 
          TU MISIÓN: Evaluar la conjugación del verbo ${verb.infinitive} en modo subjuntivo.
          INICIO: Saluda y pide un tiempo específico del subjuntivo para ${verb.infinitive}.
          FEEDBACK: Sé positivo pero exigente. Si el alumno falla, corrígele con cariño.
          ESTILO: Profesor de España, apasionado por la gramática.`,
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } }
          }
        }
      });

      sessionRef.current = await sessionPromise;
      setIsActive(true);
    } catch (err) {
      console.error("Mic error:", err);
      setStatus('idle');
      setAiInstruction('Permiso de micrófono denegado o error de conexión.');
    }
  };

  return (
    <div className={`flex flex-col h-full w-full transition-all duration-700 ${isGlobalFullscreen ? 'bg-slate-900 justify-center items-center p-12' : 'bg-white rounded-[3rem] border-2 border-indigo-100 shadow-2xl p-8'}`}>
      <div className="w-full max-w-5xl flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl relative">
            {status === 'speaking' && <div className="absolute inset-0 bg-white/20 animate-ping rounded-2xl"></div>}
            <i className="fas fa-microphone-lines text-2xl"></i>
          </div>
          <div>
            <h2 className={`font-black tracking-tight ${isGlobalFullscreen ? 'text-white text-3xl' : 'text-slate-900 text-xl'}`}>EXAMEN ORAL</h2>
            <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-widest">Verbo: {verb.infinitive}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full flex flex-col items-center justify-center space-y-12">
        <div className={`w-full max-w-4xl p-10 rounded-[3rem] text-center transition-all ${status === 'speaking' ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-500/20' : 'bg-slate-50 text-slate-700 border-2 border-slate-100'}`}>
          <p className="text-3xl md:text-5xl font-lexend italic leading-tight">
            "{aiInstruction}"
          </p>
        </div>

        <button
          onClick={isActive ? stopSession : startSession}
          className={`group relative w-64 h-64 rounded-full flex flex-col items-center justify-center transition-all transform active:scale-90 shadow-2xl ${isActive ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
        >
          {status === 'connecting' ? (
             <i className="fas fa-spinner fa-spin text-6xl"></i>
          ) : (
            <>
              <i className={`fas ${isActive ? 'fa-stop' : 'fa-microphone'} text-5xl mb-4`}></i>
              <span className="font-lexend font-black uppercase tracking-widest text-xs">{isActive ? 'Terminar' : 'Empezar'}</span>
            </>
          )}
          {isActive && <div className="absolute inset-[-10px] border-2 border-indigo-400/30 rounded-full animate-ping"></div>}
        </button>

        <div className={`w-full max-w-2xl text-center py-6 px-8 rounded-3xl border-2 border-dashed border-slate-200 ${isActive ? 'opacity-100' : 'opacity-30'}`}>
          <p className="text-slate-400 font-lexend text-sm mb-2 uppercase tracking-widest">Lo que escucho:</p>
          <p className="text-indigo-600 font-bold text-xl italic">{userTranscription || '...'}</p>
        </div>
      </div>
    </div>
  );
};

export default OralPractice;
