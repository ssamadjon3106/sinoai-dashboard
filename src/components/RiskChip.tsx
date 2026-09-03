import { Minus } from 'lucide-react'
import type { DomainKey, RiskBand } from '@/types'
import { useI18n } from '@/hooks/useI18n'

const TONE_CLASSES: Record<RiskBand, string> = {
  low: 'bg-risk-low-bg text-risk-low border-risk-low-border',
  moderate: 'bg-risk-moderate-bg text-risk-moderate border-risk-moderate-border',
  high: 'bg-risk-high-bg text-risk-high border-risk-high-border',
}

interface RiskChipProps {
  domain: DomainKey
  band: RiskBand
  percent: number
  applicable: boolean
  size?: 'sm' | 'md'
}

export function RiskChip({ domain, band, percent, applicable, size = 'sm' }: RiskChipProps) {
  const { t } = useI18n()
  const dims = size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5'
  const padding = size === 'sm' ? 'px-2 py-1 text-[11px]' : 'px-2.5 py-1.5 text-xs'

  if (!applicable) {
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full border border-border bg-surface-muted text-ink-400 ${padding} font-medium`}
        title={t.detail.notApplicable}
      >
        <Minus className={dims} strokeWidth={2.5} />
        <span>—</span>
      </span>
    )
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${TONE_CLASSES[band]} ${padding} font-bold tabular-nums`}
      title={`${t.domain[domain]}: ${t.riskBand[band]}`}
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current" aria-hidden />
      <span>{percent}%</span>
    </span>
  )
}
