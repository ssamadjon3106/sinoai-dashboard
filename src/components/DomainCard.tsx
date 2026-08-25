import type { DomainKey, DomainResult } from '@/types'
import { DOMAIN_ACCENT_BG_COLORS, DOMAIN_ACCENT_COLORS, RISK_COLORS } from '@/lib/clinicalConfig'
import { useI18n } from '@/hooks/useI18n'

interface DomainCardProps {
  domain: DomainKey
  result: DomainResult
  active: boolean
  onActivate: () => void
}

export function DomainCard({ domain, result, active, onActivate }: DomainCardProps) {
  const { t } = useI18n()
  const accent = DOMAIN_ACCENT_COLORS[domain]
  const accentBg = DOMAIN_ACCENT_BG_COLORS[domain]

  return (
    <button
      type="button"
      onClick={onActivate}
      aria-pressed={active}
      className={[
        'group flex-1 min-w-0 rounded-control border p-3.5 text-left transition-all duration-200',
        active
          ? 'border-transparent shadow-card-hover -translate-y-0.5'
          : 'border-border bg-surface hover:-translate-y-0.5 hover:shadow-card',
      ].join(' ')}
      style={active ? { backgroundColor: accentBg, boxShadow: `0 0 0 1.5px ${accent}` } : undefined}
    >
      <div className="min-w-0">
        <span className="block truncate text-sm font-semibold text-ink-900">{t.domain[domain]}</span>
      </div>
      <div className="mt-2.5 flex items-baseline gap-1.5">
        {result.applicable ? (
          <>
            <span className="font-display text-xl font-extrabold tabular-nums" style={{ color: RISK_COLORS[result.band] }}>
              {result.percent}%
            </span>
            <span className="text-xs font-medium text-ink-500">{t.riskBand[result.band]}</span>
          </>
        ) : (
          <span className="text-xs font-medium text-ink-400">{t.detail.notApplicable}</span>
        )}
      </div>
    </button>
  )
}
