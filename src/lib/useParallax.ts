import { useEffect, useRef } from 'react'

/**
 * Scroll-linked parallax. Attach the returned ref to an oversized
 * `.parallax-layer` element; while its parent section is on screen the layer
 * is translated vertically at `speed` × scroll delta (rAF-throttled,
 * transform-only so it stays on the compositor). No-ops entirely under
 * prefers-reduced-motion — the CSS fallback pins the layer to the section.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(speed = 0.22) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    const parent = el?.parentElement
    if (!el || !parent) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let raf = 0

    const update = () => {
      raf = 0
      const rect = parent.getBoundingClientRect()
      // Distance of the section's center from the viewport's center.
      const delta = rect.top + rect.height / 2 - window.innerHeight / 2
      el.style.transform = `translate3d(0, ${(delta * speed).toFixed(1)}px, 0)`
    }

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [speed])

  return ref
}
