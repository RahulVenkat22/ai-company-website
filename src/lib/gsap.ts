import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Single GSAP entry point: registers ScrollTrigger exactly once and re-exports.
 * Import gsap/ScrollTrigger from here, never from 'gsap' directly, so every
 * consumer shares one plugin registration.
 */
gsap.registerPlugin(ScrollTrigger)

/** True when the user asked for reduced motion; checked at effect setup. */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export { gsap, ScrollTrigger }
