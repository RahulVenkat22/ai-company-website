import {
  Activity,
  ArrowDown,
  Boxes,
  Brain,
  CalendarClock,
  ChevronRight,
  Compass,
  Database,
  FlaskConical,
  Gauge,
  Layers,
  LineChart,
  Network,
  Rocket,
  SlidersHorizontal,
  Sparkles,
  Tags,
  TrendingUp,
  Workflow,
  type LucideIcon,
} from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'

type SectionVariant = 'default' | 'alt' | 'deep'

interface MachineLearningSectionProps {
  variant?: SectionVariant
}

interface MlService {
  icon: LucideIcon
  name: string
  description: string
}

const services: MlService[] = [
  {
    icon: Brain,
    name: 'Machine Learning',
    description: 'Supervised and unsupervised models built around your data and decisions.',
  },
  {
    icon: Network,
    name: 'Deep Learning',
    description: 'Neural networks for language, vision and complex signal problems.',
  },
  {
    icon: TrendingUp,
    name: 'Predictive Analytics',
    description: 'Anticipate outcomes instead of reporting them after the fact.',
  },
  {
    icon: Tags,
    name: 'Classification',
    description: 'Label risk, intent, churn and quality automatically and consistently.',
  },
  {
    icon: LineChart,
    name: 'Regression',
    description: 'Estimate continuous values — demand, price, duration, cost.',
  },
  {
    icon: Boxes,
    name: 'Clustering',
    description: 'Surface natural segments in customers, products and behavior.',
  },
  {
    icon: CalendarClock,
    name: 'Forecasting',
    description: 'Time-series models for demand, capacity and financial planning.',
  },
  {
    icon: Sparkles,
    name: 'Recommendation Systems',
    description: 'Personalized ranking and relevance that improve with every interaction.',
  },
  {
    icon: SlidersHorizontal,
    name: 'Feature Engineering',
    description: 'Turn raw signals into model-ready, well-documented features.',
  },
  {
    icon: Gauge,
    name: 'Model Evaluation',
    description: 'Rigorous validation, bias checks and honest performance baselines.',
  },
  {
    icon: Workflow,
    name: 'MLOps',
    description: 'Versioned, reproducible pipelines from experiment to production.',
  },
  {
    icon: Compass,
    name: 'Data Science Consulting',
    description: 'Pragmatic guidance on where models create value — and where they do not.',
  },
]

interface LifecycleStep {
  icon: LucideIcon
  label: string
}

const lifecycle: LifecycleStep[] = [
  { icon: Database, label: 'Data' },
  { icon: Layers, label: 'Features' },
  { icon: FlaskConical, label: 'Model' },
  { icon: Gauge, label: 'Evaluation' },
  { icon: Rocket, label: 'Deployment' },
  { icon: Activity, label: 'Monitoring' },
]

/**
 * Machine Learning & Data Science section (prompt.md §16): services grid,
 * model lifecycle stepper, and multidisciplinary team positioning.
 */
export function MachineLearningSection({ variant = 'default' }: MachineLearningSectionProps) {
  return (
    <Section id="machine-learning" variant={variant}>
      <SectionHeading
        eyebrow="Machine Learning & Data Science"
        title="Turn Data Into Predictive Intelligence."
        lead="We design, train and operate models that move decisions from hindsight to foresight — engineered for production from day one, not left behind in a notebook."
      />

      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {services.map((service, i) => (
          <Reveal as="li" key={service.name} delay={(i % 3) * 80} className="h-full">
            <Card interactive className="flex h-full items-start gap-4 p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-btn bg-primary/10 text-primary">
                <service.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <h3 className="text-body font-semibold text-ink">{service.name}</h3>
                <p className="mt-1 text-small text-ink-muted">{service.description}</p>
              </span>
            </Card>
          </Reveal>
        ))}
      </ul>

      <Reveal className="mt-12 md:mt-16">
        <div className="rounded-card border border-line bg-surface-2/60 p-6 md:p-8">
          <h3 className="text-h4 text-ink">Model lifecycle</h3>
          <p className="mt-1 text-small text-ink-muted">
            Every engagement follows the same disciplined loop — models are monitored and retrained, not shipped and forgotten.
          </p>
          <ol className="mt-6 flex flex-col md:flex-row md:items-stretch">
            {lifecycle.map((step, i) => (
              <li
                key={step.label}
                className="flex flex-col items-center md:flex-1 md:flex-row"
              >
                <div className="flex w-full items-center gap-3 rounded-card border border-line bg-surface px-4 py-3 md:flex-1 md:flex-col md:gap-2 md:px-3 md:py-4 md:text-center">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-btn bg-accent/10 text-accent">
                    <step.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-small font-semibold text-ink">{step.label}</span>
                </div>
                {i < lifecycle.length - 1 && (
                  <>
                    <ArrowDown
                      className="my-1.5 h-4 w-4 shrink-0 text-ink-subtle md:hidden"
                      aria-hidden="true"
                    />
                    <ChevronRight
                      className="mx-1 hidden h-4 w-4 shrink-0 text-ink-subtle md:block"
                      aria-hidden="true"
                    />
                  </>
                )}
              </li>
            ))}
          </ol>
        </div>
      </Reveal>

      <Reveal delay={120} className="mt-8">
        <div className="flex flex-col items-center gap-3 rounded-card border border-line bg-surface p-6 text-center md:flex-row md:justify-center md:gap-5">
          <p className="text-caption font-semibold uppercase tracking-[0.14em] text-ink-subtle">
            One multidisciplinary team
          </p>
          <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-body-lg font-semibold">
            <span className="text-primary">Data Scientists</span>
            <span className="text-ink-subtle">+</span>
            <span className="text-accent">ML Engineers</span>
            <span className="text-ink-subtle">+</span>
            <span className="text-violet-acc">AI Engineers</span>
          </p>
        </div>
      </Reveal>
    </Section>
  )
}
