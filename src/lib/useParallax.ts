import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from './gsap'

/**
 * Cinematic zoom for a fixed-window background (`.parallax-layer` inside a
 * `.bg-window` section): the image is pinned to the viewport by CSS while
 * the page scrolls over it, and this hook scrubs a slow push-in as the
 * section crosses the screen: the "background scroll" look of modern
 * photography sites. Scale only ever grows from 1, so no edges appear.
 *
 * `speed` (kept from the old API) sets zoom depth: 0.2-0.3 ≈ 8-12%.
 * No-ops under prefers-reduced-motion (CSS keeps the layer static).
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(speed = 0.22) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    const parent = el?.parentElement
    if (!el || !parent) return
    if (prefersReducedMotion()) return

    const zoom = 1 + Math.min(speed * 0.4, 0.14)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scale: 1 },
        {
          scale: zoom,
          ease: 'none',
          scrollTrigger: {
            trigger: parent,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      )
    })

    return () => ctx.revert()
  }, [speed])

  return ref
}
