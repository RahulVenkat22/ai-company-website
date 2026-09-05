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
    title: 'Project-based development',
    description: 'Complete development of a defined solution.',
    goodFor: [
      'A defined product, platform or integration with a clear finish line',
      'Teams that want delivery ownership from architecture through deployment',
      'Initiatives that need a working system, not just recommendations',
    ],
    icon: ClipboardList,
  },
  {
    title: 'Dedicated engineering team',
    description: 'Specialized engineers working as an extension of your team.',
    goodFor: [
      'Long-running products that need sustained engineering capacity',
      'Adding AI, data or cloud specialists to an existing team',
      'Roadmaps that have outgrown the current team’s bandwidth',
    ],
    icon: Users,
  },
  {
    title: 'AI and technology consulting',
    description: 'Architecture, strategy and technology guidance.',
    goodFor: [
      'Choosing an AI or data architecture before committing budget',
      'Reviewing an existing system, roadmap or vendor proposal',
      'Getting a build-ready plan your own team can execute',
    ],
    icon: Compass,
  },
  {
    title: 'Data and analytics consulting',
    description: 'Data platforms, analytics and BI implementation.',
    goodFor: [
      'Consolidating fragmented sources into a governed data platform',
      'Standing up Power BI, Tableau or Qlik reporting people trust',
      'Defining each metric once and keeping it consistent everywhere',
    ],
    icon: BarChart3,
  },
  {
    title: 'Managed technology services',
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
 * Five ways to engage, laid out as a 2 + 3 grid (two lead models wide on
 * top, three beside each other below) so every cell is filled, plus one
 * shared contact action.
 */
export function EngagementModels({ variant = 'default' }: { variant?: 'default' | 'alt' | 'deep' }) {
  return (
    <Section id="engagement-models" variant={variant}>
      <SectionHeading
        title="Ways to work with us"
        lead="Different problems call for different shapes of engagement. Start with the one that fits; the model can change as the work does."
      />

      <ul className="grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {models.map(({ title, description, goodFor, icon: Icon }, i) => (
          <Reveal as="li" key={title} delay={70 * (i % 3)} className={i < 2 ? 'lg:col-span-3' : 'lg:col-span-2'}>
            <Card className="flex h-full flex-col gap-4 p-6 md:p-7">
              <span className="flex h-10 w-10 items-center justify-center rounded-btn bg-surface-3 text-ink">
                <Icon aria-hidden="true" className="h-[18px] w-[18px]" />
              </span>
              <h3 className="text-h4 text-ink">{title}</h3>
              <p className="text-small text-ink-muted">{description}</p>
              <div className="mt-1 flex flex-col gap-2.5 border-t border-line pt-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-subtle">Good for</p>
                <ul className="flex list-none flex-col gap-2">
                  {goodFor.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-small text-ink-muted">
                      <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </Reveal>
        ))}
      </ul>

      <Reveal className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xl text-body text-ink-muted">
          Not sure which model fits? A short conversation about your problem is the fastest
          way to find out.
        </p>
        <Button
          size="lg"
          to="/contact"
          eventName="consultation_cta_click"
          eventParams={{ cta: 'start_project', location: 'engagement_models' }}
          iconRight={<ArrowRight aria-hidden="true" />}
        >
          Start a project
        </Button>
      </Reveal>
    </Section>
  )
}
