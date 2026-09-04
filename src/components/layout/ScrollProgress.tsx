import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'

/**
 * Thin scroll-progress bar under the fixed navbar — the page is long enough
 * (20+ home sections) that a sense of position genuinely helps. Scrubbed via
 * ScrollTrigger; hidden entirely under reduced motion and from assistive
 * tech (purely decorative).
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bar,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'max',
            scrub: 0.3,
          },
        },
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[55] h-0.5"
    >
      <div
        ref={barRef}
        className="h-full origin-left scale-x-0 bg-primary"
      />
    </div>
  )
}
