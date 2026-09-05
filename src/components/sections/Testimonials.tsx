import { useReducedMotion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { testimonials, type Testimonial } from '@/data/testimonials'

interface TestimonialsProps {
  variant?: 'default' | 'alt' | 'deep'
}

/**
 * Customer reviews as two continuously moving rows of text cards (no
 * portraits, no controls). The rows run in opposite directions and never
 * pause: the motion is a pure CSS marquee (translateX to -50% over a
 * duplicated track), so it costs nothing on the main thread and keeps
 * going while the visitor scrolls, hovers or taps.
 *
 * Accessibility: the moving tracks are aria-hidden and a static, visually
 * hidden list carries every review for assistive technology. Under
 * prefers-reduced-motion the section renders the same reviews as a static
 * responsive grid instead, so nothing moves and nothing is clipped.
 */
export function Testimonials({ variant = 'default' }: TestimonialsProps) {
  const reduce = useReducedMotion()
  // Cards sit on the page colour inside a surface band, and on the surface
  // colour on the page background, so they always read as raised panels.
  const cardSurface = variant === 'alt' ? 'bg-bg' : 'bg-surface'

  // Alternate reviews across the two rows so both rows read as a mix.
  const rows = [
    testimonials.filter((_, i) => i % 2 === 0),
    testimonials.filter((_, i) => i % 2 === 1),
  ]

  return (
    <Section id="testimonials" variant={variant} bleed>
      <Container>
        <SectionHeading
          title="Customer reviews"
          lead="Illustrative quotes from the kinds of teams we work with. Approved client reviews will replace them before launch."
        />
      </Container>

      {reduce ? (
        <Container>
          <ul className="grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((review) => (
              <li key={review.name}>
                <ReviewCard review={review} className={cardSurface} />
              </li>
            ))}
          </ul>
        </Container>
      ) : (
        <>
          <ul className="sr-only">
            {testimonials.map((review) => (
              <li key={review.name}>
                <ReviewCard review={review} />
              </li>
            ))}
          </ul>
          <Reveal variant="fade" className="flex flex-col gap-4">
            <MarqueeRow items={rows[0]} durationSeconds={85} cardSurface={cardSurface} />
            <MarqueeRow items={rows[1]} durationSeconds={95} cardSurface={cardSurface} reverse />
          </Reveal>
        </>
      )}
    </Section>
  )
}

interface MarqueeRowProps {
  items: Testimonial[]
  /** Seconds for one full loop; the two rows differ so they drift apart. */
  durationSeconds: number
  cardSurface: string
  reverse?: boolean
}

/**
 * One endless row. The track holds two identical copies of the list and
 * slides by exactly half its width per loop, so the seam never shows. Each
 * copy carries the inter-card gap as trailing padding, which keeps the
 * distance between the last card and the first card of the next copy
 * identical to every other gap.
 */
function MarqueeRow({ items, durationSeconds, cardSurface, reverse = false }: MarqueeRowProps) {
  const copy = (
    <ul className="flex shrink-0 list-none items-stretch gap-4 pr-4">
      {items.map((review) => (
        <li key={review.name} className="flex w-[min(22rem,80vw)] shrink-0">
          <ReviewCard review={review} className={cardSurface} />
        </li>
      ))}
    </ul>
  )

  return (
    <div className="edge-fade-x overflow-hidden" aria-hidden="true">
      <div
        className={`flex w-max animate-marquee will-change-transform ${
          reverse ? 'animate-marquee-reverse' : ''
        }`}
        style={{ animationDuration: `${durationSeconds}s` }}
      >
        {copy}
        {copy}
      </div>
    </div>
  )
}

function ReviewCard({ review, className = '' }: { review: Testimonial; className?: string }) {
  return (
    <blockquote
      className={`flex h-full w-full flex-col justify-between gap-6 rounded-card border border-line p-6 md:p-7 ${className}`.trim()}
    >
      <p className="text-body text-ink">
        <span aria-hidden="true" className="text-primary">
          &ldquo;
        </span>
        {review.quote}
        <span aria-hidden="true" className="text-primary">
          &rdquo;
        </span>
      </p>
      <footer>
        <p className="text-small font-medium text-ink">{review.name}</p>
        <p className="mt-1 text-caption text-ink-subtle">{review.role}</p>
      </footer>
    </blockquote>
  )
}
