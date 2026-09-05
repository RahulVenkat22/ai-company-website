import { useEffect, useRef } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { gsap, prefersReducedMotion } from '@/lib/gsap'

/**
 * Homepage hero: a full-viewport window onto the scroll-driven brand
 * footage (ScrollVideoStory). The composition is deliberately asymmetric:
 * copy anchors bottom-left on the calm side of the frame, the assembling
 * structure owns the right two thirds. Four text elements only: headline,
 * lead, two CTAs.
 *
 * Motion: one GSAP entrance (masked line reveal, then lead and CTAs), and a
 * scrubbed exit that lifts the copy away as the page scrolls. The buttons'
 * hover/press feedback is Framer Motion inside Button; GSAP only ever
 * touches the wrappers, so no element is driven by both libraries.
 *
 * Under prefers-reduced-motion nothing animates: the JSX is the final state.
 */

const LINES = ['AI systems that', 'reach production.']

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.hero-line', { yPercent: 108, duration: 1.05, stagger: 0.12 }, 0.25)
        .from('[data-hero="lead"]', { y: 22, autoAlpha: 0, duration: 0.8 }, 0.85)
        .from('[data-hero="ctas"]', { y: 22, autoAlpha: 0, duration: 0.8 }, 1.0)

      gsap.to('[data-hero="content"]', {
        yPercent: -10,
        autoAlpha: 0.15,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom 30%', scrub: true },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      data-video-window
      className="relative isolate -mt-16 flex min-h-[100svh] flex-col overflow-hidden md:-mt-[72px]"
      aria-label="AI systems that reach production"
    >
      {/* Scene scrim: heavier on the copy side, open on the right; a soft
          ramp at the foot hands over to the page. */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-scene/75 via-scene/35 to-scene/5"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-b from-bg/0 to-bg/70"
        aria-hidden="true"
      />

      <Container className="relative flex flex-1 flex-col justify-end pb-16 pt-32 md:pb-20 lg:pb-24">
        <div data-hero="content" className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-9">
            <h1 className="text-display-xl text-paper">
              {LINES.map((line) => (
                <span key={line} className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
                  <span className="hero-line block will-change-transform">{line}</span>
                </span>
              ))}
            </h1>
          </div>

          <div className="flex flex-col gap-8 lg:col-span-12 lg:flex-row lg:items-end lg:justify-between">
            <p data-hero="lead" className="max-w-xl text-body-lg text-paper/75">
              Agents, RAG, data platforms and cloud infrastructure, designed and
              built to production standards by one accountable team.
            </p>
            <div data-hero="ctas" className="flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                to="/contact"
                eventName="cta_click"
                eventParams={{ cta: 'start_project', location: 'hero' }}
                iconRight={<ArrowRight aria-hidden="true" />}
              >
                Start a project
              </Button>
              <Button
                size="lg"
                variant="inverse"
                to="/ai-solutions"
                eventName="cta_click"
                eventParams={{ cta: 'explore_ai_solutions', location: 'hero' }}
                iconRight={<ArrowUpRight aria-hidden="true" />}
              >
                Explore AI solutions
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
