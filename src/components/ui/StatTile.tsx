import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

interface StatTileProps {
  icon: LucideIcon
  label: string
  value: ReactNode
  hint?: string
  accent?: string
}

export function StatTile({ icon: Icon, label, value, hint, accent = '#17977E' }: StatTileProps) {
  return (
    <div className="rounded-card border border-border bg-surface p-4 shadow-card">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full" style={{ backgroundColor: `${accent}1a`, color: accent }}>
          <Icon className="h-4 w-4" strokeWidth={2.25} />
        </span>
        <span className="text-xs font-semibold uppercase tracking-wide text-ink-400">{label}</span>
      </div>
      <div className="mt-2 font-display text-2xl font-extrabold tabular-nums text-ink-900">{value}</div>
      {hint && <p className="mt-0.5 text-xs text-ink-400">{hint}</p>}
    </div>
  )
}
