
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { VerbData } from '../types.ts';

// Helper functions for audio encoding/decoding as per Gemini API guidelines
function decodeBase64(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function encodeBase64(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
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
  const dataInt16 = new Int16Array(data.buffer);
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

const OralPractice: React.FC<{ verb: VerbData }> = ({ verb }) => {
  const [status, setStatus] = useState<'idle' | 'active' | 'loading'>('idle');
  const [instruction, setInstruction] = useState('Presiona el micrófono para iniciar el examen oral.');
  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const audioCtxRef = useRef<{ in: AudioContext; out: AudioContext } | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const activeSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const stopAudio = () => {
    activeSourcesRef.current.forEach(source => {
      try { source.stop(); } catch (e) {}
    });
    activeSourcesRef.current.clear();
    nextStartTimeRef.current = 0;
  };

  const start = async () => {
    setStatus('loading');
    const apiKey = (window as any).process?.env?.API_KEY || "";
    const ai = new GoogleGenAI({ apiKey });

    // Initialize Audio Contexts
    const inCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
    const outCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    audioCtxRef.current = { in: inCtx, out: outCtx };
    nextStartTimeRef.current = 0;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setStatus('active');
            const source = inCtx.createMediaStreamSource(stream);
            // Using ScriptProcessor as requested for simplicity in this environment
            const processor = inCtx.createScriptProcessor(4096, 1, 1);
            
            processor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const b64Data = encodeBase64(new Uint8Array(int16.buffer));
              
              sessionPromise.then(session => {
                session.sendRealtimeInput({ 
                  media: { data: b64Data, mimeType: 'audio/pcm;rate=16000' } 
                });
              });
            };
            
            source.connect(processor);
            processor.connect(inCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            // Handle Transcription
            if (message.serverContent?.outputTranscription) {
               // Optional: accumulate or stream transcription text
            }
            
            if (message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data) {
              const base64Audio = message.serverContent.modelTurn.parts[0].inlineData.data;
              const outCtx = audioCtxRef.current?.out;
              
              if (outCtx) {
                // Schedule gapless playback
                nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outCtx.currentTime);
                
                const audioBuffer = await decodeAudioData(
                  decodeBase64(base64Audio),
                  outCtx,
                  24000,
                  1
                );
                
                const source = outCtx.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(outCtx.destination);
                
                source.onended = () => {
                  activeSourcesRef.current.delete(source);
                };
                
                activeSourcesRef.current.add(source);
                source.start(nextStartTimeRef.current);
                nextStartTimeRef.current += audioBuffer.duration;
              }
            }

            // Handle Interruption
            if (message.serverContent?.interrupted) {
              stopAudio();
            }
          },
          onerror: (e) => {
            console.error("Live API Error:", e);
            setStatus('idle');
            setInstruction('Error en la conexión. Inténtalo de nuevo.');
          },
          onclose: () => {
            setStatus('idle');
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: `Eres un profesor amable y paciente experto en gramática española. Tu objetivo es examinar oralmente al alumno sobre el verbo "${verb.infinitive}" en modo subjuntivo. 
          Instrucciones:
          1. Saluda y pide al alumno que conjugue una forma específica (persona + tiempo) del verbo ${verb.infinitive} en subjuntivo.
          2. Escucha su respuesta.
          3. Si es correcta, felicítale y pide otra.
          4. Si es incorrecta, corrígele con cariño y explícale por qué.
          Sé breve en tus intervenciones para que el flujo sea ágil.`,
          speechConfig: { 
            voiceConfig: { 
              prebuiltVoiceConfig: { voiceName: 'Puck' } 
            } 
          }
        }
      });

      sessionPromiseRef.current = sessionPromise;

    } catch (e) {
      console.error("Startup Error:", e);
      setStatus('idle');
      setInstruction('No se pudo acceder al micrófono o iniciar la sesión.');
    }
  };

  const stop = () => {
    sessionPromiseRef.current?.then(s => s.close());
    stopAudio();
    if (audioCtxRef.current) {
      audioCtxRef.current.in.close();
      audioCtxRef.current.out.close();
    }
    setStatus('idle');
    setInstruction('Sesión finalizada. ¡Buen trabajo!');
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-12 py-10">
      <div className={`p-10 rounded-[3rem] text-center max-w-2xl transition-all shadow-2xl border-4 ${status === 'active' ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-white text-slate-700 border-slate-100'}`}>
        <div className="mb-4">
          <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${status === 'active' ? 'bg-white/20' : 'bg-slate-100'}`}>
            Examen en Vivo: {verb.infinitive.toUpperCase()}
          </span>
        </div>
        <p className="text-2xl font-lexend italic leading-relaxed">"{instruction}"</p>
      </div>

      <div className="relative">
        {status === 'active' && (
          <div className="absolute inset-0 -m-4">
            <div className="w-full h-full rounded-full bg-indigo-500/20 animate-ping"></div>
          </div>
        )}
        <button 
          onClick={status === 'active' ? stop : start}
          disabled={status === 'loading'}
          className={`relative w-48 h-48 rounded-full shadow-2xl transition-all flex items-center justify-center transform hover:scale-105 active:scale-95 z-10 ${status === 'active' ? 'bg-red-500 hover:bg-red-600' : 'bg-indigo-600 hover:bg-indigo-700'}`}
        >
          {status === 'loading' ? (
            <i className="fas fa-circle-notch fa-spin text-5xl"></i>
          ) : (
            <i className={`fas ${status === 'active' ? 'fa-stop' : 'fa-microphone'} text-5xl text-white`}></i>
          )}
        </button>
      </div>

      <div className="text-center space-y-2">
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
          {status === 'active' ? 'EL PROFESOR TE ESCUCHA...' : 'PULSA PARA HABLAR'}
        </p>
        {status === 'active' && (
          <div className="flex justify-center space-x-1">
            {[1, 2, 3, 4, 5].map(i => (
              <div 
                key={i} 
                className="w-1 bg-indigo-400 rounded-full animate-bounce" 
                style={{ height: `${Math.random() * 20 + 10}px`, animationDelay: `${i * 0.1}s` }}
              ></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OralPractice;
