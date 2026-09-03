import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Settings, Users } from 'lucide-react'
import { useI18n } from '@/hooks/useI18n'

export function Sidebar() {
  const { t } = useI18n()

  const items = [
    { to: '/overview', label: t.nav.overview, icon: LayoutDashboard, end: false },
    { to: '/', label: t.nav.users, icon: Users, end: true },
    { to: '/settings', label: t.nav.settings, icon: Settings, end: false },
  ]

  return (
    <nav className="flex w-56 shrink-0 flex-col gap-1 border-r border-border bg-surface px-3 py-4">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            [
              'group relative flex items-center gap-2.5 rounded-control px-3 py-2.5 text-sm font-semibold transition-all duration-200',
              isActive ? 'bg-brand-50 text-brand-700' : 'text-ink-500 hover:translate-x-0.5 hover:bg-surface-muted hover:text-ink-700',
            ].join(' ')
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span className="absolute inset-y-1.5 left-0 w-1 rounded-full bg-gradient-to-b from-brand-500 to-brand-700" aria-hidden />
              )}
              <span
                className={[
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors',
                  isActive ? 'bg-white text-brand-600 shadow-sm' : 'text-ink-400 group-hover:text-ink-600',
                ].join(' ')}
              >
                <item.icon className="h-4 w-4" strokeWidth={2.25} />
              </span>
              {item.label}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
