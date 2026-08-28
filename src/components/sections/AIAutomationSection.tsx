import {
  Activity,
  ArrowDown,
  ArrowRight,
  BarChart3,
  Cog,
  FileClock,
  FileSearch,
  FileText,
  FlaskConical,
  GitMerge,
  Mail,
  MessageSquare,
  Scale,
  Sparkles,
  TrendingUp,
  Workflow,
  type LucideIcon,
} from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'

interface TransformationStage {
  name: string
  descriptor: string
  icon: LucideIcon
  /** Card + icon styling: stages grow progressively more solid and accented. */
  cardClass: string
  tileClass: string
  nameClass: string
}

const stages: TransformationStage[] = [
  {
    name: 'Manual Process',
    descriptor: 'Repetitive, slow, error-prone',
    icon: FileClock,
    cardClass: 'border border-dashed border-line bg-transparent',
    tileClass: 'bg-surface-2 text-ink-subtle',
    nameClass: 'text-ink-subtle',
  },
  {
    name: 'AI Automation',
    descriptor: 'Models take on the routine steps',
    icon: Sparkles,
    cardClass: 'border border-line bg-surface',
    tileClass: 'bg-primary/10 text-primary',
    nameClass: 'text-ink-muted',
  },
  {
    name: 'Intelligent Workflow',
    descriptor: 'Systems coordinate work end to end',
    icon: Workflow,
    cardClass: 'border border-line-strong bg-surface-2',
    tileClass: 'bg-accent/10 text-accent',
    nameClass: 'text-ink',
  },
  {
    name: 'Business Outcome',
    descriptor: 'Faster cycles, people on higher-value work',
    icon: TrendingUp,
    cardClass: 'border border-primary/40 bg-primary/10 shadow-card',
    tileClass: 'bg-primary text-white',
    nameClass: 'text-ink',
  },
]

interface AutomationExample {
  title: string
  description: string
  icon: LucideIcon
}

const examples: AutomationExample[] = [
  {
    title: 'Document processing',
    description:
      'Extract, classify and route information from invoices, contracts and forms.',
    icon: FileText,
  },
  {
    title: 'Email automation',
    description:
      'Triage, draft and respond to routine email, with human review where it matters.',
    icon: Mail,
  },
  {
    title: 'Report generation',
    description:
      'Compile recurring operational and management reports directly from source data.',
    icon: BarChart3,
  },
  {
    title: 'Data extraction',
    description:
      'Turn unstructured text, PDFs and images into clean, structured records.',
    icon: FileSearch,
  },
  {
    title: 'Customer support',
    description:
      'Resolve common requests instantly and escalate complex cases with full context.',
    icon: MessageSquare,
  },
  {
    title: 'Workflow automation',
    description:
      'Connect approvals, handoffs and notifications into one automated flow.',
    icon: GitMerge,
  },
  {
    title: 'Business process automation',
    description:
      'Automate multi-step processes end to end, across teams and systems.',
    icon: Cog,
  },
  {
    title: 'AI-powered testing',
    description:
      'Generate, run and maintain test suites that adapt as your product changes.',
    icon: FlaskConical,
  },
  {
    title: 'Data monitoring',
    description:
      'Watch pipelines and metrics continuously and flag anomalies as they appear.',
    icon: Activity,
  },
  {
    title: 'Automated decision support',
    description:
      'Surface recommendations with the data and reasoning behind each one.',
    icon: Scale,
  },
]

interface AIAutomationSectionProps {
  variant?: 'default' | 'alt' | 'deep'
}

/**
 * AI Automation: transformation flow from manual process to business outcome,
 * plus a grid of concrete automation examples.
 */
export function AIAutomationSection({ variant = 'default' }: AIAutomationSectionProps) {
  return (
    <Section id="automation" variant={variant}>
      <SectionHeading
        eyebrow="AI Automation"
        title="Automate Work. Amplify People."
        lead="We automate the repetitive work that slows teams down — document handling, reporting, support, routine decisions — so your people spend their time on judgment, relationships and the problems software cannot solve."
      />

      {/* Transformation flow: progressively more solid and accented stages. */}
      <Reveal className="mb-14 md:mb-18">
        <div
          role="img"
          aria-label="Transformation path: a manual process becomes AI automation, then an intelligent workflow, then a measurable business outcome."
          className="flex flex-col items-stretch gap-2 md:flex-row md:items-center md:gap-3"
        >
          {stages.map((stage, i) => {
            const Icon = stage.icon
            return (
              <div
                key={stage.name}
                className="flex flex-1 flex-col items-stretch gap-2 md:contents"
              >
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    className="flex shrink-0 items-center justify-center text-ink-subtle"
                  >
                    <ArrowDown className="md:hidden" size={18} />
                    <ArrowRight className="hidden md:block" size={18} />
                  </span>
                )}
                <div
                  className={`flex flex-1 items-center gap-3 rounded-card px-4 py-4 md:flex-col md:items-start md:gap-3 md:px-5 md:py-5 ${stage.cardClass}`}
                >
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${stage.tileClass}`}
                  >
                    <Icon aria-hidden="true" size={18} />
                  </span>
                  <span className="flex min-w-0 flex-col gap-0.5">
                    <span className={`text-small font-semibold ${stage.nameClass}`}>
                      {stage.name}
                    </span>
                    <span className="text-caption text-ink-muted">
                      {stage.descriptor}
                    </span>
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </Reveal>

      {/* Automation examples */}
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {examples.map((example, i) => {
          const Icon = example.icon
          return (
            <Reveal as="li" key={example.title} delay={(i % 5) * 60} className="h-full">
              <Card interactive className="flex h-full flex-col gap-3 p-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Icon aria-hidden="true" size={18} />
                </span>
                <h3 className="text-small font-semibold text-ink">
                  {example.title}
                </h3>
                <p className="text-caption text-ink-muted">{example.description}</p>
              </Card>
            </Reveal>
          )
        })}
      </ul>
    </Section>
  )
}
