
export enum Mood {
  INDICATIVO = 'Indicativo',
  SUBJUNTIVO = 'Subjuntivo'
}

export enum Tense {
  // Indicativo
  PRESENTE_IND = 'Presente',
  PRET_PERF_COMP_IND = 'Pretérito Perfecto Compuesto',
  PRET_IMP_IND = 'Pretérito Imperfecto',
  PRET_PLUSC_IND = 'Pretérito Pluscuamperfecto',
  PRET_PERF_SIMP_IND = 'Pretérito Perfecto Simple',
  PRET_ANT_IND = 'Pretérito Anterior',
  FUT_SIMP_IND = 'Futuro Simple',
  FUT_PERF_IND = 'Futuro Perfecto',
  COND_SIMP_IND = 'Condicional Simple',
  COND_COMP_IND = 'Condicional Compuesto',
  
  // Subjuntivo
  PRESENTE_SUBJ = 'Presente',
  PRET_PERF_SUBJ = 'Pretérito Perfecto',
  PRET_IMP_SUBJ_1 = 'Pretérito Imperfecto (-ra)',
  PRET_IMP_SUBJ_2 = 'Pretérito Imperfecto (-ase)',
  PRET_PLUSC_SUBJ_1 = 'Pretérito Pluscuamperfecto (-ra)',
  PRET_PLUSC_SUBJ_2 = 'Pretérito Pluscuamperfecto (-ase)',
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
