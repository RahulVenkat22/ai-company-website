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
import { Testimonials } from '@/components/sections/Testimonials'
import { PeopleCulture } from '@/components/sections/PeopleCulture'
import { ParallaxBand } from '@/components/ui/ParallaxBand'
import { ScrollVideoStory } from '@/components/ui/ScrollVideoStory'
import { HeartHandshake, Lightbulb, ShieldCheck } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'

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
 *
 * A fixed three-video robot story (ScrollVideoStory) runs behind the whole
 * page; the Hero, both ParallaxBands and the FinalCTA are transparent
 * windows onto it, while every other stretch of content sits inside an
 * opaque `bg-bg` wrapper so the backdrop never bleeds through body copy.
 */
export default function Home() {
  return (
    <>
      <Seo title={TITLE} description={DESCRIPTION} path="/" jsonLd={HOME_JSONLD} />
      <ScrollVideoStory />
      <Hero />
      <div className="bg-bg">
        <CapabilityStrip />
        <AIExpertise variant="alt" />
        <WhatWeSolve variant="default" />
        <ServicesOverview variant="alt" />
      </div>
      <ParallaxBand ariaLabel="Technology built by people, for people">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <h2 className="text-h2 text-balance text-white">
            Technology built <span className="text-gradient">by people, for people</span>
          </h2>
          <p className="max-w-2xl text-body-lg text-slate-200">
            Behind every AI system we ship is a team that listens first, explains
            its decisions in plain language and cares how the result feels to use.
          </p>
          <ul className="mt-2 flex flex-wrap justify-center gap-3">
            {[
              { icon: Lightbulb, label: 'Human-centred design' },
              { icon: ShieldCheck, label: 'Production-grade engineering' },
              { icon: HeartHandshake, label: 'Partnership beyond launch' },
            ].map((chip) => (
              <li
                key={chip.label}
                className="flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-small font-medium text-white backdrop-blur-sm"
              >
                <chip.icon className="h-4 w-4 text-amber-300" aria-hidden="true" />
                {chip.label}
              </li>
            ))}
          </ul>
        </Reveal>
      </ParallaxBand>
      <div className="bg-bg">
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
        <PeopleCulture variant="default" />
        <TechnologyStoriesSection variant="alt" />
        <CaseStudiesSection variant="default" />
      </div>
      <ParallaxBand overlay="soft" ariaLabel="From idea to production">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
          <p className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-caption font-semibold uppercase tracking-[0.14em] text-amber-300 backdrop-blur-sm">
            From idea to production
          </p>
          <h2 className="text-h2 text-balance text-white">
            Big ambitions deserve engineering that ships
          </h2>
          <p className="max-w-2xl text-body-lg text-slate-200">
            We take AI from whiteboard to production — architected deliberately,
            tested thoroughly and deployed securely to the cloud.
          </p>
        </Reveal>
      </ParallaxBand>
      <div className="bg-bg">
        <Testimonials variant="default" />
        <IndustriesSection variant="alt" />
        <WhyChooseUs variant="default" />
        <SecuritySection variant="deep" />
        <EngagementModels variant="default" />
      </div>
      <FinalCTA background="story" />
    </>
  )
}
