import {
  AppWindow,
  BarChart3,
  Blocks,
  Bot,
  Cloud,
  Database,
  FileSearch,
  Globe,
  LayoutDashboard,
  LineChart,
  MessagesSquare,
  MousePointerClick,
  Network,
  PieChart,
  Smartphone,
  Target,
  TestTube2,
  TrendingUp,
  Workflow,
  type LucideIcon,
} from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'

interface BuildItem {
  label: string
  icon: LucideIcon
}

interface BuildGroup {
  heading: string
  iconClass: string
  items: BuildItem[]
}

const groups: BuildGroup[] = [
  {
    heading: 'AI & Agents',
    iconClass: 'text-accent',
    items: [
      { label: 'AI Chatbots', icon: MessagesSquare },
      { label: 'Enterprise RAG', icon: FileSearch },
      { label: 'AI Agents', icon: Bot },
      { label: 'Agentic AI Platforms', icon: Network },
      { label: 'AI Automation', icon: Workflow },
      { label: 'Computer-Using Agents', icon: MousePointerClick },
      { label: 'AI Mobile Apps', icon: Smartphone },
      { label: 'AI Web Applications', icon: AppWindow },
    ],
  },
  {
    heading: 'Data & Analytics',
    iconClass: 'text-primary',
    items: [
      { label: 'Recommendation Engines', icon: Target },
      { label: 'Predictive Analytics', icon: TrendingUp },
      { label: 'BI Platforms', icon: BarChart3 },
      { label: 'Power BI Dashboards', icon: LayoutDashboard },
      { label: 'Tableau Dashboards', icon: PieChart },
      { label: 'Qlik Analytics', icon: LineChart },
      { label: 'Data Platforms', icon: Database },
    ],
  },
  {
    heading: 'Platforms & Applications',
    iconClass: 'text-violet-acc',
    items: [
      { label: 'Cloud Applications', icon: Cloud },
      { label: 'SaaS Products', icon: Blocks },
      { label: 'Automated Testing Platforms', icon: TestTube2 },
      { label: 'Enterprise Web Applications', icon: Globe },
    ],
  },
]

/**
 * Compact, scannable capability grid: what the team can build, grouped so
 * AI work leads, rendered as bordered chips rather than heavy cards.
 */
export function WhatWeCanBuild({
  variant = 'deep',
}: {
  variant?: 'default' | 'alt' | 'deep'
}) {
  return (
    <Section id="what-we-can-build" variant={variant}>
      <SectionHeading
        title="What we can build"
        lead="From agent platforms to analytics and enterprise applications: the systems we design, build and run in production."
      />

      <div className="flex flex-col gap-10">
        {groups.map((group, gi) => (
          <Reveal key={group.heading} delay={80 * gi}>
            <h3 className="mb-4 text-small font-semibold uppercase tracking-wider text-ink-subtle">
              {group.heading}
            </h3>
            <ul className="flex list-none flex-wrap gap-2.5">
              {group.items.map(({ label, icon: Icon }) => (
                <li key={label}>
                  <span className="inline-flex items-center gap-2 rounded-btn border border-line bg-surface px-4 py-2 text-small font-medium text-ink-muted transition-colors duration-200 ease-premium hover:border-line-strong hover:text-ink">
                    <Icon
                      aria-hidden="true"
                      className={`h-4 w-4 ${group.iconClass}`}
                    />
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
