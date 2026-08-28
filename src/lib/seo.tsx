import { useEffect } from 'react'
import { site } from '@/config/site'

type JsonLd = Record<string, unknown>

export interface SeoProps {
  /** Page title — rendered as "<title> | <site name>". */
  title: string
  description: string
  /** Route path beginning with "/" used for the canonical URL. */
  path: string
  /** Open Graph type. */
  type?: 'website' | 'article'
  /** Additional JSON-LD blocks for this page. */
  jsonLd?: JsonLd | JsonLd[]
  /** Exclude from search indexes (e.g. the 404 page). Skips the canonical. */
  noindex?: boolean
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

const JSONLD_PAGE_ATTR = 'data-seo-jsonld-page'

/** Sitewide Organization + WebSite structured data, injected once. */
export function injectBaseJsonLd(): void {
  if (document.head.querySelector('[data-seo-jsonld-base]')) return
  const base = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: site.name,
      url: site.url,
      email: site.email,
      slogan: site.tagline,
      description: site.description,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: site.name,
      url: site.url,
    },
  ]
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.setAttribute('data-seo-jsonld-base', '')
  script.textContent = JSON.stringify(base)
  document.head.appendChild(script)
}

/**
 * Declarative per-page SEO for an SPA: title, description, canonical,
 * Open Graph, Twitter/X card and optional JSON-LD.
 */
export function Seo({
  title,
  description,
  path,
  type = 'website',
  jsonLd,
  noindex = false,
}: SeoProps) {
  useEffect(() => {
    const fullTitle = `${title} | ${site.name}`
    const canonical = `${site.url}${path === '/' ? '/' : path}`

    document.title = fullTitle
    upsertMeta('name', 'description', description)
    if (noindex) {
      upsertMeta('name', 'robots', 'noindex')
      document.head.querySelector('link[rel="canonical"]')?.remove()
    } else {
      document.head.querySelector('meta[name="robots"]')?.remove()
      upsertLink('canonical', canonical)
    }

    // Open Graph
    upsertMeta('property', 'og:site_name', site.name)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:url', canonical)
    upsertMeta('property', 'og:image', `${site.url}/og-image.png`)
    upsertMeta('property', 'og:image:width', '1200')
    upsertMeta('property', 'og:image:height', '630')
    upsertMeta(
      'property',
      'og:image:alt',
      'Engineering Intelligence for the Modern Enterprise — AI Agents, Agentic AI, RAG, Data, Cloud, Engineering',
    )

    // Twitter / X
    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', fullTitle)
    upsertMeta('name', 'twitter:description', description)
    upsertMeta('name', 'twitter:image', `${site.url}/og-image.png`)

    // Per-page JSON-LD (replaces the previous page's block)
    document.head
      .querySelectorAll(`[${JSONLD_PAGE_ATTR}]`)
      .forEach((el) => el.remove())
    if (jsonLd) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute(JSONLD_PAGE_ATTR, '')
      script.textContent = JSON.stringify(jsonLd)
      document.head.appendChild(script)
    }
  }, [title, description, path, type, jsonLd, noindex])

  return null
}
