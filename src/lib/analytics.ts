/**
 * Analytics: Google Tag Manager + Google Analytics 4.
 *
 * The IDs below are placeholders. Until they are replaced with real IDs the
 * loader is a no-op, so no third-party scripts are ever requested — keeping
 * the site fast and privacy-safe by default. Events are still pushed to
 * window.dataLayer so GTM picks them up once configured.
 *
 * Consent (see ConsentBanner): scripts load only after the visitor accepts.
 */

export const GTM_ID = 'GTM-[TBD]'
export const GA4_ID = 'G-[TBD]'

const CONSENT_KEY = 'analytics-consent'

export type ConsentState = 'granted' | 'denied' | null

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

const isGtmConfigured = () => /^GTM-[A-Z0-9]+$/.test(GTM_ID)
const isGa4Configured = () => /^G-[A-Z0-9]+$/.test(GA4_ID)

export function getConsent(): ConsentState {
  try {
    const v = localStorage.getItem(CONSENT_KEY)
    return v === 'granted' || v === 'denied' ? v : null
  } catch {
    return null
  }
}

export function setConsent(state: Exclude<ConsentState, null>): void {
  try {
    localStorage.setItem(CONSENT_KEY, state)
  } catch {
    /* storage unavailable — continue without persisting */
  }
  if (state === 'granted') loadAnalytics()
}

let loaded = false

/** Injects the GTM/GA4 loader script. Safe to call multiple times. */
export function loadAnalytics(): void {
  if (loaded) return
  window.dataLayer = window.dataLayer || []

  if (isGtmConfigured()) {
    loaded = true
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`
    document.head.appendChild(script)
  } else if (isGa4Configured()) {
    loaded = true
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`
    document.head.appendChild(script)
    // gtag.js only executes commands pushed as an Arguments object (the
    // official snippet pattern) — a plain array or object is ignored.
    function gtag(..._args: unknown[]) {
      void _args
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments as unknown as Record<string, unknown>)
    }
    gtag('js', new Date())
    gtag('config', GA4_ID)
  }
  // With placeholder IDs nothing is loaded — intentional.
}

/** Called once at startup: resumes analytics if consent was already granted. */
export function initAnalytics(): void {
  window.dataLayer = window.dataLayer || []
  if (getConsent() === 'granted') loadAnalytics()
}

/**
 * Track a business event. Events are buffered on the dataLayer even before
 * GTM loads, so nothing is lost.
 *
 * Standard events used across the site:
 *  - cta_click            { cta, location }
 *  - nav_cta_click        { location }
 *  - consultation_cta_click { location }
 *  - contact_form_open    {}
 *  - contact_form_submit  { project_type }
 *  - page_view            { path }
 */
export function trackEvent(
  name: string,
  params: Record<string, string | number | boolean> = {},
): void {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: name, ...params })
}
