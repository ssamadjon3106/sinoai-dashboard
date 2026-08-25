import { Bell, Globe, Shield, User } from 'lucide-react'
import { useI18n } from '@/hooks/useI18n'
import { useAuth } from '@/hooks/useAuth'
import { PageHeader } from '@/components/PageHeader'
import { Card } from '@/components/ui/Card'

export function SettingsPage() {
  const { t } = useI18n()
  const { clinician } = useAuth()

  const rows = [
    { icon: User, label: t.topbar.profile, value: clinician?.name ?? '—' },
    { icon: Globe, label: 'Language', value: 'UZ / RU / EN' },
    { icon: Bell, label: t.topbar.alerts, value: 'On' },
    { icon: Shield, label: 'Access role', value: t.topbar.clinician },
  ]

  return (
    <div className="h-full overflow-y-auto">
      <PageHeader title={t.settings.title} subtitle={t.settings.subtitle} />
      <div className="p-6">
        <Card padded={false} className="max-w-xl">
          <ul>
            {rows.map((row) => (
              <li key={row.label} className="flex items-center gap-3 border-b border-border px-5 py-3.5 last:border-0">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-muted text-ink-500">
                  <row.icon className="h-4 w-4" strokeWidth={2.25} />
                </span>
                <span className="flex-1 text-sm font-medium text-ink-700">{row.label}</span>
                <span className="text-sm text-ink-400">{row.value}</span>
              </li>
            ))}
          </ul>
        </Card>
        <p className="mt-4 text-sm text-ink-400">{t.settings.placeholder}</p>
      </div>
    </div>
  )
}
