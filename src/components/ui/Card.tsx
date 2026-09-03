import type { HTMLAttributes } from 'react'

type CardProps = HTMLAttributes<HTMLDivElement> & {
  padded?: boolean
  interactive?: boolean
}

export function Card({ className = '', padded = true, interactive = false, ...props }: CardProps) {
  return (
    <div
      className={[
        // Separation from the page background is border-only at rest — no
        // shadow, no background tint stacked on top of it. A shadow only
        // ever appears transiently on hover, for cards that are interactive.
        'rounded-card border border-border bg-surface',
        padded ? 'p-5' : '',
        interactive ? 'transition-shadow duration-200 hover:shadow-card-hover' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  )
}
