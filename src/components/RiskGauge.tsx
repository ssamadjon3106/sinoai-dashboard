import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import type { RiskBand } from '@/types'
import { RISK_COLORS } from '@/lib/clinicalConfig'

interface RiskGaugeProps {
  /** 0-100. Ignored (renders a neutral track only) when `applicable` is false. */
  percent: number
  band: RiskBand
  applicable?: boolean
  size?: number
  strokeWidth?: number
  /** Percent cut points to mark on the ring, e.g. CANRISK's [21, 33]. */
  thresholds?: number[]
  topLabel?: string
  bottomLabel?: string
  notApplicableLabel?: string
}

/**
 * Signature clinical gauge: a rounded progress ring whose track carries small
 * tick marks at the domain's actual band cut points (e.g. CANRISK's 21/33),
 * so the gauge itself encodes where Low/Moderate/High begin rather than just
 * decorating the number.
 */
export function RiskGauge({
  percent,
  band,
  applicable = true,
  size = 220,
  strokeWidth = 16,
  thresholds = [],
  topLabel,
  bottomLabel,
  notApplicableLabel,
}: RiskGaugeProps) {
  const clamped = Math.max(0, Math.min(100, percent))
  const center = size / 2
  const radius = center - strokeWidth
  const circumference = 2 * Math.PI * radius
  const targetOffset = circumference * (1 - clamped / 100)

  const [replayKey, setReplayKey] = useState(0)
  const isFirstRender = useRef(true)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    setReplayKey((k) => k + 1)
  }, [clamped, band, applicable])

  const color = applicable ? RISK_COLORS[band] : '#B7C2BF'

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#EEF2F1"
          strokeWidth={strokeWidth}
        />
        {applicable && (
          <circle
            key={replayKey}
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            className="animate-gauge-sweep"
            style={
              {
                '--gauge-offset-from': circumference,
                '--gauge-offset-to': targetOffset,
              } as CSSProperties
            }
          />
        )}
        {applicable &&
          thresholds.map((t) => {
            const angle = (t / 100) * 360
            const tickOuter = radius + strokeWidth / 2 + 2
            const tickInner = radius + strokeWidth / 2 + 8
            return (
              <line
                key={t}
                x1={center}
                y1={center - tickInner}
                x2={center}
                y2={center - tickOuter}
                stroke="#8A9B96"
                strokeWidth={2}
                strokeLinecap="round"
                transform={`rotate(${angle} ${center} ${center})`}
              />
            )
          })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        {topLabel && (
          <span className="mb-1 whitespace-nowrap text-[10px] font-semibold uppercase tracking-wide text-ink-400">{topLabel}</span>
        )}
        {applicable ? (
          <div className="flex items-start leading-none font-display font-extrabold tabular-nums" style={{ color }}>
            <span style={{ fontSize: size * 0.2 }}>{Math.round(clamped)}</span>
            <span className="mt-1" style={{ fontSize: size * 0.08 }}>%</span>
          </div>
        ) : (
          <div className="font-display font-extrabold text-ink-300" style={{ fontSize: size * 0.18 }}>
            —
          </div>
        )}
        {applicable && bottomLabel && (
          <span className="mt-1 text-sm font-semibold" style={{ color }}>
            {bottomLabel}
          </span>
        )}
        {!applicable && notApplicableLabel && (
          <span className="mt-1 text-xs font-medium text-ink-400 leading-snug max-w-[85%]">{notApplicableLabel}</span>
        )}
      </div>
    </div>
  )
}
