import { ArrowRight } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { stories } from '@/data/stories'

/**
 * Technology stories preview: each card shows the problem-to-production arc
 * of one illustrative engagement pattern. Horizontal snap row on small
 * screens, three-column grid from lg.
 */
export function TechnologyStoriesSection({
  variant = 'default',
}: {
  variant?: 'default' | 'alt' | 'deep'
}) {
  return (
    <Section id="technology-stories" variant={variant}>
      <SectionHeading
        eyebrow="Technology Stories"
        title="How problems become systems"
        lead="Each story follows one engagement pattern from the first problem statement to a system running in production. All stories are illustrative — they show how we work, not past client projects."
      />

      <ul className="-mb-2 flex snap-x snap-mandatory list-none gap-4 overflow-x-auto pb-6 lg:mb-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:pb-0">
        {stories.map((story, i) => (
          <Reveal
            as="li"
            key={story.slug}
            delay={80 * (i % 3)}
            className="w-[min(20rem,85vw)] shrink-0 snap-start lg:w-auto"
          >
            <Card interactive as="article" className="flex h-full flex-col gap-4 p-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="primary">{story.category}</Badge>
                <Badge tone="neutral">Illustrative Technology Story</Badge>
              </div>

              <h3 className="text-h4 text-ink">{story.title}</h3>

              <p className="text-caption font-medium text-ink-subtle">
                {story.flow.map((phase, j) => (
                  <span key={phase}>
                    {j > 0 && (
                      <span aria-hidden="true" className="mx-1.5 text-accent">
                        →
                      </span>
                    )}
                    {phase}
                  </span>
                ))}
              </p>

              <p className="line-clamp-2 text-small text-ink-muted">{story.problem}</p>

              <span className="mt-auto pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  to="/technology-stories"
                  className="-ml-3.5"
                  iconRight={<ArrowRight aria-hidden="true" className="h-4 w-4" />}
                  ariaLabel={`Read the story: ${story.title}`}
                >
                  Read the story
                </Button>
              </span>
            </Card>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
