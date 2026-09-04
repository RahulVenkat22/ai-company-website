import {
  Check,
  Database,
  Import,
  LayoutDashboard,
  Shapes,
  Target,
  Warehouse,
  type LucideIcon,
} from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Badge } from '@/components/ui/Badge'
import { Reveal } from '@/components/ui/Reveal'

type SectionVariant = 'default' | 'alt' | 'deep'

interface AnalyticsBISectionProps {
  variant?: SectionVariant
}

const services: string[] = [
  'Data Analytics',
  'Data Engineering',
  'Data Reporting',
  'Business Intelligence',
  'Data Warehousing',
  'ETL / ELT',
  'Data Pipelines',
  'Data Quality',
  'Data Governance',
  'KPI Development',
  'Dashboard Development',
  'Automated Reporting',
  'Data Visualization',
]

interface PipelineStage {
  icon: LucideIcon
  label: string
  sublabel?: string
}

const pipeline: PipelineStage[] = [
  { icon: Database, label: 'Sources' },
  { icon: Import, label: 'Ingestion', sublabel: 'ETL / ELT' },
  { icon: Warehouse, label: 'Warehouse' },
  { icon: Shapes, label: 'Modeling' },
  { icon: LayoutDashboard, label: 'BI / Dashboards' },
  { icon: Target, label: 'Decisions' },
]

const technologies: string[] = [
  'SQL',
  'Python',
  'Pandas',
  'NumPy',
  'Apache Spark',
  'BigQuery',
  'Snowflake',
  'PostgreSQL',
]

/** Horizontal animated connector between pipeline stages (desktop). */
function FlowEdgeHorizontal() {
  return (
    <svg
      className="mx-0.5 hidden h-3 w-7 shrink-0 text-accent/70 md:block"
      viewBox="0 0 28 12"
      aria-hidden="true"
    >
      <line
        x1="0"
        y1="6"
        x2="20"
        y2="6"
        stroke="currentColor"
        strokeWidth="1.5"
        className="animate-flow"
      />
      <path d="M20 2.5 L27 6 L20 9.5 Z" fill="currentColor" />
    </svg>
  )
}

/** Vertical animated connector between pipeline stages (mobile). */
function FlowEdgeVertical() {
  return (
    <svg
      className="mx-auto my-0.5 h-7 w-3 shrink-0 text-accent/70 md:hidden"
      viewBox="0 0 12 28"
      aria-hidden="true"
    >
      <line
        x1="6"
        y1="0"
        x2="6"
        y2="20"
        stroke="currentColor"
        strokeWidth="1.5"
        className="animate-flow"
      />
      <path d="M2.5 20 L6 27 L9.5 20 Z" fill="currentColor" />
    </svg>
  )
}

/**
 * Data Analytics & Business Intelligence section (prompt.md §17): services
 * checklist, animated source-to-decision pipeline, and technology badges.
 */
export function AnalyticsBISection({ variant = 'alt' }: AnalyticsBISectionProps) {
  return (
    <Section id="analytics-bi" variant={variant}>
      <SectionHeading
        eyebrow="Data Analytics & BI"
        title="From raw data to business decisions"
        lead="We build the full path from scattered source systems to trusted dashboards — engineered pipelines, governed warehouses, and reporting your teams actually rely on."
      />

      <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
        <Reveal className="lg:col-span-3">
          <h3 className="text-h4 text-ink">What we deliver</h3>
          <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {services.map((service) => (
              <li key={service} className="flex items-center gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span className="text-body text-ink-muted">{service}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-2">
          <div className="h-full rounded-card border border-line bg-surface p-6">
            <h3 className="text-h4 text-ink">Technology</h3>
            <p className="mt-1 text-small text-ink-muted">
              Proven, widely adopted tooling — chosen per project, never by default.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <li key={tech}>
                  <Badge tone="neutral">{tech}</Badge>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-12 md:mt-16">
        <div className="rounded-card border border-line bg-surface-2/60 p-6 md:p-8">
          <h3 className="text-h4 text-ink">How data becomes a decision</h3>
          <div
            role="img"
            aria-label="Data pipeline diagram: data flows from source systems through ingestion with ETL or ELT into a warehouse, is modeled, served to BI dashboards, and informs business decisions."
            className="mt-6"
          >
            <ol aria-hidden="true" className="flex flex-col md:flex-row md:items-stretch">
              {pipeline.map((stage, i) => (
                <li
                  key={stage.label}
                  className="flex flex-col items-center md:flex-1 md:flex-row"
                >
                  <div className="flex w-full items-center gap-3 rounded-card border border-line bg-surface px-4 py-3 md:flex-1 md:flex-col md:gap-2 md:px-2 md:py-4 md:text-center">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-btn bg-primary/10 text-primary">
                      <stage.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="flex flex-col md:items-center">
                      <span className="text-small font-semibold text-ink">{stage.label}</span>
                      {stage.sublabel && (
                        <span className="text-caption text-ink-subtle">{stage.sublabel}</span>
                      )}
                    </span>
                  </div>
                  {i < pipeline.length - 1 && (
                    <>
                      <FlowEdgeVertical />
                      <FlowEdgeHorizontal />
                    </>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
