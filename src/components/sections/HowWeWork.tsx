import { Section } from '@/components/ui/Section'
import ProcessShowcase from './ProcessShowcase'

/**
 * Delivery process section (prompt.md §26). The heading lives inside
 * ProcessShowcase's sticky intro column, so this wrapper only provides the
 * section band and anchor.
 */
export function HowWeWork({
  variant = 'alt',
}: {
  variant?: 'default' | 'alt' | 'deep'
}) {
  return (
    <Section id="how-we-work" variant={variant} ariaLabel="How we work">
      <ProcessShowcase />
    </Section>
  )
}
