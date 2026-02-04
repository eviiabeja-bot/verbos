
import { Tense, Person, VerbData, Mood } from './types.ts';

export const VERBS: VerbData[] = [
  {
    infinitive: 'cantar',
    type: 'AR',
    conjugations: {
      [Mood.INDICATIVO]: {
        [Tense.PRESENTE_IND]: { [Person.YO]: 'canto', [Person.TU]: 'cantas', [Person.EL]: 'canta', [Person.NOSOTROS]: 'cantamos', [Person.VOSOTROS]: 'cantáis', [Person.ELLOS]: 'cantan' },
        [Tense.PRET_PERF_COMP_IND]: { [Person.YO]: 'he cantado', [Person.TU]: 'has cantado', [Person.EL]: 'ha cantado', [Person.NOSOTROS]: 'hemos cantado', [Person.VOSOTROS]: 'habéis cantado', [Person.ELLOS]: 'han cantado' },
        [Tense.PRET_IMP_IND]: { [Person.YO]: 'cantaba', [Person.TU]: 'cantabas', [Person.EL]: 'cantaba', [Person.NOSOTROS]: 'cantábamos', [Person.VOSOTROS]: 'cantabais', [Person.ELLOS]: 'cantaban' },
        [Tense.PRET_PLUSC_IND]: { [Person.YO]: 'había cantado', [Person.TU]: 'habías cantado', [Person.EL]: 'había cantado', [Person.NOSOTROS]: 'habíamos cantado', [Person.VOSOTROS]: 'habíais cantado', [Person.ELLOS]: 'habían cantado' },
        [Tense.PRET_PERF_SIMP_IND]: { [Person.YO]: 'canté', [Person.TU]: 'cantaste', [Person.EL]: 'cantó', [Person.NOSOTROS]: 'cantamos', [Person.VOSOTROS]: 'cantasteis', [Person.ELLOS]: 'cantaron' },
        [Tense.PRET_ANT_IND]: { [Person.YO]: 'hube cantado', [Person.TU]: 'hubiste cantado', [Person.EL]: 'hubo cantado', [Person.NOSOTROS]: 'hubimos cantado', [Person.VOSOTROS]: 'hubisteis cantado', [Person.ELLOS]: 'hubieron cantado' },
        [Tense.FUT_SIMP_IND]: { [Person.YO]: 'cantaré', [Person.TU]: 'cantarás', [Person.EL]: 'cantará', [Person.NOSOTROS]: 'cantaremos', [Person.VOSOTROS]: 'cantaréis', [Person.ELLOS]: 'cantarán' },
        [Tense.FUT_PERF_IND]: { [Person.YO]: 'habré cantado', [Person.TU]: 'habrás cantado', [Person.EL]: 'habrá cantado', [Person.NOSOTROS]: 'habremos cantado', [Person.VOSOTROS]: 'habréis cantado', [Person.ELLOS]: 'habrán cantado' },
        [Tense.COND_SIMP_IND]: { [Person.YO]: 'cantaría', [Person.TU]: 'cantarías', [Person.EL]: 'cantaría', [Person.NOSOTROS]: 'cantaríamos', [Person.VOSOTROS]: 'cantaríais', [Person.ELLOS]: 'cantarían' },
        [Tense.COND_COMP_IND]: { [Person.YO]: 'habría cantado', [Person.TU]: 'habrías cantado', [Person.EL]: 'habría cantado', [Person.NOSOTROS]: 'habríamos cantado', [Person.VOSOTROS]: 'habríais cantado', [Person.ELLOS]: 'habrían cantado' }
      },
      [Mood.SUBJUNTIVO]: {
        [Tense.PRESENTE_SUBJ]: { [Person.YO]: 'cante', [Person.TU]: 'cantes', [Person.EL]: 'cante', [Person.NOSOTROS]: 'cantemos', [Person.VOSOTROS]: 'cantéis', [Person.ELLOS]: 'canten' },
        [Tense.PRET_PERF_SUBJ]: { [Person.YO]: 'haya cantado', [Person.TU]: 'hayas cantado', [Person.EL]: 'haya cantado', [Person.NOSOTROS]: 'hayamos cantado', [Person.VOSOTROS]: 'hayáis cantado', [Person.ELLOS]: 'hayan cantado' },
        [Tense.PRET_IMP_SUBJ_1]: { [Person.YO]: 'cantara', [Person.TU]: 'cantaras', [Person.EL]: 'cantara', [Person.NOSOTROS]: 'cantáramos', [Person.VOSOTROS]: 'cantarais', [Person.ELLOS]: 'cantaran' },
        [Tense.PRET_IMP_SUBJ_2]: { [Person.YO]: 'cantase', [Person.TU]: 'cantases', [Person.EL]: 'cantase', [Person.NOSOTROS]: 'cantásemos', [Person.VOSOTROS]: 'cantaseis', [Person.ELLOS]: 'cantasen' },
        [Tense.PRET_PLUSC_SUBJ_1]: { [Person.YO]: 'hubiera cantado', [Person.TU]: 'hubieras cantado', [Person.EL]: 'hubiera cantado', [Person.NOSOTROS]: 'hubiéramos cantado', [Person.VOSOTROS]: 'hubierais cantado', [Person.ELLOS]: 'hubieran cantado' },
        [Tense.PRET_PLUSC_SUBJ_2]: { [Person.YO]: 'hubiese cantado', [Person.TU]: 'hubieses cantado', [Person.EL]: 'hubiese cantado', [Person.NOSOTROS]: 'hubiésemos cantado', [Person.VOSOTROS]: 'hubieseis cantado', [Person.ELLOS]: 'hubiesen cantado' }
      }
    }
  },
  {
    infinitive: 'comer',
    type: 'ER',
    conjugations: {
      [Mood.INDICATIVO]: {
        [Tense.PRESENTE_IND]: { [Person.YO]: 'como', [Person.TU]: 'comes', [Person.EL]: 'come', [Person.NOSOTROS]: 'comemos', [Person.VOSOTROS]: 'coméis', [Person.ELLOS]: 'comen' },
        [Tense.PRET_PERF_COMP_IND]: { [Person.YO]: 'he comido', [Person.TU]: 'has comido', [Person.EL]: 'ha comido', [Person.NOSOTROS]: 'hemos comido', [Person.VOSOTROS]: 'habéis comido', [Person.ELLOS]: 'han comido' },
        [Tense.PRET_IMP_IND]: { [Person.YO]: 'comía', [Person.TU]: 'comías', [Person.EL]: 'comía', [Person.NOSOTROS]: 'comíamos', [Person.VOSOTROS]: 'comíais', [Person.ELLOS]: 'comían' },
        [Tense.PRET_PLUSC_IND]: { [Person.YO]: 'había comido', [Person.TU]: 'habías comido', [Person.EL]: 'había comido', [Person.NOSOTROS]: 'habíamos comido', [Person.VOSOTROS]: 'habíais comido', [Person.ELLOS]: 'habían comido' },
        [Tense.PRET_PERF_SIMP_IND]: { [Person.YO]: 'comí', [Person.TU]: 'comiste', [Person.EL]: 'comió', [Person.NOSOTROS]: 'comimos', [Person.VOSOTROS]: 'comisteis', [Person.ELLOS]: 'comieron' },
        [Tense.PRET_ANT_IND]: { [Person.YO]: 'hube comido', [Person.TU]: 'hubiste comido', [Person.EL]: 'hubo comido', [Person.NOSOTROS]: 'hubimos comido', [Person.VOSOTROS]: 'hubisteis comido', [Person.ELLOS]: 'hubieron comido' },
        [Tense.FUT_SIMP_IND]: { [Person.YO]: 'comeré', [Person.TU]: 'comerás', [Person.EL]: 'comerá', [Person.NOSOTROS]: 'comeremos', [Person.VOSOTROS]: 'comeréis', [Person.ELLOS]: 'comerán' },
        [Tense.FUT_PERF_IND]: { [Person.YO]: 'habré comido', [Person.TU]: 'habrás comido', [Person.EL]: 'habrá comido', [Person.NOSOTROS]: 'habremos comido', [Person.VOSOTROS]: 'habréis comido', [Person.ELLOS]: 'habrán comido' },
        [Tense.COND_SIMP_IND]: { [Person.YO]: 'comería', [Person.TU]: 'comerías', [Person.EL]: 'comería', [Person.NOSOTROS]: 'comeríamos', [Person.VOSOTROS]: 'comeríais', [Person.ELLOS]: 'comerían' },
        [Tense.COND_COMP_IND]: { [Person.YO]: 'habría comido', [Person.TU]: 'habrías comido', [Person.EL]: 'habría comido', [Person.NOSOTROS]: 'habríamos comido', [Person.VOSOTROS]: 'habríais comido', [Person.ELLOS]: 'habrían comido' }
      },
      [Mood.SUBJUNTIVO]: {
        [Tense.PRESENTE_SUBJ]: { [Person.YO]: 'coma', [Person.TU]: 'comas', [Person.EL]: 'coma', [Person.NOSOTROS]: 'comamos', [Person.VOSOTROS]: 'comáis', [Person.ELLOS]: 'coman' },
        [Tense.PRET_PERF_SUBJ]: { [Person.YO]: 'haya comido', [Person.TU]: 'hayas comido', [Person.EL]: 'haya comido', [Person.NOSOTROS]: 'hayamos comido', [Person.VOSOTROS]: 'hayáis comido', [Person.ELLOS]: 'hayan comido' },
        [Tense.PRET_IMP_SUBJ_1]: { [Person.YO]: 'comiera', [Person.TU]: 'comieras', [Person.EL]: 'comiera', [Person.NOSOTROS]: 'comiéramos', [Person.VOSOTROS]: 'comierais', [Person.ELLOS]: 'comieran' },
        [Tense.PRET_IMP_SUBJ_2]: { [Person.YO]: 'comiese', [Person.TU]: 'comieses', [Person.EL]: 'comiese', [Person.NOSOTROS]: 'comiésemos', [Person.VOSOTROS]: 'comieseis', [Person.ELLOS]: 'comiesen' },
        [Tense.PRET_PLUSC_SUBJ_1]: { [Person.YO]: 'hubiera comido', [Person.TU]: 'hubieras comido', [Person.EL]: 'hubiera comido', [Person.NOSOTROS]: 'hubiéramos comido', [Person.VOSOTROS]: 'hubierais comido', [Person.ELLOS]: 'hubieran comido' },
        [Tense.PRET_PLUSC_SUBJ_2]: { [Person.YO]: 'hubiese comido', [Person.TU]: 'hubieses comido', [Person.EL]: 'hubiese comido', [Person.NOSOTROS]: 'hubiésemos comido', [Person.VOSOTROS]: 'hubieseis comido', [Person.ELLOS]: 'hubiesen comido' }
      }
    }
  },
  {
    infinitive: 'vivir',
    type: 'IR',
    conjugations: {
      [Mood.INDICATIVO]: {
        [Tense.PRESENTE_IND]: { [Person.YO]: 'vivo', [Person.TU]: 'vives', [Person.EL]: 'vive', [Person.NOSOTROS]: 'vivimos', [Person.VOSOTROS]: 'vivís', [Person.ELLOS]: 'viven' },
        [Tense.PRET_PERF_COMP_IND]: { [Person.YO]: 'he vivido', [Person.TU]: 'has vivido', [Person.EL]: 'ha vivido', [Person.NOSOTROS]: 'hemos vivido', [Person.VOSOTROS]: 'habéis vivido', [Person.ELLOS]: 'han vivido' },
        [Tense.PRET_IMP_IND]: { [Person.YO]: 'vivía', [Person.TU]: 'vivías', [Person.EL]: 'vivía', [Person.NOSOTROS]: 'vivíamos', [Person.VOSOTROS]: 'vivíais', [Person.ELLOS]: 'vivían' },
        [Tense.PRET_PLUSC_IND]: { [Person.YO]: 'había vivido', [Person.TU]: 'habías vivido', [Person.EL]: 'había vivido', [Person.NOSOTROS]: 'habíamos vivido', [Person.VOSOTROS]: 'habíais vivido', [Person.ELLOS]: 'habían vivido' },
        [Tense.PRET_PERF_SIMP_IND]: { [Person.YO]: 'viví', [Person.TU]: 'viviste', [Person.EL]: 'vivió', [Person.NOSOTROS]: 'vivimos', [Person.VOSOTROS]: 'vivisteis', [Person.ELLOS]: 'vivieron' },
        [Tense.PRET_ANT_IND]: { [Person.YO]: 'hube vivido', [Person.TU]: 'hubiste vivido', [Person.EL]: 'hubo vivido', [Person.NOSOTROS]: 'hubimos vivido', [Person.VOSOTROS]: 'hubisteis vivido', [Person.ELLOS]: 'hubieron vivido' },
        [Tense.FUT_SIMP_IND]: { [Person.YO]: 'viviré', [Person.TU]: 'vivirás', [Person.EL]: 'vivirá', [Person.NOSOTROS]: 'viviremos', [Person.VOSOTROS]: 'viviréis', [Person.ELLOS]: 'vivirán' },
        [Tense.FUT_PERF_IND]: { [Person.YO]: 'habré vivido', [Person.TU]: 'habrás vivido', [Person.EL]: 'habrá vivido', [Person.NOSOTROS]: 'habremos vivido', [Person.VOSOTROS]: 'habréis vivido', [Person.ELLOS]: 'habrán vivido' },
        [Tense.COND_SIMP_IND]: { [Person.YO]: 'viviría', [Person.TU]: 'vivirías', [Person.EL]: 'viviría', [Person.NOSOTROS]: 'viviríamos', [Person.VOSOTROS]: 'viviríais', [Person.ELLOS]: 'vivirían' },
        [Tense.COND_COMP_IND]: { [Person.YO]: 'habría vivido', [Person.TU]: 'habrías vivido', [Person.EL]: 'habría vivido', [Person.NOSOTROS]: 'habríamos vivido', [Person.VOSOTROS]: 'habríais vivido', [Person.ELLOS]: 'habrían vivido' }
      },
      [Mood.SUBJUNTIVO]: {
        [Tense.PRESENTE_SUBJ]: { [Person.YO]: 'viva', [Person.TU]: 'vivas', [Person.EL]: 'viva', [Person.NOSOTROS]: 'vivamos', [Person.VOSOTROS]: 'viváis', [Person.ELLOS]: 'vivan' },
        [Tense.PRET_PERF_SUBJ]: { [Person.YO]: 'haya vivido', [Person.TU]: 'hayas vivido', [Person.EL]: 'haya vivido', [Person.NOSOTROS]: 'hayamos vivido', [Person.VOSOTROS]: 'hayáis vivido', [Person.ELLOS]: 'hayan vivido' },
        [Tense.PRET_IMP_SUBJ_1]: { [Person.YO]: 'viviera', [Person.TU]: 'vivieras', [Person.EL]: 'viviera', [Person.NOSOTROS]: 'viviéramos', [Person.VOSOTROS]: 'vivierais', [Person.ELLOS]: 'vivieran' },
        [Tense.PRET_IMP_SUBJ_2]: { [Person.YO]: 'viviese', [Person.TU]: 'vivieses', [Person.EL]: 'viviese', [Person.NOSOTROS]: 'viviésemos', [Person.VOSOTROS]: 'vivieseis', [Person.ELLOS]: 'viviesen' },
        [Tense.PRET_PLUSC_SUBJ_1]: { [Person.YO]: 'hubiera vivido', [Person.TU]: 'hubieras vivido', [Person.EL]: 'hubiera vivido', [Person.NOSOTROS]: 'hubiéramos vivido', [Person.VOSOTROS]: 'hubierais vivido', [Person.ELLOS]: 'hubieran vivido' },
        [Tense.PRET_PLUSC_SUBJ_2]: { [Person.YO]: 'hubiese vivido', [Person.TU]: 'hubieses vivido', [Person.EL]: 'hubiese vivido', [Person.NOSOTROS]: 'hubiésemos vivido', [Person.VOSOTROS]: 'hubieseis vivido', [Person.ELLOS]: 'hubiesen vivido' }
      }
    }
  }
];
