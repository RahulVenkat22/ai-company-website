import { ArrowRight, Boxes, Cpu, Workflow } from 'lucide-react'
import { Seo } from '@/lib/seo'
import { site } from '@/config/site'
import { PageHeader } from '@/components/ui/PageHeader'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { CloudSection } from '@/components/sections/CloudSection'
import { SecuritySection } from '@/components/sections/SecuritySection'
import { FinalCTA } from '@/components/sections/FinalCTA'

const aiWorkloadCards = [
  {
    icon: Cpu,
    title: 'AI infrastructure',
    body: 'GPU and managed-model capacity, vector stores, model endpoints and inference gateways — provisioned as code across AWS Bedrock, Azure AI and Vertex AI.',
  },
  {
    icon: Boxes,
    title: 'Data platforms',
    body: 'Lakehouse and warehouse foundations on BigQuery, Snowflake or cloud-native storage, with governed pipelines feeding both BI and AI workloads.',
  },
  {
    icon: Workflow,
    title: 'MLOps & delivery',
    body: 'CI/CD for applications and models alike: versioned deployments, automated evaluation gates, observability and rollback paths built in from the start.',
  },
]

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: site.url },
      { '@type': 'ListItem', position: 2, name: 'Cloud', item: `${site.url}/cloud` },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Cloud engineering',
    name: 'Cloud Engineering Services',
    provider: { '@type': 'Organization', name: site.name, url: site.url },
    areaServed: 'Worldwide',
    description:
      'Cloud architecture, migration, serverless applications, AI infrastructure, data platforms, DevOps and cost optimization on AWS, Microsoft Azure and Google Cloud.',
  },
]

export default function Cloud() {
  return (
    <>
      <Seo
        title="Cloud Engineering on AWS, Azure & Google Cloud"
        description="Cloud architecture, migration, serverless, AI infrastructure, data platforms, DevOps and cost optimization — secure cloud engineering across AWS, Azure and Google Cloud."
        path="/cloud"
        jsonLd={jsonLd}
      />
      <PageHeader
        title="Cloud engineering without the complexity"
        lead="Secure, scalable cloud foundations across AWS, Microsoft Azure and Google Cloud — designed for the applications, data platforms and AI workloads that run on them."
      >
        <Button
          to="/contact"
          eventName="consultation_cta_click"
          eventParams={{ location: 'cloud_header' }}
          iconRight={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
        >
          Plan your migration
        </Button>
      </PageHeader>

      <CloudSection variant="default" />

      <Section id="cloud-for-ai" variant="alt">
        <SectionHeading
          eyebrow="Cloud for AI Workloads"
          title="The substrate under every AI system"
          lead="RAG platforms, agents and ML models are only as reliable as the infrastructure beneath them. We build the cloud layer with the AI workload in mind from day one."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {aiWorkloadCards.map((card, i) => {
            const Icon = card.icon
            return (
              <Reveal key={card.title} delay={i * 100} className="h-full">
                <Card interactive className="h-full p-6 md:p-7">
                  <span className="flex h-10 w-10 items-center justify-center rounded-btn bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-h4">{card.title}</h3>
                  <p className="mt-2 text-small text-ink-muted">{card.body}</p>
                </Card>
              </Reveal>
            )
          })}
        </div>
      </Section>

      <SecuritySection variant="deep" />
      <FinalCTA />
    </>
  )
}
