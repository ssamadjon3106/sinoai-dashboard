import { useId } from 'react'
import type { DomainBandCounts, DomainKey } from '@/types'
import { useI18n } from '@/hooks/useI18n'
import { RISK_BG_COLORS, RISK_COLORS } from '@/lib/clinicalConfig'

const NOT_APPLICABLE_COLOR = '#CBD6D3'
const NOT_APPLICABLE_BG = '#F1F4F3'
const GAP_DEGREES = 4
const SIZE = 172
const STROKE_WIDTH = 20
const TRACK_COLOR = '#EEF2F1'

type BandKey = 'high' | 'moderate' | 'low' | 'na'

// Lighter tint used as the gradient's start stop, so even a ring that's a
// single solid color (e.g. every worker "low") still reads as a glossy
// sweep rather than a flat, plain-looking fill.
const GRADIENT_LIGHT: Record<BandKey, string> = {
  high: '#F3ADA9',
  moderate: '#FBCE8E',
  low: '#98DA9E',
  na: '#E4E9E7',
}

/**
 * Per-domain risk-band distribution as a donut ring, framed by
 * DomainDonutCard (icon + domain title) on the Overview page. Colors reuse
 * the app's existing status palette (same green/orange/red/gray as
 * RiskGauge and RiskChip) — identity is never color-alone: every segment's
 * count is also shown as a labeled chip below the ring. Each arc is a
 * gradient sweep with a soft drop shadow (Apple-Health-ring style) rather
 * than a flat fill, so the ring still reads as a deliberate chart even when
 * one band accounts for the whole thing.
 */
export function DomainDonut({ domain: _domain, counts }: { domain: DomainKey; counts: DomainBandCounts }) {
  const { t } = useI18n()
  const uid = useId()
  const total = counts.low + counts.moderate + counts.high + counts.notApplicable
  const atRiskCount = counts.moderate + counts.high

  const raw: { key: BandKey; value: number; color: string; bg: string; label: string }[] = [
    { key: 'high', value: counts.high, color: RISK_COLORS.high, bg: RISK_BG_COLORS.high, label: t.riskBand.high },
    { key: 'moderate', value: counts.moderate, color: RISK_COLORS.moderate, bg: RISK_BG_COLORS.moderate, label: t.riskBand.moderate },
    { key: 'low', value: counts.low, color: RISK_COLORS.low, bg: RISK_BG_COLORS.low, label: t.riskBand.low },
    { key: 'na', value: counts.notApplicable, color: NOT_APPLICABLE_COLOR, bg: NOT_APPLICABLE_BG, label: t.detail.notApplicable },
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
    <div className="flex flex-col items-center">
      <div className="relative shrink-0" style={{ width: SIZE, height: SIZE }}>
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className="-rotate-90">
          <defs>
            {arcs.map((a) => (
              <linearGradient key={a.key} id={`donut-${uid}-${a.key}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={GRADIENT_LIGHT[a.key]} />
                <stop offset="100%" stopColor={a.color} />
              </linearGradient>
            ))}
            <filter id={`donut-shadow-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="1.5" stdDeviation="2.5" floodColor="#10231F" floodOpacity="0.22" />
            </filter>
          </defs>
          <circle cx={center} cy={center} r={radius} fill="none" stroke={TRACK_COLOR} strokeWidth={STROKE_WIDTH} />
          {arcs.map((a) => (
            <circle
              key={a.key}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={`url(#donut-${uid}-${a.key})`}
              strokeWidth={STROKE_WIDTH}
              strokeLinecap="round"
              strokeDasharray={a.dashArray}
              transform={`rotate(${a.rotation} ${center} ${center})`}
              filter={`url(#donut-shadow-${uid})`}
            >
              <title>{`${a.label}: ${a.value}`}</title>
            </circle>
          ))}
        </svg>
        <div className="absolute inset-[20%] rounded-full bg-surface shadow-[inset_0_1px_4px_rgba(16,35,31,0.08)]" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-3xl font-extrabold tabular-nums text-ink-900">{total}</span>
          {atRiskCount > 0 ? (
            <span
              className="mt-0.5 text-[11px] font-bold tabular-nums"
              style={{ color: counts.high > 0 ? RISK_COLORS.high : RISK_COLORS.moderate }}
            >
              {atRiskCount} {t.overview.atRisk}
            </span>
          ) : (
            <span className="mt-0.5 text-[11px] font-semibold text-ink-400">{t.riskBand.low}</span>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-1.5">
        {raw.map((s) => (
          <span
            key={s.key}
            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold"
            style={{ backgroundColor: s.bg, color: s.color }}
          >
            {s.label}
            <span className="tabular-nums">{s.value}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
