
import React, { useState, useRef, useEffect } from 'react';
import { askTutor } from '../services/gemini';
import { ChatMessage } from '../types';

const Tutor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', content: '¡Hola! Soy tu Profe de Subjuntivo. ¿En qué puedo ayudarte hoy? Podemos practicar conjugaciones o puedo explicarte cuándo usar el subjuntivo con el método WEIRDO.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    const response = await askTutor(messages, userMessage);
    setMessages(prev => [...prev, { role: 'model', content: response }]);
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-xl shadow-lg border overflow-hidden">
      <div className="bg-indigo-600 text-white p-4 flex items-center space-x-3">
        <div className="w-10 h-10 bg-indigo-400 rounded-full flex items-center justify-center">
          <i className="fas fa-chalkboard-teacher"></i>
        </div>
        <div>
          <h3 className="font-bold">Profe Subjuntivo</h3>
          <p className="text-xs text-indigo-100">En línea ahora</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${
              msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-white border text-slate-700 rounded-tl-none shadow-sm'
            }`}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border rounded-2xl rounded-tl-none px-4 py-2 shadow-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="p-4 bg-white border-t flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Pregunta algo sobre el subjuntivo..."
          className="flex-1 px-4 py-2 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button 
          disabled={!input.trim() || isTyping}
          className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-indigo-700 transition disabled:bg-slate-300"
        >
          <i className="fas fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
};

export default Tutor;
