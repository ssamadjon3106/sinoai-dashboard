import { Link } from 'react-router-dom'
import { AlertTriangle, ArrowRight, CheckCircle2, Users } from 'lucide-react'
import { useI18n } from '@/hooks/useI18n'
import { useAuth } from '@/hooks/useAuth'
import { useOverviewStats } from '@/hooks/useOverviewStats'
import { useUsers } from '@/hooks/useUsers'
import { PageHeader } from '@/components/PageHeader'
import { StatTile } from '@/components/ui/StatTile'
import { Card } from '@/components/ui/Card'
import { Skeleton } from '@/components/ui/Skeleton'
import { DomainDonutCard } from '@/components/dashboard/DomainDonutCard'
import { RiskChip } from '@/components/RiskChip'
import { DOMAIN_KEYS } from '@/types'
import { formatInitials } from '@/lib/format'

export function OverviewPage() {
  const { t } = useI18n()
  const { clinician } = useAuth()
  const { data: stats, loading } = useOverviewStats()
  const { data: attentionUsers } = useUsers({ riskBand: 'high' })

  const percentOf = (n: number) => (stats && stats.totalEnrolled > 0 ? Math.round((n / stats.totalEnrolled) * 100) : 0)
  const healthScore = stats ? percentOf(stats.normalUsers) : undefined

  return (
    <div className="h-full overflow-y-auto">
      <PageHeader title={t.overview.title} subtitle={t.overview.subtitle} />

      <div className="space-y-6 p-6">
        <div className="animate-fade-up relative overflow-hidden rounded-card bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 p-6 text-white sm:p-8">
          <span className="pointer-events-none absolute -right-12 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" aria-hidden />
          <span className="pointer-events-none absolute -bottom-20 left-1/3 h-52 w-52 rounded-full bg-white/5 blur-3xl" aria-hidden />
          <div className="relative flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-md">
              {clinician && (
                <p className="text-sm font-medium text-brand-100">
                  {t.overview.heroGreeting} {clinician.name}
                </p>
              )}
              <h2 className="mt-1 font-display text-2xl font-extrabold sm:text-3xl">{t.overview.heroTagline}</h2>
              <p className="mt-2 text-sm leading-relaxed text-brand-100/90">{t.overview.subtitle}</p>
            </div>
            {healthScore !== undefined && (
              <div className="flex items-center gap-4 rounded-2xl bg-white/10 px-6 py-4 backdrop-blur-sm">
                <span className="font-display text-4xl font-extrabold tabular-nums sm:text-5xl">{healthScore}%</span>
                <span className="max-w-[7rem] text-xs font-semibold uppercase leading-tight tracking-wide text-brand-100">
                  {t.overview.normalUsers}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {loading || !stats ? (
            Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-[112px] rounded-card" />)
          ) : (
            <>
              <StatTile icon={Users} label={t.overview.totalEnrolled} value={stats.totalEnrolled} accent="#0F6E5C" />
              <StatTile
                icon={CheckCircle2}
                label={t.overview.normalUsers}
                value={stats.normalUsers}
                hint={t.overview.normalUsersHint}
                accent="#2E7D32"
                percentOfTotal={percentOf(stats.normalUsers)}
              />
              <StatTile
                icon={AlertTriangle}
                label={t.overview.needsAttention}
                value={stats.needsAttention}
                hint={t.overview.needsAttentionHint}
                accent="#C62828"
                percentOfTotal={percentOf(stats.needsAttention)}
              />
            </>
          )}
        </div>

        <div>
          <h2 className="mb-3 text-sm font-bold text-ink-900">{t.overview.perDomainBreakdown}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {loading || !stats
              ? Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-[300px] rounded-card" />)
              : DOMAIN_KEYS.map((domain) => <DomainDonutCard key={domain} domain={domain} counts={stats.perDomain[domain]} />)}
          </div>
        </div>

        <Card padded={false}>
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h3 className="text-sm font-bold text-ink-900">{t.overview.needsAttention}</h3>
            <Link to="/" className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:underline">
              {t.nav.users}
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <ul className="max-h-96 divide-y divide-border overflow-y-auto">
            {(attentionUsers ?? []).slice(0, 8).map((patient) => (
              <li key={patient.id}>
                <Link
                  to={`/users/${patient.id}`}
                  className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-surface-sunken"
                >
                  {patient.photoUrl ? (
                    <img src={patient.photoUrl} alt="" className="h-9 w-9 shrink-0 rounded-full object-cover" />
                  ) : (
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                      {formatInitials(patient.firstName, patient.lastName)}
                    </span>
                  )}
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
  )
}
