import { ArrowRight, ChevronDown, Sparkles, Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { useParallax } from '@/lib/useParallax'

/**
 * Homepage hero — full-bleed photograph of a team at work with a scroll-
 * linked parallax background, gradient overlay and staggered entrance.
 * Owns the only h1 on the home page. Content sits on a fixed dark image,
 * so colors here are explicit (white/amber), not theme tokens.
 */

const AVATARS = [
  { src: '/images/client-3.jpg', alt: 'Smiling client portrait' },
  { src: '/images/client-2.jpg', alt: 'Smiling client portrait' },
  { src: '/images/client-5.jpg', alt: 'Smiling client portrait' },
  { src: '/images/client-4.jpg', alt: 'Smiling client portrait' },
  { src: '/images/client-6.jpg', alt: 'Smiling client portrait' },
]

export function Hero() {
  const layerRef = useParallax<HTMLDivElement>(0.3)

  return (
    <section
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden"
      aria-label="AI-first engineering for real business outcomes"
    >
      {/* Parallax photo backdrop + cinematic overlay */}
      <div
        ref={layerRef}
        className="parallax-layer -z-20 animate-ken-burns"
        style={{ backgroundImage: 'url(/images/hero-team.jpg)' }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0C0C1D]/95 via-[#141433]/80 to-[#0C0C1D]/60"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-bg to-transparent"
        aria-hidden="true"
      />

      <Container className="relative py-28 md:py-36">
        <div className="flex max-w-3xl flex-col items-start gap-6">
          <span className="reveal is-visible inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-caption font-semibold uppercase tracking-[0.14em] text-amber-300 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            AI-first engineering, human at heart
          </span>

          <h1 className="text-display text-white">
            We turn business problems into{' '}
            <span className="text-gradient">production AI</span> people love
            using.
          </h1>

          <p className="max-w-2xl text-body-lg text-slate-200">
            AI agents, RAG systems, data platforms and cloud solutions — designed
            with your team, engineered to production standards, and improved long
            after launch.
          </p>

          <div className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
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
          <div className="mt-6 flex flex-wrap items-center gap-4">
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
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 transition-colors hover:text-white"
        aria-label="Scroll to explore"
      >
        <ChevronDown className="h-7 w-7 animate-bounce-cue" aria-hidden="true" />
      </a>
    </section>
  )
}
