import type { DomainKey, RiskBand, Sex } from '@/types'

/**
 * Single source of truth for risk-band colors, domain thresholds, and
 * reference ranges. Tailwind's `risk.*` / `domain.*` tokens (tailwind.config.ts)
 * carry the same hex values for use in className-based styling; this module
 * exists for places that need a raw value (SVG stroke, Recharts fill, canvas).
 * Keep both in sync if a color ever changes.
 */

export const RISK_COLORS: Record<RiskBand, string> = {
  low: '#2E7D32',
  moderate: '#F57C00',
  high: '#C62828',
}

export const RISK_BG_COLORS: Record<RiskBand, string> = {
  low: '#E8F5E9',
  moderate: '#FFF3E0',
  high: '#FDECEA',
}

export const DOMAIN_ACCENT_COLORS: Record<DomainKey, string> = {
  // Darkened from #B98900 to meet 4.5:1 text contrast on white (matches
  // tailwind.config.ts's domain.diabetes token — keep both in sync).
  diabetes: '#8A6600',
  cvd: '#A6455C',
  oncology: '#6B5CA5',
}

export const DOMAIN_ACCENT_BG_COLORS: Record<DomainKey, string> = {
  diabetes: '#FBF3DC',
  cvd: '#F7E9EC',
  oncology: '#EFECFA',
}

/** Percent cut points rendered as tick marks on each domain's gauge. */
export const CANRISK_THRESHOLDS = [21, 33]
export const SCORE2_THRESHOLDS = [21, 33]
export const ONCOLOGY_THRESHOLDS = [21, 33]

/**
 * CANRISK band cutoffs, per brief §2.1 exactly: 0-20 low, 21-32 moderate, 33+ high.
 * This is the only officially-specified percent→color rule anywhere in the
 * brief or SinoAI's real API (the API's own `color` field, where present, is
 * a static brand accent rather than a severity indicator — confirmed by
 * inspecting real per-user responses). Per instruction, CVD and oncology
 * reuse this same official banding for their color instead of separate
 * invented cut points, so every domain's color is driven by one consistent,
 * official rule.
 */
export function canriskBand(percent: number): RiskBand {
  if (percent >= 33) return 'high'
  if (percent >= 21) return 'moderate'
  return 'low'
}

/**
 * SCORE2 (Uzbekistan very-high-risk calibration) is only defined for ages 40-69.
 */
export const SCORE2_MIN_AGE = 40
export const SCORE2_MAX_AGE = 69

export function score2Applicable(age: number): boolean {
  return age >= SCORE2_MIN_AGE && age <= SCORE2_MAX_AGE
}

/** Delegates to the official CANRISK banding — see canriskBand doc comment. */
export function score2Band(percent: number): RiskBand {
  return canriskBand(percent)
}

/**
 * Oncology is a screening signal count, not a validated probability score.
 * Delegates to the official CANRISK banding — see canriskBand doc comment.
 * These bands drive UI color only — they must never be presented to a
 * clinician as diagnostic thresholds.
 */
export function oncologySignalBand(percent: number): RiskBand {
  return canriskBand(percent)
}

export const AGE_BANDS = ['20-30', '30-40', '40-50', '50-60'] as const
export type AgeBand = (typeof AGE_BANDS)[number]

/** Ages 60+ reuse the 50-60 band (the brief only specifies bands through 50-60). */
export function ageToAgeBand(age: number): AgeBand {
  if (age < 30) return '20-30'
  if (age < 40) return '30-40'
  if (age < 50) return '40-50'
  return '50-60'
}

interface ReferenceRangeRow {
  vitaminD3: [number, number]
  bmi: [number, number]
}

/**
 * Reference ranges by age band x sex, trimmed to the two measurements
 * SinoAI's real API can actually supply for a user (BMI from the user
 * profile, vitamin D3 parsed from a medcard lab document) — see
 * data/realUsers.ts. Blood pressure, glucose, and SpO2 were removed: no
 * endpoint in the real API returns stored values for them.
 */
export const REFERENCE_RANGES: Record<AgeBand, Record<Sex, ReferenceRangeRow>> = {
  '20-30': {
    male: { vitaminD3: [30, 60], bmi: [18.5, 24.9] },
    female: { vitaminD3: [30, 60], bmi: [18.5, 24.9] },
  },
  '30-40': {
    male: { vitaminD3: [30, 58], bmi: [18.5, 25.5] },
    female: { vitaminD3: [30, 58], bmi: [18.5, 25.5] },
  },
  '40-50': {
    male: { vitaminD3: [28, 55], bmi: [18.5, 26.5] },
    female: { vitaminD3: [28, 55], bmi: [18.5, 26.5] },
  },
  '50-60': {
    male: { vitaminD3: [28, 52], bmi: [18.5, 27.5] },
    female: { vitaminD3: [28, 52], bmi: [18.5, 27.5] },
  },
}
