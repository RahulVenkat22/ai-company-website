import { useEffect, useRef, useState } from 'react'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { gsap, prefersReducedMotion } from '@/lib/gsap'
import { useParallax } from '@/lib/useParallax'

interface Reason {
  title: string
  description: string
}

const reasons: Reason[] = [
  {
    title: 'AI-first thinking',
    description:
      'We identify where AI creates real business value, and say clearly when a simpler system will serve you better.',
  },
  {
    title: 'Architecture before implementation',
    description:
      'Data flows, integration points and failure modes are worked out on paper while changing them is still cheap.',
  },
  {
    title: 'Data-driven engineering',
    description:
      'Governed models and single metric definitions come first, so every dashboard and AI feature stands on trusted ground.',
  },
  {
    title: 'Production mindset',
    description:
      'Monitoring, error handling, evaluation and rollback paths are part of the build, not an afterthought.',
  },
  {
    title: 'Security by design',
    description:
      'Access control, encryption and audit trails are designed in from the first architecture diagram.',
  },
  {
    title: 'End-to-end capability',
    description:
      'One team carries the work from problem statement to production and stays accountable after launch.',
  },
]

const pad = (n: number) => String(n + 1).padStart(2, '0')

/**
 * Principles as a scroll-tracked list over a viewport-fixed photograph
 * (bg-window + parallax). The intro is sticky on the left with a large
 * counter that follows whichever principle is crossing the middle of the
 * viewport, and a progress line fills alongside (scrubbed). The list itself
 * is glass panels; the active one is highlighted. Mobile keeps the plain
 * list; reduced motion renders everything in its final state. Always on a
 * dark scene, so colours are the fixed scene/paper/signal set.
 */
export function WhyChooseUs() {
  const layerRef = useParallax<HTMLDivElement>(0.25)
  const rootRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [motionOff] = useState(() => prefersReducedMotion())

  useEffect(() => {
    const root = rootRef.current
    if (!root || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reason]', root).forEach((el, i) => {
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
        '[data-reasons-progress]',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '[data-reasons]',
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
    <Section
      id="why-choose-us"
      bleed
      className="bg-window relative isolate !py-0"
      ariaLabel="Why technology teams choose us"
    >
      <div
        ref={layerRef}
        className="parallax-layer -z-20"
        style={{ backgroundImage: 'url(/images/band-tech.jpg)' }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-scene/90 via-scene/70 to-scene/55"
        aria-hidden="true"
      />

      <div
        ref={rootRef}
        className="container-site grid gap-14 py-24 md:py-32 lg:grid-cols-[1.1fr_1fr] lg:gap-20"
      >
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal className="flex max-w-xl flex-col gap-5">
            <h2 className="text-h1 text-paper">
              Why technology teams <span className="text-signal">choose us</span>
            </h2>
            <p className="max-w-lg text-body-lg text-paper/75">
              Not a list of buzzwords. The working principles that shape how every
              engagement is scoped, architected and delivered.
            </p>
          </Reveal>

          {/* Counter follows the principle crossing the viewport middle. */}
          <div className="mt-12 hidden items-end gap-5 lg:flex" aria-hidden="true">
            <div className="relative h-24 w-px overflow-hidden bg-paper/20">
              <div data-reasons-progress className="absolute inset-0 origin-top bg-signal" />
            </div>
            <div>
              <span className="tnum block text-[4.5rem] font-medium leading-none tracking-[-0.045em] text-signal">
                {pad(active)}
              </span>
              <span className="mt-2 block text-h4 text-paper">{reasons[active].title}</span>
            </div>
          </div>
        </div>

        <ol data-reasons className="flex list-none flex-col gap-4">
          {reasons.map(({ title, description }, i) => (
            <Reveal as="li" key={title} delay={60}>
              <div
                data-reason
                className={`glass rounded-card p-7 transition-all duration-500 ease-premium md:p-8 ${
                  i === active || motionOff ? '!border-signal/50 !bg-paper/10' : 'lg:opacity-75'
                }`}
              >
                <p
                  className={`tnum font-mono text-[11px] tracking-[0.12em] transition-colors duration-500 ${
                    i === active || motionOff ? 'text-signal' : 'text-paper/50'
                  }`}
                >
                  {pad(i)}
                </p>
                <h3 className="mt-4 text-h3 text-paper">{title}</h3>
                <p className="mt-3 text-small leading-relaxed text-paper/70">{description}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  )
}
