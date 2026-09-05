import type { DepartmentKey, Patient, RiskBand, WellnessMetrics } from '@/types'
import { DEPARTMENT_KEYS } from '@/types'

/**
 * Banding thresholds for the demo's wellness metrics. These are independent
 * of the clinical CANRISK/SCORE2 bands in clinicalConfig.ts (which stay
 * fixed per the brief) — wellness scores are a 0-100 composite where higher
 * is better (recovery/sleep/activity), except stress, which is inverted.
 */
export function wellnessBand(score: number): RiskBand {
  if (score >= 70) return 'low'
  if (score >= 40) return 'moderate'
  return 'high'
}

/** Stress is 0-100 where higher is worse, so the cut points invert relative to wellnessBand. */
export function stressBand(score: number): RiskBand {
  if (score <= 35) return 'low'
  if (score <= 55) return 'moderate'
  return 'high'
}

/**
 * MET (Metabolic Equivalent of Task) is a real SinoAI/fitness metric, not a
 * 0-100 score. Thresholds follow common real-world activity-intensity
 * conventions: >=5 is at least moderately active on average, 3.5-5 is light
 * activity, below 3.5 is largely sedentary.
 */
export function metBand(met: number): RiskBand {
  if (met >= 5) return 'low'
  if (met >= 3.5) return 'moderate'
  return 'high'
}

export function averageWellness(list: WellnessMetrics[]): WellnessMetrics {
  if (list.length === 0) {
    return { recovery: 0, sleepScore: 0, met: 0, activityScore: 0, stressScore: 0 }
  }
  const sum = list.reduce(
    (acc, w) => ({
      recovery: acc.recovery + w.recovery,
      sleepScore: acc.sleepScore + w.sleepScore,
      met: acc.met + w.met,
      activityScore: acc.activityScore + w.activityScore,
      stressScore: acc.stressScore + w.stressScore,
    }),
    { recovery: 0, sleepScore: 0, met: 0, activityScore: 0, stressScore: 0 },
  )
  const n = list.length
  return {
    recovery: Math.round(sum.recovery / n),
    sleepScore: Math.round(sum.sleepScore / n),
    met: Math.round((sum.met / n) * 10) / 10,
    activityScore: Math.round(sum.activityScore / n),
    stressScore: Math.round(sum.stressScore / n),
  }
}

/**
 * A single 0-100 "wellness index" combining all five metrics into one
 * headline number for the hero card and trend chart. MET is rescaled to
 * 0-100 (capped at a realistic ceiling of 8) and stress is inverted so that
 * higher always means healthier, matching the other components.
 */
export function wellnessIndex(w: WellnessMetrics): number {
  const metScaled = Math.min(100, (w.met / 8) * 100)
  const invertedStress = 100 - w.stressScore
  return Math.round((w.recovery + w.sleepScore + w.activityScore + metScaled + invertedStress) / 5)
}

export interface DepartmentSummary {
  key: DepartmentKey
  count: number
  average: WellnessMetrics
  index: number
}

export function departmentSummaries(workers: Patient[]): DepartmentSummary[] {
  return DEPARTMENT_KEYS.map((key) => {
    const members = workers.filter((w) => w.department === key)
    const average = averageWellness(members.map((w) => w.wellness))
    return { key, count: members.length, average, index: wellnessIndex(average) }
  })
}
