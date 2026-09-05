import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Seo } from '@/lib/seo'
import { site } from '@/config/site'
import { PageHeader } from '@/components/ui/PageHeader'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { ServicesOverview } from '@/components/sections/ServicesOverview'
import { IndustriesSection } from '@/components/sections/IndustriesSection'
import { HowWeWork } from '@/components/sections/HowWeWork'
import { EngagementModels } from '@/components/sections/EngagementModels'
import { FinalCTA } from '@/components/sections/FinalCTA'

/* Full capability index (prompt.md §12, §16–§24) grouped by the §2 hierarchy. */
interface IndexGroup {
  title: string
  subgroups: { heading: string; to: string; items: string[] }[]
}

const capabilityIndex: IndexGroup[] = [
  {
    title: 'AI & Generative AI',
    subgroups: [
      {
        heading: 'AI & Agentic AI',
        to: '/ai-solutions#agents',
        items: [
          'AI Agents',
          'Agentic AI',
          'Multi-Agent Systems',
          'Computer-Using Agents',
          'AI Assistants',
          'AI Applications',
        ],
      },
      {
        heading: 'RAG & Enterprise AI',
        to: '/ai-solutions#rag',
        items: [
          'Retrieval-Augmented Generation',
          'Enterprise RAG & knowledge bases',
          'Semantic, hybrid & vector search',
          'Intelligent document processing',
        ],
      },
      {
        heading: 'AI Automation & Architecture',
        to: '/ai-solutions#architecture',
        items: [
          'Generative AI',
          'AI Automation & AI-powered workflows',
          'AI-powered decision systems',
          'AI Solution Architecture',
        ],
      },
    ],
  },
  {
    title: 'Data & Intelligence',
    subgroups: [
      {
        heading: 'Machine Learning & Data Science',
        to: '/data-analytics#machine-learning',
        items: [
          'Machine Learning & Deep Learning',
          'Predictive analytics & forecasting',
          'Classification, regression & clustering',
          'Recommendation systems',
          'Feature engineering & model evaluation',
          'MLOps & data science consulting',
        ],
      },
      {
        heading: 'Analytics & Business Intelligence',
        to: '/data-analytics#analytics-bi',
        items: [
          'Data analytics & data engineering',
          'Data warehousing, ETL / ELT & pipelines',
          'Data quality & data governance',
          'KPI development & automated reporting',
        ],
      },
      {
        heading: 'Data Visualization',
        to: '/data-analytics#visualization',
        items: [
          'Power BI dashboards',
          'Tableau dashboards',
          'Qlik analytics',
          'Looker & interactive reporting',
        ],
      },
    ],
  },
  {
    title: 'Cloud & Engineering',
    subgroups: [
      {
        heading: 'Cloud Engineering',
        to: '/cloud',
        items: [
          'Cloud architecture & migration',
          'AWS, Azure & Google Cloud',
          'Serverless & cloud-native applications',
          'AI infrastructure & data platforms',
          'DevOps, CI/CD, monitoring & cost optimization',
        ],
      },
      {
        heading: 'Software & Applications',
        to: '/technology#software',
        items: [
          'Web, mobile & enterprise applications',
          'SaaS platforms & AI-powered apps',
          'APIs, microservices & integration',
          'Application modernization',
        ],
      },
      {
        heading: 'Quality & Support',
        to: '/technology#testing',
        items: [
          'Manual & automated testing',
          'API, integration & end-to-end testing',
          'Performance & continuous testing',
          'Website management & support',
        ],
      },
    ],
  },
]

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${site.url}/services` },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Service capability groups',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'AI & Generative AI' },
      { '@type': 'ListItem', position: 2, name: 'Data, ML & Analytics' },
      { '@type': 'ListItem', position: 3, name: 'Cloud, Software & Quality' },
    ],
  },
]

export default function Services() {
  return (
    <>
      <Seo
        title="Services — AI, Data, Cloud & Software Engineering"
        description="AI agent development, RAG, machine learning, analytics and BI, cloud engineering, software development and testing — organized around your business problem."
        path="/services"
        jsonLd={jsonLd}
      />
      <PageHeader
        image="/images/band-collab.jpg"
        title="Technology capabilities built around your business"
        lead="One team across AI, data, cloud and software engineering. AI leads our thinking, data feeds it, and cloud and engineering carry it into production — so you engage one partner, not four vendors."
      >
        <Button
          to="/contact"
          eventName="consultation_cta_click"
          eventParams={{ location: 'services_header' }}
          iconRight={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
        >
          Discuss your project
        </Button>
      </PageHeader>

      <ServicesOverview variant="default" />

      <Section id="capability-index" variant="alt">
        <SectionHeading
          eyebrow="Full Capability Index"
          title="Every service, one engineering partner"
          lead="The complete list of what we design, build and support. Each area links to the page where we explain how we approach it."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {capabilityIndex.map((group, gi) => (
            <Reveal key={group.title} delay={gi * 100} className="h-full">
              <Card className="h-full p-6 md:p-7">
                <h3 className="text-h4">{group.title}</h3>
                <div className="mt-5 flex flex-col gap-6">
                  {group.subgroups.map((sub) => (
                    <div key={sub.heading}>
                      <Link
                        to={sub.to}
                        className="group inline-flex items-center gap-1.5 text-small font-semibold text-primary transition-colors hover:text-primary-hover"
                      >
                        {sub.heading}
                        <ArrowRight
                          className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </Link>
                      <ul className="mt-2 flex flex-col gap-1.5">
                        {sub.items.map((item) => (
                          <li
                            key={item}
                            className="border-l border-line pl-3 text-small text-ink-muted"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <IndustriesSection variant="default" />
      <HowWeWork variant="alt" />
      <EngagementModels variant="default" />
      <FinalCTA />
    </>
  )
}
