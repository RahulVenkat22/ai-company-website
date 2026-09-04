import { ArrowRight } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { StackedCards } from '@/components/ui/StackedCards'
import { caseStudies } from '@/data/caseStudies'

/** Illustrative imagery per featured project (stored in /public/images). */
const CARD_IMAGES = [
  '/images/band-tech.jpg',
  '/images/team-laptop.jpg',
  '/images/band-office.jpg',
]

/**
 * Case study previews as a stacking-cards scroller: each project card
 * sticks below the navbar and the next slides up over it (StackedCards),
 * giving the section a deliberate, one-story-at-a-time rhythm.
 */
export function CaseStudiesSection({
  variant = 'alt',
}: {
  variant?: 'default' | 'alt' | 'deep'
}) {
  const featured = caseStudies.slice(0, 3)

  return (
    <Section id="case-studies" variant={variant}>
      <SectionHeading
        eyebrow="Case Studies"
        title="Engineering work, end to end"
        lead="Challenge, architecture, implementation and outcome — written the way we actually deliver. These projects are illustrative: no client names, no invented numbers."
      />

      <StackedCards>
        {featured.map((study, i) => (
          <Card
            key={study.slug}
            as="article"
            className="overflow-hidden shadow-card-hover md:grid md:grid-cols-[2fr_3fr]"
          >
            <img
              src={CARD_IMAGES[i % CARD_IMAGES.length]}
              alt=""
              loading="lazy"
              className="h-44 w-full object-cover md:h-full"
            />
            <div className="flex flex-col gap-4 p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="accent">{study.category}</Badge>
                <Badge tone="neutral">Illustrative Project</Badge>
              </div>

              <h3 className="text-h3 text-ink">{study.title}</h3>

              <p className="line-clamp-3 text-body text-ink-muted">{study.challenge}</p>

              <ul className="flex list-none flex-wrap gap-1.5" aria-label="Key technologies">
                {study.technologies.slice(0, 4).map((tech) => (
                  <li
                    key={tech}
                    className="rounded border border-line bg-surface-2 px-2.5 py-0.5 font-mono text-caption text-ink-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              <span className="mt-auto pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  to="/case-studies"
                  className="-ml-3.5"
                  iconRight={<ArrowRight aria-hidden="true" className="h-4 w-4" />}
                  eventName="case_study_teaser_click"
                  eventParams={{ slug: study.slug }}
                >
                  Read the Case Study
                </Button>
              </span>
            </div>
          </Card>
        ))}
      </StackedCards>
    </Section>
  )
}
