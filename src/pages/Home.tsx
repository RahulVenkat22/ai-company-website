import { Seo } from '@/lib/seo'
import { site } from '@/config/site'
import { Hero } from '@/components/sections/Hero'
import { CapabilityStrip } from '@/components/sections/CapabilityStrip'
import { WhatWeSolve } from '@/components/sections/WhatWeSolve'
import { ServicesOverview } from '@/components/sections/ServicesOverview'
import { CaseStudiesSection } from '@/components/sections/CaseStudiesSection'
import { WhyChooseUs } from '@/components/sections/WhyChooseUs'
import { Testimonials } from '@/components/sections/Testimonials'
import { FinalCTA } from '@/components/sections/FinalCTA'
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
 * Homepage — a curated overview, not the whole story: promise (Hero) →
 * breadth (strip) → outcomes we deliver (WhatWeSolve) → where to go deeper
 * (ServicesOverview links to the service pages) → proof (case studies,
 * differentiators, testimonials) → invitation. The capability deep-dives
 * (RAG, agents, ML, cloud, stack, process…) live on their own pages:
 * /ai-solutions, /data-analytics, /cloud, /technology, /services, /about.
 *
 * A fixed three-video robot story (ScrollVideoStory) runs behind the whole
 * page, its playback scrubbed by scroll position. The Hero, both
 * ParallaxBands and the FinalCTA are fully transparent windows onto it;
 * every other stretch of content sits inside a `.story-glass` wrapper —
 * translucent enough that the footage stays visible while scrolling, dense
 * enough that body copy stays legible.
 */
export default function Home() {
  return (
    <>
      <Seo title={TITLE} description={DESCRIPTION} path="/" jsonLd={HOME_JSONLD} />
      <ScrollVideoStory />
      <Hero />
      <div className="story-glass">
        <CapabilityStrip />
        <WhatWeSolve variant="default" />
        <ServicesOverview variant="alt" />
      </div>
      <ParallaxBand ariaLabel="Technology built by people, for people">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <h2 className="text-h2 text-balance text-white">
            Technology built <span className="accent-word">by people, for people</span>
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
                className="flex items-center gap-2.5 rounded border border-white/20 bg-black/25 px-3.5 py-2 text-small text-white/85 backdrop-blur-sm"
              >
                <chip.icon className="h-4 w-4 text-[#EBB046]" aria-hidden="true" />
                {chip.label}
              </li>
            ))}
          </ul>
        </Reveal>
      </ParallaxBand>
      <div className="story-glass">
        <CaseStudiesSection variant="default" />
        <WhyChooseUs variant="alt" />
      </div>
      <ParallaxBand overlay="soft" ariaLabel="From idea to production">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
          <p className="inline-flex items-center gap-3 font-mono text-caption uppercase tracking-[0.2em] text-white/70">
            <span className="h-px w-7 bg-[#FF5E1C]" aria-hidden="true" />
            From idea to production
          </p>
          <h2 className="text-h2 text-balance text-white">
            Big ambitions deserve engineering that ships
          </h2>
          <p className="max-w-2xl text-body-lg text-white/75">
            We take AI from whiteboard to production — architected deliberately,
            tested thoroughly and deployed securely to the cloud.
          </p>
        </Reveal>
      </ParallaxBand>
      <div className="story-glass">
        <Testimonials variant="default" />
      </div>
      <FinalCTA background="story" />
    </>
  )
}
