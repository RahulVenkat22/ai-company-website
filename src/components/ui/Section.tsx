import type { ReactNode } from 'react'
import { Container } from './Container'

interface SectionProps {
  children: ReactNode
  id?: string
  /**
   * 'default' — page background; 'alt' — raised surface band;
   * 'deep' — near-black band for high-contrast feature sections.
   */
  variant?: 'default' | 'alt' | 'deep'
  className?: string
  /** Set to render children full-bleed (no inner Container). */
  bleed?: boolean
  /** Accessible label when the section has no visible heading. */
  ariaLabel?: string
}

const variantClasses: Record<NonNullable<SectionProps['variant']>, string> = {
  default: '',
  alt: 'bg-surface',
  deep: 'bg-surface-2/60 border-y border-line',
}

/** Standard page section with consistent vertical rhythm. */
export function Section({
  children,
  id,
  variant = 'default',
  className = '',
  bleed = false,
  ariaLabel,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`section-pad scroll-mt-20 ${variantClasses[variant]} ${className}`.trim()}
    >
      {bleed ? children : <Container>{children}</Container>}
    </section>
  )
}
