import { useEffect, useRef } from 'react'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { gsap, prefersReducedMotion } from '@/lib/gsap'

/**
 * Four facts about the capability map: counts of disciplines, platforms and
 * process stages. Verifiable from this site's own content, NOT invented
 * client or revenue metrics (prompt.md 45 credibility rules). Numerals count
 * up once on first reveal (GSAP); reduced motion renders the final values.
 */

const STATS: Array<{ value: number; label: string }> = [
  { value: 14, label: 'AI capability areas' },
  { value: 22, label: 'Engineering disciplines' },
  { value: 3, label: 'Major cloud platforms' },
  { value: 6, label: 'Delivery stages, problem to production' },
]

export function StatsBand() {
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const list = listRef.current
    if (!list || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-count]', list).forEach((el) => {
        const target = Number(el.dataset.count)
        const state = { value: 0 }
        gsap.to(state, {
          value: target,
          duration: 1.4,
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
    <Section ariaLabel="Capability facts" className="!pt-0">
      <ul
        ref={listRef}
        className="grid list-none grid-cols-2 border-t border-line lg:grid-cols-4"
      >
        {STATS.map(({ value, label }, i) => (
          <Reveal
            as="li"
            key={label}
            delay={i * 80}
            className={`flex flex-col gap-3 py-8 pr-6 md:py-10 ${
              i % 2 === 1 ? 'border-l border-line pl-6' : ''
            } ${i >= 2 ? 'border-t border-line lg:border-t-0' : ''} ${
              i === 2 ? 'lg:border-l lg:pl-6' : ''
            }`}
          >
            <p className="tnum text-[clamp(3rem,5.4vw,4.75rem)] font-medium leading-none tracking-[-0.045em] text-ink">
              <span data-count={value}>{value}</span>
            </p>
            <p className="max-w-[16ch] text-small text-ink-muted">{label}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
