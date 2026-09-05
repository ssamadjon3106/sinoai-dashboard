import type { RiskBand } from '@/types'
import { useI18n } from '@/hooks/useI18n'

// Background color alone identifies the band — no border stacked on top,
// matching RiskChip and the rest of the single-separation-method design rule.
const TONE_CLASSES: Record<RiskBand, string> = {
  low: 'bg-risk-low-bg text-risk-low',
  moderate: 'bg-risk-moderate-bg text-risk-moderate',
  high: 'bg-risk-high-bg text-risk-high',
}

export type WellnessMetricKind = 'recovery' | 'sleep' | 'met' | 'activity' | 'stress'

interface WellnessChipProps {
  kind: WellnessMetricKind
  value: number
  band: RiskBand
  suffix?: string
  size?: 'sm' | 'md'
}

/**
 * Recovery/Sleep/MET/Activity/Stress readings, styled like RiskChip (a
 * colored pill, band communicated by color + a small dot, never by border)
 * but generic to any wellness metric instead of a disease domain — used in
 * the Users table, the Needs Attention list, and the worker detail page in
 * place of the diabetes/CVD/oncology chips, which are now Overview-only.
 */
export function WellnessChip({ kind, value, band, suffix = '', size = 'sm' }: WellnessChipProps) {
  const { t } = useI18n()
  const padding = size === 'sm' ? 'px-2 py-1 text-[11px]' : 'px-2.5 py-1.5 text-xs'

  const metricLabel: Record<WellnessMetricKind, string> = {
    recovery: t.wellness.recoveryLabel,
    sleep: t.wellness.sleepLabel,
    met: t.wellness.metLabel,
    activity: t.wellness.activityLabel,
    stress: t.wellness.stressLabel,
  }

  const bandLabel =
    kind === 'stress'
      ? { low: t.wellness.bandCalm, moderate: t.wellness.bandElevated, high: t.wellness.bandHigh }[band]
      : { low: t.wellness.bandGood, moderate: t.wellness.bandModerate, high: t.wellness.bandPoor }[band]

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full ${TONE_CLASSES[band]} ${padding} font-bold tabular-nums`}
      title={`${metricLabel[kind]}: ${bandLabel}`}
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current" aria-hidden />
      <span>
        {value}
        {suffix}
      </span>
    </span>
  )
}
