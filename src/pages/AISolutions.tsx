import {
  ArrowRight,
  Brain,
  MessagesSquare,
  Network,
  ScanText,
  type LucideIcon,
} from 'lucide-react'
import { Seo } from '@/lib/seo'
import { site } from '@/config/site'
import { PageHeader } from '@/components/ui/PageHeader'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { AIExpertise } from '@/components/sections/AIExpertise'
import { RAGSection } from '@/components/sections/RAGSection'
import { AgentsSection } from '@/components/sections/AgentsSection'
import { AIArchitectureSection } from '@/components/sections/AIArchitectureSection'
import { AIAutomationSection } from '@/components/sections/AIAutomationSection'
import { WhatWeCanBuild } from '@/components/sections/WhatWeCanBuild'
import { FinalCTA } from '@/components/sections/FinalCTA'

interface Deliverable {
  name: string
  description: string
  icon: LucideIcon
  tileClass: string
}

const deliverables: Deliverable[] = [
  {
    name: 'Generative AI applications',
    description:
      'LLM-powered products and features: generation, summarization and conversational interfaces built into real applications.',
    icon: Brain,
    tileClass: 'bg-primary/10 text-primary',
  },
  {
    name: 'AI assistants & chatbots',
    description:
      'Private assistants grounded in your business knowledge that answer in context and cite their sources.',
    icon: MessagesSquare,
    tileClass: 'bg-accent/10 text-accent',
  },
  {
    name: 'Multi-agent systems',
    description:
      'Orchestrated teams of specialized agents that reason, plan, use tools and execute multi-step workflows.',
    icon: Network,
    tileClass: 'bg-primary/10 text-primary',
  },
  {
    name: 'Intelligent document processing',
    description:
      'Extraction and classification pipelines that turn contracts, invoices and reports into structured, usable data.',
    icon: ScanText,
    tileClass: 'bg-accent/10 text-accent',
  },
]

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${site.url}/` },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'AI Solutions',
        item: `${site.url}/ai-solutions`,
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'AI Solutions',
    serviceType: 'AI development',
    url: `${site.url}/ai-solutions`,
    description:
      'AI agent development, agentic AI, RAG and enterprise AI systems, generative AI applications, AI solution architecture and AI automation.',
    provider: {
      '@type': 'Organization',
      name: site.name,
      url: site.url,
    },
  },
]

export default function AISolutions() {
  return (
    <>
      <Seo
        title="AI Agents, Agentic AI & RAG Development"
        description="Enterprise AI engineering: AI agents, agentic AI, RAG systems, generative AI applications and AI automation: designed, built and run in production."
        path="/ai-solutions"
        jsonLd={jsonLd}
      />

      <PageHeader
        image="/images/band-tech.jpg"
        title="AI systems that reach production"
        lead="AI is not a feature we bolt on: it is what we engineer. We design and build AI agents, RAG systems and generative AI applications that move beyond the demo into dependable, secure production systems."
      >
        <Button
          to="/contact"
          eventName="cta_click"
          eventParams={{ cta: 'start_project', location: 'ai_solutions_header' }}
          iconRight={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
        >
          Start a project
        </Button>
        <Button variant="inverse" to="/about#how-we-work">
          How we work
        </Button>
      </PageHeader>

      <Section id="what-we-deliver" variant="alt">
        <SectionHeading
          title="Four kinds of AI we ship"
          lead="Every engagement ends in working software. These are the AI systems we most often take from idea to production."
        />
        <ul className="grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {deliverables.map((item, i) => (
            <Reveal key={item.name} as="li" delay={80 * i} className="h-full">
              <Card as="div" interactive className="flex h-full flex-col gap-4 p-6">
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-btn ${item.tileClass}`}
                  aria-hidden="true"
                >
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-h4">{item.name}</h3>
                <p className="text-small text-ink-muted">{item.description}</p>
              </Card>
            </Reveal>
          ))}
        </ul>
      </Section>

      <AIExpertise variant="default" />
      <RAGSection variant="deep" />
      <AgentsSection variant="default" />
      <AIArchitectureSection variant="alt" />
      <AIAutomationSection variant="default" />
      <WhatWeCanBuild variant="deep" />
      <FinalCTA />
    </>
  )
}
