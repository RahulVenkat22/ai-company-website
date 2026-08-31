import {
  Bot,
  BarChart3,
  Cloud,
  Code2,
  Cpu,
  DraftingCompass,
  FlaskConical,
  RefreshCw,
  Rocket,
  SearchCheck,
  ShieldCheck,
  Info,
} from 'lucide-react'
import { Seo } from '@/lib/seo'
import { PageHeader } from '@/components/ui/PageHeader'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { HowWeWork } from '@/components/sections/HowWeWork'
import { FinalCTA } from '@/components/sections/FinalCTA'
import { Testimonials } from '@/components/sections/Testimonials'

const beliefs = [
  {
    icon: SearchCheck,
    title: 'Understand the problem first',
    description:
      'Businesses have complex problems and fragmented data. Before any code is written, we work to understand the business problem, the data behind it and what a good outcome actually looks like.',
  },
  {
    icon: DraftingCompass,
    title: 'Architecture before implementation',
    description:
      'The right architecture decides whether a system survives contact with production. We design the AI, data and cloud architecture deliberately — then build to that design.',
  },
  {
    icon: Rocket,
    title: 'Build for production, deploy securely',
    description:
      'A prototype is not a product. We engineer solutions to production standards, test them thoroughly and deploy them securely to the cloud — with security treated as a requirement, not a feature.',
  },
  {
    icon: RefreshCw,
    title: 'Keep improving after launch',
    description:
      'Deployment is a beginning, not an end. We monitor systems in production, measure how they perform against the original problem and keep improving them over time.',
  },
] as const

const disciplines = [
  {
    icon: Bot,
    title: 'AI Engineers',
    description:
      'Design and build AI agents, agentic systems, RAG pipelines and LLM-powered applications.',
  },
  {
    icon: FlaskConical,
    title: 'Data Scientists',
    description:
      'Frame business questions as experiments and turn raw data into models and evidence.',
  },
  {
    icon: Cpu,
    title: 'ML Engineers',
    description:
      'Take models from notebook to production — training, serving, evaluation and monitoring.',
  },
  {
    icon: Cloud,
    title: 'Cloud Engineers',
    description:
      'Build secure, scalable infrastructure across AWS, Azure and Google Cloud.',
  },
  {
    icon: Code2,
    title: 'Software Engineers',
    description:
      'Ship the web and mobile applications that put intelligence in front of users.',
  },
  {
    icon: BarChart3,
    title: 'Data Analysts',
    description:
      'Build the analytics, dashboards and reporting that make performance visible.',
  },
  {
    icon: ShieldCheck,
    title: 'QA Engineers',
    description:
      'Verify every release with disciplined manual and automated testing.',
  },
] as const

const companyFacts = [
  { label: 'Founded', value: '[TBD — to be provided]' },
  { label: 'Locations', value: '[TBD — to be provided]' },
  { label: 'Team size', value: '[TBD — to be provided]' },
  { label: 'Legal entity', value: '[TBD — to be provided]' },
] as const

export default function About() {
  return (
    <>
      <Seo
        title="About Us"
        description="We are an AI-first technology company helping organizations use artificial intelligence, data and cloud technologies to build smarter products, automate operations and make better decisions."
        path="/about"
      />

      <PageHeader
        image="/images/team-success.jpg"
        eyebrow="About Us"
        title="An AI-first engineering company for serious business problems."
        lead="We are an AI-first technology company helping organizations use artificial intelligence, data and cloud technologies to build smarter products, automate operations and make better decisions."
      />

      <Section variant="default">
        <SectionHeading
          eyebrow="What We Believe"
          title="One narrative runs through everything we build."
          lead="Understand the problem, design the architecture, build the solution, deploy it securely, and keep improving it. Every engagement — AI, data, cloud or software — follows that discipline."
        />
        <ul className="grid list-none grid-cols-1 gap-6 sm:grid-cols-2">
          {beliefs.map(({ icon: Icon, title, description }, i) => (
            <Reveal key={title} as="li" delay={80 * i}>
              <Card as="div" className="h-full p-6 md:p-8">
                <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-btn bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mb-2 text-h4">{title}</h3>
                <p className="text-small text-ink-muted">{description}</p>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section variant="alt">
        <SectionHeading
          eyebrow="Our Team"
          title="Multidisciplinary by design."
          lead="Real systems cross boundaries — models need pipelines, pipelines need infrastructure, infrastructure needs software, and all of it needs testing. So we build teams that cross those boundaries too."
        />
        <ul className="grid list-none grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {disciplines.map(({ icon: Icon, title, description }, i) => (
            <Reveal key={title} as="li" delay={60 * i}>
              <Card
                as="div"
                variant="outline"
                interactive
                className="flex h-full items-start gap-4 p-5"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-btn bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-body font-semibold text-ink">{title}</h3>
                  <p className="mt-1 text-small text-ink-muted">{description}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section variant="default" ariaLabel="Company facts">
        <Reveal className="mx-auto max-w-2xl">
          <Card className="p-6 md:p-8">
            <div className="mb-4 flex items-start gap-3">
              <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-btn bg-surface-2 text-ink-muted">
                <Info className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-h4">Company facts</h2>
                <p className="mt-1 text-small text-ink-muted">
                  We publish only verified company information. The details
                  below will be added once provided — nothing here is invented.
                </p>
              </div>
            </div>
            <dl className="divide-y divide-line border-t border-line">
              {companyFacts.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <dt className="text-small font-medium text-ink">{label}</dt>
                  <dd className="text-small text-ink-subtle">{value}</dd>
                </div>
              ))}
            </dl>
          </Card>
        </Reveal>
      </Section>

      <HowWeWork variant="alt" />

      <Testimonials variant="alt" />
      <FinalCTA />
    </>
  )
}
