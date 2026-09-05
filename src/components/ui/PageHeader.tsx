import type { ReactNode } from 'react'
import { Container } from './Container'
import { Reveal } from './Reveal'
import { useParallax } from '@/lib/useParallax'

interface PageHeaderProps {
  title: ReactNode
  lead?: ReactNode
  /** Background photograph (public path). */
  image?: string
  /** Small mono line above the title (use sparingly). */
  kicker?: string
  /** Optional CTA buttons or extra content under the lead. */
  children?: ReactNode
}

/**
 * Top-of-page header for interior pages (the h1 lives here): a tall
 * full-bleed photograph with a scroll-linked push-in, copy anchored
 * bottom-left in display type. Always a dark scene, so colours are the
 * fixed scene/paper set.
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
    <div className="bg-window relative isolate flex min-h-[66svh] items-end overflow-hidden border-b border-line">
      <div
        ref={layerRef}
        className="parallax-layer -z-20"
        style={{ backgroundImage: `url(${image})` }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-t from-scene/90 via-scene/55 to-scene/35"
        aria-hidden="true"
      />
      <Container className="relative pb-14 pt-36 md:pb-18 lg:pb-22">
        <Reveal className="flex max-w-4xl flex-col gap-5">
          {kicker && (
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-paper/60">{kicker}</p>
          )}
          <h1 className="text-display text-paper">{title}</h1>
          {lead && <p className="max-w-2xl text-body-lg text-paper/75">{lead}</p>}
          {children && <div className="mt-2 flex flex-wrap gap-3">{children}</div>}
        </Reveal>
      </Container>
    </div>
  )
}
