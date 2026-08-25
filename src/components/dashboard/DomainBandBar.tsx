import type { DomainBandCounts, DomainKey } from '@/types'
import { useI18n } from '@/hooks/useI18n'

export function DomainBandBar({ domain, counts }: { domain: DomainKey; counts: DomainBandCounts }) {
  const { t } = useI18n()
  const total = counts.low + counts.moderate + counts.high + counts.notApplicable
  const pct = (n: number) => (total === 0 ? 0 : (n / total) * 100)

  const segments: { key: string; value: number; color: string; label: string }[] = [
    { key: 'low', value: counts.low, color: '#2E7D32', label: t.riskBand.low },
    { key: 'moderate', value: counts.moderate, color: '#F57C00', label: t.riskBand.moderate },
    { key: 'high', value: counts.high, color: '#C62828', label: t.riskBand.high },
    { key: 'na', value: counts.notApplicable, color: '#CBD6D3', label: t.detail.notApplicable },
  ]

  return (
    <div>
      <div className="mb-1.5 flex items-center gap-2">
        <span className="text-sm font-semibold text-ink-900">{t.domain[domain]}</span>
        <span className="ml-auto text-xs text-ink-400">{total}</span>
      </div>
      <div className="flex h-3 overflow-hidden rounded-full bg-surface-muted">
        {segments.map(
          (s) =>
            s.value > 0 && (
              <div key={s.key} title={`${s.label}: ${s.value}`} style={{ width: `${pct(s.value)}%`, backgroundColor: s.color }} />
            ),
        )}
      </div>
      <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-ink-500">
        {segments.map((s) => (
          <span key={s.key} className="inline-flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: s.color }} />
            {s.label} {s.value}
          </span>
        ))}
      </div>
    </div>
  )
}
