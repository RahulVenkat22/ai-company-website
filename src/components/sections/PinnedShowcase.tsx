import { useEffect, useRef } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { gsap, prefersReducedMotion } from '@/lib/gsap'

/**
 * Featured-solutions showcase — the editorial "pinned slideshow" pattern:
 * the section pins to the viewport (CSS sticky) for N screen-heights while
 * scroll position crossfades between full-bleed scenes, each with its own
 * photograph, giant serif title and CTAs. Scrolling up rewinds. GSAP drives
 * only the scrubbed crossfade; the pin itself is plain position: sticky.
 *
 * Hidden slides are made `inert` (and aria-hidden) as the active index
 * changes so keyboard focus and screen readers only ever see the visible
 * scene. Under prefers-reduced-motion the slides render as ordinary
 * stacked sections — all content available, nothing pinned or animated.
 */

export interface ShowcaseSlide {
  title: string
  /** Sub-line under the title — reads like an address line. */
  meta: string
  image: string
  to: string
  cta: string
}

const SLIDES: ShowcaseSlide[] = [
  {
    title: 'Enterprise RAG Platforms',
    meta: 'Retrieval · Vector search · Cited answers',
    image: '/images/expertise/rag.jpg',
    to: '/ai-solutions#rag',
    cta: 'Explore RAG',
  },
  {
    title: 'AI Agents & Agentic AI',
    meta: 'Reason · Plan · Use tools · Execute',
    image: '/images/expertise/agentic-ai.jpg',
    to: '/ai-solutions#agents',
    cta: 'Explore agents',
  },
  {
    title: 'Data & Analytics Platforms',
    meta: 'Pipelines · BI · Dashboards · Decisions',
    image: '/images/expertise/decision-support.jpg',
    to: '/data-analytics',
    cta: 'Explore data',
  },
  {
    title: 'Cloud-Native AI',
    meta: 'AWS · Azure · Google Cloud · Production',
    image: '/images/expertise/enterprise-ai.jpg',
    to: '/cloud',
    cta: 'Explore cloud',
  },
]

function SlideContent({ slide, index }: { slide: ShowcaseSlide; index: number }) {
  return (
    <div className="container-site relative flex h-full flex-col items-center justify-center text-center">
      <p
        data-slide-el="meta"
        className="font-mono text-caption uppercase tracking-[0.24em] text-white/70"
      >
        {String(index + 1).padStart(2, '0')} · {slide.meta}
      </p>
      <h3 data-slide-el="title" className="mt-5 max-w-5xl text-display text-white">
        {slide.title}
      </h3>
      <div
        data-slide-el="ctas"
        className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"
      >
        <Button
          size="lg"
          to={slide.to}
          eventName="cta_click"
          eventParams={{ cta: 'showcase_explore', location: `showcase_${index + 1}` }}
          iconRight={<ArrowUpRight className="h-4 w-4" aria-hidden="true" />}
        >
          {slide.cta}
        </Button>
        <Button
          size="lg"
          variant="inverse"
          to="/contact"
          eventName="cta_click"
          eventParams={{ cta: 'showcase_start', location: `showcase_${index + 1}` }}
          iconRight={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
        >
          Start your project
        </Button>
      </div>
    </div>
  )
}

export function PinnedShowcase() {
  const rootRef = useRef<HTMLElement>(null)
  const indexRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root || prefersReducedMotion()) return

    const slides = Array.from(root.querySelectorAll<HTMLElement>('[data-slide]'))
    const setActive = (active: number) => {
      slides.forEach((slide, i) => {
        const hidden = i !== active
        slide.toggleAttribute('inert', hidden)
        slide.setAttribute('aria-hidden', hidden ? 'true' : 'false')
      })
      if (indexRef.current) {
        indexRef.current.textContent = String(active + 1).padStart(2, '0')
      }
    }
    setActive(0)

    const ctx = gsap.context(() => {
      // Each slide's photo pushes in slowly for its whole segment.
      slides.forEach((slide) => {
        gsap.fromTo(
          slide.querySelector('[data-slide-bg]'),
          { scale: 1.06 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: root,
              start: 'top top',
              end: 'bottom bottom',
              scrub: true,
            },
          },
        )
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          onUpdate: (self) => {
            const active = Math.min(
              SLIDES.length - 1,
              Math.round(self.progress * (SLIDES.length - 1)),
            )
            setActive(active)
          },
        },
      })

      // Crossfade each incoming slide over the second half of its segment,
      // lifting its content in slightly behind the fade.
      slides.forEach((slide, i) => {
        if (i === 0) return
        const at = i - 0.45
        tl.fromTo(slide, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.45 }, at)
        tl.fromTo(
          slide.querySelectorAll('[data-slide-el]'),
          { y: 44 },
          { y: 0, duration: 0.45, stagger: 0.04 },
          at,
        )
      })
      // Timeline spans slide count - 1 units; pad the tail so the last
      // slide holds for its own full segment.
      tl.to({}, { duration: 0.55 }, SLIDES.length - 1.45)
    }, root)

    return () => {
      slides.forEach((slide) => {
        slide.removeAttribute('inert')
        slide.removeAttribute('aria-hidden')
      })
      ctx.revert()
    }
  }, [])

  if (typeof window !== 'undefined' && prefersReducedMotion()) {
    // Static fallback: ordinary stacked scenes.
    return (
      <section aria-label="Featured solutions">
        {SLIDES.map((slide, i) => (
          <div key={slide.title} className="relative isolate flex min-h-[80svh] items-center overflow-hidden">
            <div
              className="absolute inset-0 -z-20 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 -z-10 bg-[#130F0D]/65" aria-hidden="true" />
            <div className="w-full py-20">
              <SlideContent slide={slide} index={i} />
            </div>
          </div>
        ))}
      </section>
    )
  }

  return (
    <section
      ref={rootRef}
      aria-label="Featured solutions"
      className="relative"
      style={{ height: `${SLIDES.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.title}
            data-slide
            className="absolute inset-0 isolate"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <div
              data-slide-bg
              className="absolute inset-0 -z-20 bg-cover bg-center will-change-transform"
              style={{ backgroundImage: `url(${slide.image})` }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 -z-10 bg-gradient-to-b from-[#130F0D]/70 via-[#130F0D]/45 to-[#130F0D]/75"
              aria-hidden="true"
            />
            <SlideContent slide={slide} index={i} />
          </div>
        ))}

        {/* Frame chrome: label top-left, live index top-right */}
        <div className="container-site pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between pt-24">
          <p className="font-mono text-caption uppercase tracking-[0.24em] text-white/70">
            Featured solutions
          </p>
          <p className="flex items-baseline gap-2 font-serif text-2xl text-white">
            <span ref={indexRef}>01</span>
            <span className="h-px w-10 self-center bg-white/40" aria-hidden="true" />
            <span className="text-white/55">{String(SLIDES.length).padStart(2, '0')}</span>
          </p>
        </div>
      </div>
    </section>
  )
}
