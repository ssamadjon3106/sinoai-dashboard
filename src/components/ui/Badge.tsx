import type { ReactNode } from 'react'

type BadgeTone = 'neutral' | 'brand' | 'success' | 'warning' | 'danger'

const TONE_CLASSES: Record<BadgeTone, string> = {
  neutral: 'bg-surface-muted text-ink-700 border-border',
  brand: 'bg-brand-50 text-brand-700 border-brand-100',
  success: 'bg-risk-low-bg text-risk-low border-risk-low-border',
  warning: 'bg-risk-moderate-bg text-risk-moderate border-risk-moderate-border',
  danger: 'bg-risk-high-bg text-risk-high border-risk-high-border',
}

export function Badge({ tone = 'neutral', children, className = '' }: { tone?: BadgeTone; children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${TONE_CLASSES[tone]} ${className}`}
    >
      {children}
    </span>
  )
}
