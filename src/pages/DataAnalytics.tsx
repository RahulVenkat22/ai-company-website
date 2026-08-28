import { ArrowDown, ArrowRight, ChevronRight } from 'lucide-react'
import { Seo } from '@/lib/seo'
import { site } from '@/config/site'
import { PageHeader } from '@/components/ui/PageHeader'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { MachineLearningSection } from '@/components/sections/MachineLearningSection'
import { AnalyticsBISection } from '@/components/sections/AnalyticsBISection'
import { DataVizSection } from '@/components/sections/DataVizSection'
import { FinalCTA } from '@/components/sections/FinalCTA'

const PAGE_PATH = '/data-analytics'

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${site.url}/` },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Data & Analytics',
        item: `${site.url}${PAGE_PATH}`,
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Data analytics and business intelligence',
    name: 'Data Science, Analytics & BI Services',
    description:
      'Machine learning, data engineering, business intelligence and data visualization services — from pipelines and warehousing to models and dashboards.',
    provider: { '@type': 'Organization', name: site.name, url: site.url },
    areaServed: 'Worldwide',
    url: `${site.url}${PAGE_PATH}`,
  },
]

const ML_CHAIN = ['Data', 'Features', 'Model', 'Evaluation', 'Deployment', 'Monitoring'] as const

const BI_CHAIN = ['Sources', 'Pipelines', 'Warehouse', 'BI', 'Decisions'] as const

interface ChainLaneProps {
  title: string
  description: string
  steps: readonly string[]
  /** Tailwind class for the small tone dot inside each chip. */
  dotClass: string
}

/** One horizontal strip of bordered step chips joined by arrows; stacks vertically on mobile. */
function ChainLane({ title, description, steps, dotClass }: ChainLaneProps) {
  return (
    <div role="group" aria-label={`${title}: ${steps.join(', then ')}`}>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="text-h4 text-ink">{title}</h3>
        <p className="text-small text-ink-muted">{description}</p>
      </div>
      <ol className="mt-4 flex flex-col md:flex-row md:items-center">
        {steps.map((step, i) => (
          <li key={step} className="flex flex-col items-center md:flex-1 md:flex-row">
            <span className="flex w-full items-center justify-center gap-2 rounded-btn border border-line bg-surface px-4 py-2.5 text-small font-semibold text-ink md:flex-1">
              <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dotClass}`} aria-hidden="true" />
              {step}
            </span>
            {i < steps.length - 1 && (
              <>
                <ArrowDown
                  className="my-1 h-4 w-4 shrink-0 text-ink-subtle md:hidden"
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
  )
}

/**
 * Data & Analytics page (prompt.md §16 machine learning, §17 analytics & BI,
 * §18 data visualization) plus an inline "data value chain" section tying the
 * ML lifecycle and the BI pipeline together.
 */
export default function DataAnalytics() {
  return (
    <>
      <Seo
        title="Data Science, Analytics & BI Services"
        description="Machine learning, data engineering, BI and data visualization — pipelines, models and dashboards that turn raw data into confident decisions."
        path={PAGE_PATH}
        jsonLd={jsonLd}
      />

      <PageHeader
        eyebrow="Data & Analytics"
        title="From Raw Data to Predictive Intelligence"
        lead="One team owns the full data value chain — the pipelines and warehouse that organize your data, the models that predict what happens next, and the dashboards where decisions actually get made."
      >
        <Button
          size="lg"
          to="/contact"
          eventName="consultation_cta_click"
          eventParams={{ location: 'data_header' }}
          iconRight={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
        >
          Talk to a data engineer
        </Button>
      </PageHeader>

      <MachineLearningSection variant="default" />
      <AnalyticsBISection variant="alt" />
      <DataVizSection variant="default" />

      <Section id="data-value-chain" variant="deep">
        <SectionHeading
          eyebrow="One connected discipline"
          title="The data value chain"
          lead="Machine learning and business intelligence are often run as separate programs. We engineer them as one chain — the pipelines that feed your dashboards are the same pipelines that feed your models."
        />

        <Reveal>
          <ChainLane
            title="Machine learning lifecycle"
            description="From raw records to a monitored production model."
            steps={ML_CHAIN}
            dotClass="bg-accent"
          />
        </Reveal>

        <Reveal delay={80}>
          <div className="my-8 flex items-center gap-4 md:my-10">
            <span className="h-px flex-1 bg-line-strong" aria-hidden="true" />
            <p className="max-w-md text-center text-caption font-semibold uppercase tracking-[0.14em] text-ink-subtle">
              One governed foundation — model features and BI metrics share the same warehouse
            </p>
            <span className="h-px flex-1 bg-line-strong" aria-hidden="true" />
          </div>
        </Reveal>

        <Reveal delay={160}>
          <ChainLane
            title="Analytics & BI pipeline"
            description="From source systems to decisions people trust."
            steps={BI_CHAIN}
            dotClass="bg-primary"
          />
        </Reveal>

        <Reveal delay={240} className="mt-10">
          <p className="max-w-3xl text-body text-ink-muted">
            Because both strips run on the same data engineering foundation, an investment in one
            compounds the other: cleaner pipelines make models more reliable, and model outputs land
            in the dashboards your teams already use.
          </p>
        </Reveal>
      </Section>

      <FinalCTA />
    </>
  )
}
