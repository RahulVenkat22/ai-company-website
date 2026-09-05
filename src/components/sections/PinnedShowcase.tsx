import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { gsap, prefersReducedMotion } from '@/lib/gsap'

/**
 * Featured solutions as a pinned slideshow: the section pins (CSS sticky)
 * for N screen-heights while scroll position crossfades between four
 * full-bleed scenes, each with its own photograph, title and one action.
 * Scrolling up rewinds. GSAP drives only the scrubbed crossfade and the slow
 * photo push-in; the pin itself is position: sticky. A four-segment progress
 * rail shows where the reader is.
 *
 * Hidden slides are made inert and aria-hidden as the active index changes,
 * so keyboard focus and screen readers only meet the visible scene. Under
 * prefers-reduced-motion the slides render as ordinary stacked sections.
 */

export interface ShowcaseSlide {
  title: string
  meta: string
  image: string
  to: string
  cta: string
}

const SLIDES: ShowcaseSlide[] = [
  {
    title: 'Enterprise RAG platforms',
    meta: 'Retrieval, vector search and answers with citations.',
    image: '/images/expertise/rag.jpg',
    to: '/ai-solutions#rag',
    cta: 'Explore RAG',
  },
  {
    title: 'AI agents and agentic AI',
    meta: 'Systems that reason, plan, use tools and complete work.',
    image: '/images/expertise/multi-agent.jpg',
    to: '/ai-solutions#agents',
    cta: 'Explore agents',
  },
  {
    title: 'Data and analytics platforms',
    meta: 'Pipelines, governed metrics and dashboards teams trust.',
    image: '/images/expertise/decision-support.jpg',
    to: '/data-analytics',
    cta: 'Explore data',
  },
  {
    title: 'Cloud-native AI',
    meta: 'Production infrastructure on AWS, Azure and Google Cloud.',
    image: '/images/expertise/enterprise-ai.jpg',
    to: '/cloud',
    cta: 'Explore cloud',
  },
]

function SlideContent({ slide, index }: { slide: ShowcaseSlide; index: number }) {
  return (
    <div className="container-site relative flex h-full flex-col justify-end pb-24 md:pb-28">
      <div className="max-w-3xl">
        <h3 data-slide-el="title" className="text-display text-paper">
          {slide.title}
        </h3>
        <p data-slide-el="meta" className="mt-5 max-w-xl text-body-lg text-paper/75">
          {slide.meta}
        </p>
        <div data-slide-el="ctas" className="mt-8">
          <Button
            size="lg"
            variant="inverse"
            to={slide.to}
            eventName="cta_click"
            eventParams={{ cta: 'showcase_explore', location: `showcase_${index + 1}` }}
            iconRight={<ArrowUpRight aria-hidden="true" />}
          >
            {slide.cta}
          </Button>
        </div>
      </div>
    </div>
  )
}

export function PinnedShowcase() {
  const rootRef = useRef<HTMLElement>(null)
  const railRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root || prefersReducedMotion()) return

    const slides = Array.from(root.querySelectorAll<HTMLElement>('[data-slide]'))
    const segments = Array.from(railRef.current?.querySelectorAll('span') ?? [])
    const setActive = (active: number) => {
      slides.forEach((slide, i) => {
        const hidden = i !== active
        slide.toggleAttribute('inert', hidden)
        slide.setAttribute('aria-hidden', hidden ? 'true' : 'false')
      })
      segments.forEach((seg, i) => seg.classList.toggle('bg-paper', i <= active))
    }
    setActive(0)

    const ctx = gsap.context(() => {
      slides.forEach((slide) => {
        gsap.fromTo(
          slide.querySelector('[data-slide-bg]'),
          { scale: 1.06 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: { trigger: root, start: 'top top', end: 'bottom bottom', scrub: true },
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
            setActive(Math.min(SLIDES.length - 1, Math.round(self.progress * (SLIDES.length - 1))))
          },
        },
      })

      slides.forEach((slide, i) => {
        if (i === 0) return
        const at = i - 0.45
        tl.fromTo(slide, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.45 }, at)
        tl.fromTo(
          slide.querySelectorAll('[data-slide-el]'),
          { y: 40 },
          { y: 0, duration: 0.45, stagger: 0.04 },
          at,
        )
      })
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
    return (
      <section aria-label="Featured solutions">
        {SLIDES.map((slide, i) => (
          <div key={slide.title} className="relative isolate flex min-h-[80svh] items-end overflow-hidden">
            <div
              className="absolute inset-0 -z-20 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
              aria-hidden="true"
            />
            <div className="absolute inset-0 -z-10 bg-scene/65" aria-hidden="true" />
            <div className="w-full pt-20">
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
          <div key={slide.title} data-slide className="absolute inset-0 isolate" style={{ opacity: i === 0 ? 1 : 0 }}>
            <div
              data-slide-bg
              className="absolute inset-0 -z-20 bg-cover bg-center will-change-transform"
              style={{ backgroundImage: `url(${slide.image})` }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 -z-10 bg-gradient-to-t from-scene/85 via-scene/45 to-scene/35"
              aria-hidden="true"
            />
            <SlideContent slide={slide} index={i} />
          </div>
        ))}

        {/* Frame chrome: label and progress rail */}
        <div className="container-site pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between pt-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-paper/60">Featured solutions</p>
          <div ref={railRef} className="flex items-center gap-1.5" aria-hidden="true">
            {SLIDES.map((s, i) => (
              <span
                key={s.title}
                className={`block h-px w-8 transition-colors duration-500 md:w-12 ${
                  i === 0 ? 'bg-paper' : 'bg-paper/25'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
