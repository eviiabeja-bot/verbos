
import { Tense, Person, VerbData, Mood } from './types.ts';

export const VERBS: VerbData[] = [
  {
    infinitive: 'amar',
    type: 'AR',
    conjugations: {
      [Mood.INDICATIVO]: {
        [Tense.PRESENTE_IND]: { [Person.YO]: 'amo', [Person.TU]: 'amas', [Person.EL]: 'ama', [Person.NOSOTROS]: 'amamos', [Person.VOSOTROS]: 'amáis', [Person.ELLOS]: 'aman' }
      },
      [Mood.SUBJUNTIVO]: {
        [Tense.PRESENTE_SUBJ]: { [Person.YO]: 'ame', [Person.TU]: 'ames', [Person.EL]: 'ame', [Person.NOSOTROS]: 'amemos', [Person.VOSOTROS]: 'améis', [Person.ELLOS]: 'amen' },
        [Tense.PRET_IMPERFECTO_SUBJ_1]: { [Person.YO]: 'amara', [Person.TU]: 'amaras', [Person.EL]: 'amara', [Person.NOSOTROS]: 'amáramos', [Person.VOSOTROS]: 'amarais', [Person.ELLOS]: 'amaran' }
      }
    }
  },
  {
    infinitive: 'tener',
    type: 'ER',
    conjugations: {
      [Mood.INDICATIVO]: {
        [Tense.PRESENTE_IND]: { [Person.YO]: 'tengo', [Person.TU]: 'tienes', [Person.EL]: 'tiene', [Person.NOSOTROS]: 'tenemos', [Person.VOSOTROS]: 'tenéis', [Person.ELLOS]: 'tienen' }
      },
      [Mood.SUBJUNTIVO]: {
        [Tense.PRESENTE_SUBJ]: { [Person.YO]: 'tenga', [Person.TU]: 'tengas', [Person.EL]: 'tenga', [Person.NOSOTROS]: 'tengamos', [Person.VOSOTROS]: 'tengáis', [Person.ELLOS]: 'tengan' },
        [Tense.PRET_IMPERFECTO_SUBJ_1]: { [Person.YO]: 'tuviera', [Person.TU]: 'tuvieras', [Person.EL]: 'tuviera', [Person.NOSOTROS]: 'tuviéramos', [Person.VOSOTROS]: 'tuvierais', [Person.ELLOS]: 'tuvieran' }
      }
    }
  },
  {
    infinitive: 'ir',
    type: 'IR',
    conjugations: {
      [Mood.INDICATIVO]: {
        [Tense.PRESENTE_IND]: { [Person.YO]: 'voy', [Person.TU]: 'vas', [Person.EL]: 'va', [Person.NOSOTROS]: 'vamos', [Person.VOSOTROS]: 'vais', [Person.ELLOS]: 'van' }
      },
      [Mood.SUBJUNTIVO]: {
        [Tense.PRESENTE_SUBJ]: { [Person.YO]: 'vaya', [Person.TU]: 'vayas', [Person.EL]: 'vaya', [Person.NOSOTROS]: 'vayamos', [Person.VOSOTROS]: 'vayáis', [Person.ELLOS]: 'vayan' },
        [Tense.PRET_IMPERFECTO_SUBJ_1]: { [Person.YO]: 'fuera', [Person.TU]: 'fueras', [Person.EL]: 'fuera', [Person.NOSOTROS]: 'fuéramos', [Person.VOSOTROS]: 'fuerais', [Person.ELLOS]: 'fueran' }
      }
    }
  },
  {
    infinitive: 'ser',
    type: 'ER',
    conjugations: {
      [Mood.INDICATIVO]: {
        [Tense.PRESENTE_IND]: { [Person.YO]: 'soy', [Person.TU]: 'eres', [Person.EL]: 'es', [Person.NOSOTROS]: 'somos', [Person.VOSOTROS]: 'sois', [Person.ELLOS]: 'son' }
      },
      [Mood.SUBJUNTIVO]: {
        [Tense.PRESENTE_SUBJ]: { [Person.YO]: 'sea', [Person.TU]: 'seas', [Person.EL]: 'sea', [Person.NOSOTROS]: 'seamos', [Person.VOSOTROS]: 'seáis', [Person.ELLOS]: 'sean' },
        [Tense.PRET_IMPERFECTO_SUBJ_1]: { [Person.YO]: 'fuera', [Person.TU]: 'fueras', [Person.EL]: 'fuera', [Person.NOSOTROS]: 'fuéramos', [Person.VOSOTROS]: 'fuerais', [Person.ELLOS]: 'fueran' }
      }
    }
  }
];
