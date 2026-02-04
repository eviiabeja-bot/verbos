
import React, { useState, useEffect } from 'react';
import { VERBS } from './constants.tsx';
import VerbTable from './components/VerbTable.tsx';
import Quiz from './components/Quiz.tsx';
import OralPractice from './components/OralPractice.tsx';

type Tab = 'reference' | 'practice' | 'oral';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('oral');
  const [selectedVerb, setSelectedVerb] = useState(VERBS[0]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => {
        console.error(`Error al activar pantalla completa: ${e.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${isFullscreen ? 'bg-slate-900' : 'bg-slate-50'}`}>
      {!isFullscreen && (
        <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-20 shadow-sm">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="bg-indigo-600 p-2.5 rounded-2xl shadow-lg">
                <i className="fas fa-graduation-cap text-white text-xl"></i>
              </div>
              <div>
                <h1 className="text-xl font-black text-slate-900 leading-none tracking-tight">
                  SUBJUNTIVO<span className="text-indigo-600">.PRO</span>
                </h1>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-[0.2em] mt-1">Educación Primaria y Secundaria</p>
              </div>
            </div>

            <nav className="flex items-center space-x-4">
              <div className="flex bg-slate-100 p-1.5 rounded-2xl">
                <button 
                  onClick={() => setActiveTab('reference')}
                  className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'reference' ? 'bg-white shadow-md text-indigo-600' : 'text-slate-500'}`}
                >
                  <i className="fas fa-table"></i>
                  <span className="hidden sm:inline">Tablas</span>
                </button>
                <button 
                  onClick={() => setActiveTab('practice')}
                  className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'practice' ? 'bg-white shadow-md text-indigo-600' : 'text-slate-500'}`}
                >
                  <i className="fas fa-pen-nib"></i>
                  <span className="hidden sm:inline">Escrito</span>
                </button>
                <button 
                  onClick={() => setActiveTab('oral')}
                  className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'oral' ? 'bg-white shadow-md text-indigo-600' : 'text-slate-500'}`}
                >
                  <i className="fas fa-comment-dots"></i>
                  <span className="hidden sm:inline">Oral</span>
                </button>
              </div>
              
              <button 
                onClick={toggleFullscreen}
                className="w-11 h-11 flex items-center justify-center bg-white border border-slate-200 rounded-2xl text-slate-500 hover:bg-slate-50 transition-all shadow-sm"
              >
                <i className={`fas ${isFullscreen ? 'fa-compress' : 'fa-expand'}`}></i>
              </button>
            </nav>
          </div>
        </header>
      )}

      {!isFullscreen && (
        <div className="bg-white border-b py-4">
          <div className="max-w-6xl mx-auto px-6 overflow-x-auto no-scrollbar flex items-center space-x-3">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2 flex-shrink-0">Elegir Verbo:</span>
            {VERBS.map(v => (
              <button
                key={v.infinitive}
                onClick={() => setSelectedVerb(v)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all border-2 ${selectedVerb.infinitive === v.infinitive ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-100 text-slate-500'}`}
              >
                {v.infinitive.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}

      <main className={`flex-1 flex flex-col ${isFullscreen ? 'h-screen w-screen overflow-hidden' : 'max-w-6xl mx-auto px-6 py-10 w-full'}`}>
        {activeTab === 'reference' && <VerbTable verb={selectedVerb} />}
        {activeTab === 'practice' && <div className="max-w-2xl mx-auto w-full"><Quiz verb={selectedVerb} /></div>}
        {activeTab === 'oral' && <div className="w-full flex-1 flex flex-col"><OralPractice verb={selectedVerb} isGlobalFullscreen={isFullscreen} /></div>}
      </main>
    </div>
  );
};

export default App;
