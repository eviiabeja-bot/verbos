
import React, { useState, useEffect } from 'react';
import { VERBS } from './constants';
import VerbTable from './components/VerbTable';
import Quiz from './components/Quiz';
import OralPractice from './components/OralPractice';

type Tab = 'reference' | 'practice' | 'oral';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('oral'); // Empezamos en Examen Oral por defecto
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
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${isFullscreen ? 'bg-slate-900' : 'bg-slate-50'} selection:bg-indigo-100 selection:text-indigo-900`}>
      {/* Header: Se oculta en Fullscreen para dar todo el espacio a la app */}
      {!isFullscreen && (
        <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-20 shadow-sm">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="bg-indigo-600 p-2.5 rounded-2xl shadow-lg shadow-indigo-200">
                <i className="fas fa-microphone-alt text-white text-xl"></i>
              </div>
              <div>
                <h1 className="text-xl font-black text-slate-900 leading-none tracking-tight">
                  CONJUGACIÓN<span className="text-indigo-600">.ES</span>
                </h1>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-[0.2em] mt-1">Primaria y Secundaria</p>
              </div>
            </div>

            <nav className="flex items-center space-x-4">
              <div className="flex bg-slate-100 p-1.5 rounded-2xl">
                <button 
                  onClick={() => setActiveTab('reference')}
                  className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'reference' ? 'bg-white shadow-md text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <i className="fas fa-table"></i>
                  <span className="hidden sm:inline">Tablas</span>
                </button>
                <button 
                  onClick={() => setActiveTab('practice')}
                  className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'practice' ? 'bg-white shadow-md text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <i className="fas fa-pen-nib"></i>
                  <span className="hidden sm:inline">Escrito</span>
                </button>
                <button 
                  onClick={() => setActiveTab('oral')}
                  className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'oral' ? 'bg-white shadow-md text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  <i className="fas fa-comment-dots"></i>
                  <span className="hidden sm:inline">Examen Oral</span>
                </button>
              </div>
              
              <button 
                onClick={toggleFullscreen}
                className="w-11 h-11 flex items-center justify-center bg-white border border-slate-200 rounded-2xl text-slate-500 hover:bg-slate-50 transition-all shadow-sm"
                title="Pantalla Completa"
              >
                <i className="fas fa-expand"></i>
              </button>
            </nav>
          </div>
        </header>
      )}

      {/* Selector de Verbo: Se oculta en Fullscreen */}
      {!isFullscreen && (
        <div className="bg-white border-b py-4">
          <div className="max-w-6xl mx-auto px-6 overflow-x-auto no-scrollbar flex items-center space-x-3">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2 flex-shrink-0">Verbo:</span>
            {VERBS.map(v => (
              <button
                key={v.infinitive}
                onClick={() => setSelectedVerb(v)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all border-2 flex-shrink-0 ${selectedVerb.infinitive === v.infinitive ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-100 bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
              >
                {v.infinitive.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}

      <main className={`flex-1 flex flex-col ${isFullscreen ? 'h-screen w-screen overflow-hidden' : 'max-w-6xl mx-auto px-6 py-10 w-full'}`}>
        {/* Botón de salida para Fullscreen si no hay escape físico */}
        {isFullscreen && (
          <button 
            onClick={toggleFullscreen}
            className="fixed top-6 right-6 z-[60] w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all"
          >
            <i className="fas fa-compress"></i>
          </button>
        )}

        {activeTab === 'reference' && <VerbTable verb={selectedVerb} />}
        
        {activeTab === 'practice' && (
          <div className="max-w-2xl mx-auto w-full">
             <Quiz verb={selectedVerb} />
          </div>
        )}
        
        {activeTab === 'oral' && (
          <div className={`w-full flex-1 ${isFullscreen ? 'flex flex-col' : 'max-w-4xl mx-auto'}`}>
             <OralPractice verb={selectedVerb} isGlobalFullscreen={isFullscreen} />
          </div>
        )}
      </main>

      {!isFullscreen && (
        <footer className="bg-white border-t py-8 mt-auto">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em]">
              Práctica de Subjuntivo con IA • 2024
            </p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default App;
