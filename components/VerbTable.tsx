
import React from 'react';
import { Person, Tense, VerbData, Mood } from '../types.ts';

const VerbTable: React.FC<{ verb: VerbData }> = ({ verb }) => {
  // Lista de terminaciones gramaticales en orden de longitud (más largas primero)
  const endings = [
    'áramos', 'éramos', 'íramos', 'ásemos', 'ésemos', 'ísemos',
    'aríamos', 'eríamos', 'iríamos', 'aríais', 'eríais', 'iríais',
    'aremos', 'eremos', 'iremos', 'aréis', 'eréis', 'iréis',
    'áramos', 'éramos', 'íramos', 'arais', 'erais', 'irais', 
    'aseis', 'eseis', 'iseis', 'ábamos', 'abais', 'íamos', 'íais',
    'asteis', 'isteis', 'aron', 'ieron', 'amos', 'áis', 'emos', 'éis', 'imos',
    'ará', 'erá', 'irá', 'aré', 'eré', 'iré', 'ara', 'era', 'ira', 'ase', 'ese', 'ise',
    'aba', 'ías', 'ía', 'as', 'es', 'an', 'en', 'és', 'aste', 'iste', 'ió', 'í', 'ó', 'é',
    'a', 'e', 'o', 's'
  ];

  const processText = (word: string) => {
    if (!word) return '';

    // Función interna para aplicar el rojo a la terminación
    const applyHighlight = (text: string) => {
      for (const end of endings) {
        if (text.endsWith(end)) {
          const root = text.substring(0, text.length - end.length);
          return `${root}<span class="text-red-500 font-bold">${end}</span>`;
        }
      }
      // Si no hay coincidencia clara, resaltamos la palabra completa como terminación (ej: "he", "ha")
      return `<span class="text-red-500 font-bold">${text}</span>`;
    };

    // Si es una forma compuesta (ej: "he cantado", "hubiera vivido")
    if (word.includes(' ')) {
      const parts = word.split(' ');
      const auxiliary = parts[0];
      const participle = parts.slice(1).join(' ');
      
      const highlightedAux = applyHighlight(auxiliary);
      
      // Retornamos el auxiliar con su terminación en rojo y el participio normal
      return (
        <span dangerouslySetInnerHTML={{ 
          __html: `${highlightedAux} ${participle}` 
        }} />
      );
    }

    // Si es una forma simple
    return (
      <span dangerouslySetInnerHTML={{ 
        __html: applyHighlight(word) 
      }} />
    );
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-10">
      {[Mood.INDICATIVO, Mood.SUBJUNTIVO].map(mood => (
        <div key={mood} className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden">
          <div className={`${mood === Mood.INDICATIVO ? 'bg-blue-600' : 'bg-indigo-700'} p-8 text-white sticky left-0`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-70 mb-1">Modo Verbal</h3>
                <h2 className="text-3xl font-lexend font-black tracking-tight">{mood.toUpperCase()}</h2>
              </div>
              <div className="hidden md:flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full text-[10px] font-bold">
                <i className="fas fa-arrows-left-right animate-pulse"></i>
                <span>DESLIZA PARA VER MÁS TIEMPOS</span>
              </div>
            </div>
          </div>
          
          <div className="p-4 md:p-8 flex gap-6 overflow-x-auto no-scrollbar scroll-smooth">
            {Object.entries(verb.conjugations[mood] || {}).map(([tense, persons]) => (
              <div key={tense} className="flex-shrink-0 w-72 bg-slate-50 p-6 rounded-[2rem] border border-slate-100 hover:border-indigo-200 transition-colors shadow-sm">
                <div className="h-14 mb-4 border-b border-indigo-100 flex items-center">
                  <h4 className="text-[11px] font-black text-indigo-700 uppercase tracking-wider leading-tight">{tense}</h4>
                </div>
                <div className="space-y-4">
                  {Object.values(Person).map(p => {
                    const form = (persons as any)[p];
                    return form ? (
                      <div key={p} className="flex items-center justify-between group">
                        <span className="text-[10px] text-slate-400 font-black uppercase w-12 flex-shrink-0">{p}</span>
                        <span className="text-sm text-slate-700 text-right">{processText(form)}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      
      <div className="bg-amber-50 rounded-3xl p-8 border border-amber-100 flex items-start space-x-4">
        <div className="bg-white p-3 rounded-2xl text-amber-600 shadow-sm flex-shrink-0">
          <i className="fas fa-lightbulb text-xl"></i>
        </div>
        <div>
          <h4 className="font-lexend font-bold text-amber-900 mb-1 text-sm">Ayuda para el estudio:</h4>
          <p className="text-amber-800/80 text-xs leading-relaxed">
            Fíjate en las letras <span className="text-red-600 font-bold">rojas</span>. Indican el final del verbo que cambia según la persona. En los tiempos compuestos, el participio no cambia (siempre es "cantado", "comido" o "vivido"), por eso lo que debes aprender es la terminación del verbo <b>haber</b> que lo acompaña.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerbTable;
