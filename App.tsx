
import React, { useState } from 'react';
import { VERBS } from './constants.tsx';
import VerbTable from './components/VerbTable.tsx';
import Quiz from './components/Quiz.tsx';
import OralPractice from './components/OralPractice.tsx';
import Tutor from './components/Tutor.tsx';

type Tab = 'table' | 'quiz' | 'oral' | 'tutor';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('oral');
  const [selectedVerb, setSelectedVerb] = useState(VERBS[0]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b sticky top-0 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
              <i className="fas fa-brain text-xl"></i>
            </div>
            <div>
              <h1 className="text-xl font-black font-lexend tracking-tight">SUBJUNTIVO<span className="text-indigo-600">.PRO</span></h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Aprende con Inteligencia Artificial</p>
            </div>
          </div>

          <nav className="flex bg-slate-100 p-1 rounded-2xl">
            {[
              { id: 'table', icon: 'fa-table', label: 'Tablas' },
              { id: 'quiz', icon: 'fa-pen-nib', label: 'Escrito' },
              { id: 'oral', icon: 'fa-microphone', label: 'Oral' },
              { id: 'tutor', icon: 'fa-chalkboard-teacher', label: 'Tutor' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === tab.id ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                <i className={`fas ${tab.icon}`}></i>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="bg-slate-50 border-t py-3">
          <div className="max-w-6xl mx-auto px-6 flex items-center space-x-4 overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex-shrink-0">VERBO ACTUAL:</span>
            {VERBS.map(v => (
              <button
                key={v.infinitive}
                onClick={() => setSelectedVerb(v)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold border-2 transition-all ${selectedVerb.infinitive === v.infinitive ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-200 bg-white text-slate-500 hover:border-indigo-300'}`}
              >
                {v.infinitive.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-8">
        {activeTab === 'table' && <VerbTable verb={selectedVerb} />}
        {activeTab === 'quiz' && <Quiz verb={selectedVerb} />}
        {activeTab === 'oral' && <OralPractice verb={selectedVerb} />}
        {activeTab === 'tutor' && <Tutor />}
      </main>

      <footer className="py-6 text-center text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em]">
        Desarrollado con Gemini 2.5 Flash & React 19
      </footer>
    </div>
  );
};

export default App;
