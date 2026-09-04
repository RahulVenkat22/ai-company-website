import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { gsap, prefersReducedMotion } from '@/lib/gsap'

/**
 * Homepage hero — a transparent window (`data-video-window`) onto the
 * page-wide ScrollVideoStory backdrop, carrying only its dark wash, behind
 * ONE orchestrated GSAP entrance (the boldest motion moment on the page):
 * label → headline words → lead → CTAs → footer meta. Scrolling away
 * scrubs the content up and out over the pinned backdrop. Owns the only
 * h1 on the home page. The wash div veils the footage per theme (paper in
 * light, carbon in dark), so text uses ordinary theme tokens.
 *
 * Under prefers-reduced-motion nothing animates: the JSX below is already
 * the final state, every tween is skipped, and the backdrop shows a static
 * frame.
 */

const HEADLINE: Array<{ text: string; em?: boolean }> = [
  { text: 'We' },
  { text: 'turn' },
  { text: 'business' },
  { text: 'problems' },
  { text: 'into' },
  { text: 'production', em: true },
  { text: 'AI', em: true },
  { text: 'people' },
  { text: 'love' },
  { text: 'using.' },
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
      // (Background scale is owned by the useParallax scrub — not tweened
      // here, so the two never fight over the same transform.)
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('[data-hero="badge"]', { y: 24, autoAlpha: 0, duration: 0.7 }, 0.15)
        .from(
          '.hero-word',
          { yPercent: 115, duration: 0.9, stagger: 0.055 },
          0.3,
        )
        .from('[data-hero="lead"]', { y: 24, autoAlpha: 0, duration: 0.7 }, 0.9)
        .from('[data-hero="ctas"]', { y: 24, autoAlpha: 0, duration: 0.7 }, 1.05)
        .from('[data-hero="proof"]', { y: 16, autoAlpha: 0, duration: 0.7 }, 1.2)
        .from('[data-hero="cue"]', { autoAlpha: 0, duration: 0.6 }, 1.5)

      // Exit scrub: content lifts away faster than the parallax backdrop.
      gsap.to('[data-hero="content"]', {
        yPercent: -18,
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
      className="relative isolate -mt-16 flex min-h-[100svh] items-center overflow-hidden md:-mt-[72px]"
      aria-label="AI-first engineering for real business outcomes"
    >
      {/* Window onto the fixed ScrollVideoStory backdrop — this section only
          carries the wash that keeps the copy legible. It follows the theme:
          light mode veils the dark footage in paper so ink-colored text
          reads; dark mode keeps the cinematic carbon wash. */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-[#FAFAF7]/95 via-[#FAFAF7]/80 to-[#FAFAF7]/55 dark:from-[#0A0A0B]/90 dark:via-[#0A0A0B]/55 dark:to-[#0A0A0B]/25"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-bg to-transparent"
        aria-hidden="true"
      />

      <Container className="relative py-28 md:py-36">
        <div data-hero="content" className="flex max-w-4xl flex-col items-start gap-7">
          <span
            data-hero="badge"
            className="inline-flex items-center gap-3 font-mono text-caption uppercase tracking-[0.22em] text-ink-muted"
          >
            <span className="h-px w-8 bg-primary" aria-hidden="true" />
            An applied-AI engineering studio
          </span>

          <h1 className="text-display text-ink">
            {HEADLINE.map((word, i) => (
              <span key={i}>
                <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
                  <span
                    className={`hero-word inline-block will-change-transform ${
                      word.em ? 'accent-word' : ''
                    }`}
                  >
                    {word.text}
                  </span>
                </span>{' '}
              </span>
            ))}
          </h1>

          <p data-hero="lead" className="max-w-2xl text-body-lg text-ink-muted">
            AI agents, RAG systems, data platforms and cloud solutions — designed
            with your team, engineered to production standards, and improved long
            after launch.
          </p>

          <div
            data-hero="ctas"
            className="mt-1 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
          >
            <Button
              size="lg"
              to="/contact"
              eventName="cta_click"
              eventParams={{ cta: 'start_conversation', location: 'hero' }}
              iconRight={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
            >
              Start a conversation
            </Button>
            <Button
              size="lg"
              variant="secondary"
              to="/services"
              eventName="cta_click"
              eventParams={{ cta: 'explore_services', location: 'hero' }}
            >
              See what we build
            </Button>
          </div>

          {/* Practice areas — quiet mono index, not a badge wall */}
          <div
            data-hero="proof"
            className="mt-8 flex w-full flex-wrap gap-x-10 gap-y-3 border-t border-ink/15 pt-5"
          >
            {META.map((item) => (
              <span key={item.index} className="flex items-baseline gap-2.5">
                <span className="font-mono text-caption text-primary">
                  {item.index}
                </span>
                <span className="text-small text-ink-muted">{item.label}</span>
              </span>
            ))}
          </div>
        </div>
      </Container>

      {/* Scroll cue */}
      <a
        href="#capabilities"
        data-hero="cue"
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-ink-subtle transition-colors hover:text-ink"
        aria-label="Scroll to explore"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-8 w-px bg-ink/40 animate-bounce-cue" aria-hidden="true" />
      </a>
    </section>
  )
}
