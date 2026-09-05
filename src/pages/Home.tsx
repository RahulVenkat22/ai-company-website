import { ArrowUpRight } from 'lucide-react'
import { Seo } from '@/lib/seo'
import { site } from '@/config/site'
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
import { ScrollVideoStory } from '@/components/ui/ScrollVideoStory'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'

const TITLE = 'AI Solutions, Agentic AI & Data Engineering'
const DESCRIPTION =
  'AI-first engineering: AI agents, agentic AI, RAG systems, data platforms and cloud solutions, taken from business problem to production for enterprise teams.'

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

/** One focused statement: headline, one paragraph, one action. */
function Intro() {
  return (
    <Section ariaLabel="Who we are">
      <Reveal className="flex max-w-4xl flex-col gap-8">
        <h2 className="text-h1 text-ink">
          We build the <span className="accent-word">intelligent systems</span> behind
          real business operations.
        </h2>
        <p className="max-w-[62ch] text-body-lg text-ink-muted">
          Knowledge assistants, agentic workflows, analytics platforms and the cloud
          they run on. One team carries the work from problem statement to production
          and stays accountable after launch.
        </p>
        <div>
          <Button
            variant="secondary"
            size="lg"
            to="/about#how-we-work"
            eventName="cta_click"
            eventParams={{ cta: 'how_we_work', location: 'intro' }}
            iconRight={<ArrowUpRight aria-hidden="true" />}
          >
            See how we work
          </Button>
        </div>
      </Reveal>
    </Section>
  )
}

/**
 * Homepage: promise (Hero) > breadth (capability strip + intro) > outcomes
 * (stacked panels) > capability facts > featured solutions (pinned
 * slideshow) > where to go deeper (services) > proof (case studies,
 * principles, reviews) > process > invitation.
 *
 * A single generated brand video (ScrollVideoStory) runs behind the whole
 * page, scrubbed by scroll. The Hero and FinalCTA are open windows onto it;
 * the other stretches sit inside `.story-glass` wrappers, translucent enough
 * that the structure stays visible while body copy stays legible.
 * PinnedShowcase and WhyChooseUs bring their own full-bleed photography.
 */
export default function Home() {
  return (
    <>
      <Seo title={TITLE} description={DESCRIPTION} path="/" jsonLd={HOME_JSONLD} />
      <ScrollVideoStory />
      <Hero />
      <div className="story-glass">
        <CapabilityStrip />
        <Intro />
        <WhatWeSolve />
        <StatsBand />
      </div>
      <PinnedShowcase />
      <div className="story-glass">
        <ServicesOverview />
        <CaseStudiesSection />
      </div>
      <WhyChooseUs />
      <div className="story-glass">
        <ProcessTeaser />
        <Testimonials />
      </div>
      <FinalCTA background="story" />
    </>
  )
}
