
import React, { useState } from 'react';
import { askTutor } from '../services/gemini.ts';
import { ChatMessage } from '../types.ts';

const Tutor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', content: '¡Hola! Soy tu tutor de subjuntivo. ¿Tienes alguna duda sobre cuándo usar "vaya" o "vaya"? ¡Pregúntame!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);
    const reply = await askTutor(messages, userMsg);
    setMessages(prev => [...prev, { role: 'model', content: reply }]);
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto h-[600px] bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 flex flex-col overflow-hidden">
      <div className="bg-indigo-600 p-4 text-white text-center font-black text-xs uppercase tracking-widest">Chat con el Profe Virtual</div>
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-white border shadow-sm text-slate-700'}`}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && <div className="text-slate-400 text-xs italic">El profe está pensando...</div>}
      </div>
      <form onSubmit={send} className="p-4 bg-white border-t flex gap-2">
        <input 
          value={input} 
          onChange={e => setInput(e.target.value)}
          placeholder="Escribe tu duda..."
          className="flex-1 p-4 bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button className="bg-indigo-600 text-white px-6 rounded-xl hover:bg-indigo-700 transition"><i className="fas fa-paper-plane"></i></button>
      </form>
    </div>
  );
};

export default Tutor;
