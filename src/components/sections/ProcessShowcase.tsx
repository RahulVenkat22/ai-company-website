import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import { Reveal } from '@/components/ui/Reveal'

/**
 * Scroll-driven delivery method. Desktop: the intro column pins (CSS sticky)
 * while the six steps scroll by on the right; a ScrollTrigger per step
 * drives the large counter and the rail's progress fill, and the step
 * nearest the viewport middle is highlighted. Mobile: a plain stacked list.
 * Reduced motion: everything rendered in its final state.
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
    detail: 'We map stakeholders, success criteria and constraints before any technology is discussed.',
  },
  {
    number: '02',
    title: 'Analyze',
    description: 'Study data, systems, workflows and requirements.',
    detail: 'Data quality, integrations and security boundaries are assessed so the design rests on facts.',
  },
  {
    number: '03',
    title: 'Architect',
    description: 'Design the right technical solution.',
    detail: 'We select the architecture and stack to fit the problem, and document every trade-off for review.',
  },
  {
    number: '04',
    title: 'Build',
    description: 'Develop, integrate and validate.',
    detail: 'Short iterations deliver working software you can evaluate from the first weeks.',
  },
  {
    number: '05',
    title: 'Secure and test',
    description: 'Validate reliability, security and performance.',
    detail: 'Automated test suites, security reviews and load checks run before anything reaches users.',
  },
  {
    number: '06',
    title: 'Deploy and improve',
    description: 'Deploy, monitor and continuously optimize.',
    detail: 'Observability and evaluation loops keep the system measurably improving in production.',
  },
]

export default function ProcessShowcase() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [motionOff] = useState(() => prefersReducedMotion())

  useEffect(() => {
    const root = rootRef.current
    if (!root || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
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

      gsap.fromTo(
        '[data-progress]',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: '[data-steps]', start: 'top 60%', end: 'bottom 60%', scrub: true },
        },
      )
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef} className="grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <Reveal className="flex flex-col gap-4">
          <h2 className="text-h2">From business challenge to production</h2>
          <p className="text-body-lg text-ink-muted">
            A disciplined path from first conversation to a system running in production,
            with checkpoints for architecture, security and quality along the way.
          </p>
        </Reveal>

        <div className="mt-10 hidden items-end gap-5 lg:flex" aria-hidden="true">
          <div className="relative h-24 w-px overflow-hidden bg-line-strong">
            <div data-progress className="absolute inset-0 origin-top bg-primary" />
          </div>
          <div>
            <span className="tnum block text-[4.5rem] font-medium leading-none tracking-[-0.045em] text-primary">
              {STEPS[active].number}
            </span>
            <span className="mt-2 block text-h4 text-ink">{STEPS[active].title}</span>
          </div>
        </div>
      </div>

      <ol data-steps className="flex list-none flex-col gap-5 md:gap-6">
        {STEPS.map((step, i) => (
          <Reveal as="li" key={step.number}>
            <div
              data-step
              className={`rounded-card border p-6 transition-all duration-500 ease-premium md:p-8 ${
                i === active || motionOff
                  ? 'border-primary/40 bg-surface shadow-card'
                  : 'border-line bg-surface/60 lg:opacity-80'
              }`}
            >
              <div className="flex items-baseline gap-4">
                <span
                  aria-hidden="true"
                  className={`tnum text-h3 leading-none transition-colors duration-500 ${
                    i === active || motionOff ? 'text-primary' : 'text-ink-subtle'
                  }`}
                >
                  {step.number}
                </span>
                <h3 className="text-h4 text-ink">{step.title}</h3>
              </div>
              <p className="mt-3 text-body text-ink-muted">{step.description}</p>
              <p className="mt-1.5 text-small text-ink-muted">{step.detail}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  )
}
