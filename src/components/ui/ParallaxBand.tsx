import type { ReactNode } from 'react'
import { Container } from './Container'
import { useParallax } from '@/lib/useParallax'

interface ParallaxBandProps {
  /**
   * Background photo (public path). Omit to make the band a transparent
   * window onto the page's ScrollVideoStory backdrop (homepage only); the
   * scrim still renders on top.
   */
  image?: string
  children: ReactNode
  id?: string
  className?: string
  /** Scrim depth: 'strong' for text-heavy bands, 'soft' for accents. */
  overlay?: 'strong' | 'soft'
  ariaLabel?: string
}

/**
 * Full-bleed section acting as a window onto a viewport-fixed backdrop: the
 * page scrolls over the image while the image stays put, with a slow
 * scrubbed zoom (useParallax). Always a dark scene, so content uses the
 * fixed paper/signal colours rather than theme tokens.
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

  const scrim = image
    ? overlay === 'strong'
      ? 'bg-gradient-to-b from-scene/85 via-scene/70 to-scene/85'
      : 'bg-scene/60'
    : overlay === 'strong'
      ? 'bg-gradient-to-b from-scene/60 via-scene/45 to-scene/70'
      : 'bg-scene/35'

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
      <div className={`absolute inset-0 -z-10 ${scrim}`} aria-hidden="true" />
      <Container className="section-pad relative">{children}</Container>
    </section>
  )
}
