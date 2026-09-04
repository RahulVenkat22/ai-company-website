import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  /** Adds hover lift + border highlight (CSS only). */
  interactive?: boolean
  /** Visual style: 'default' raised surface, 'outline' transparent. */
  variant?: 'default' | 'outline'
  as?: 'div' | 'article' | 'li'
}

/** Base card surface used across services, stories and case studies. */
export function Card({
  children,
  className = '',
  interactive = false,
  variant = 'default',
  as: Tag = 'div',
}: CardProps) {
  const surface =
    variant === 'outline'
      ? 'border border-line bg-transparent'
      : 'border border-line bg-surface'
  const hover = interactive
    ? 'card-lift hover:border-line-strong hover:shadow-card'
    : ''
  return (
    <Tag className={`rounded-card ${surface} ${hover} ${className}`.trim()}>
      {children}
    </Tag>
  )
}
