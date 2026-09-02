import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { trackEvent } from '@/lib/analytics'
import { ScrollTrigger } from '@/lib/gsap'

/**
 * Restores scroll position to top on route change, honours #hash anchors,
 * moves keyboard/screen-reader focus to the new page content, and reports
 * SPA page views to the dataLayer.
 */
export function ScrollManager() {
  const { pathname, hash } = useLocation()
  const firstRender = useRef(true)

  useEffect(() => {
    // Focus the main landmark on client-side navigation (not initial load)
    // so keyboard and screen-reader users land at the new page content.
    if (!firstRender.current && !hash) {
      const main = document.getElementById('main-content')
      main?.focus({ preventScroll: true })
    }
    firstRender.current = false

    if (hash) {
      // Wait a frame so the target section has rendered.
      requestAnimationFrame(() => {
        const el = document.querySelector<HTMLElement>(hash)
        if (el) {
          el.scrollIntoView({ behavior: 'auto', block: 'start' })
          return
        }
        window.scrollTo(0, 0)
      })
    } else {
      window.scrollTo(0, 0)
    }

    // New page, new layout: recompute every trigger's positions once the
    // lazy route chunk has painted.
    requestAnimationFrame(() => ScrollTrigger.refresh())
    trackEvent('page_view', { path: pathname })
  }, [pathname, hash])

  return null
}
