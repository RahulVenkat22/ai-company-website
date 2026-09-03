import { useEffect, useRef } from 'react'
import { ArrowRight, ChevronDown, Sparkles, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { gsap, prefersReducedMotion } from '@/lib/gsap'

/**
 * Homepage hero — a transparent window (`data-video-window`) onto the
 * page-wide ScrollVideoStory backdrop, carrying only its dark gradient
 * wash, behind ONE orchestrated GSAP entrance (the boldest motion moment
 * on the page): badge → headline words → lead → CTAs → social proof.
 * Scrolling away scrubs the content up and out over the pinned backdrop.
 * Owns the only h1 on the home page. Content sits on a dark backdrop, so
 * colors here are explicit (white/amber), not theme tokens.
 *
 * Under prefers-reduced-motion nothing animates: the JSX below is already
 * the final state, every tween is skipped, and the backdrop shows a static
 * frame.
 */

const HEADLINE: Array<{ text: string; gradient?: boolean }> = [
  { text: 'We' },
  { text: 'turn' },
  { text: 'business' },
  { text: 'problems' },
  { text: 'into' },
  { text: 'production', gradient: true },
  { text: 'AI', gradient: true },
  { text: 'people' },
  { text: 'love' },
  { text: 'using.' },
]

const AVATARS = [
  { src: '/images/client-3.jpg', alt: 'Smiling client portrait' },
  { src: '/images/client-2.jpg', alt: 'Smiling client portrait' },
  { src: '/images/client-5.jpg', alt: 'Smiling client portrait' },
  { src: '/images/client-4.jpg', alt: 'Smiling client portrait' },
  { src: '/images/client-6.jpg', alt: 'Smiling client portrait' },
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
          carries the cinematic wash that keeps the copy legible. */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0C0C1D]/95 via-[#141433]/80 to-[#0C0C1D]/60"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-bg to-transparent"
        aria-hidden="true"
      />

      <Container className="relative py-28 md:py-36">
        <div data-hero="content" className="flex max-w-3xl flex-col items-start gap-6">
          <span
            data-hero="badge"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-caption font-semibold uppercase tracking-[0.14em] text-amber-300 backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            AI-first engineering, human at heart
          </span>

          <h1 className="text-display text-white">
            {HEADLINE.map((word, i) => (
              <span key={i}>
                <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
                  <span
                    className={`hero-word inline-block will-change-transform ${
                      word.gradient ? 'text-gradient' : ''
                    }`}
                  >
                    {word.text}
                  </span>
                </span>{' '}
              </span>
            ))}
          </h1>

          <p data-hero="lead" className="max-w-2xl text-body-lg text-slate-200">
            AI agents, RAG systems, data platforms and cloud solutions — designed
            with your team, engineered to production standards, and improved long
            after launch.
          </p>

          <div
            data-hero="ctas"
            className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
          >
            <Button
              size="lg"
              to="/contact"
              eventName="cta_click"
              eventParams={{ cta: 'start_conversation', location: 'hero' }}
              iconRight={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
            >
              Start a Conversation
            </Button>
            <Button
              size="lg"
              variant="secondary"
              to="/services"
              className="border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
              eventName="cta_click"
              eventParams={{ cta: 'explore_services', location: 'hero' }}
            >
              Explore Our Services
            </Button>
          </div>

          {/* Social proof strip — faces + rating (illustrative placeholders) */}
          <div data-hero="proof" className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex -space-x-3">
              {AVATARS.map((a) => (
                <img
                  key={a.src}
                  src={a.src}
                  alt={a.alt}
                  loading="lazy"
                  width={44}
                  height={44}
                  className="h-11 w-11 rounded-full border-2 border-white/80 object-cover"
                />
              ))}
            </div>
            <div className="flex flex-col">
              <span
                className="flex items-center gap-1 text-amber-300"
                aria-label="Rated five stars by clients (illustrative)"
              >
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />
                ))}
              </span>
              <span className="text-small text-slate-300">
                Teams who love working with us
              </span>
            </div>
          </div>
        </div>
      </Container>

      {/* Scroll cue */}
      <a
        href="#capabilities"
        data-hero="cue"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 transition-colors hover:text-white"
        aria-label="Scroll to explore"
      >
        <ChevronDown className="h-7 w-7 animate-bounce-cue" aria-hidden="true" />
      </a>
    </section>
  )
}
