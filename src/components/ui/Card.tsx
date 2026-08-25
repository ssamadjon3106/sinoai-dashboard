import type { HTMLAttributes } from 'react'

type CardProps = HTMLAttributes<HTMLDivElement> & {
  padded?: boolean
  interactive?: boolean
}

export function Card({ className = '', padded = true, interactive = false, ...props }: CardProps) {
  return (
    <div
      className={[
        'rounded-card border border-border bg-surface shadow-card',
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
