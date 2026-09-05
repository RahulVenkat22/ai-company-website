import {
  ArrowRight,
  BarChart3,
  Bot,
  BrainCircuit,
  Cloud,
  Database,
  LineChart,
  MonitorCog,
  Network,
  ShieldCheck,
  SquareTerminal,
  TestTubes,
  Workflow,
  type LucideIcon,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'

interface ServiceGroup {
  tier: string
  title: string
  description: string
  to: string
  linkLabel: string
  items: { icon: LucideIcon; label: string }[]
}

/**
 * Services organized by the capability hierarchy in prompt.md 2: AI first,
 * Data second, Cloud and Engineering supporting. Laid out as a three-cell
 * bento: the AI cell is the large photographic tile, the two supporting
 * groups stack beside it.
 */
const groups: ServiceGroup[] = [
  {
    tier: 'Primary',
    title: 'AI and generative AI',
    description:
      'Production AI systems that reason, retrieve and act, engineered for real business workflows rather than demonstrations.',
    to: '/ai-solutions',
    linkLabel: 'AI solutions',
    items: [
      { icon: BrainCircuit, label: 'AI agents and agentic AI' },
      { icon: Database, label: 'RAG and enterprise AI' },
      { icon: Bot, label: 'Generative AI applications' },
      { icon: Workflow, label: 'AI automation' },
      { icon: Network, label: 'AI solution architecture' },
    ],
  },
  {
    tier: 'Data and intelligence',
    title: 'Data, ML and analytics',
    description: 'Data platforms, machine learning and business intelligence that turn fragmented data into decisions.',
    to: '/data-analytics',
    linkLabel: 'Data and analytics',
    items: [
      { icon: LineChart, label: 'Machine learning and data science' },
      { icon: Database, label: 'Data engineering and warehousing' },
      { icon: BarChart3, label: 'Business intelligence and dashboards' },
    ],
  },
  {
    tier: 'Cloud and engineering',
    title: 'Cloud, software and quality',
    description: 'Secure cloud foundations, modern applications and engineered quality across AWS, Azure and Google Cloud.',
    to: '/cloud',
    linkLabel: 'Cloud engineering',
    items: [
      { icon: Cloud, label: 'Cloud engineering' },
      { icon: SquareTerminal, label: 'Software and applications' },
      { icon: TestTubes, label: 'Testing and QA' },
      { icon: ShieldCheck, label: 'Secure data engineering' },
      { icon: MonitorCog, label: 'Website management' },
    ],
  },
]

function GroupLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="group mt-auto inline-flex items-center gap-1.5 pt-6 text-small font-medium text-ink transition-colors hover:text-primary"
    >
      {label}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-1" aria-hidden="true" />
    </Link>
  )
}

export function ServicesOverview({ variant = 'default' }: { variant?: 'default' | 'alt' | 'deep' }) {
  const [ai, data, cloud] = groups
  return (
    <Section id="services" variant={variant}>
      <SectionHeading
        eyebrow="Services"
        title="Capabilities organized the way we think"
        lead="AI leads, data feeds it, and cloud and software engineering carry it into production."
      />

      <div className="grid gap-4 lg:grid-cols-12">
        {/* AI: the large photographic tile */}
        <Reveal className="lg:col-span-7">
          <article className="relative isolate flex h-full min-h-[30rem] flex-col justify-end overflow-hidden rounded-card border border-line p-7 md:p-9">
            <img
              src="/images/expertise/computer-using-agents.jpg"
              alt=""
              loading="lazy"
              className="absolute inset-0 -z-20 h-full w-full object-cover"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-scene/95 via-scene/70 to-scene/30" aria-hidden="true" />
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-signal">{ai.tier}</p>
            <h3 className="mt-3 text-h2 text-paper">{ai.title}</h3>
            <p className="mt-3 max-w-xl text-body text-paper/75">{ai.description}</p>
            <ul className="mt-7 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {ai.items.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3 text-small text-paper/90">
                  <Icon className="h-4 w-4 shrink-0 text-signal" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
            <Link
              to={ai.to}
              className="group mt-8 inline-flex items-center gap-1.5 text-small font-medium text-paper transition-colors hover:text-signal"
            >
              {ai.linkLabel}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </article>
        </Reveal>

        <div className="grid gap-4 lg:col-span-5">
          {[data, cloud].map((group, i) => (
            <Reveal key={group.title} delay={100 + i * 90} className="h-full">
              <article className="flex h-full flex-col rounded-card border border-line bg-surface p-7 md:p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-subtle">{group.tier}</p>
                <h3 className="mt-3 text-h3 text-ink">{group.title}</h3>
                <p className="mt-2 text-small text-ink-muted">{group.description}</p>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {group.items.map(({ icon: Icon, label }) => (
                    <li key={label} className="flex items-center gap-3 text-small text-ink">
                      <Icon className="h-4 w-4 shrink-0 text-ink-subtle" aria-hidden="true" />
                      {label}
                    </li>
                  ))}
                </ul>
                <GroupLink to={group.to} label={group.linkLabel} />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
