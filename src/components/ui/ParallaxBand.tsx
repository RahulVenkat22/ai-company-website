import type { ReactNode } from 'react'
import { Container } from './Container'
import { useParallax } from '@/lib/useParallax'

interface ParallaxBandProps {
  /** Background photo (public path, e.g. /images/band-collab.jpg). */
  image: string
  children: ReactNode
  id?: string
  className?: string
  /** Overlay darkness: 'strong' for text-heavy bands, 'soft' for accents. */
  overlay?: 'strong' | 'soft'
  ariaLabel?: string
}

/**
 * Full-bleed section acting as a window onto a viewport-fixed photograph:
 * the page scrolls over the image while the image itself stays put, with a
 * slow scrubbed zoom (useParallax). Content is always rendered on dark, so
 * use explicit white/amber text classes rather than theme tokens.
 */
export function ParallaxBand({
  image,
  children,
  id,
  className = '',
  overlay = 'strong',
  ariaLabel,
}: ParallaxBandProps) {
  const layerRef = useParallax<HTMLDivElement>()

  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`bg-window relative isolate overflow-hidden scroll-mt-20 ${className}`.trim()}
    >
      <div
        ref={layerRef}
        className="parallax-layer -z-10"
        style={{ backgroundImage: `url(${image})` }}
        aria-hidden="true"
      />
      <div
        className={`absolute inset-0 -z-10 ${
          overlay === 'strong'
            ? 'bg-gradient-to-b from-[#0C0C1D]/85 via-[#141433]/75 to-[#0C0C1D]/85'
            : 'bg-[#0C0C1D]/60'
        }`}
        aria-hidden="true"
      />
      <Container className="section-pad relative">{children}</Container>
    </section>
  )
}
