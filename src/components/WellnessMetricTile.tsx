import type { RiskBand } from '@/types'
import { RISK_COLORS } from '@/lib/clinicalConfig'
import { useI18n } from '@/hooks/useI18n'
import type { WellnessMetricKind } from '@/components/WellnessChip'

interface WellnessMetricTileProps {
  kind: WellnessMetricKind
  value: number | string
  band: RiskBand
  suffix?: string
}

/**
 * Static (non-interactive) display tile for one wellness metric — used on
 * the worker detail page (5 metrics) and the Departments page (3 aggregate
 * metrics) in place of the old DomainCard disease-domain selector, which is
 * Overview-only now. One separation method (border) at rest, per the
 * single-separation-method design rule — no active/selection state needed
 * since there's nothing to drill into here.
 */
export function WellnessMetricTile({ kind, value, band, suffix = '' }: WellnessMetricTileProps) {
  const { t } = useI18n()
  const color = RISK_COLORS[band]
  const label: Record<WellnessMetricKind, string> = {
    recovery: t.wellness.recoveryLabel,
    sleep: t.wellness.sleepLabel,
    met: t.wellness.metLabel,
    activity: t.wellness.activityLabel,
    stress: t.wellness.stressLabel,
  }

  return (
    <div className="min-w-0 flex-1 rounded-control border border-border bg-surface p-3.5 text-left">
      <span className="block truncate text-sm font-semibold text-ink-900">{label[kind]}</span>
      <div className="mt-2.5 flex items-baseline gap-1.5">
        <span className="font-display text-xl font-extrabold tabular-nums" style={{ color }}>
          {value}
          {suffix}
        </span>
      </div>
    </div>
  )
}
