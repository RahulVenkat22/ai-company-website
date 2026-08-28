import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Cloud,
  Database,
  LineChart,
  MonitorCog,
  Network,
  ShieldCheck,
  Sparkles,
  SquareTerminal,
  TestTubes,
  Workflow,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Reveal } from '@/components/ui/Reveal'

interface ServiceGroup {
  tier: string
  tierTone: 'accent' | 'primary' | 'neutral'
  title: string
  description: string
  to: string
  items: { icon: typeof BrainCircuit; label: string; blurb: string }[]
}

/**
 * Services overview organized by the capability hierarchy in prompt.md §2:
 * AI first, Data second, Cloud & Engineering supporting.
 */
const groups: ServiceGroup[] = [
  {
    tier: 'Primary — AI & Agentic AI',
    tierTone: 'accent',
    title: 'AI & Generative AI',
    description:
      'Production AI systems that reason, retrieve and act — engineered for real business workflows, not demonstrations.',
    to: '/ai-solutions',
    items: [
      {
        icon: BrainCircuit,
        label: 'AI Agents & Agentic AI',
        blurb: 'Goal-driven agents that plan, use tools and complete work.',
      },
      {
        icon: Database,
        label: 'RAG & Enterprise AI',
        blurb: 'Assistants grounded in your business knowledge, with citations.',
      },
      {
        icon: Sparkles,
        label: 'Generative AI Applications',
        blurb: 'AI assistants, document intelligence and decision support.',
      },
      {
        icon: Workflow,
        label: 'AI Automation',
        blurb: 'Intelligent workflows that reduce manual operational effort.',
      },
      {
        icon: Network,
        label: 'AI Solution Architecture',
        blurb: 'From AI idea to secure, monitored production architecture.',
      },
    ],
  },
  {
    tier: 'Data & Intelligence',
    tierTone: 'primary',
    title: 'Data, ML & Analytics',
    description:
      'Data platforms, machine learning and business intelligence that turn fragmented data into decisions.',
    to: '/data-analytics',
    items: [
      {
        icon: LineChart,
        label: 'Machine Learning & Data Science',
        blurb: 'Predictive models, forecasting and recommendation systems.',
      },
      {
        icon: Database,
        label: 'Data Engineering & Warehousing',
        blurb: 'Pipelines, ETL/ELT, quality and governance done properly.',
      },
      {
        icon: BarChart3,
        label: 'Business Intelligence',
        blurb: 'Power BI, Tableau, Qlik and Looker dashboards and reporting.',
      },
    ],
  },
  {
    tier: 'Cloud & Engineering',
    tierTone: 'neutral',
    title: 'Cloud, Software & Quality',
    description:
      'Secure cloud foundations, modern applications and engineered quality — across AWS, Azure and Google Cloud.',
    to: '/cloud',
    items: [
      {
        icon: Cloud,
        label: 'Cloud Engineering',
        blurb: 'Architecture, migration, serverless and AI infrastructure.',
      },
      {
        icon: SquareTerminal,
        label: 'Software & Applications',
        blurb: 'Web, mobile and AI-powered applications, APIs and SaaS.',
      },
      {
        icon: TestTubes,
        label: 'Testing & QA',
        blurb: 'Manual, automated and continuous testing for every release.',
      },
      {
        icon: ShieldCheck,
        label: 'Secure Data Engineering',
        blurb: 'Security, privacy and auditability designed in from day one.',
      },
      {
        icon: MonitorCog,
        label: 'Website Management',
        blurb: 'Maintenance, modernization, monitoring and support.',
      },
    ],
  },
]

const toneRing: Record<ServiceGroup['tierTone'], string> = {
  accent: 'text-accent bg-accent/10',
  primary: 'text-primary bg-primary/10',
  neutral: 'text-ink-muted bg-surface-3',
}

export function ServicesOverview({
  variant = 'default',
}: {
  variant?: 'default' | 'alt' | 'deep'
}) {
  return (
    <Section id="services" variant={variant}>
      <SectionHeading
        eyebrow="Services"
        title="Technology Capabilities Built Around Your Business"
        lead="Capabilities are organized the way we think: AI leads, data feeds it, and cloud and software engineering carry it into production."
      />
      <div className="grid gap-6 lg:grid-cols-3">
        {groups.map((group, gi) => (
          <Reveal key={group.title} delay={gi * 100} className="h-full">
            <Card
              interactive
              className={`flex h-full flex-col p-6 md:p-7 ${
                gi === 0 ? 'border-accent/30' : ''
              }`}
            >
              <Badge tone={group.tierTone}>{group.tier}</Badge>
              <h3 className="mt-4 text-h4">{group.title}</h3>
              <p className="mt-2 text-small text-ink-muted">{group.description}</p>
              <ul className="mt-6 flex flex-1 flex-col gap-4">
                {group.items.map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.label} className="flex gap-3">
                      <span
                        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-btn ${toneRing[group.tierTone]}`}
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <div>
                        <p className="text-small font-semibold text-ink">{item.label}</p>
                        <p className="text-caption text-ink-subtle">{item.blurb}</p>
                      </div>
                    </li>
                  )
                })}
              </ul>
              <Link
                to={group.to}
                className="mt-6 inline-flex items-center gap-1.5 text-small font-semibold text-primary transition-colors hover:text-primary-hover"
              >
                Explore {group.title}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
