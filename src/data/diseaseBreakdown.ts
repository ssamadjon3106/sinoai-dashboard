import type { LocalizedText } from '@/types'

export interface DiseaseBreakdownEntry {
  id: string
  label: LocalizedText
  /** Share of screened workers with a detected signal for this type. Demo-only, fabricated — see OverviewPage. */
  percent: number
  /** Oncology only: which sex this type is screened for. Omitted = applies to both (e.g. stomach). */
  sex?: 'male' | 'female'
}

/**
 * Demo-only breakdown of the oncology sub-types SinoAI's screening model
 * covers, restricted to exactly the four "sites" the real API
 * (chatapi.sinoai.io/docs) actually returns per user — stomach, prostate,
 * breast, uterine — rather than inventing additional ones, so the list stays
 * medically accurate: breast/uterine are screened in women, prostate in men,
 * stomach in both. DiseaseBreakdownCard groups these by sex using the `sex`
 * field. Percentages are fabricated (no per-sub-type endpoint exists) but
 * grounded in this real, accurate scope.
 */
export const ONCOLOGY_TYPES: DiseaseBreakdownEntry[] = [
  { id: 'breast', label: { uz: 'Ko‘krak bezi saratoni', ru: 'Рак молочной железы', en: 'Breast cancer' }, percent: 4, sex: 'female' },
  { id: 'uterine', label: { uz: 'Bachadon saratoni', ru: 'Рак матки', en: 'Uterine cancer' }, percent: 3, sex: 'female' },
  { id: 'stomach', label: { uz: 'Oshqozon saratoni', ru: 'Рак желудка', en: 'Stomach cancer' }, percent: 6 },
  { id: 'prostate', label: { uz: 'Prostata saratoni', ru: 'Рак простаты', en: 'Prostate cancer' }, percent: 5, sex: 'male' },
]

export const CVD_TYPES: DiseaseBreakdownEntry[] = [
  { id: 'hypertension', label: { uz: 'Gipertoniya', ru: 'Гипертония', en: 'Hypertension' }, percent: 14 },
  { id: 'ischemic', label: { uz: 'Yurak ishemik kasalligi', ru: 'Ишемическая болезнь сердца', en: 'Ischemic heart disease' }, percent: 9 },
  { id: 'atherosclerosis', label: { uz: 'Ateroskleroz', ru: 'Атеросклероз', en: 'Atherosclerosis' }, percent: 8 },
  { id: 'arrhythmia', label: { uz: 'Aritmiya', ru: 'Аритмия', en: 'Arrhythmia' }, percent: 5 },
]
