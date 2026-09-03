import type { ReactNode } from 'react'

type BadgeTone = 'neutral' | 'brand' | 'success' | 'warning' | 'danger'

// Background color alone identifies the tone — no border stacked on top.
const TONE_CLASSES: Record<BadgeTone, string> = {
  neutral: 'bg-surface-muted text-ink-700',
  brand: 'bg-brand-50 text-brand-700',
  success: 'bg-risk-low-bg text-risk-low',
  warning: 'bg-risk-moderate-bg text-risk-moderate',
  danger: 'bg-risk-high-bg text-risk-high',
}

export function Badge({ tone = 'neutral', children, className = '' }: { tone?: BadgeTone; children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${TONE_CLASSES[tone]} ${className}`}
    >
      {children}
    </span>
  )
}
