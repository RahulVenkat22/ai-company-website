import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { gsap, prefersReducedMotion } from '@/lib/gsap'

/**
 * Homepage hero — an always-dark cinematic window (`data-video-window`)
 * onto the page-wide ScrollVideoStory backdrop. The footage shows at full
 * strength in both themes under a light scrim, with the headline set in
 * giant editorial serif across three staggered lines, a featured-solution
 * card anchored bottom-left and the practice index bottom-right — the
 * gallery-hero look.
 *
 * One orchestrated GSAP entrance (the boldest motion moment on the page):
 * kicker → headline lines → lead → CTAs → corner cards. Scrolling away
 * scrubs the content up and out over the pinned backdrop. Owns the only
 * h1 on the home page.
 *
 * Under prefers-reduced-motion nothing animates: the JSX below is already
 * the final state, every tween is skipped, and the backdrop shows a static
 * frame.
 */

/** Headline lines with editorial stagger offsets (Luxterra-style). */
const LINES: Array<{ text: string; em?: boolean; className: string }> = [
  { text: 'Engineering', className: 'self-start' },
  { text: 'Intelligence', em: true, className: 'self-center sm:pl-24' },
  { text: 'That Ships.', className: 'self-end' },
]

const META = [
  { index: '01', label: 'AI agents & RAG' },
  { index: '02', label: 'Data platforms' },
  { index: '03', label: 'Cloud engineering' },
]

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      // Entrance: one deliberate sequence, slightly overlapped.
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('[data-hero="badge"]', { y: 24, autoAlpha: 0, duration: 0.7 }, 0.15)
        .from('.hero-line', { yPercent: 112, duration: 1, stagger: 0.14 }, 0.3)
        .from('[data-hero="lead"]', { y: 24, autoAlpha: 0, duration: 0.7 }, 1.0)
        .from('[data-hero="ctas"]', { y: 24, autoAlpha: 0, duration: 0.7 }, 1.15)
        .from('[data-hero="corner"]', { y: 28, autoAlpha: 0, duration: 0.8 }, 1.3)
        .from('[data-hero="proof"]', { y: 16, autoAlpha: 0, duration: 0.7 }, 1.4)
        .from('[data-hero="cue"]', { autoAlpha: 0, duration: 0.6 }, 1.6)

      // Exit scrub: content lifts away faster than the parallax backdrop.
      gsap.to('[data-hero="content"]', {
        yPercent: -14,
        autoAlpha: 0.15,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom 25%',
          scrub: true,
        },
      })

      // The cue has done its job once scrolling starts.
      gsap.to('[data-hero="cue"]', {
        autoAlpha: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: '2% top',
          end: '12% top',
          scrub: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      data-video-window
      className="relative isolate -mt-16 flex min-h-[100svh] flex-col justify-center overflow-hidden md:-mt-[72px]"
      aria-label="AI-first engineering for real business outcomes"
    >
      {/* Light cinematic scrim — the footage stays the hero. */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[#130F0D]/60 via-[#130F0D]/25 to-[#130F0D]/70"
        aria-hidden="true"
      />

      <Container className="relative flex flex-1 flex-col justify-center py-28 md:py-32">
        <div data-hero="content" className="flex flex-col">
          <p
            data-hero="badge"
            className="mb-6 inline-flex items-center gap-3 self-center font-mono text-caption uppercase tracking-[0.26em] text-white/75"
          >
            <span className="h-px w-8 bg-[#FF5E1C]" aria-hidden="true" />
            AI · Data · Cloud · Automation
            <span className="h-px w-8 bg-[#FF5E1C]" aria-hidden="true" />
          </p>

          {/* Giant staggered serif headline */}
          <h1 className="flex flex-col text-display-xl text-white">
            {LINES.map((line) => (
              <span
                key={line.text}
                className={`inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] ${line.className}`}
              >
                <span
                  className={`hero-line inline-block will-change-transform ${
                    line.em ? 'accent-word !text-[#FF5E1C]' : ''
                  }`}
                >
                  {line.text}
                </span>
              </span>
            ))}
          </h1>

          <p
            data-hero="lead"
            className="mx-auto mt-8 max-w-2xl text-center text-body-lg text-white/80"
          >
            AI agents, RAG systems, data platforms and cloud solutions — designed
            with your team, engineered to production standards, and improved long
            after launch.
          </p>

          <div
            data-hero="ctas"
            className="mx-auto mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row"
          >
            <Button
              size="lg"
              to="/contact"
              eventName="cta_click"
              eventParams={{ cta: 'start_conversation', location: 'hero' }}
              iconRight={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
            >
              Start a project
            </Button>
            <Button
              size="lg"
              variant="inverse"
              to="/ai-solutions"
              eventName="cta_click"
              eventParams={{ cta: 'explore_ai_solutions', location: 'hero' }}
              iconRight={<ArrowUpRight className="h-4 w-4" aria-hidden="true" />}
            >
              Explore AI solutions
            </Button>
          </div>
        </div>
      </Container>

      {/* Corner card — featured capability (Luxterra location card) */}
      <div className="container-site pointer-events-none relative pb-20 md:pb-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Link
            to="/ai-solutions#rag"
            data-hero="corner"
            className="pointer-events-auto group hidden w-64 flex-col gap-1 rounded-card border border-white/15 bg-white/10 p-5 backdrop-blur-md transition-colors hover:bg-white/15 md:flex"
          >
            <span className="font-mono text-caption uppercase tracking-[0.18em] text-white/65">
              Featured capability
            </span>
            <span className="mt-2 font-serif text-3xl leading-none text-white">
              Enterprise RAG
            </span>
            <span className="mt-3 inline-flex items-center gap-2 border-t border-white/20 pt-3 text-small text-white/85">
              Explore the platform
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
          </Link>

          {/* Practice areas — quiet mono index */}
          <div
            data-hero="proof"
            className="pointer-events-auto flex flex-wrap gap-x-10 gap-y-3 md:justify-end"
          >
            {META.map((item) => (
              <span key={item.index} className="flex items-baseline gap-2.5">
                <span className="font-mono text-caption text-[#FF5E1C]">
                  {item.index}
                </span>
                <span className="text-small text-white/75">{item.label}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#capabilities"
        data-hero="cue"
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/60 transition-colors hover:text-white"
        aria-label="Scroll to explore"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-8 w-px bg-white/50 animate-bounce-cue" aria-hidden="true" />
      </a>
    </section>
  )
}
