import { useEffect, useRef, type ReactNode } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'

interface DriftProps {
  children: ReactNode
  /**
   * Vertical drift amplitude in px while the element crosses the viewport;
   * negative values drift the opposite way. Keep it subtle (10–35).
   */
  amp?: number
  className?: string
}

/**
 * Scroll-scrubbed vertical drift for decorative depth: neighbouring elements
 * given different amplitudes move at different speeds, like the layered
 * collages on modern portfolio sites. Reduced motion: renders static.
 */
export function Drift({ children, amp = 24, className = '' }: DriftProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: amp },
        {
          y: -amp,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    })

    return () => ctx.revert()
  }, [amp])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
