import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { trackEvent } from '@/lib/analytics'
import { ScrollTrigger } from '@/lib/gsap'

/** How long to keep waiting for a lazy route chunk to render a #hash target. */
const HASH_TARGET_TIMEOUT_MS = 4000

/**
 * Restores scroll position to top on route change, honours #hash anchors,
 * moves keyboard/screen-reader focus to the new page content, and reports
 * SPA page views to the dataLayer.
 *
 * Pages are lazy-loaded, so on a cross-page link such as
 * `/contact#contact-form` the target section does not exist yet when the
 * location changes. The hash handler therefore polls each frame until the
 * element renders (or the timeout passes), then jumps to it and refreshes
 * ScrollTrigger so pinned sections measure the final layout.
 *
 * Every jump here is instant. The stylesheet sets `scroll-behavior: smooth`
 * for in-page links, but a route change must land on the new page at once,
 * and an animated scroll would be cut short by the ScrollTrigger refresh
 * that follows it.
 *
 * The effect keys on the router's per-navigation `key` as well, so clicking
 * the same anchor twice (already at `/contact#contact-form`, scrolled down,
 * pressing Start a project again) jumps back to the target.
 */

/** Scroll without the page-wide smooth behaviour, then restore it. */
function jumpInstantly(run: () => void) {
  const html = document.documentElement
  const previous = html.style.scrollBehavior
  html.style.scrollBehavior = 'auto'
  run()
  html.style.scrollBehavior = previous
}
export function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  const firstRender = useRef(true)
  const trackedPath = useRef<string | null>(null)

  useEffect(() => {
    // Focus the main landmark on client-side navigation (not initial load)
    // so keyboard and screen-reader users land at the new page content.
    if (!firstRender.current && !hash) {
      const main = document.getElementById('main-content')
      main?.focus({ preventScroll: true })
    }
    firstRender.current = false

    let frame = 0
    if (hash) {
      const deadline = performance.now() + HASH_TARGET_TIMEOUT_MS
      const findTarget = (): HTMLElement | null => {
        try {
          return document.querySelector<HTMLElement>(hash)
        } catch {
          return document.getElementById(hash.slice(1))
        }
      }
      const tryScroll = () => {
        const el = findTarget()
        if (el) {
          jumpInstantly(() => el.scrollIntoView({ block: 'start' }))
          // Move focus to the target so keyboard users continue from the
          // section they were sent to, without a second scroll.
          if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
          el.focus({ preventScroll: true })
          ScrollTrigger.refresh()
          return
        }
        if (performance.now() < deadline) {
          frame = requestAnimationFrame(tryScroll)
        } else {
          jumpInstantly(() => window.scrollTo(0, 0))
        }
      }
      frame = requestAnimationFrame(tryScroll)
    } else {
      jumpInstantly(() => window.scrollTo(0, 0))
    }

    // New page, new layout: recompute every trigger's positions once the
    // lazy route chunk has painted.
    const refresh = requestAnimationFrame(() => ScrollTrigger.refresh())
    // One page view per page, however many times its anchors are clicked.
    if (trackedPath.current !== pathname) {
      trackedPath.current = pathname
      trackEvent('page_view', { path: pathname })
    }

    return () => {
      cancelAnimationFrame(frame)
      cancelAnimationFrame(refresh)
    }
  }, [pathname, hash, key])

  return null
}
