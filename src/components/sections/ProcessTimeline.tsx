import { useRef } from 'react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  type Variants,
} from 'framer-motion'

/**
 * Animated six-step delivery timeline (prompt.md §26).
 *
 * This is one of the two framer-motion components allowed sitewide (see
 * docs/STYLEGUIDE.md); it is loaded via React.lazy from HowWeWork so the
 * library stays out of the main bundle. Reduced motion renders final state.
 */

interface ProcessStep {
  number: string
  title: string
  description: string
  detail: string
}

const steps: readonly ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    description: 'Understand the business problem.',
    detail:
      'We map stakeholders, success criteria and constraints before any technology is discussed.',
  },
  {
    number: '02',
    title: 'Analyze',
    description: 'Study data, systems, workflows and requirements.',
    detail:
      'Data quality, integrations and security boundaries are assessed so the design rests on facts.',
  },
  {
    number: '03',
    title: 'Architect',
    description: 'Design the right technical solution.',
    detail:
      'We select the architecture and stack to fit the problem, and document every trade-off for review.',
  },
  {
    number: '04',
    title: 'Build',
    description: 'Develop, integrate and validate.',
    detail:
      'Short iterations deliver working software you can evaluate from the first weeks.',
  },
  {
    number: '05',
    title: 'Secure & Test',
    description: 'Validate reliability, security and performance.',
    detail:
      'Automated test suites, security reviews and load checks run before anything reaches users.',
  },
  {
    number: '06',
    title: 'Deploy & Improve',
    description: 'Deploy, monitor and continuously optimize.',
    detail:
      'Observability and evaluation loops keep the system measurably improving in production.',
  },
]

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/** Orchestrates the card + node children per step. */
const stepVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

/** Card fades and slides in; `custom` is -1 (from left) or 1 (from right). */
const cardVariants: Variants = {
  hidden: (direction: number) => ({ opacity: 0, y: 24, x: direction * 16 }),
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: 0.6, ease: EASE },
  },
}

/** Node dot pulses once into place. */
const dotVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: [0.4, 1.3, 1],
    opacity: 1,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
}

function TimelineStep({
  step,
  index,
  reduce,
}: {
  step: ProcessStep
  index: number
  reduce: boolean
}) {
  const onLeft = index % 2 === 0

  return (
    <motion.li
      className="relative pl-12 md:grid md:grid-cols-2 md:gap-x-16 md:pl-0"
      {...(reduce
        ? {}
        : {
            variants: stepVariants,
            initial: 'hidden' as const,
            whileInView: 'visible' as const,
            viewport: { once: true, amount: 0.35 },
          })}
    >
      {/* Node dot on the rail (static wrapper keeps the centering transform
          out of framer's animated transform). */}
      <span
        aria-hidden="true"
        className="absolute left-4 top-8 z-10 -translate-x-1/2 md:left-1/2"
      >
        <motion.span
          variants={dotVariants}
          className="block h-3.5 w-3.5 rounded-full border-2 border-accent bg-surface shadow-glow"
        />
      </span>

      <motion.div
        variants={cardVariants}
        custom={onLeft ? -1 : 1}
        className={`rounded-card border border-line bg-surface p-6 shadow-card ${
          onLeft ? 'md:col-start-1' : 'md:col-start-2'
        }`}
      >
        <div className={`flex flex-col gap-2 ${onLeft ? 'md:items-end md:text-right' : ''}`}>
          <span
            aria-hidden="true"
            className="text-h2 font-semibold leading-none tracking-tight text-ink-subtle/70"
          >
            {step.number}
          </span>
          <h3 className="text-h4 text-ink">{step.title}</h3>
          <p className="text-small text-ink-muted">{step.description}</p>
          <p className="text-small text-ink-subtle">{step.detail}</p>
        </div>
      </motion.div>
    </motion.li>
  )
}

/**
 * Vertical timeline: a left rail on mobile, a center line with alternating
 * cards from md: up. The line "draws" with scroll progress; steps fade and
 * slide in with a one-shot node pulse.
 */
export default function ProcessTimeline() {
  const reduce = useReducedMotion() ?? false
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.55'],
  })
  const drawn = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001,
  })

  return (
    <div ref={containerRef} className="relative">
      {/* Connecting line: muted track + progress fill that draws on scroll. */}
      <div
        aria-hidden="true"
        className="absolute inset-y-2 left-4 w-px -translate-x-1/2 bg-line md:left-1/2"
      >
        <motion.div
          className="absolute inset-0 origin-top bg-gradient-to-b from-primary via-accent to-accent/40"
          style={{ scaleY: reduce ? 1 : drawn }}
        />
      </div>

      <ol className="relative flex list-none flex-col gap-10 md:gap-14">
        {steps.map((step, index) => (
          <TimelineStep
            key={step.number}
            step={step}
            index={index}
            reduce={reduce}
          />
        ))}
      </ol>
    </div>
  )
}
