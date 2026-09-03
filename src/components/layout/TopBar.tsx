import { useState } from 'react'
import { Bell, ChevronDown, LogOut, Search } from 'lucide-react'
import { useI18n } from '@/hooks/useI18n'
import { useFilters } from '@/hooks/useFilters'
import { useOverviewStats } from '@/hooks/useOverviewStats'
import { useAuth } from '@/hooks/useAuth'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { formatInitials } from '@/lib/format'

export function TopBar() {
  const { t } = useI18n()
  const { search, setSearch } = useFilters()
  const { data: stats } = useOverviewStats()
  const { clinician, signOut } = useAuth()

  const [alertsOpen, setAlertsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b border-border bg-surface px-5">
      <div className="flex items-center gap-2">
        <img src="/logo.svg" alt="" className="h-8 w-8 rounded-lg shadow-sm" />
        <span className="font-display text-base font-extrabold text-ink-900">{t.app.name}</span>
      </div>

      <div className="relative mx-auto w-full max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t.topbar.searchPlaceholder}
          className="w-full rounded-full border border-border bg-surface-muted py-2 pl-9 pr-3 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-500 focus:bg-surface"
        />
      </div>

      <div className="flex items-center gap-3">
        <LanguageSwitcher />

        <div className="relative">
          <button
            type="button"
            onClick={() => setAlertsOpen((v) => !v)}
            aria-expanded={alertsOpen}
            aria-label={t.topbar.alerts}
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-ink-500 hover:bg-surface-muted"
          >
            <Bell className="h-4.5 w-4.5" />
            {!!stats?.needsAttention && (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-risk-high px-1 text-[10px] font-bold text-white">
                {stats.needsAttention}
              </span>
            )}
          </button>
          {alertsOpen && (
            <div className="absolute right-0 top-11 z-20 w-64 rounded-control bg-surface p-3 shadow-card-hover">
              <p className="text-xs font-bold text-ink-700">{t.topbar.alerts}</p>
              {stats?.needsAttention ? (
                <p className="mt-1.5 text-xs text-ink-500">
                  {stats.needsAttention} {t.overview.needsAttention.toLowerCase()} — {t.overview.needsAttentionHint.toLowerCase()}
                </p>
              ) : (
                <p className="mt-1.5 text-xs text-ink-400">{t.topbar.noAlerts}</p>
              )}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileOpen((v) => !v)}
            aria-expanded={profileOpen}
            className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 hover:bg-surface-muted"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-xs font-bold text-white shadow-sm">
              {clinician ? formatInitials(clinician.name.split(' ')[0] ?? 'K', clinician.name.split(' ')[1] ?? 'L') : 'KL'}
            </span>
            <span className="hidden text-xs font-semibold text-ink-700 sm:inline">{clinician?.name ?? t.topbar.clinician}</span>
            <ChevronDown className="h-3.5 w-3.5 text-ink-400" />
          </button>
          {profileOpen && (
            <div className="absolute right-0 top-11 z-20 w-56 rounded-control bg-surface p-2 shadow-card-hover">
              <div className="px-2 py-1.5">
                <p className="text-sm font-semibold text-ink-900">{clinician?.name}</p>
                <p className="text-xs text-ink-400">{t.topbar.clinician}</p>
              </div>
              <button
                type="button"
                onClick={signOut}
                className="mt-1 flex w-full items-center gap-2 rounded-control px-2 py-1.5 text-left text-sm text-ink-700 hover:bg-surface-muted"
              >
                <LogOut className="h-3.5 w-3.5" />
                {t.topbar.signOut}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
