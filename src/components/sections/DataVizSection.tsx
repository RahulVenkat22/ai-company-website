import { Lock } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Reveal } from '@/components/ui/Reveal'

type SectionVariant = 'default' | 'alt' | 'deep'

interface DataVizSectionProps {
  variant?: SectionVariant
}

interface Platform {
  name: string
  monogram: string
  monogramClass: string
  description: string
}

const platforms: Platform[] = [
  {
    name: 'Power BI',
    monogram: 'PB',
    monogramClass: 'bg-primary/10 text-primary',
    description: 'Enterprise reporting across the Microsoft ecosystem.',
  },
  {
    name: 'Tableau',
    monogram: 'T',
    monogramClass: 'bg-accent/10 text-accent',
    description: 'Rich exploratory and analytical visualization.',
  },
  {
    name: 'Qlik',
    monogram: 'Q',
    monogramClass: 'bg-violet-acc/10 text-violet-acc',
    description: 'Associative exploration across connected datasets.',
  },
  {
    name: 'Looker',
    monogram: 'L',
    monogramClass: 'bg-ink/10 text-ink',
    description: 'Governed metrics and embedded analytics.',
  },
]

const dashboardTypes: string[] = [
  'Executive dashboards',
  'Operational dashboards',
  'Financial dashboards',
  'Sales dashboards',
  'Marketing analytics',
  'Healthcare analytics',
  'KPI dashboards',
  'Real-time dashboards',
  'Interactive reporting',
  'Automated reporting',
]

const kpiTiles: string[] = ['Revenue', 'Orders', 'Active users', 'Conversion']

/** Illustrative placeholder bar heights — shapes only, no real values. */
const barHeights = [44, 58, 36, 66, 50, 74, 60, 44, 68, 56, 80, 64]
const monthTicks = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']

/**
 * Data Visualization section (prompt.md §18): BI platform expertise, an
 * illustrative pure-SVG dashboard preview, and dashboard-type chips.
 */
export function DataVizSection({ variant = 'default' }: DataVizSectionProps) {
  return (
    <Section id="visualization" variant={variant}>
      <SectionHeading
        eyebrow="Data Visualization"
        title="Dashboards people actually use"
        lead="A dashboard succeeds when someone checks it every morning. We design visual reporting around the decisions your teams make — not around how much data we can fit on one screen."
      />

      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {platforms.map((platform, i) => (
          <Reveal as="li" key={platform.name} delay={i * 80} className="h-full">
            <Card interactive className="flex h-full items-start gap-4 p-5">
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-btn text-small font-semibold ${platform.monogramClass}`}
                aria-hidden="true"
              >
                {platform.monogram}
              </span>
              <span>
                <h3 className="text-body font-semibold text-ink">{platform.name}</h3>
                <p className="mt-1 text-small text-ink-muted">{platform.description}</p>
              </span>
            </Card>
          </Reveal>
        ))}
      </ul>

      <Reveal className="mt-12 md:mt-16">
        <figure className="mx-auto max-w-4xl">
          <div
            role="img"
            aria-label="Illustrative dashboard preview: four KPI tiles with placeholder values, a trend line chart, a monthly bar chart, and a donut chart of generic segments. No real business data is shown."
            className="overflow-hidden rounded-card border border-line bg-surface shadow-card"
          >
            <div aria-hidden="true">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 border-b border-line bg-surface-2 px-4 py-2.5">
                <span className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
                  <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
                  <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
                </span>
                <span className="mx-auto flex items-center gap-1.5 rounded-full border border-line bg-bg/60 px-3 py-1 text-caption text-ink-subtle">
                  <Lock className="h-3 w-3" />
                  Illustrative preview
                </span>
                <span className="w-10" />
              </div>

              {/* Dashboard body */}
              <div className="grid gap-3 bg-bg/40 p-4 md:p-5">
                {/* KPI tiles */}
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                  {kpiTiles.map((label) => (
                    <div key={label} className="rounded-btn border border-line bg-surface p-3">
                      <p className="text-caption text-ink-subtle">{label}</p>
                      <p className="mt-1 text-h4 font-semibold text-ink">—</p>
                      <p className="mt-0.5 text-caption text-ink-subtle">vs prior period · —</p>
                    </div>
                  ))}
                </div>

                {/* Trend + donut */}
                <div className="grid gap-3 md:grid-cols-3">
                  <div className="rounded-btn border border-line bg-surface p-4 md:col-span-2">
                    <p className="text-small font-medium text-ink">Revenue trend</p>
                    <svg viewBox="0 0 320 130" className="mt-2 h-auto w-full">
                      <g className="text-line" stroke="currentColor" strokeWidth="1">
                        <line x1="10" y1="24" x2="310" y2="24" opacity="0.6" />
                        <line x1="10" y1="50" x2="310" y2="50" opacity="0.6" />
                        <line x1="10" y1="76" x2="310" y2="76" opacity="0.6" />
                        <line x1="10" y1="102" x2="310" y2="102" />
                      </g>
                      <path
                        d="M10 90 C34 84 50 94 76 78 C102 62 118 74 148 62 C178 50 194 66 224 46 C250 30 274 42 310 26 L310 102 L10 102 Z"
                        className="fill-primary/10"
                      />
                      <path
                        d="M10 90 C34 84 50 94 76 78 C102 62 118 74 148 62 C178 50 194 66 224 46 C250 30 274 42 310 26"
                        className="stroke-primary"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <g className="fill-ink-subtle" fontSize="9">
                        <text x="10" y="118">Q1</text>
                        <text x="106" y="118">Q2</text>
                        <text x="204" y="118">Q3</text>
                        <text x="298" y="118">Q4</text>
                      </g>
                    </svg>
                  </div>

                  <div className="rounded-btn border border-line bg-surface p-4">
                    <p className="text-small font-medium text-ink">Share by segment</p>
                    <div className="mt-2 flex items-center gap-4">
                      <svg viewBox="0 0 96 96" className="h-24 w-24 shrink-0">
                        <g fill="none" strokeWidth="12" transform="rotate(-90 48 48)">
                          <circle
                            cx="48"
                            cy="48"
                            r="34"
                            className="stroke-primary"
                            strokeDasharray="93.1 120.5"
                            strokeDashoffset="0"
                          />
                          <circle
                            cx="48"
                            cy="48"
                            r="34"
                            className="stroke-accent"
                            strokeDasharray="71.8 141.8"
                            strokeDashoffset="-96.1"
                          />
                          <circle
                            cx="48"
                            cy="48"
                            r="34"
                            className="stroke-violet-acc/80"
                            strokeDasharray="39.7 173.9"
                            strokeDashoffset="-170.9"
                          />
                        </g>
                        <text
                          x="48"
                          y="53"
                          textAnchor="middle"
                          fontSize="15"
                          fontWeight="600"
                          className="fill-ink"
                        >
                          —
                        </text>
                      </svg>
                      <ul className="flex flex-col gap-2 text-caption text-ink-muted">
                        <li className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                          Segment A · —
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                          Segment B · —
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="h-2.5 w-2.5 rounded-full bg-violet-acc/80" />
                          Segment C · —
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Monthly bars */}
                <div className="rounded-btn border border-line bg-surface p-4">
                  <p className="text-small font-medium text-ink">Volume by month</p>
                  <svg viewBox="0 0 320 122" className="mt-2 h-auto w-full">
                    <defs>
                      <clipPath id="dv-bar-clip">
                        <rect x="0" y="0" width="320" height="100" />
                      </clipPath>
                    </defs>
                    <g className="text-line" stroke="currentColor" strokeWidth="1">
                      <line x1="10" y1="28" x2="310" y2="28" opacity="0.6" />
                      <line x1="10" y1="64" x2="310" y2="64" opacity="0.6" />
                      <line x1="10" y1="100" x2="310" y2="100" />
                    </g>
                    <g clipPath="url(#dv-bar-clip)">
                      {barHeights.map((h, i) => (
                        <rect
                          key={i}
                          x={10 + i * 26}
                          y={100 - h}
                          width="14"
                          height={h + 6}
                          rx="3"
                          className="fill-primary/60"
                        />
                      ))}
                    </g>
                    <g className="fill-ink-subtle" fontSize="8" textAnchor="middle">
                      {monthTicks.map((tick, i) => (
                        <text key={i} x={17 + i * 26} y={114}>
                          {tick}
                        </text>
                      ))}
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <figcaption className="mt-3 text-center text-caption text-ink-subtle">
            Illustrative dashboard preview — placeholder layout and data shapes only, no real
            metrics. Customer dashboards are shown only with verified permission.
          </figcaption>
        </figure>
      </Reveal>

      <Reveal delay={100} className="mt-12 md:mt-16">
        <h3 className="text-h4 text-ink">Dashboard types we build</h3>
        <ul className="mt-5 flex flex-wrap gap-2">
          {dashboardTypes.map((type) => (
            <li key={type}>
              <Badge tone="neutral">{type}</Badge>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  )
}
