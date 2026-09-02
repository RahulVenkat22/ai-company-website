import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import { Reveal } from '@/components/ui/Reveal'

/**
 * Scroll-driven delivery process (replaces the framer-motion ProcessTimeline).
 *
 * Desktop: the intro column pins (CSS sticky — no pin-spacer, so it degrades
 * for free) while the six steps scroll by on the right. A ScrollTrigger per
 * step drives the giant counter and the rail's progress fill; the step
 * nearest the viewport center is highlighted. Mobile: a plain stacked list,
 * no pinning, no scrub. Reduced motion: everything rendered in final state.
 */

interface ProcessStep {
  number: string
  title: string
  description: string
  detail: string
}

const STEPS: readonly ProcessStep[] = [
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

export default function ProcessShowcase() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  // With reduced motion there is no scroll tracking, so never dim steps.
  const [motionOff] = useState(() => prefersReducedMotion())

  useEffect(() => {
    const root = rootRef.current
    if (!root || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      // Highlight the step crossing the middle of the viewport.
      gsap.utils.toArray<HTMLElement>('[data-step]').forEach((el, i) => {
        gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: 'top 60%',
            end: 'bottom 60%',
            onToggle: (self) => self.isActive && setActive(i),
          },
        })
      })

      // Progress fill alongside the sticky intro, scrubbed over the list.
      gsap.fromTo(
        '[data-progress]',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '[data-steps]',
            start: 'top 60%',
            end: 'bottom 60%',
            scrub: true,
          },
        },
      )
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef} className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
      {/* Sticky intro rail */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <Reveal className="flex flex-col gap-4">
          <p className="eyebrow">How We Work</p>
          <h2 className="text-h2">From Business Challenge to Production.</h2>
          <p className="text-body-lg text-ink-muted">
            A disciplined path from first conversation to a system running in
            production — with checkpoints for architecture, security and quality
            along the way, and no surprises at handover.
          </p>
        </Reveal>

        <div className="mt-10 hidden items-end gap-5 lg:flex" aria-hidden="true">
          <div className="relative h-28 w-1 overflow-hidden rounded-full bg-line">
            <div
              data-progress
              className="absolute inset-0 origin-top rounded-full bg-gradient-to-b from-primary via-violet-acc to-accent"
            />
          </div>
          <div>
            <span className="block text-[5.5rem] font-semibold leading-none tracking-tight text-gradient">
              {STEPS[active].number}
            </span>
            <span className="mt-2 block text-h4 text-ink">{STEPS[active].title}</span>
          </div>
        </div>
      </div>

      {/* Steps */}
      <ol data-steps className="flex list-none flex-col gap-6 md:gap-8">
        {STEPS.map((step, i) => (
          <Reveal as="li" key={step.number}>
            <div
              data-step
              className={`rounded-card border p-6 transition-all duration-500 ease-premium md:p-8 ${
                i === active || motionOff
                  ? 'border-primary/40 bg-surface shadow-card-hover'
                  : 'border-line bg-surface/60 lg:opacity-60'
              }`}
            >
              <div className="flex items-baseline gap-4">
                <span
                  aria-hidden="true"
                  className={`text-h3 font-semibold leading-none tracking-tight transition-colors duration-500 ${
                    i === active || motionOff ? 'text-primary' : 'text-ink-subtle/60'
                  }`}
                >
                  {step.number}
                </span>
                <h3 className="text-h4 text-ink">{step.title}</h3>
              </div>
              <p className="mt-3 text-body text-ink-muted">{step.description}</p>
              <p className="mt-1.5 text-small text-ink-subtle">{step.detail}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  )
}
