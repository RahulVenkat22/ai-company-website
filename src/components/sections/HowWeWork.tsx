import { lazy, Suspense } from 'react'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

const ProcessTimeline = lazy(() => import('./ProcessTimeline'))

/** Static mirror of the six steps rendered by ProcessTimeline (prompt.md §26). */
const fallbackSteps = [
  { number: '01', title: 'Discover', description: 'Understand the business problem.' },
  {
    number: '02',
    title: 'Analyze',
    description: 'Study data, systems, workflows and requirements.',
  },
  { number: '03', title: 'Architect', description: 'Design the right technical solution.' },
  { number: '04', title: 'Build', description: 'Develop, integrate and validate.' },
  {
    number: '05',
    title: 'Secure & Test',
    description: 'Validate reliability, security and performance.',
  },
  {
    number: '06',
    title: 'Deploy & Improve',
    description: 'Deploy, monitor and continuously optimize.',
  },
]

/** Minimal ordered list shown while the animated timeline chunk loads. */
function TimelineFallback() {
  return (
    <ol className="flex list-none flex-col gap-6 border-l border-line pl-6">
      {fallbackSteps.map(({ number, title, description }) => (
        <li key={number} className="flex flex-col gap-1">
          <h3 className="text-h4 text-ink">
            <span className="mr-2 font-semibold text-ink-subtle" aria-hidden="true">
              {number}
            </span>
            {title}
          </h3>
          <p className="text-small text-ink-muted">{description}</p>
        </li>
      ))}
    </ol>
  )
}

/**
 * Delivery process section (prompt.md §26). The animated timeline is
 * code-split via React.lazy; the fallback keeps all six steps readable so
 * content is never missing while the chunk loads.
 */
export function HowWeWork({
  variant = 'alt',
}: {
  variant?: 'default' | 'alt' | 'deep'
}) {
  return (
    <Section id="how-we-work" variant={variant}>
      <SectionHeading
        eyebrow="How We Work"
        title="From Business Challenge to Production."
        lead="A disciplined path from first conversation to a system running in production — with checkpoints for architecture, security and quality along the way, and no surprises at handover."
      />
      <Suspense fallback={<TimelineFallback />}>
        <ProcessTimeline />
      </Suspense>
    </Section>
  )
}
