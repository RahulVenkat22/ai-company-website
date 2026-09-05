import type { ReactNode } from 'react'
import { Container } from './Container'
import { Reveal } from './Reveal'
import { useParallax } from '@/lib/useParallax'

interface PageHeaderProps {
  title: ReactNode
  lead?: ReactNode
  /**
   * Background photograph (public path). Every interior page gets a photo
   * header by default; pass a page-specific image to vary it.
   */
  image?: string
  /** Small mono line above the title (defaults to nothing). */
  kicker?: string
  /** Optional CTA buttons or extra content under the lead. */
  children?: ReactNode
}

/**
 * Editorial top-of-page header for interior pages (h1 lives here): a tall
 * full-bleed photograph with a scroll-linked parallax, content pinned to
 * the lower-left in giant serif display type — the "property hero" look.
 * Text colors here are explicit white rather than theme tokens.
 */
export function PageHeader({
  title,
  lead,
  image = '/images/band-office.jpg',
  kicker,
  children,
}: PageHeaderProps) {
  const layerRef = useParallax<HTMLDivElement>(0.25)

  return (
    <div className="bg-window relative isolate flex min-h-[68svh] items-end overflow-hidden border-b border-line">
      <div
        ref={layerRef}
        className="parallax-layer -z-20"
        style={{ backgroundImage: `url(${image})` }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-[#130F0D]/85 via-[#130F0D]/45 to-[#130F0D]/35"
        aria-hidden="true"
      />
      <Container className="relative pb-14 pt-36 md:pb-18 lg:pb-22">
        <Reveal className="flex max-w-4xl flex-col gap-5">
          {kicker && (
            <p className="inline-flex items-center gap-3 font-mono text-caption uppercase tracking-[0.22em] text-white/70">
              <span className="h-px w-8 bg-[#FF5E1C]" aria-hidden="true" />
              {kicker}
            </p>
          )}
          <h1 className="text-display text-white">{title}</h1>
          {lead && <p className="max-w-2xl text-body-lg text-white/80">{lead}</p>}
          {children && <div className="mt-2 flex flex-wrap gap-3">{children}</div>}
        </Reveal>
      </Container>
    </div>
  )
}
