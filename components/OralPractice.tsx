
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, Blob } from '@google/genai';
import { VerbData } from '../types';

interface OralPracticeProps {
  verb: VerbData;
  isGlobalFullscreen?: boolean;
}

// Implementación robusta de manual de codificación/decodificación
function decode(base64: string) {
  const binaryString = atob(base64);
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
  return btoa(binary);
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  // Corregimos la interpretación del buffer para evitar ruidos o silencios
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
  const [aiInstruction, setAiInstruction] = useState('Pulsa "Empezar" para el examen oral.');
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

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Inicialización inmediata de contextos de audio para evitar bloqueos del navegador
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
            const { input: inCtx } = audioContextsRef.current!;
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

            // GOLPE DE INICIO: Enviamos una señal de "presencia" para que el Profe empiece a hablar YA
            sessionPromise.then(s => {
              const startSignal = new Int16Array(1600); // 100ms de silencio/señal
              s.sendRealtimeInput({ media: { data: encode(new Uint8Array(startSignal.buffer)), mimeType: 'audio/pcm;rate=16000' } });
            });
          },
          onmessage: async (message: LiveServerMessage) => {
            // Audio entrante del Profe
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio) {
              const { output: outCtx, outputGain: gain } = audioContextsRef.current!;
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

            // Actualizar texto en pantalla
            if (message.serverContent?.outputAudioTranscription) {
              const text = message.serverContent.outputAudioTranscription.text;
              setAiInstruction(text);
              const tenseMatch = text.match(/(Presente|Pretérito|Futuro|Condicional)[^.?!]*/i);
              if (tenseMatch) setRequestedTense(tenseMatch[0]);
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
          onerror: (e) => {
            console.error("Error Live:", e);
            stopSession();
          },
        },
        config: {
          responseModalities: [Modality.AUDIO],
          inputAudioTranscription: {},
          outputAudioTranscription: {},
          systemInstruction: `ERES EL 'PROFE CONJUGACIÓN'. 
          REGLA DE ORO: No esperes nada. NADA MÁS CONECTAR, di inmediatamente: "¡Hola! Vamos a examinar el verbo ${verb.infinitive}. Dime el [TIEMPO VERBAL]" (ej. Presente de Subjuntivo).
          PERSONAS: Usa exclusivamente yo, tú, él, nosotros, vosotros, ellos.
          ACENTOS: No los tengas en cuenta. Si el alumno no pronuncia bien las tildes, dalo por bueno. 
          ESTILO: Eres un profesor de España, enérgico y motivador. Si el alumno se queda callado, anímale.`,
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
      setAiInstruction('Revisa los permisos del micrófono.');
    }
  };

  useEffect(() => {
    return () => stopSession();
  }, []);

  return (
    <div className={`flex flex-col h-full w-full transition-all duration-700 ${isGlobalFullscreen ? 'bg-slate-900 justify-center items-center' : 'bg-white rounded-[3rem] border-2 border-indigo-100 shadow-2xl p-8'}`}>
      
      {/* Animación de ondas solo cuando el profe habla */}
      {status === 'speaking' && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center opacity-10">
           <div className="w-full h-full bg-indigo-500 animate-pulse rounded-full blur-[120px]"></div>
        </div>
      )}

      {/* Header Info */}
      <div className={`w-full max-w-5xl flex items-center justify-between mb-8 z-10 ${isGlobalFullscreen ? 'px-12' : ''}`}>
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
            <i className={`fas ${status === 'speaking' ? 'fa-volume-high animate-bounce' : 'fa-microphone'} text-2xl`}></i>
          </div>
          <div>
            <h2 className={`font-black tracking-tight ${isGlobalFullscreen ? 'text-white text-3xl' : 'text-slate-900 text-xl'}`}>EXAMEN EN VIVO</h2>
            <p className={`text-[10px] font-black uppercase tracking-widest ${isGlobalFullscreen ? 'text-indigo-400' : 'text-indigo-600'}`}>Verbo: {verb.infinitive}</p>
          </div>
        </div>
        
        {requestedTense && (
          <div className="bg-amber-400 text-amber-950 px-8 py-3 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-2xl border-2 border-amber-300 animate-pulse">
             DIME EL: {requestedTense}
          </div>
        )}
      </div>

      <div className="flex-1 w-full max-w-6xl flex flex-col items-center justify-center space-y-12 py-6 z-10">
        
        {/* INSTRUCCIÓN VISUAL DEL PROFE */}
        <div className="w-full text-center px-4">
          <div className={`transition-all duration-700 p-12 md:p-20 rounded-[4rem] min-h-[300px] flex items-center justify-center ${
            status === 'speaking' 
              ? (isGlobalFullscreen ? 'bg-indigo-600 text-white shadow-[0_0_150px_rgba(79,70,229,0.4)]' : 'bg-indigo-600 text-white shadow-2xl') 
              : (isGlobalFullscreen ? 'bg-slate-800/80 text-slate-300 border-2 border-slate-700' : 'bg-slate-50 text-slate-700 border-2 border-slate-100')
          }`}>
            <h2 className={`font-serif italic leading-tight text-center ${isGlobalFullscreen ? 'text-5xl md:text-8xl' : 'text-3xl md:text-6xl'}`}>
              "{aiInstruction}"
            </h2>
          </div>
        </div>

        {/* BOTÓN DE ACCIÓN */}
        <button
          onClick={isActive ? stopSession : startSession}
          className={`group relative w-72 h-72 rounded-full flex flex-col items-center justify-center transition-all transform active:scale-90 shadow-2xl ${
            isActive 
              ? 'bg-red-500 text-white shadow-red-500/40 hover:bg-red-600' 
              : 'bg-indigo-600 text-white shadow-indigo-600/40 hover:scale-105 hover:bg-indigo-700'
          }`}
        >
          {status === 'connecting' ? (
            <div className="flex flex-col items-center">
              <i className="fas fa-circle-notch fa-spin text-7xl mb-4"></i>
              <span className="text-[10px] font-black uppercase tracking-widest">Llamando...</span>
            </div>
          ) : isActive ? (
            <>
              <div className="w-20 h-20 bg-white/20 rounded-[2.5rem] flex items-center justify-center mb-4 backdrop-blur-md">
                <i className="fas fa-stop text-4xl"></i>
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em]">Detener</span>
            </>
          ) : (
            <>
              <div className="w-20 h-20 bg-white/20 rounded-[2.5rem] flex items-center justify-center mb-4 backdrop-blur-md">
                <i className="fas fa-play text-4xl translate-x-1"></i>
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em]">Empezar</span>
            </>
          )}
          
          {isActive && (
            <div className="absolute inset-[-20px] rounded-full border-4 border-indigo-500/20 animate-ping"></div>
          )}
        </button>

        {/* TRANSCRIPCIÓN DEL ALUMNO */}
        <div className={`w-full max-w-2xl text-center transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
          <div className={`p-8 rounded-[3rem] min-h-[140px] flex items-center justify-center border-2 border-dashed ${isGlobalFullscreen ? 'bg-slate-800/40 border-slate-700' : 'bg-slate-100 border-slate-200'}`}>
             <p className={`italic font-medium text-center ${isGlobalFullscreen ? 'text-slate-400 text-4xl' : 'text-slate-500 text-2xl'}`}>
               {userTranscription ? `"${userTranscription}..."` : "Dile la respuesta al Profe..."}
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OralPractice;
