import { useCallback, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { testimonials } from '@/data/testimonials'

interface TestimonialsProps {
  variant?: 'default' | 'alt' | 'deep'
}

const quoteVariants = {
  visible: { opacity: 1, y: 0, visibility: 'visible' as const },
  hidden: { opacity: 0, y: 10, transitionEnd: { visibility: 'hidden' as const } },
}

/**
 * Customer reviews: one pull-quote at a time with the author's portrait
 * alongside and square prev/next controls. All quotes share one grid cell,
 * so the block reserves the height of the LONGEST quote and the controls
 * never move. The crossfade between quotes and the portrait swap are Framer
 * Motion state transitions. The wrapper is a live region; hidden quotes end
 * as visibility:hidden, which also removes them from the accessibility tree.
 */
export function Testimonials({ variant = 'default' }: TestimonialsProps) {
  const [index, setIndex] = useState(0)
  const reduce = useReducedMotion()
  const count = testimonials.length
  const active = testimonials[index]

  const go = useCallback((dir: 1 | -1) => setIndex((i) => (i + dir + count) % count), [count])

  const controlClass =
    'inline-flex h-11 w-11 items-center justify-center rounded-btn border border-line-strong text-ink transition-colors hover:border-ink/50 hover:bg-surface-2 active:scale-[0.98]'

  return (
    <Section id="testimonials" variant={variant} ariaLabel="Customer reviews">
      <div className="grid items-center gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
        <Reveal className="flex flex-col gap-8">
          <p className="eyebrow">Customer reviews</p>

          <div aria-live="polite" className="grid">
            {testimonials.map((t, i) => (
              <motion.blockquote
                key={t.name}
                aria-hidden={i !== index}
                className="col-start-1 row-start-1 flex flex-col gap-7"
                initial={false}
                animate={i === index ? 'visible' : 'hidden'}
                variants={quoteVariants}
                transition={{ duration: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-h2 text-ink">&ldquo;{t.quote}&rdquo;</p>
                <footer>
                  <p className="text-body font-medium text-ink">{t.name}</p>
                  <p className="mt-1 text-small text-ink-subtle">{t.role}</p>
                </footer>
              </motion.blockquote>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button type="button" className={controlClass} onClick={() => go(-1)} aria-label="Previous review">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button type="button" className={controlClass} onClick={() => go(1)} aria-label="Next review">
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <p className="tnum ml-2 text-small text-ink-subtle" aria-live="polite">
              {index + 1} of {count}
            </p>
          </div>
        </Reveal>

        <Reveal delay={120} className="photo-frame mx-auto aspect-[4/5] w-full max-w-sm lg:mx-0 lg:ml-auto">
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={active.image}
              src={active.image}
              alt={`Portrait of ${active.name}`}
              loading="lazy"
              width={480}
              height={600}
              className="h-full w-full object-cover"
              initial={reduce ? false : { opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            />
          </AnimatePresence>
        </Reveal>
      </div>
    </Section>
  )
}
