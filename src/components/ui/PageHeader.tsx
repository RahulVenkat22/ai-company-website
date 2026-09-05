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
  /** Optional CTA buttons or extra content under the lead. */
  children?: ReactNode
}

/**
 * Consistent top-of-page header for interior pages (h1 lives here).
 * Renders a scroll-linked parallax photograph behind a dark gradient, so
 * text colors here are explicit (white/amber) rather than theme tokens.
 */
export function PageHeader({
  title,
  lead,
  image = '/images/band-office.jpg',
  children,
}: PageHeaderProps) {
  const layerRef = useParallax<HTMLDivElement>(0.25)

  return (
    <div className="bg-window relative isolate overflow-hidden border-b border-line">
      <div
        ref={layerRef}
        className="parallax-layer -z-20"
        style={{ backgroundImage: `url(${image})` }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0A0A0B]/90 via-[#0A0A0B]/75 to-[#0A0A0B]/55"
        aria-hidden="true"
      />
      <Container className="relative py-24 md:py-28 lg:py-32">
        <Reveal className="flex max-w-3xl flex-col gap-5 pt-8">
          <h1 className="text-h1 text-white">{title}</h1>
          {lead && <p className="max-w-2xl text-body-lg text-white/75">{lead}</p>}
          {children && <div className="mt-2 flex flex-wrap gap-3">{children}</div>}
        </Reveal>
      </Container>
    </div>
  )
}
