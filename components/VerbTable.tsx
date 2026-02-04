
import React, { useState } from 'react';
import { Person, Tense, VerbData, Mood } from '../types';

interface VerbTableProps {
  verb: VerbData;
}

const VerbTable: React.FC<VerbTableProps> = ({ verb }) => {
  const [activeMood, setActiveMood] = useState<Mood>(Mood.INDICATIVO);
  const [activeTense, setActiveTense] = useState<Tense | null>(null);

  const tensesInMood = Object.keys(verb.conjugations[activeMood]) as Tense[];
  
  React.useEffect(() => {
    if (!activeTense || !verb.conjugations[activeMood][activeTense]) {
      setActiveTense(tensesInMood[0]);
    }
  }, [activeMood, verb]);

  const highlightEnding = (word: string) => {
    // Terminaciones y auxiliares para resaltar en rojo (compuestos y simples)
    const endings = [
      'o', 'as', 'a', 'amos', 'áis', 'an', 
      'es', 'e', 'emos', 'éis', 'en',
      'aba', 'abas', 'ábamos', 'abais', 'aban',
      'ía', 'ías', 'íamos', 'íais', 'ían',
      'é', 'aste', 'ó', 'asteis', 'aron',
      'í', 'iste', 'ió', 'isteis', 'ieron',
      'aré', 'arás', 'ará', 'aremos', 'aréis', 'arán',
      'ara', 'aras', 'áramos', 'arais', 'aran',
      'ase', 'ases', 'ásemos', 'aseis', 'asen',
      'ado', 'ido',
      'he', 'has', 'ha', 'hemos', 'habéis', 'han',
      'había', 'habías', 'habíamos', 'habíais', 'habían',
      'hube', 'hubiste', 'hubo', 'hubimos', 'hubisteis', 'hubieron',
      'habré', 'habrás', 'habrá', 'habremos', 'habréis', 'habrán',
      'habría', 'habrías', 'habríamos', 'habríais', 'habrían',
      'haya', 'hayas', 'hayamos', 'hayáis', 'hayan',
      'hubiera', 'hubieras', 'hubiéramos', 'hubierais', 'hubieran',
      'hubiese', 'hubieses', 'hubiésemos', 'hubieseis', 'hubiesen'
    ].sort((a, b) => b.length - a.length);

    // Si es un tiempo compuesto, resaltamos el auxiliar entero y el participio
    if (word.includes(' ')) {
      const parts = word.split(' ');
      return (
        <span className="text-2xl md:text-4xl">
          <span className="text-red-500 font-black">{parts[0]}</span>{' '}
          {parts[1].slice(0, -3)}<span className="text-red-500 font-black">{parts[1].slice(-3)}</span>
        </span>
      );
    }

    for (const end of endings) {
      if (word.endsWith(end)) {
        const root = word.slice(0, -end.length);
        return (
          <span className="text-2xl md:text-4xl">
            {root}<span className="text-red-500 font-black">{end}</span>
          </span>
        );
      }
    }
    return <span className="text-2xl md:text-4xl">{word}</span>;
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Selector de Modo */}
      <div className="flex bg-slate-200 p-1.5 rounded-2xl w-full max-w-lg mx-auto shadow-inner">
        {Object.values(Mood).map((m) => (
          <button
            key={m}
            onClick={() => setActiveMood(m)}
            className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all ${
              activeMood === m 
                ? 'bg-white text-indigo-600 shadow-md transform scale-105' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {m.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Lista de tiempos verbales (Botones) */}
        <div className="lg:col-span-4 space-y-2 max-h-[600px] overflow-y-auto pr-2 no-scrollbar">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-2">Selecciona un tiempo verbal</p>
          <div className="flex flex-col gap-2">
            {tensesInMood.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTense(t)}
                className={`text-left px-5 py-4 rounded-2xl border-2 transition-all group ${
                  activeTense === t 
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm' 
                    : 'border-white bg-white hover:border-slate-200 text-slate-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-bold text-sm ${activeTense === t ? 'scale-105 origin-left' : ''}`}>{t}</span>
                  <i className={`fas fa-chevron-right text-[10px] transition-transform ${activeTense === t ? 'translate-x-1' : 'opacity-0'}`}></i>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Visualización Grande de la Conjugación */}
        <div className="lg:col-span-8">
          {activeTense && (
            <div className="bg-white rounded-[2rem] border-2 border-indigo-100 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
              <div className="bg-indigo-600 p-8 text-white text-center relative">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                  <i className="fas fa-spell-check text-[15rem] -mt-10 -ml-10"></i>
                </div>
                <h3 className="text-xs font-black uppercase tracking-[0.3em] opacity-70 mb-2">{activeMood}</h3>
                <h2 className="text-3xl font-black">{activeTense}</h2>
              </div>
              
              <div className="p-8 md:p-12 space-y-6 bg-gradient-to-b from-indigo-50/20 to-white">
                {Object.values(Person).map((p) => (
                  <div key={p} className="flex flex-col md:flex-row md:items-center border-b border-slate-100 last:border-0 pb-5 last:pb-0">
                    <span className="text-slate-400 font-bold uppercase text-[11px] md:w-40 mb-1 md:mb-0 tracking-[0.2em]">{p}</span>
                    <span className="text-slate-900 font-medium font-serif">
                      {verb.conjugations[activeMood][activeTense] ? 
                        highlightEnding(verb.conjugations[activeMood][activeTense]![p]) : 
                        '---'}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="p-6 bg-slate-50 border-t text-center">
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.4em]">
                  Modelo del Verbo <span className="text-indigo-600">{verb.infinitive}</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerbTable;
