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
import { Badge } from '@/components/ui/Badge'
import { Reveal } from '@/components/ui/Reveal'

type BadgeTone = 'neutral' | 'accent' | 'primary' | 'violet'

interface Solution {
  title: string
  description: string
  icon: LucideIcon
  tag: string
  tone: BadgeTone
}

const solutions: Solution[] = [
  {
    title: 'Automate repetitive work',
    description:
      'AI agents and intelligent workflows can help reduce manual operational effort. Typical targets include ticket triage, data entry, reconciliation and report preparation.',
    icon: Repeat,
    tag: 'AI Agents',
    tone: 'accent',
  },
  {
    title: 'Build enterprise knowledge assistants',
    description:
      'Use RAG and enterprise data to help teams find information faster. Assistants answer with citations drawn from policies, wikis, contracts and past tickets, with access control enforced.',
    icon: MessagesSquare,
    tag: 'RAG',
    tone: 'primary',
  },
  {
    title: 'Turn data into decisions',
    description:
      'Create analytics platforms, dashboards and reporting systems. We model your data, define trusted metrics and deliver dashboards your teams rely on daily.',
    icon: BarChart3,
    tag: 'Analytics',
    tone: 'violet',
  },
  {
    title: 'Build AI-powered applications',
    description:
      'Integrate AI directly into web and mobile applications. Streaming interfaces, model orchestration and evaluation are engineered in from the first release.',
    icon: AppWindow,
    tag: 'AI Engineering',
    tone: 'accent',
  },
  {
    title: 'Modernize applications',
    description:
      'Transform legacy systems into scalable modern applications. We migrate incrementally — strangler patterns, API layers and test harnesses keep the business running throughout.',
    icon: RefreshCw,
    tag: 'Modernization',
    tone: 'neutral',
  },
  {
    title: 'Build cloud platforms',
    description:
      'Create secure and scalable cloud-native infrastructure. Infrastructure as code, CI/CD and observability are part of the build, not afterthoughts.',
    icon: Cloud,
    tag: 'Cloud',
    tone: 'primary',
  },
  {
    title: 'Improve software quality',
    description:
      'Implement automated and continuous testing. Regression, API and UI test suites run in your pipeline on every change, catching defects before release.',
    icon: TestTube2,
    tag: 'QA Automation',
    tone: 'violet',
  },
  {
    title: 'Manage digital platforms',
    description:
      'Provide website maintenance, modernization, monitoring and security support. Patching, uptime monitoring and performance care keep platforms healthy long after launch.',
    icon: MonitorCog,
    tag: 'Managed Services',
    tone: 'neutral',
  },
]

/**
 * Business-outcome section: eight problem-to-solution cards mapping common
 * business needs to the capabilities that address them.
 */
export function WhatWeSolve({
  variant = 'alt',
}: {
  variant?: 'default' | 'alt' | 'deep'
}) {
  return (
    <Section id="what-we-solve" variant={variant}>
      <SectionHeading
        eyebrow="What We Solve"
        title="What Can We Build for Your Business?"
        lead="Start from the business problem, not the technology. These are the outcomes teams most often ask us to deliver — each one backed by a specific engineering capability."
      />

      <ul className="grid list-none grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {solutions.map(({ title, description, icon: Icon, tag, tone }, i) => (
          <Reveal as="li" key={title} delay={80 * (i % 4)}>
            <Card
              interactive
              className="flex h-full flex-col gap-4 p-6"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-card bg-primary/10 text-primary">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <h3 className="text-h4 text-ink">{title}</h3>
              <p className="text-small text-ink-muted">{description}</p>
              <span className="mt-auto pt-2">
                <Badge tone={tone}>{tag}</Badge>
              </span>
            </Card>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
