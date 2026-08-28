import { createElement, type CSSProperties, type ReactNode } from 'react'
import { useReveal } from '@/lib/useReveal'

interface RevealProps {
  children: ReactNode
  /** Wrapper element tag, defaults to 'div'. */
  as?: keyof React.JSX.IntrinsicElements
  className?: string
  /** Stagger delay in ms. */
  delay?: number
  /** 'up' slides + fades (default); 'fade' fades only. */
  variant?: 'up' | 'fade'
  id?: string
}

/**
 * CSS scroll-reveal wrapper (IntersectionObserver + CSS transitions).
 * Respects prefers-reduced-motion via the global stylesheet.
 */
export function Reveal({
  children,
  as = 'div',
  className = '',
  delay = 0,
  variant = 'up',
  id,
}: RevealProps) {
  const { ref, visible } = useReveal()
  const style =
    delay > 0 ? ({ '--reveal-delay': `${delay}ms` } as CSSProperties) : undefined

  return createElement(
    as,
    {
      ref,
      id,
      style,
      className: `reveal ${variant === 'fade' ? 'reveal-fade' : ''} ${
        visible ? 'is-visible' : ''
      } ${className}`.trim(),
    },
    children,
  )
}
