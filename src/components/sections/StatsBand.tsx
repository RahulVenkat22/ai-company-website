import { useEffect, useRef } from 'react'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { gsap, prefersReducedMotion } from '@/lib/gsap'

/**
 * Editorial stats band: a drifting photo filmstrip above four serif
 * count-up figures. Every figure is a verifiable fact about our
 * capability map — counts of disciplines, platforms and process stages —
 * NOT invented client/revenue metrics (prompt.md §45 credibility rules).
 * Numbers count up once on first reveal (GSAP); reduced motion renders
 * the final values statically.
 */

const STRIP_IMAGES = [
  '/images/expertise/generative-ai.jpg',
  '/images/expertise/ai-agents.jpg',
  '/images/expertise/rag.jpg',
  '/images/expertise/ai-automation.jpg',
  '/images/expertise/multi-agent.jpg',
  '/images/expertise/solution-architecture.jpg',
  '/images/expertise/document-processing.jpg',
]

const STATS: Array<{ value: number; suffix: string; label: string }> = [
  { value: 14, suffix: '', label: 'AI capability areas' },
  { value: 22, suffix: '', label: 'Engineering disciplines' },
  { value: 3, suffix: '', label: 'Major cloud platforms' },
  { value: 6, suffix: '', label: 'Delivery stages, problem to production' },
]

function StripRun() {
  return (
    <div className="flex shrink-0 items-center gap-5 pr-5">
      {STRIP_IMAGES.map((src, i) => (
        <span
          key={src}
          className={`block shrink-0 rounded-card bg-cover bg-center ${
            i % 3 === 1 ? 'h-40 w-72 md:h-48 md:w-96' : 'h-32 w-44 md:h-40 md:w-56'
          }`}
          style={{ backgroundImage: `url(${src})` }}
        />
      ))}
    </div>
  )
}

export function StatsBand() {
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const list = listRef.current
    if (!list || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      const nums = gsap.utils.toArray<HTMLElement>('[data-count]', list)
      nums.forEach((el) => {
        const target = Number(el.dataset.count)
        const state = { value: 0 }
        gsap.to(state, {
          value: target,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          onUpdate: () => {
            el.textContent = String(Math.round(state.value))
          },
        })
      })
    }, list)

    return () => ctx.revert()
  }, [])

  return (
    <Section ariaLabel="Capability facts" className="overflow-hidden">
      {/* Decorative filmstrip marquee */}
      <div className="-mx-4 mb-14 overflow-hidden sm:-mx-6 lg:-mx-8" aria-hidden="true">
        <div className="flex w-max animate-marquee [animation-duration:52s]">
          <StripRun />
          <StripRun />
        </div>
      </div>

      <ul
        ref={listRef}
        className="grid list-none grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4"
      >
        {STATS.map(({ value, suffix, label }, i) => (
          <Reveal as="li" key={label} delay={i * 90} className="flex flex-col gap-2 border-l border-line pl-5">
            <p className="font-serif text-[clamp(3.25rem,6vw,5.5rem)] leading-none text-ink">
              <span data-count={value}>{value}</span>
              {suffix}
              <span className="text-primary">.</span>
            </p>
            <p className="text-small text-ink-muted">{label}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
