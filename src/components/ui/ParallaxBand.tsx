import type { ReactNode } from 'react'
import { Container } from './Container'
import { useParallax } from '@/lib/useParallax'

interface ParallaxBandProps {
  /**
   * Background photo (public path, e.g. /images/band-collab.jpg). Omit to
   * make the band a transparent window onto the page's ScrollVideoStory
   * backdrop (homepage only) — the dark overlay still renders on top.
   */
  image?: string
  children: ReactNode
  id?: string
  className?: string
  /** Overlay darkness: 'strong' for text-heavy bands, 'soft' for accents. */
  overlay?: 'strong' | 'soft'
  ariaLabel?: string
}

/**
 * Full-bleed section acting as a window onto a viewport-fixed backdrop:
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
      data-video-window={image ? undefined : ''}
      className={`${image ? 'bg-window ' : ''}relative isolate overflow-hidden scroll-mt-20 ${className}`.trim()}
    >
      {image && (
        <div
          ref={layerRef}
          className="parallax-layer -z-10"
          style={{ backgroundImage: `url(${image})` }}
          aria-hidden="true"
        />
      )}
      {/* Windowed (video) mode keeps the overlay light so the band reads as
          the footage opening up, not a darker stripe than the glass around
          it; photo mode needs the heavier wash for legibility. */}
      <div
        className={`absolute inset-0 -z-10 ${
          image
            ? overlay === 'strong'
              ? 'bg-gradient-to-b from-[#0A0A0B]/85 via-[#0A0A0B]/70 to-[#0A0A0B]/85'
              : 'bg-[#0A0A0B]/60'
            : overlay === 'strong'
              ? 'bg-gradient-to-b from-[#0A0A0B]/40 via-[#0A0A0B]/25 to-[#0A0A0B]/40'
              : 'bg-[#0A0A0B]/20'
        }`}
        aria-hidden="true"
      />
      <Container className="section-pad relative">{children}</Container>
    </section>
  )
}
