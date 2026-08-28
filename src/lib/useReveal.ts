import { useEffect, useRef, useState } from 'react'

/**
 * IntersectionObserver hook powering the CSS scroll-reveal system.
 * Returns a ref to attach and whether the element has entered the viewport.
 * Reveals once and disconnects (no repeated animation on scroll-up).
 *
 * The huge top rootMargin makes everything at or ABOVE the viewport count as
 * intersecting. This is deliberate: during fast fling-scrolls an element can
 * jump from below the viewport to above it between two frames, in which case
 * a plain observer never fires and the content would stay invisible.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = {
    threshold: 0,
    rootMargin: '100000px 0px -40px 0px',
  },
) {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
          break
        }
      }
    }, options)
    observer.observe(el)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { ref, visible }
}
