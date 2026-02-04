
import { Tense, Person, VerbData, Mood } from './types';

export const VERBS: VerbData[] = [
  {
    infinitive: 'amar',
    type: 'AR',
    conjugations: {
      [Mood.INDICATIVO]: {
        [Tense.PRESENTE_IND]: { [Person.YO]: 'amo', [Person.TU]: 'amas', [Person.EL]: 'ama', [Person.NOSOTROS]: 'amamos', [Person.VOSOTROS]: 'amáis', [Person.ELLOS]: 'aman' },
        [Tense.PRET_IMPERFECTO_IND]: { [Person.YO]: 'amaba', [Person.TU]: 'amabas', [Person.EL]: 'amaba', [Person.NOSOTROS]: 'amábamos', [Person.VOSOTROS]: 'amabais', [Person.ELLOS]: 'amaban' },
        [Tense.PRET_PERFECTO_SIMPLE_IND]: { [Person.YO]: 'amé', [Person.TU]: 'amaste', [Person.EL]: 'amó', [Person.NOSOTROS]: 'amamos', [Person.VOSOTROS]: 'amasteis', [Person.ELLOS]: 'amaron' },
        [Tense.FUTURO_SIMPLE_IND]: { [Person.YO]: 'amaré', [Person.TU]: 'amarás', [Person.EL]: 'amará', [Person.NOSOTROS]: 'amaremos', [Person.VOSOTROS]: 'amaréis', [Person.ELLOS]: 'amarán' },
        [Tense.CONDICIONAL_SIMPLE_IND]: { [Person.YO]: 'amaría', [Person.TU]: 'amarías', [Person.EL]: 'amaría', [Person.NOSOTROS]: 'amaríamos', [Person.VOSOTROS]: 'amaríais', [Person.ELLOS]: 'amarían' },
        [Tense.PRET_PERFECTO_COMP_IND]: { [Person.YO]: 'he amado', [Person.TU]: 'has amado', [Person.EL]: 'ha amado', [Person.NOSOTROS]: 'hemos amado', [Person.VOSOTROS]: 'habéis amado', [Person.ELLOS]: 'han amado' },
        [Tense.PRET_PLUSCUAM_IND]: { [Person.YO]: 'había amado', [Person.TU]: 'habías amado', [Person.EL]: 'había amado', [Person.NOSOTROS]: 'habíamos amado', [Person.VOSOTROS]: 'habíais amado', [Person.ELLOS]: 'habían amado' },
        [Tense.PRET_ANTERIOR_IND]: { [Person.YO]: 'hube amado', [Person.TU]: 'hubiste amado', [Person.EL]: 'hubo amado', [Person.NOSOTROS]: 'hubimos amado', [Person.VOSOTROS]: 'hubisteis amado', [Person.ELLOS]: 'hubieron amado' },
        [Tense.FUTURO_COMP_IND]: { [Person.YO]: 'habré amado', [Person.TU]: 'habrás amado', [Person.EL]: 'habrá amado', [Person.NOSOTROS]: 'habremos amado', [Person.VOSOTROS]: 'habréis amado', [Person.ELLOS]: 'habrán amado' },
        [Tense.CONDICIONAL_COMP_IND]: { [Person.YO]: 'habría amado', [Person.TU]: 'habrías amado', [Person.EL]: 'habría amado', [Person.NOSOTROS]: 'habríamos amado', [Person.VOSOTROS]: 'habríais amado', [Person.ELLOS]: 'habrían amado' }
      },
      [Mood.SUBJUNTIVO]: {
        [Tense.PRESENTE_SUBJ]: { [Person.YO]: 'ame', [Person.TU]: 'ames', [Person.EL]: 'ame', [Person.NOSOTROS]: 'amemos', [Person.VOSOTROS]: 'améis', [Person.ELLOS]: 'amen' },
        [Tense.PRET_IMPERFECTO_SUBJ_1]: { [Person.YO]: 'amara', [Person.TU]: 'amaras', [Person.EL]: 'amara', [Person.NOSOTROS]: 'amáramos', [Person.VOSOTROS]: 'amarais', [Person.ELLOS]: 'amaran' },
        [Tense.PRET_IMPERFECTO_SUBJ_2]: { [Person.YO]: 'amase', [Person.TU]: 'amases', [Person.EL]: 'amase', [Person.NOSOTROS]: 'amásemos', [Person.VOSOTROS]: 'amaseis', [Person.ELLOS]: 'amasen' },
        [Tense.FUTURO_SIMPLE_SUBJ]: { [Person.YO]: 'amare', [Person.TU]: 'amares', [Person.EL]: 'amare', [Person.NOSOTROS]: 'amáremos', [Person.VOSOTROS]: 'amareis', [Person.ELLOS]: 'amaren' },
        [Tense.PRET_PERFECTO_SUBJ]: { [Person.YO]: 'haya amado', [Person.TU]: 'hayas amado', [Person.EL]: 'haya amado', [Person.NOSOTROS]: 'hayamos amado', [Person.VOSOTROS]: 'hayáis amado', [Person.ELLOS]: 'hayan amado' },
        [Tense.PRET_PLUSCUAM_SUBJ_1]: { [Person.YO]: 'hubiera amado', [Person.TU]: 'hubieras amado', [Person.EL]: 'hubiera amado', [Person.NOSOTROS]: 'hubiéramos amado', [Person.VOSOTROS]: 'hubierais amado', [Person.ELLOS]: 'hubieran amado' },
        [Tense.PRET_PLUSCUAM_SUBJ_2]: { [Person.YO]: 'hubiese amado', [Person.TU]: 'hubieses amado', [Person.EL]: 'hubiese amado', [Person.NOSOTROS]: 'hubiésemos amado', [Person.VOSOTROS]: 'hubieseis amado', [Person.ELLOS]: 'hubiesen amado' },
        [Tense.FUTURO_PERFECTO_SUBJ]: { [Person.YO]: 'hubiere amado', [Person.TU]: 'hubieres amado', [Person.EL]: 'hubiere amado', [Person.NOSOTROS]: 'hubiéremos amado', [Person.VOSOTROS]: 'hubiereis amado', [Person.ELLOS]: 'hubieren amado' }
      }
    }
  },
  {
    infinitive: 'comer',
    type: 'ER',
    conjugations: {
      [Mood.INDICATIVO]: {
        [Tense.PRESENTE_IND]: { [Person.YO]: 'como', [Person.TU]: 'comes', [Person.EL]: 'come', [Person.NOSOTROS]: 'comemos', [Person.VOSOTROS]: 'coméis', [Person.ELLOS]: 'comen' },
        [Tense.PRET_IMPERFECTO_IND]: { [Person.YO]: 'comía', [Person.TU]: 'comías', [Person.EL]: 'comía', [Person.NOSOTROS]: 'comíamos', [Person.VOSOTROS]: 'comíais', [Person.ELLOS]: 'comían' },
        [Tense.PRET_PERFECTO_SIMPLE_IND]: { [Person.YO]: 'comí', [Person.TU]: 'comiste', [Person.EL]: 'comió', [Person.NOSOTROS]: 'comimos', [Person.VOSOTROS]: 'comisteis', [Person.ELLOS]: 'comieron' },
        [Tense.FUTURO_SIMPLE_IND]: { [Person.YO]: 'comeré', [Person.TU]: 'comerás', [Person.EL]: 'comerá', [Person.NOSOTROS]: 'comeremos', [Person.VOSOTROS]: 'comeréis', [Person.ELLOS]: 'comerán' },
        [Tense.CONDICIONAL_SIMPLE_IND]: { [Person.YO]: 'comería', [Person.TU]: 'comerías', [Person.EL]: 'comería', [Person.NOSOTROS]: 'comeríamos', [Person.VOSOTROS]: 'comeríais', [Person.ELLOS]: 'comerían' },
        [Tense.PRET_PERFECTO_COMP_IND]: { [Person.YO]: 'he comido', [Person.TU]: 'has comido', [Person.EL]: 'ha comido', [Person.NOSOTROS]: 'hemos comido', [Person.VOSOTROS]: 'habéis comido', [Person.ELLOS]: 'han comido' },
        [Tense.PRET_PLUSCUAM_IND]: { [Person.YO]: 'había comido', [Person.TU]: 'habías comido', [Person.EL]: 'había comido', [Person.NOSOTROS]: 'habíamos comido', [Person.VOSOTROS]: 'habíais comido', [Person.ELLOS]: 'habían comido' },
        [Tense.PRET_ANTERIOR_IND]: { [Person.YO]: 'hube comido', [Person.TU]: 'hubiste comido', [Person.EL]: 'hubo comido', [Person.NOSOTROS]: 'hubimos comido', [Person.VOSOTROS]: 'hubisteis comido', [Person.ELLOS]: 'hubieron comido' },
        [Tense.FUTURO_COMP_IND]: { [Person.YO]: 'habré comido', [Person.TU]: 'habrás comido', [Person.EL]: 'habrá comido', [Person.NOSOTROS]: 'habremos comido', [Person.VOSOTROS]: 'habréis comido', [Person.ELLOS]: 'habrán comido' },
        [Tense.CONDICIONAL_COMP_IND]: { [Person.YO]: 'habría comido', [Person.TU]: 'habrías comido', [Person.EL]: 'habría comido', [Person.NOSOTROS]: 'habríamos comido', [Person.VOSOTROS]: 'habríais comido', [Person.ELLOS]: 'habrían comido' }
      },
      [Mood.SUBJUNTIVO]: {
        [Tense.PRESENTE_SUBJ]: { [Person.YO]: 'coma', [Person.TU]: 'comas', [Person.EL]: 'coma', [Person.NOSOTROS]: 'comamos', [Person.VOSOTROS]: 'comáis', [Person.ELLOS]: 'coman' },
        [Tense.PRET_IMPERFECTO_SUBJ_1]: { [Person.YO]: 'comiera', [Person.TU]: 'comieras', [Person.EL]: 'comiera', [Person.NOSOTROS]: 'comiéramos', [Person.VOSOTROS]: 'comierais', [Person.ELLOS]: 'comieran' },
        [Tense.PRET_IMPERFECTO_SUBJ_2]: { [Person.YO]: 'comiese', [Person.TU]: 'comieses', [Person.EL]: 'comiese', [Person.NOSOTROS]: 'comiésemos', [Person.VOSOTROS]: 'comieseis', [Person.ELLOS]: 'comiesen' },
        [Tense.FUTURO_SIMPLE_SUBJ]: { [Person.YO]: 'comiere', [Person.TU]: 'comieres', [Person.EL]: 'comiere', [Person.NOSOTROS]: 'comiéremos', [Person.VOSOTROS]: 'comiereis', [Person.ELLOS]: 'comieren' },
        [Tense.PRET_PERFECTO_SUBJ]: { [Person.YO]: 'haya comido', [Person.TU]: 'hayas comido', [Person.EL]: 'haya comido', [Person.NOSOTROS]: 'hayamos comido', [Person.VOSOTROS]: 'hayáis comido', [Person.ELLOS]: 'hayan comido' },
        [Tense.PRET_PLUSCUAM_SUBJ_1]: { [Person.YO]: 'hubiera comido', [Person.TU]: 'hubieras comido', [Person.EL]: 'hubiera comido', [Person.NOSOTROS]: 'hubiéramos comido', [Person.VOSOTROS]: 'hubierais comido', [Person.ELLOS]: 'hubieran comido' },
        [Tense.PRET_PLUSCUAM_SUBJ_2]: { [Person.YO]: 'hubiese comido', [Person.TU]: 'hubieses comido', [Person.EL]: 'hubiese comido', [Person.NOSOTROS]: 'hubiésemos comido', [Person.VOSOTROS]: 'hubieseis comido', [Person.ELLOS]: 'hubiesen comido' },
        [Tense.FUTURO_PERFECTO_SUBJ]: { [Person.YO]: 'hubiere comido', [Person.TU]: 'hubieres comido', [Person.EL]: 'hubiere comido', [Person.NOSOTROS]: 'hubiéremos comido', [Person.VOSOTROS]: 'hubiereis comido', [Person.ELLOS]: 'hubieren comido' }
      }
    }
  },
  {
    infinitive: 'vivir',
    type: 'IR',
    conjugations: {
      [Mood.INDICATIVO]: {
        [Tense.PRESENTE_IND]: { [Person.YO]: 'vivo', [Person.TU]: 'vives', [Person.EL]: 'vive', [Person.NOSOTROS]: 'vivimos', [Person.VOSOTROS]: 'vivís', [Person.ELLOS]: 'viven' },
        [Tense.PRET_IMPERFECTO_IND]: { [Person.YO]: 'vivía', [Person.TU]: 'vivías', [Person.EL]: 'vivía', [Person.NOSOTROS]: 'vivíamos', [Person.VOSOTROS]: 'vivíais', [Person.ELLOS]: 'vivían' },
        [Tense.PRET_PERFECTO_SIMPLE_IND]: { [Person.YO]: 'viví', [Person.TU]: 'viviste', [Person.EL]: 'vivió', [Person.NOSOTROS]: 'vivimos', [Person.VOSOTROS]: 'vivisteis', [Person.ELLOS]: 'vivieron' },
        [Tense.FUTURO_SIMPLE_IND]: { [Person.YO]: 'viviré', [Person.TU]: 'vivirás', [Person.EL]: 'vivirá', [Person.NOSOTROS]: 'viviremos', [Person.VOSOTROS]: 'viviréis', [Person.ELLOS]: 'vivirán' },
        [Tense.CONDICIONAL_SIMPLE_IND]: { [Person.YO]: 'viviría', [Person.TU]: 'vivirías', [Person.EL]: 'viviría', [Person.NOSOTROS]: 'viviríamos', [Person.VOSOTROS]: 'viviríais', [Person.ELLOS]: 'vivirían' },
        [Tense.PRET_PERFECTO_COMP_IND]: { [Person.YO]: 'he vivido', [Person.TU]: 'has vivido', [Person.EL]: 'ha vivido', [Person.NOSOTROS]: 'hemos vivido', [Person.VOSOTROS]: 'habéis vivido', [Person.ELLOS]: 'han vivido' },
        [Tense.PRET_PLUSCUAM_IND]: { [Person.YO]: 'había vivido', [Person.TU]: 'habías vivido', [Person.EL]: 'había vivido', [Person.NOSOTROS]: 'habíamos vivido', [Person.VOSOTROS]: 'habíais vivido', [Person.ELLOS]: 'habían vivido' },
        [Tense.PRET_ANTERIOR_IND]: { [Person.YO]: 'hube vivido', [Person.TU]: 'hubiste vivido', [Person.EL]: 'hubo vivido', [Person.NOSOTROS]: 'hubimos vivido', [Person.VOSOTROS]: 'hubisteis vivido', [Person.ELLOS]: 'hubieron vivido' },
        [Tense.FUTURO_COMP_IND]: { [Person.YO]: 'habré vivido', [Person.TU]: 'habrás vivido', [Person.EL]: 'habrá vivido', [Person.NOSOTROS]: 'habremos vivido', [Person.VOSOTROS]: 'habréis vivido', [Person.ELLOS]: 'habrán vivido' },
        [Tense.CONDICIONAL_COMP_IND]: { [Person.YO]: 'habría vivido', [Person.TU]: 'habrías vivido', [Person.EL]: 'habría vivido', [Person.NOSOTROS]: 'habríamos vivido', [Person.VOSOTROS]: 'habríais vivido', [Person.ELLOS]: 'habrían vivido' }
      },
      [Mood.SUBJUNTIVO]: {
        [Tense.PRESENTE_SUBJ]: { [Person.YO]: 'viva', [Person.TU]: 'vivas', [Person.EL]: 'viva', [Person.NOSOTROS]: 'vivamos', [Person.VOSOTROS]: 'viváis', [Person.ELLOS]: 'vivan' },
        [Tense.PRET_IMPERFECTO_SUBJ_1]: { [Person.YO]: 'viviera', [Person.TU]: 'vivieras', [Person.EL]: 'viviera', [Person.NOSOTROS]: 'viviéramos', [Person.VOSOTROS]: 'vivierais', [Person.ELLOS]: 'vivieran' },
        [Tense.PRET_IMPERFECTO_SUBJ_2]: { [Person.YO]: 'viviese', [Person.TU]: 'vivieses', [Person.EL]: 'viviese', [Person.NOSOTROS]: 'viviésemos', [Person.VOSOTROS]: 'vivieseis', [Person.ELLOS]: 'viviesen' },
        [Tense.FUTURO_SIMPLE_SUBJ]: { [Person.YO]: 'viviere', [Person.TU]: 'vivieres', [Person.EL]: 'viviere', [Person.NOSOTROS]: 'viviéremos', [Person.VOSOTROS]: 'viviereis', [Person.ELLOS]: 'vivieren' },
        [Tense.PRET_PERFECTO_SUBJ]: { [Person.YO]: 'haya vivido', [Person.TU]: 'hayas vivido', [Person.EL]: 'haya vivido', [Person.NOSOTROS]: 'hayamos vivido', [Person.VOSOTROS]: 'hayáis vivido', [Person.ELLOS]: 'hayan vivido' },
        [Tense.PRET_PLUSCUAM_SUBJ_1]: { [Person.YO]: 'hubiera vivido', [Person.TU]: 'hubieras vivido', [Person.EL]: 'hubiera vivido', [Person.NOSOTROS]: 'hubiéramos vivido', [Person.VOSOTROS]: 'hubierais vivido', [Person.ELLOS]: 'hubieran vivido' },
        [Tense.PRET_PLUSCUAM_SUBJ_2]: { [Person.YO]: 'hubiese vivido', [Person.TU]: 'hubieses vivido', [Person.EL]: 'hubiese vivido', [Person.NOSOTROS]: 'hubiésemos vivido', [Person.VOSOTROS]: 'hubieseis vivido', [Person.ELLOS]: 'hubiesen vivido' },
        [Tense.FUTURO_PERFECTO_SUBJ]: { [Person.YO]: 'hubiere vivido', [Person.TU]: 'hubieres vivido', [Person.EL]: 'hubiere vivido', [Person.NOSOTROS]: 'hubiéremos vivido', [Person.VOSOTROS]: 'hubiereis vivido', [Person.ELLOS]: 'hubieren vivido' }
      }
    }
  }
];
