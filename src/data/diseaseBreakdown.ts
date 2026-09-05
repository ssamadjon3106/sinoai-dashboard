import type { LocalizedText } from '@/types'

export interface DiseaseBreakdownEntry {
  id: string
  label: LocalizedText
  /** Share of screened workers with a detected signal for this type. Demo-only, fabricated — see OverviewPage. */
  percent: number
}

/**
 * Fabricated, demo-only breakdown of the oncology/CVD sub-types SinoAI's
 * screening model covers. SinoAI's real API (chatapi.sinoai.io/docs) does
 * not expose a per-sub-type breakdown — the oncology "sites" it does return
 * per user (stomach/prostate/breast/uterine) are reused here as a starting
 * point, extended with a couple of additional plausible categories for a
 * fuller investor-facing picture, per explicit user sign-off to fabricate
 * realistic data grounded in the app's real screening scope.
 */
export const ONCOLOGY_TYPES: DiseaseBreakdownEntry[] = [
  { id: 'stomach', label: { uz: 'Oshqozon saratoni', ru: 'Рак желудка', en: 'Stomach cancer' }, percent: 6 },
  { id: 'prostate', label: { uz: 'Prostata saratoni', ru: 'Рак простаты', en: 'Prostate cancer' }, percent: 5 },
  { id: 'breast', label: { uz: 'Ko‘krak bezi saratoni', ru: 'Рак молочной железы', en: 'Breast cancer' }, percent: 4 },
  { id: 'uterine', label: { uz: 'Bachadon saratoni', ru: 'Рак матки', en: 'Uterine cancer' }, percent: 3 },
  { id: 'liver', label: { uz: 'Jigar saratoni', ru: 'Рак печени', en: 'Liver cancer' }, percent: 3 },
  { id: 'thyroid', label: { uz: 'Qalqonsimon bez saratoni', ru: 'Рак щитовидной железы', en: 'Thyroid cancer' }, percent: 2 },
]

export const CVD_TYPES: DiseaseBreakdownEntry[] = [
  { id: 'hypertension', label: { uz: 'Gipertoniya', ru: 'Гипертония', en: 'Hypertension' }, percent: 14 },
  { id: 'ischemic', label: { uz: 'Yurak ishemik kasalligi', ru: 'Ишемическая болезнь сердца', en: 'Ischemic heart disease' }, percent: 9 },
  { id: 'atherosclerosis', label: { uz: 'Ateroskleroz', ru: 'Атеросклероз', en: 'Atherosclerosis' }, percent: 8 },
  { id: 'arrhythmia', label: { uz: 'Aritmiya', ru: 'Аритмия', en: 'Arrhythmia' }, percent: 5 },
]
