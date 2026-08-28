import { Fragment } from 'react'
import {
  Activity,
  ArrowRight,
  CircleCheck,
  ClipboardCheck,
  CodeXml,
  FlaskConical,
  RefreshCw,
  Rocket,
} from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

interface TestingSectionProps {
  variant?: 'default' | 'alt' | 'deep'
}

const services = [
  'Manual Testing',
  'Automated Testing',
  'Functional Testing',
  'Regression Testing',
  'API Testing',
  'Integration Testing',
  'End-to-End Testing',
  'Performance Testing',
  'UI Testing',
  'Test Automation',
  'AI-assisted testing',
  'Continuous testing',
]

interface LoopStep {
  label: string
  icon: typeof CodeXml
}

const loopSteps: LoopStep[] = [
  { label: 'Develop', icon: CodeXml },
  { label: 'Test', icon: FlaskConical },
  { label: 'Validate', icon: ClipboardCheck },
  { label: 'Deploy', icon: Rocket },
  { label: 'Monitor', icon: Activity },
]

/** Testing and quality engineering services with the continuous quality loop. */
export function TestingSection({ variant = 'default' }: TestingSectionProps) {
  return (
    <Section id="testing" variant={variant}>
      <SectionHeading
        eyebrow="Testing & Quality Engineering"
        title="Quality Engineered Into Every Release."
        lead="Testing is not a gate at the end of a project. We build it into the pipeline, so every change ships with evidence that it works — and keeps working."
      />

      <Reveal>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li
              key={service}
              className="flex items-center gap-2.5 rounded-btn border border-line bg-surface px-3.5 py-2.5 text-small text-ink-muted"
            >
              <CircleCheck size={16} className="shrink-0 text-accent" aria-hidden="true" />
              {service}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={120} className="mt-14">
        <div
          role="img"
          aria-label="Continuous quality loop: develop, test, validate, deploy and monitor, with monitoring feeding back into development."
        >
          {/* Desktop: horizontal stepper with an animated return edge */}
          <div className="hidden md:block" aria-hidden="true">
            <div className="flex items-stretch justify-between gap-2">
              {loopSteps.map((step, i) => (
                <Fragment key={step.label}>
                  <div className="flex min-w-0 flex-1 flex-col items-center gap-2.5 rounded-card border border-line bg-surface-2 px-3 py-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-btn bg-primary/10 text-primary">
                      <step.icon size={18} />
                    </span>
                    <span className="text-small font-semibold text-ink">
                      {step.label}
                    </span>
                  </div>
                  {i < loopSteps.length - 1 && (
                    <ArrowRight size={16} className="shrink-0 self-center text-ink-subtle" />
                  )}
                </Fragment>
              ))}
            </div>
            <div className="relative text-line-strong">
              <svg
                className="h-[56px] w-full"
                viewBox="0 0 1000 56"
                preserveAspectRatio="none"
                fill="none"
              >
                <path
                  d="M950 2 V34 H50 V8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                  className="animate-flow"
                />
                <path
                  d="M42 18 L50 6 L58 18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              <span className="absolute left-1/2 top-[34px] inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1 text-caption font-medium text-ink-muted">
                <RefreshCw size={12} className="text-accent" />
                Continuous loop
              </span>
            </div>
          </div>

          {/* Mobile: vertical step list with a loop-back row */}
          <ol className="md:hidden" aria-hidden="true">
            {loopSteps.map((step, i) => (
              <li key={step.label}>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-btn border border-line bg-surface-2 text-primary">
                    <step.icon size={18} />
                  </span>
                  <span className="text-small font-semibold text-ink">
                    {step.label}
                  </span>
                </div>
                {i < loopSteps.length - 1 && (
                  <span className="ml-5 block h-5 w-px bg-line-strong" />
                )}
              </li>
            ))}
            <li className="mt-4 flex items-center gap-2 text-caption text-ink-muted">
              <RefreshCw size={13} className="text-accent" />
              Back to develop — the loop never stops
            </li>
          </ol>
        </div>
        <p className="mt-5 max-w-2xl text-small text-ink-muted">
          Monitoring feeds directly back into development: what we observe in
          production shapes the next test cycle, so quality compounds release
          after release.
        </p>
      </Reveal>
    </Section>
  )
}
