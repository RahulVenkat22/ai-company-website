import { Seo } from '@/lib/seo'
import { site } from '@/config/site'
import { Hero } from '@/components/sections/Hero'
import { CapabilityStrip } from '@/components/sections/CapabilityStrip'
import { AIExpertise } from '@/components/sections/AIExpertise'
import { WhatWeSolve } from '@/components/sections/WhatWeSolve'
import { ServicesOverview } from '@/components/sections/ServicesOverview'
import { RAGSection } from '@/components/sections/RAGSection'
import { AgentsSection } from '@/components/sections/AgentsSection'
import { MachineLearningSection } from '@/components/sections/MachineLearningSection'
import { AnalyticsBISection } from '@/components/sections/AnalyticsBISection'
import { CloudSection } from '@/components/sections/CloudSection'
import { SoftwareSection } from '@/components/sections/SoftwareSection'
import { AIAutomationSection } from '@/components/sections/AIAutomationSection'
import { TestingSection } from '@/components/sections/TestingSection'
import { AIArchitectureSection } from '@/components/sections/AIArchitectureSection'
import { TechnologyStackSection } from '@/components/sections/TechnologyStackSection'
import { HowWeWork } from '@/components/sections/HowWeWork'
import { TechnologyStoriesSection } from '@/components/sections/TechnologyStoriesSection'
import { CaseStudiesSection } from '@/components/sections/CaseStudiesSection'
import { IndustriesSection } from '@/components/sections/IndustriesSection'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'
import { SecuritySection } from '@/components/sections/SecuritySection'
import { EngagementModels } from '@/components/sections/EngagementModels'
import { FinalCTA } from '@/components/sections/FinalCTA'

const TITLE = 'AI Solutions, Agentic AI & Data Engineering'
const DESCRIPTION =
  'AI-first engineering: AI agents, agentic AI, RAG systems, data platforms and cloud solutions — from business problem to production, built for enterprise.'

const HOME_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: TITLE,
  description: DESCRIPTION,
  url: `${site.url}/`,
  isPartOf: {
    '@type': 'WebSite',
    name: site.name,
    url: site.url,
  },
} as const

/**
 * Homepage — implements the §5 story flow as one continuous narrative:
 * promise (Hero) → proof of breadth (strip, expertise) → problems we solve →
 * how we solve them (services + capability deep-dives) → how we build
 * (stack, process) → evidence (stories, case studies, industries) →
 * why us (differentiators, security) → how to engage → invitation.
 */
export default function Home() {
  return (
    <>
      <Seo title={TITLE} description={DESCRIPTION} path="/" jsonLd={HOME_JSONLD} />
      <Hero />
      <CapabilityStrip />
      <AIExpertise variant="alt" />
      <WhatWeSolve variant="default" />
      <ServicesOverview variant="alt" />
      <RAGSection variant="deep" />
      <AgentsSection variant="default" />
      <MachineLearningSection variant="alt" />
      <AnalyticsBISection variant="default" />
      <CloudSection variant="alt" />
      <SoftwareSection variant="default" />
      <AIAutomationSection variant="alt" />
      <TestingSection variant="default" />
      <AIArchitectureSection variant="alt" />
      <TechnologyStackSection variant="default" />
      <HowWeWork variant="alt" />
      <TechnologyStoriesSection variant="default" />
      <CaseStudiesSection variant="alt" />
      <IndustriesSection variant="default" />
      <WhyChooseUs variant="alt" />
      <SecuritySection variant="deep" />
      <EngagementModels variant="default" />
      <FinalCTA />
    </>
  )
}
