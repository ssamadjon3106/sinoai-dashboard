import { useI18n } from '@/hooks/useI18n'

interface ReferenceRangeBarProps {
  label: string
  unit: string
  value: number
  min: number
  max: number
}

export function ReferenceRangeBar({ label, unit, value, min, max }: ReferenceRangeBarProps) {
  const { t } = useI18n()
  const span = max - min
  const scaleMin = min - span * 0.5
  const scaleMax = max + span * 0.5
  const pct = (v: number) => Math.max(0, Math.min(100, ((v - scaleMin) / (scaleMax - scaleMin)) * 100))
  const inRange = value >= min && value <= max
  const dotColor = inRange ? '#2E7D32' : '#F57C00'

  return (
    <div>
      <div className="flex items-baseline justify-between text-xs">
        <span className="font-medium text-ink-500">{label}</span>
        <span className="font-display font-bold tabular-nums" style={{ color: dotColor }}>
          {value}
          <span className="ml-0.5 text-[10px] font-medium text-ink-400">{unit}</span>
        </span>
      </div>
      <div className="relative mt-1.5 h-2 rounded-full bg-surface-muted">
        <div
          className="absolute inset-y-0 rounded-full bg-brand-100"
          style={{ left: `${pct(min)}%`, right: `${100 - pct(max)}%` }}
          title={`${t.detail.normalRange}: ${min}–${max} ${unit}`}
        />
        <div
          className="absolute top-1/2 h-3.5 w-1.5 -translate-y-1/2 -translate-x-1/2 rounded-full border-2 border-surface"
          style={{ left: `${pct(value)}%`, backgroundColor: dotColor }}
        />
      </div>
    </div>
  )
}
