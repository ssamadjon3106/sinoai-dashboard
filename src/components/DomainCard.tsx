import type { DomainKey, DomainResult } from '@/types'
import { DOMAIN_ACCENT_COLORS, RISK_COLORS } from '@/lib/clinicalConfig'
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

  return (
    <button
      type="button"
      onClick={onActivate}
      aria-pressed={active}
      className={[
        // Selection is a border-color change only — no background tint and
        // no permanent shadow stacked on top of it. Hover adds a shadow
        // transiently, on either state.
        'group flex-1 min-w-0 rounded-control border-2 bg-surface p-3.5 text-left transition-shadow duration-200 hover:shadow-card',
        active ? '' : 'border-border',
      ].join(' ')}
      style={active ? { borderColor: accent } : undefined}
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
