import {
  AppWindow,
  BarChart3,
  Cloud,
  MessagesSquare,
  MonitorCog,
  RefreshCw,
  Repeat,
  TestTube2,
  type LucideIcon,
} from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { StackedCards } from '@/components/ui/StackedCards'

interface Solution {
  title: string
  description: string
  icon: LucideIcon
  tag: string
}

const solutions: Solution[] = [
  {
    title: 'Automate repetitive work',
    description:
      'AI agents and intelligent workflows reduce manual operational effort: ticket triage, data entry, reconciliation and report preparation.',
    icon: Repeat,
    tag: 'AI agents',
  },
  {
    title: 'Build enterprise knowledge assistants',
    description:
      'RAG over your own documents, so teams get cited answers drawn from policies, wikis, contracts and past tickets, with access control enforced.',
    icon: MessagesSquare,
    tag: 'RAG',
  },
  {
    title: 'Turn data into decisions',
    description:
      'Analytics platforms, trusted metric definitions and the dashboards your teams rely on daily.',
    icon: BarChart3,
    tag: 'Analytics',
  },
  {
    title: 'Build AI-powered applications',
    description:
      'AI integrated directly into web and mobile products. Streaming interfaces, model orchestration and evaluation are engineered in from the first release.',
    icon: AppWindow,
    tag: 'AI engineering',
  },
  {
    title: 'Modernize applications',
    description:
      'Legacy systems migrated incrementally: strangler patterns, API layers and test harnesses keep the business running throughout.',
    icon: RefreshCw,
    tag: 'Modernization',
  },
  {
    title: 'Build cloud platforms',
    description:
      'Secure, scalable cloud-native infrastructure. Infrastructure as code, CI/CD and observability are part of the build, not afterthoughts.',
    icon: Cloud,
    tag: 'Cloud',
  },
  {
    title: 'Improve software quality',
    description:
      'Regression, API and UI test suites that run in your pipeline on every change and catch defects before release.',
    icon: TestTube2,
    tag: 'QA automation',
  },
  {
    title: 'Manage digital platforms',
    description:
      'Maintenance, monitoring, patching and performance care that keep platforms healthy long after launch.',
    icon: MonitorCog,
    tag: 'Managed services',
  },
]

/** Two outcomes per stacking panel, each panel with its own photograph. */
const PANEL_IMAGES = [
  '/images/expertise/ai-automation.jpg',
  '/images/expertise/decision-support.jpg',
  '/images/expertise/enterprise-ai.jpg',
  '/images/expertise/ai-workflows.jpg',
]
const pairs: Solution[][] = []
for (let i = 0; i < solutions.length; i += 2) pairs.push(solutions.slice(i, i + 2))

/**
 * Business-outcome section as stacking panels: each panel (a photograph and
 * two outcomes) sticks below the navbar while the next slides up over it,
 * so the reader meets the outcomes two at a time instead of scanning a grid
 * of eight equal cards.
 */
export function WhatWeSolve({ variant = 'default' }: { variant?: 'default' | 'alt' | 'deep' }) {
  return (
    <Section id="what-we-solve" variant={variant}>
      <SectionHeading
        title="What can we build for your business?"
        lead="Start from the business problem, not the technology. These are the outcomes teams most often ask us to deliver."
      />

      <StackedCards top={6}>
        {pairs.map((pair, p) => (
          <Card
            key={pair[0].title}
            className="grid overflow-hidden shadow-card md:grid-cols-[2fr_3fr]"
          >
            <div className="relative min-h-44 md:min-h-full">
              <img
                src={PANEL_IMAGES[p]}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-scene/60 to-scene/10 md:bg-gradient-to-r" aria-hidden="true" />
            </div>
            <div className="grid gap-x-10 gap-y-8 p-7 sm:grid-cols-2 md:p-9">
              {pair.map(({ title, description, icon: Icon, tag }) => (
                <div key={title} className="flex flex-col gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-btn bg-surface-3 text-ink">
                    <Icon aria-hidden="true" className="h-[18px] w-[18px]" />
                  </span>
                  <h3 className="text-h4 text-ink">{title}</h3>
                  <p className="text-small text-ink-muted">{description}</p>
                  <p className="mt-auto pt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-primary">
                    {tag}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </StackedCards>
    </Section>
  )
}
