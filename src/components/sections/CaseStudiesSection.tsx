import { ArrowRight } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { caseStudies } from '@/data/caseStudies'

/**
 * Case study preview grid: the first three illustrative projects with
 * category, challenge teaser and technology chips, linking to the full
 * case studies page.
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
        title="Engineering Work, End to End."
        lead="Challenge, architecture, implementation and outcome — written the way we actually deliver. These projects are illustrative: no client names, no invented numbers."
      />

      <ul className="grid list-none grid-cols-1 gap-4 md:grid-cols-3 lg:gap-6">
        {featured.map((study, i) => (
          <Reveal as="li" key={study.slug} delay={80 * (i % 3)}>
            <Card interactive as="article" className="flex h-full flex-col gap-4 p-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="accent">{study.category}</Badge>
                <Badge tone="neutral">Illustrative Project</Badge>
              </div>

              <h3 className="text-h4 text-ink">{study.title}</h3>

              <p className="line-clamp-2 text-small text-ink-muted">{study.challenge}</p>

              <ul className="flex list-none flex-wrap gap-1.5" aria-label="Key technologies">
                {study.technologies.slice(0, 4).map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-line bg-surface-2 px-2.5 py-0.5 text-caption text-ink-muted"
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
                  ariaLabel={`View case study: ${study.title}`}
                >
                  View case study
                </Button>
              </span>
            </Card>
          </Reveal>
        ))}
      </ul>

      <Reveal className="mt-10 flex justify-center">
        <Button
          variant="secondary"
          to="/case-studies"
          eventName="cta_click"
          eventParams={{ cta: 'all_case_studies', location: 'case_studies' }}
          iconRight={<ArrowRight aria-hidden="true" className="h-4 w-4" />}
        >
          All case studies
        </Button>
      </Reveal>
    </Section>
  )
}
