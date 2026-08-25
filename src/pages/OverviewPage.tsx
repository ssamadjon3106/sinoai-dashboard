import { Link } from 'react-router-dom'
import { AlertTriangle, ArrowRight, CheckCircle2, Users } from 'lucide-react'
import { useI18n } from '@/hooks/useI18n'
import { useOverviewStats } from '@/hooks/useOverviewStats'
import { useUsers } from '@/hooks/useUsers'
import { PageHeader } from '@/components/PageHeader'
import { StatTile } from '@/components/ui/StatTile'
import { Card } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'
import { DomainBandBar } from '@/components/dashboard/DomainBandBar'
import { RiskChip } from '@/components/RiskChip'
import { DOMAIN_KEYS } from '@/types'
import { formatInitials } from '@/lib/format'

export function OverviewPage() {
  const { t } = useI18n()
  const { data: stats, loading } = useOverviewStats()
  const { data: attentionUsers } = useUsers({ riskBand: 'high' })

  return (
    <div className="h-full overflow-y-auto">
      <PageHeader title={t.overview.title} subtitle={t.overview.subtitle} />

      <div className="p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {loading || !stats ? (
            Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-[104px] rounded-card" />)
          ) : (
            <>
              <StatTile icon={Users} label={t.overview.totalEnrolled} value={stats.totalEnrolled} accent="#0F6E5C" />
              <StatTile
                icon={CheckCircle2}
                label={t.overview.normalUsers}
                value={stats.normalUsers}
                hint={t.overview.normalUsersHint}
                accent="#2E7D32"
              />
              <StatTile
                icon={AlertTriangle}
                label={t.overview.needsAttention}
                value={stats.needsAttention}
                hint={t.overview.needsAttentionHint}
                accent="#C62828"
              />
            </>
          )}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[1.3fr_1fr]">
          <Card>
            <h3 className="mb-4 text-sm font-bold text-ink-900">{t.overview.perDomainBreakdown}</h3>
            {loading || !stats ? (
              <div className="space-y-5">
                <Skeleton className="h-10" />
                <Skeleton className="h-10" />
                <Skeleton className="h-10" />
              </div>
            ) : (
              <div className="space-y-5">
                {DOMAIN_KEYS.map((domain) => (
                  <DomainBandBar key={domain} domain={domain} counts={stats.perDomain[domain]} />
                ))}
              </div>
            )}
          </Card>

          <Card padded={false}>
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h3 className="text-sm font-bold text-ink-900">{t.overview.needsAttention}</h3>
              <Link to="/" className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:underline">
                {t.nav.users}
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <ul className="max-h-80 overflow-y-auto">
              {(attentionUsers ?? []).slice(0, 8).map((patient) => (
                <li key={patient.id}>
                  <Link to={`/users/${patient.id}`} className="flex items-center gap-3 px-5 py-2.5 transition-colors hover:bg-surface-sunken">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                      {formatInitials(patient.firstName, patient.lastName)}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-sm font-medium text-ink-900">
                      {patient.firstName} {patient.lastName}
                    </span>
                    <div className="flex shrink-0 gap-1">
                      {DOMAIN_KEYS.filter((d) => patient.domains[d].band === 'high').map((d) => (
                        <RiskChip key={d} domain={d} band="high" percent={patient.domains[d].percent} applicable />
                      ))}
                    </div>
                  </Link>
                </li>
              ))}
              {attentionUsers?.length === 0 && <li className="px-5 py-6 text-center text-sm text-ink-400">—</li>}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}
