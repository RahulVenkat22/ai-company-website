/**
 * Capability band directly under the hero (prompt.md §8) — restyled as a
 * giant editorial serif word marquee with small inline photographs punched
 * between the words. Text capabilities only — no vendor or partner logos,
 * so nothing implies a partnership or certification. Implemented as an
 * accessible marquee: the scrolling track is aria-hidden and duplicated 2x
 * for a seamless loop, with a static sr-only sentence carrying the content
 * for assistive technology. Reduced motion is handled globally (animations
 * are disabled in CSS), which leaves the first copy visible as a static
 * strip.
 */

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/lib/gsap'

const CAPABILITIES: Array<{ word: string; image?: string }> = [
  { word: 'AI', image: '/images/expertise/generative-ai.jpg' },
  { word: 'Data' },
  { word: 'Cloud', image: '/images/expertise/enterprise-ai.jpg' },
  { word: 'Analytics' },
  { word: 'Automation', image: '/images/expertise/ai-automation.jpg' },
  { word: 'Engineering' },
]

interface CapabilityStripProps {
  /** Background band; the strip is bespoke, so this maps to classes. */
  variant?: 'default' | 'alt' | 'deep'
}

const variantClasses: Record<NonNullable<CapabilityStripProps['variant']>, string> = {
  default: 'bg-surface',
  alt: 'bg-surface-2',
  deep: 'bg-surface-2/60',
}

/** One run of the capability words; rendered twice for the seamless loop. */
function StripRun() {
  return (
    <ul className="flex shrink-0 items-center">
      {CAPABILITIES.map(({ word, image }) => (
        <li key={word} className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12">
          <span className="whitespace-nowrap font-serif text-[clamp(2.75rem,6vw,5.5rem)] leading-none tracking-tight text-ink">
            {word}
          </span>
          {image ? (
            <span
              className="block h-[clamp(2.5rem,4.5vw,4rem)] w-[clamp(4.5rem,9vw,8rem)] shrink-0 rounded-full bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
            />
          ) : (
            <span className="block h-2 w-2 shrink-0 rounded-full bg-primary" />
          )}
        </li>
      ))}
    </ul>
  )
}

export function CapabilityStrip({ variant = 'default' }: CapabilityStripProps) {
  const wrapRef = useRef<HTMLDivElement>(null)

  // Scroll-velocity skew: the marquee leans into fast scrolls and eases
  // back upright when scrolling settles. Purely decorative (aria-hidden).
  useEffect(() => {
    const el = wrapRef.current
    if (!el || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      const skewTo = gsap.quickTo(el, 'skewX', { duration: 0.4, ease: 'power2.out' })
      const settle = gsap.delayedCall(0.15, () => skewTo(0)).pause()
      ScrollTrigger.create({
        onUpdate: (self) => {
          skewTo(gsap.utils.clamp(-6, 6, self.getVelocity() / -400))
          settle.restart(true)
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="capabilities"
      aria-label="Core capabilities"
      className={`scroll-mt-20 border-y border-line ${variantClasses[variant]}`}
    >
      <p className="sr-only">
        Our core capabilities: AI, data, cloud, analytics, automation and software engineering.
      </p>
      <div ref={wrapRef} className="overflow-hidden py-10 md:py-14" aria-hidden="true">
        <div className="flex w-max animate-marquee">
          <StripRun />
          <StripRun />
        </div>
      </div>
    </section>
  )
}
