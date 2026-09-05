/**
 * Capability strip under the hero: the page's ONE marquee. Large capability
 * words run in a single line with small photographs punched between them,
 * which says "breadth" in one glance without a logo wall we cannot truthfully
 * show. Text capabilities only, no vendor or partner logos. Accessible
 * marquee: the scrolling track is aria-hidden and duplicated for a seamless
 * loop, with a static sr-only sentence carrying the content. Reduced motion
 * disables the animation globally, leaving the first copy as a static strip.
 */

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap'

const CAPABILITIES: Array<{ word: string; image?: string }> = [
  { word: 'AI agents', image: '/images/expertise/system-lattice.jpg' },
  { word: 'RAG' },
  { word: 'Data platforms', image: '/images/expertise/decision-support.jpg' },
  { word: 'Machine learning' },
  { word: 'Cloud', image: '/images/expertise/enterprise-ai.jpg' },
  { word: 'Automation' },
  { word: 'Software engineering', image: '/images/expertise/solution-architecture.jpg' },
]

function StripRun() {
  return (
    <ul className="flex shrink-0 items-center">
      {CAPABILITIES.map(({ word, image }) => (
        <li key={word} className="flex shrink-0 items-center gap-7 pr-7 sm:gap-10 sm:pr-10">
          <span className="whitespace-nowrap text-[clamp(2rem,4.4vw,4rem)] font-medium leading-none tracking-[-0.035em] text-ink/90">
            {word}
          </span>
          {image ? (
            <span
              className="block h-[clamp(2.25rem,3.6vw,3.5rem)] w-[clamp(4rem,6.6vw,6.25rem)] shrink-0 rounded-btn bg-cover bg-center grayscale-[0.5]"
              style={{ backgroundImage: `url(${image})` }}
            />
          ) : (
            <span className="block h-7 w-px shrink-0 rotate-[18deg] bg-line-strong" />
          )}
        </li>
      ))}
    </ul>
  )
}

export function CapabilityStrip() {
  const wrapRef = useRef<HTMLDivElement>(null)

  // Scroll-velocity lean: the strip tilts into fast scrolls and settles
  // upright, so it feels attached to the page's momentum. Decorative.
  useEffect(() => {
    const el = wrapRef.current
    if (!el || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      const skewTo = gsap.quickTo(el, 'skewX', { duration: 0.4, ease: 'power2.out' })
      const settle = gsap.delayedCall(0.15, () => skewTo(0)).pause()
      ScrollTrigger.create({
        onUpdate: (self) => {
          skewTo(gsap.utils.clamp(-5, 5, self.getVelocity() / -450))
          settle.restart(true)
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="capabilities" aria-label="Core capabilities" className="scroll-mt-20 border-y border-line">
      <p className="sr-only">
        Our core capabilities: AI agents, RAG, data platforms, machine learning, cloud, automation and
        software engineering.
      </p>
      <div ref={wrapRef} className="overflow-hidden py-9 md:py-12" aria-hidden="true">
        <div className="flex w-max animate-marquee [animation-duration:46s]">
          <StripRun />
          <StripRun />
        </div>
      </div>
    </section>
  )
}
