import {
  ArrowRight,
  BarChart3,
  Check,
  ClipboardList,
  Compass,
  LifeBuoy,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'

interface EngagementModel {
  title: string
  description: string
  goodFor: string[]
  icon: LucideIcon
}

const models: EngagementModel[] = [
  {
    title: 'Project-Based Development',
    description: 'Complete development of a defined solution.',
    goodFor: [
      'A defined product, platform or integration with a clear finish line',
      'Teams that want delivery ownership from architecture through deployment',
      'Initiatives that need a working system, not just recommendations',
    ],
    icon: ClipboardList,
  },
  {
    title: 'AI / Technology Consulting',
    description: 'Architecture, strategy and technology guidance.',
    goodFor: [
      'Choosing an AI or data architecture before committing budget',
      'Reviewing an existing system, roadmap or vendor proposal',
      'Getting a build-ready plan your own team can execute',
    ],
    icon: Compass,
  },
  {
    title: 'Dedicated Engineering Team',
    description:
      'Specialized engineers working as an extension of the customer’s team.',
    goodFor: [
      'Long-running products that need sustained engineering capacity',
      'Adding AI, data or cloud specialists to an existing team',
      'Roadmaps that have outgrown the current team’s bandwidth',
    ],
    icon: Users,
  },
  {
    title: 'Data & Analytics Consulting',
    description: 'Data platforms, analytics and BI implementation.',
    goodFor: [
      'Consolidating fragmented sources into a governed data platform',
      'Standing up Power BI, Tableau or Qlik reporting people trust',
      'Defining each metric once and keeping it consistent everywhere',
    ],
    icon: BarChart3,
  },
  {
    title: 'Managed Technology Services',
    description: 'Ongoing application, website, cloud and technology support.',
    goodFor: [
      'Platforms that need monitoring, patching and steady improvement',
      'Teams that want to hand off operations and keep building',
      'Keeping websites and applications secure and current after launch',
    ],
    icon: LifeBuoy,
  },
]

/**
 * Five ways to engage, each with the situations it fits best, plus one
 * shared consultation CTA.
 */
export function EngagementModels({
  variant = 'default',
}: {
  variant?: 'default' | 'alt' | 'deep'
}) {
  return (
    <Section id="engagement-models" variant={variant}>
      <SectionHeading
        eyebrow="Engagement Models"
        title="Ways to Work With Us"
        lead="Different problems call for different shapes of engagement. Start with the one that fits — the model can change as the work does."
      />

      <ul className="grid list-none grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {models.map(({ title, description, goodFor, icon: Icon }, i) => (
          <Reveal as="li" key={title} delay={80 * (i % 3)}>
            <Card interactive className="flex h-full flex-col gap-4 p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-card bg-accent/10 text-accent">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <h3 className="text-h4 text-ink">{title}</h3>
              <p className="text-small text-ink-muted">{description}</p>
              <div className="mt-1 flex flex-col gap-2 border-t border-line pt-4">
                <p className="text-caption font-semibold uppercase tracking-wider text-ink-subtle">
                  Good for
                </p>
                <ul className="flex list-none flex-col gap-2">
                  {goodFor.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-small text-ink-muted">
                      <Check
                        aria-hidden="true"
                        className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </Reveal>
        ))}
      </ul>

      <Reveal className="mt-12 flex flex-col items-center gap-4 text-center">
        <p className="max-w-xl text-body text-ink-muted">
          Not sure which model fits? A short conversation about your problem is the
          fastest way to find out.
        </p>
        <Button
          variant="primary"
          size="lg"
          to="/contact"
          eventName="consultation_cta_click"
          eventParams={{ cta: 'book_consultation', location: 'engagement_models' }}
          iconRight={<ArrowRight aria-hidden="true" className="h-4 w-4" />}
        >
          Book a consultation
        </Button>
      </Reveal>
    </Section>
  )
}
