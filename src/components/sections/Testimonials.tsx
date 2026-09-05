import { useCallback, useState } from 'react'
import { ArrowLeft, ArrowRight, Info } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { testimonials, TESTIMONIALS_DISCLAIMER } from '@/data/testimonials'

interface TestimonialsProps {
  variant?: 'default' | 'alt' | 'deep'
}

/**
 * Customer reviews — editorial slider: one serif pull-quote at a time with
 * the author's portrait alongside and circular prev/next controls. The
 * quote block is a live region so screen readers hear the change; the
 * fade between quotes is a keyed CSS transition, no animation library.
 */
export function Testimonials({ variant = 'default' }: TestimonialsProps) {
  const [index, setIndex] = useState(0)
  const count = testimonials.length
  const t = testimonials[index]

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + count) % count),
    [count],
  )

  return (
    <Section id="testimonials" variant={variant} ariaLabel="Customer reviews">
      <div className="grid items-center gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
        <Reveal className="flex flex-col gap-8">
          <p className="inline-flex items-center gap-3 font-mono text-caption uppercase tracking-[0.22em] text-accent">
            <span className="h-px w-8 bg-accent/70" aria-hidden="true" />
            Customer reviews
          </p>

          <div aria-live="polite">
            {/* key remounts the block so the CSS reveal replays per quote */}
            <blockquote key={index} className="reveal is-visible flex flex-col gap-7">
              <p className="text-h2 text-ink">
                <span className="text-primary" aria-hidden="true">
                  &ldquo;
                </span>
                {t.quote}
                <span className="text-primary" aria-hidden="true">
                  &rdquo;
                </span>
              </p>
              <footer>
                <p className="text-body font-semibold text-ink">{t.name}</p>
                <p className="mt-1 text-small text-ink-subtle">{t.role}</p>
              </footer>
            </blockquote>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous review"
              className="grid h-12 w-12 place-items-center rounded-full border border-ink/25 text-ink transition-colors hover:border-ink hover:bg-surface-2"
            >
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next review"
              className="grid h-12 w-12 place-items-center rounded-full bg-primary text-ink-inverse transition-colors hover:bg-primary-hover"
            >
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
            <p className="ml-2 font-serif text-xl text-ink-subtle">
              {String(index + 1).padStart(2, '0')}
              <span className="mx-2 text-ink-subtle/60">/</span>
              {String(count).padStart(2, '0')}
            </p>
          </div>
        </Reveal>

        <Reveal delay={120} className="photo-frame mx-auto aspect-[45/53] w-full max-w-sm lg:mx-0">
          <img
            key={t.image}
            src={t.image}
            alt={`Portrait of ${t.name}`}
            loading="lazy"
            width={480}
            height={560}
            className="h-full w-full object-cover"
          />
        </Reveal>
      </div>

      <Reveal variant="fade" className="mt-10">
        <p className="inline-flex items-center gap-2 text-caption text-ink-subtle">
          <Info className="h-3.5 w-3.5" aria-hidden="true" />
          {TESTIMONIALS_DISCLAIMER}
        </p>
      </Reveal>
    </Section>
  )
}
