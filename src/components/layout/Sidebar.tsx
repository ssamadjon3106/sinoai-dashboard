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
              'flex items-center gap-2.5 rounded-control px-3 py-2 text-sm font-medium transition-colors',
              isActive ? 'bg-brand-50 text-brand-700' : 'text-ink-500 hover:bg-surface-muted hover:text-ink-700',
            ].join(' ')
          }
        >
          <item.icon className="h-4 w-4" strokeWidth={2.25} />
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}
