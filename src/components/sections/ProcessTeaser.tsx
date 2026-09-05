import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'

/**
 * Homepage teaser of the delivery method: three moves in one hairline
 * grid. Each cell rests flat and reveals its photograph on hover (Framer
 * Motion drives the photo layer; CSS handles the text colour flip so the
 * copy stays readable over the scrim in both themes). Touch devices simply
 * see the flat, fully readable cells. The full six-stage method lives on
 * the About page.
 */

const STEPS = [
  {
    title: 'Discover and analyze',
    description:
      'Real problems, real data, real constraints, understood before anything is built.',
    image: '/images/band-collab.jpg',
  },
  {
    title: 'Architect and build',
    description:
      'The right architecture designed first, then built, integrated and validated against real data and real workflows.',
    image: '/images/expertise/solution-architecture.jpg',
  },
  {
    title: 'Deploy and improve',
    description:
      'Shipped securely to the cloud, tested thoroughly, monitored in production and improved after launch.',
    image: '/images/expertise/ai-workflows.jpg',
  },
]

const photoVariants = {
  rest: { opacity: 0, scale: 1.04 },
  hover: { opacity: 1, scale: 1 },
}

export function ProcessTeaser() {
  const reduce = useReducedMotion()

  return (
    <Section id="process" ariaLabel="How we deliver">
      <SectionHeading
        title="From business problem to production, in three moves"
        lead="The shape of every engagement, whatever the technology."
      />

      <Reveal>
        <ol className="grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-3">
          {STEPS.map(({ title, description, image }, i) => (
            <motion.li
              key={title}
              className="group relative isolate flex min-h-[20rem] flex-col justify-between overflow-hidden bg-surface p-7 md:min-h-[24rem] md:p-8"
              initial="rest"
              animate="rest"
              whileHover={reduce ? undefined : 'hover'}
            >
              <motion.div
                aria-hidden="true"
                className="absolute inset-0 -z-10"
                variants={photoVariants}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-scene/90 via-scene/60 to-scene/40" />
              </motion.div>

              <span className="tnum text-[3rem] font-medium leading-none tracking-[-0.04em] text-ink/30 transition-colors duration-500 group-hover:text-signal">
                {i + 1}
              </span>
              <div>
                <h3 className="text-h3 text-ink transition-colors duration-500 group-hover:text-paper">{title}</h3>
                <p className="mt-3 text-small text-ink-muted transition-colors duration-500 group-hover:text-paper/80">
                  {description}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </Reveal>

      <Reveal delay={120} className="mt-8">
        <Link
          to="/about#how-we-work"
          className="group inline-flex items-center gap-1.5 text-small font-medium text-ink transition-colors hover:text-primary"
        >
          See the full method
          <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </Reveal>
    </Section>
  )
}
