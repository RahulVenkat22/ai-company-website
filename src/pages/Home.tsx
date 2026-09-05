import { Seo } from '@/lib/seo'
import { site } from '@/config/site'
import { ArrowUpRight } from 'lucide-react'
import { Hero } from '@/components/sections/Hero'
import { CapabilityStrip } from '@/components/sections/CapabilityStrip'
import { WhatWeSolve } from '@/components/sections/WhatWeSolve'
import { StatsBand } from '@/components/sections/StatsBand'
import { PinnedShowcase } from '@/components/sections/PinnedShowcase'
import { ServicesOverview } from '@/components/sections/ServicesOverview'
import { CaseStudiesSection } from '@/components/sections/CaseStudiesSection'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'
import { ProcessTeaser } from '@/components/sections/ProcessTeaser'
import { Testimonials } from '@/components/sections/Testimonials'
import { FinalCTA } from '@/components/sections/FinalCTA'
import { ParallaxBand } from '@/components/ui/ParallaxBand'
import { ScrollVideoStory } from '@/components/ui/ScrollVideoStory'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
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
 * Editorial intro split — big serif statement left, supporting copy and a
 * pill CTA right (the "we find & showcase" pattern).
 */
function EditorialIntro() {
  return (
    <Section ariaLabel="Who we are">
      <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <Reveal className="flex flex-col gap-8">
          <h2 className="text-h1 text-ink">
            We engineer <span className="accent-word">intelligent</span> systems
            for real business problems
          </h2>
          <div>
            <Button
              size="lg"
              to="/services"
              eventName="cta_click"
              eventParams={{ cta: 'explore_services', location: 'editorial_intro' }}
              iconRight={<ArrowUpRight className="h-4 w-4" aria-hidden="true" />}
            >
              Explore services
            </Button>
          </div>
        </Reveal>
        <Reveal delay={120} className="flex flex-col gap-6 text-body-lg text-ink-muted">
          <p>
            Discover AI agents, RAG systems, data platforms and cloud solutions
            where thoughtful architecture meets production engineering — built
            for the way your business actually works.
          </p>
          <p>
            From enterprise knowledge assistants to fully agentic workflows,
            every solution is carefully designed to take you from business
            problem to production: data, architecture, models, applications,
            cloud, testing, security and beyond.
          </p>
        </Reveal>
      </div>
    </Section>
  )
}

/**
 * Homepage — a curated overview, not the whole story: promise (Hero) →
 * breadth (serif marquee + intro) → outcomes (WhatWeSolve) → capability
 * facts (StatsBand) → featured solutions (PinnedShowcase, the editorial
 * pinned slideshow) → where to go deeper (ServicesOverview) → proof
 * (case studies, differentiators, reviews) → process → invitation.
 *
 * A fixed three-video robot story (ScrollVideoStory) runs behind the whole
 * page, its playback scrubbed by scroll position. The Hero, the ParallaxBand
 * and the FinalCTA are fully transparent windows onto it; every other
 * stretch of content sits inside a `.story-glass` wrapper — translucent
 * enough that the footage stays visible while scrolling, dense enough that
 * body copy stays legible. PinnedShowcase and WhyChooseUs bring their own
 * full-bleed photography and simply cover the footage while on screen.
 */
export default function Home() {
  return (
    <>
      <Seo title={TITLE} description={DESCRIPTION} path="/" jsonLd={HOME_JSONLD} />
      <ScrollVideoStory />
      <Hero />
      <div className="story-glass">
        <CapabilityStrip />
        <EditorialIntro />
        <WhatWeSolve variant="default" />
        <StatsBand />
      </div>
      <PinnedShowcase />
      <ParallaxBand ariaLabel="Technology built by people, for people">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <h2 className="text-h2 text-balance text-white">
            Technology built <span className="accent-word !text-[#FF5E1C]">by people, for people</span>
          </h2>
          <p className="max-w-2xl text-body-lg text-white/75">
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
                className="flex items-center gap-2.5 rounded-full border border-white/20 bg-black/25 px-4 py-2 text-small text-white/85 backdrop-blur-sm"
              >
                <chip.icon className="h-4 w-4 text-[#FF5E1C]" aria-hidden="true" />
                {chip.label}
              </li>
            ))}
          </ul>
        </Reveal>
      </ParallaxBand>
      <div className="story-glass">
        <ServicesOverview variant="default" />
        <CaseStudiesSection variant="default" />
      </div>
      <WhyChooseUs />
      <div className="story-glass">
        <ProcessTeaser />
        <Testimonials variant="default" />
      </div>
      <FinalCTA background="story" />
    </>
  )
}
