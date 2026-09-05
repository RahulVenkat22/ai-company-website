import type { ReactNode } from 'react'
import { Container } from './Container'
import { sectionVariantClasses, type SectionVariant } from './sectionVariants'

interface SectionProps {
  children: ReactNode
  id?: string
  /**
   * 'default' (page background; 'alt') raised surface band;
   * 'deep': near-black band for high-contrast feature sections.
   */
  variant?: SectionVariant
  className?: string
  /** Set to render children full-bleed (no inner Container). */
  bleed?: boolean
  /** Accessible label when the section has no visible heading. */
  ariaLabel?: string
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
      className={`section-pad scroll-mt-20 ${sectionVariantClasses[variant]} ${className}`.trim()}
    >
      {bleed ? children : <Container>{children}</Container>}
    </section>
  )
}
