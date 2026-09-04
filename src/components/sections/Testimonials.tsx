import { Info } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { Drift } from '@/components/ui/Drift'
import { testimonials, TESTIMONIALS_DISCLAIMER } from '@/data/testimonials'

interface TestimonialsProps {
  variant?: 'default' | 'alt' | 'deep'
}

/** Client quotes: editorial pull-quote cards with plain attribution. */
export function Testimonials({ variant = 'default' }: TestimonialsProps) {
  return (
    <Section id="testimonials" variant={variant} ariaLabel="What clients say">
      <SectionHeading
        align="center"
        eyebrow="Kind words"
        title="People enjoy working with us — and it shows"
        lead="Real partnerships, plain language and systems that keep working after launch. Here is the kind of feedback we build for."
      />

      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal as="li" key={t.name} delay={(i % 3) * 90} className="h-full">
            {/* Columns drift at slightly different speeds (masonry-like depth) */}
            <Drift amp={[10, 30, 18][i % 3]} className="h-full">
              <Card interactive className="flex h-full flex-col gap-5 p-6">
              <span
                className="font-serif text-5xl leading-none text-primary/70"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              <p className="-mt-4 flex-1 text-body text-ink-muted">
                {t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3 border-t border-line pt-5">
                <img
                  src={t.image}
                  alt={`Portrait of ${t.name}`}
                  loading="lazy"
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-small font-semibold text-ink">{t.name}</p>
                  <p className="text-caption text-ink-subtle">{t.role}</p>
                </div>
              </div>
              </Card>
            </Drift>
          </Reveal>
        ))}
      </ul>

      <Reveal variant="fade" className="mt-8 flex justify-center">
        <p className="inline-flex items-center gap-2 text-caption text-ink-subtle">
          <Info className="h-3.5 w-3.5" aria-hidden="true" />
          {TESTIMONIALS_DISCLAIMER}
        </p>
      </Reveal>
    </Section>
  )
}
