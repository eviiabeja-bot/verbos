
export enum Mood {
  INDICATIVO = 'Indicativo',
  SUBJUNTIVO = 'Subjuntivo'
}

export enum Tense {
  // Indicativo - Tiempos Simples
  PRESENTE_IND = 'Presente',
  PRET_IMPERFECTO_IND = 'Pretérito Imperfecto',
  PRET_PERFECTO_SIMPLE_IND = 'Pretérito Perfecto Simple',
  FUTURO_SIMPLE_IND = 'Futuro Simple',
  CONDICIONAL_SIMPLE_IND = 'Condicional Simple',
  
  // Indicativo - Tiempos Compuestos
  PRET_PERFECTO_COMP_IND = 'Pretérito Perfecto Compuesto',
  PRET_PLUSCUAM_IND = 'Pretérito Pluscuamperfecto',
  PRET_ANTERIOR_IND = 'Pretérito Anterior',
  FUTURO_COMP_IND = 'Futuro Compuesto',
  CONDICIONAL_COMP_IND = 'Condicional Perfecto',
  
  // Subjuntivo - Tiempos Simples
  PRESENTE_SUBJ = 'Presente',
  PRET_IMPERFECTO_SUBJ_1 = 'Pretérito Imperfecto (-ra)',
  PRET_IMPERFECTO_SUBJ_2 = 'Pretérito Imperfecto (-se)',
  FUTURO_SIMPLE_SUBJ = 'Futuro Simple',
  
  // Subjuntivo - Tiempos Compuestos
  PRET_PERFECTO_SUBJ = 'Pretérito Perfecto',
  PRET_PLUSCUAM_SUBJ_1 = 'Pretérito Pluscuamperfecto (-ra)',
  PRET_PLUSCUAM_SUBJ_2 = 'Pretérito Pluscuamperfecto (-se)',
  FUTURO_PERFECTO_SUBJ = 'Futuro Perfecto'
}

export enum Person {
  YO = 'yo',
  TU = 'tú',
  EL = 'él',
  NOSOTROS = 'nosotros',
  VOSOTROS = 'vosotros',
  ELLOS = 'ellos'
}

export interface VerbData {
  infinitive: string;
  type: 'AR' | 'ER' | 'IR';
  conjugations: {
    [Mood.INDICATIVO]: Partial<Record<Tense, Record<Person, string>>>;
    [Mood.SUBJUNTIVO]: Partial<Record<Tense, Record<Person, string>>>;
  };
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}
