import type { DomainBandCounts, DomainKey } from '@/types'
import { useI18n } from '@/hooks/useI18n'
import { DOMAIN_ACCENT_COLORS, RISK_COLORS } from '@/lib/clinicalConfig'

const NOT_APPLICABLE_COLOR = '#CBD6D3'
const GAP_DEGREES = 3
const SIZE = 132
const STROKE_WIDTH = 18

type BandKey = 'low' | 'moderate' | 'high' | 'na'

/**
 * Per-domain risk-band distribution as a donut ring — one per health domain
 * (diabetes/CVD/oncology) on the Overview page, replacing the earlier
 * horizontal bar. Colors reuse the app's existing status palette (same
 * green/orange/red/gray as RiskGauge and RiskChip) rather than a new one —
 * identity is never color-alone: the legend beside the ring always shows
 * every count as text, so the numbers are readable with the ring covered.
 */
export function DomainDonut({ domain, counts }: { domain: DomainKey; counts: DomainBandCounts }) {
  const { t } = useI18n()
  const total = counts.low + counts.moderate + counts.high + counts.notApplicable

  const raw: { key: BandKey; value: number; color: string; label: string }[] = [
    { key: 'low', value: counts.low, color: RISK_COLORS.low, label: t.riskBand.low },
    { key: 'moderate', value: counts.moderate, color: RISK_COLORS.moderate, label: t.riskBand.moderate },
    { key: 'high', value: counts.high, color: RISK_COLORS.high, label: t.riskBand.high },
    { key: 'na', value: counts.notApplicable, color: NOT_APPLICABLE_COLOR, label: t.detail.notApplicable },
  ]
  const segments = raw.filter((s) => s.value > 0)

  const center = SIZE / 2
  const radius = center - STROKE_WIDTH / 2
  const circumference = 2 * Math.PI * radius
  const gap = segments.length > 1 ? GAP_DEGREES : 0

  let cumulative = 0
  const arcs = segments.map((s) => {
    const sweep = total === 0 ? 0 : (s.value / total) * 360
    const rotation = cumulative
    cumulative += sweep
    const dash = Math.max((Math.max(sweep - gap, 0) / 360) * circumference, 0)
    return { ...s, rotation, dashArray: `${dash} ${circumference}` }
  })

  return (
    <div className="flex items-center gap-4">
      <div className="relative shrink-0" style={{ width: SIZE, height: SIZE }}>
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className="-rotate-90">
          <circle cx={center} cy={center} r={radius} fill="none" stroke="#EEF2F1" strokeWidth={STROKE_WIDTH} />
          {arcs.map((a) => (
            <circle
              key={a.key}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={a.color}
              strokeWidth={STROKE_WIDTH}
              strokeLinecap="round"
              strokeDasharray={a.dashArray}
              transform={`rotate(${a.rotation} ${center} ${center})`}
            >
              <title>{`${a.label}: ${a.value}`}</title>
            </circle>
          ))}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-2xl font-extrabold tabular-nums text-ink-900">{total}</span>
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <p className="mb-1.5 text-sm font-bold" style={{ color: DOMAIN_ACCENT_COLORS[domain] }}>
          {t.domain[domain]}
        </p>
        <div className="space-y-1">
          {raw.map((s) => (
            <div key={s.key} className="flex items-center gap-1.5 text-xs text-ink-600">
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: s.color }} />
              <span className="flex-1 truncate">{s.label}</span>
              <span className="font-semibold tabular-nums text-ink-900">{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
