
import React, { useState, useEffect } from 'react';
import { generateQuizQuestions } from '../services/gemini.ts';
import { VerbData } from '../types.ts';

interface QuizProps {
  verb: VerbData;
}

const Quiz: React.FC<QuizProps> = ({ verb }) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuestions();
  }, [verb]);

  const loadQuestions = async () => {
    setLoading(true);
    const q = await generateQuizQuestions(verb.infinitive);
    setQuestions(q);
    setLoading(false);
    setCurrentIndex(0);
    setScore(0);
    setFeedback(null);
  };

  const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const current = questions[currentIndex];
    const isCorrect = normalizeText(userInput) === normalizeText(current.correctAnswer);

    if (isCorrect) {
      setScore(s => s + 1);
      setFeedback({ isCorrect: true, message: '¡Excelente! ' + current.correctAnswer + ' es correcto.' });
    } else {
      setFeedback({ isCorrect: false, message: `No exactamente. La respuesta correcta es: ${current.correctAnswer}` });
    }
  };

  const nextQuestion = () => {
    setFeedback(null);
    setUserInput('');
    setCurrentIndex(i => i + 1);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        <p className="text-slate-500 font-medium">Preparando ejercicios...</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return <div className="p-8 text-center text-slate-500">Error al cargar. Pulsa arriba para reintentar.</div>;
  }

  if (currentIndex >= questions.length) {
    return (
      <div className="p-12 text-center bg-white rounded-[2.5rem] shadow-xl border-2 border-indigo-100">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
          <i className="fas fa-trophy"></i>
        </div>
        <h3 className="text-3xl font-black text-slate-900 mb-2">¡Completado!</h3>
        <p className="text-xl text-slate-500 mb-8">Has acertado <span className="text-indigo-600 font-black">{score}</span> de {questions.length}</p>
        <button 
          onClick={loadQuestions}
          className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-700 transition shadow-lg shadow-indigo-100"
        >
          Repetir Práctica
        </button>
      </div>
    );
  }

  const current = questions[currentIndex];

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl border-2 border-indigo-50 overflow-hidden animate-in fade-in zoom-in-95 duration-500">
      <div className="bg-indigo-600 text-white p-6 flex justify-between items-center">
        <span className="text-xs font-black uppercase tracking-widest opacity-80">Pregunta {currentIndex + 1} / {questions.length}</span>
        <span className="bg-white/20 px-4 py-1.5 rounded-full text-[10px] uppercase font-black tracking-widest backdrop-blur-md">{current.tense}</span>
      </div>
      
      <div className="p-8 md:p-12">
        <p className="text-2xl md:text-3xl text-slate-800 mb-10 leading-relaxed font-serif">
          {current.sentence.split('_____').map((part: string, i: number) => (
            <React.Fragment key={i}>
              {part}
              {i === 0 && (
                <span className="mx-2 inline-block border-b-4 border-indigo-200 min-w-[120px] text-center text-indigo-600 font-black italic">
                   {userInput || '...'}
                </span>
              )}
            </React.Fragment>
          ))}
        </p>

        {!feedback ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Escribe la forma de "{current.person}"</label>
              <input
                autoFocus
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="w-full px-6 py-5 rounded-2xl bg-slate-50 border-2 border-slate-100 focus:border-indigo-500 focus:bg-white outline-none transition-all text-xl font-bold"
                placeholder="No te preocupes por las tildes..."
              />
            </div>
            <button 
              disabled={!userInput.trim()}
              className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-700 disabled:bg-slate-200 transition shadow-lg shadow-indigo-100"
            >
              Comprobar
            </button>
          </form>
        ) : (
          <div className="space-y-6 animate-in slide-in-from-top-4 duration-300">
            <div className={`p-6 rounded-2xl flex items-center space-x-4 ${feedback.isCorrect ? 'bg-green-50 text-green-700 border-2 border-green-100' : 'bg-red-50 text-red-700 border-2 border-red-100'}`}>
              <i className={`text-2xl fas ${feedback.isCorrect ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
              <p className="font-bold text-lg">{feedback.message}</p>
            </div>
            <button 
              onClick={nextQuestion}
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-black transition shadow-xl"
            >
              {currentIndex === questions.length - 1 ? 'Ver Resultado Final' : 'Siguiente Ejercicio'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;