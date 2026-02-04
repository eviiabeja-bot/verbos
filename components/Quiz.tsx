
import React, { useState, useEffect } from 'react';
import { generateQuizQuestions } from '../services/gemini.ts';
import { VerbData } from '../types.ts';

const Quiz: React.FC<{ verb: VerbData }> = ({ verb }) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    generateQuizQuestions(verb.infinitive).then(q => {
      setQuestions(q);
      setLoading(false);
    });
  }, [verb]);

  const check = () => {
    const correct = questions[currentIndex].correctAnswer.toLowerCase().trim();
    if (answer.toLowerCase().trim() === correct) {
      setFeedback("¡Correcto!");
    } else {
      setFeedback(`Incorrecto. Era: ${correct}`);
    }
  };

  if (loading) return <div className="text-center p-20 animate-pulse text-indigo-600 font-bold">Generando ejercicios personalizados...</div>;

  const q = questions[currentIndex];

  return (
    <div className="max-w-2xl mx-auto bg-white p-12 rounded-[3rem] shadow-2xl border border-indigo-50">
      <div className="mb-8 flex justify-between items-center">
        <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Pregunta {currentIndex + 1} de 5</span>
        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-[9px] font-black uppercase">{q.tense}</span>
      </div>
      <p className="text-2xl font-lexend mb-10 text-slate-700 leading-relaxed italic">"{q.sentence}"</p>
      <div className="space-y-4">
        <input 
          type="text" 
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          placeholder={`Escribe la forma de ${q.person}...`}
          className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 outline-none text-xl font-bold transition-all"
        />
        <div className="flex gap-4">
          <button onClick={check} className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-700 transition">Comprobar</button>
          {feedback && (
            <button onClick={() => { setFeedback(null); setAnswer(''); setCurrentIndex(c => (c + 1) % 5); }} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest">Siguiente</button>
          )}
        </div>
      </div>
      {feedback && (
        <p className={`mt-6 p-4 rounded-xl text-center font-bold ${feedback.includes('¡') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{feedback}</p>
      )}
    </div>
  );
};

export default Quiz;
