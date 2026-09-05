import { useEffect, useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Section } from '@/components/ui/Section'
import { sectionVariantClasses, type SectionVariant } from '@/components/ui/sectionVariants'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { caseStudies, type CaseStudy } from '@/data/caseStudies'
import { trackEvent } from '@/lib/analytics'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useMediaQuery } from '@/lib/useMediaQuery'

/** Illustrative imagery per featured project (stored in /public/images). */
const CARD_IMAGES = [
  '/images/band-tech.jpg',
  '/images/team-laptop.jpg',
  '/images/band-office.jpg',
  '/images/band-collab.jpg',
]
const FEATURED = caseStudies.slice(0, 4)
/** Gap between cards (matches `gap-5`). */
const GAP_PX = 20

/**
 * The scroll-driven mode needs a pointer-sized screen and no reduced-motion
 * preference. Below that the row is a native swipe list.
 */
const PINNED_QUERY = '(min-width: 768px) and (prefers-reduced-motion: no-preference)'

/**
 * Case study previews. From tablet widths the section pins for one screen
 * height while the row of cards travels horizontally in step with the
 * vertical scroll: one pixel scrolled is one pixel of travel, so wheel,
 * trackpad, keyboard and scrollbar all drive it, and scrolling up rewinds.
 * The pin is CSS `position: sticky` on a full-height panel; GSAP scrubs only
 * the track's translateX (ease "none") across the section's extra height,
 * which equals the row's overflow. The prev/next buttons move the page by
 * one card, and a card receiving keyboard focus brings itself into view the
 * same way. On phones and under prefers-reduced-motion the row is a native
 * horizontal scroll-snap list with no scroll hijacking.
 */
export function CaseStudiesSection({ variant = 'default' }: { variant?: SectionVariant }) {
  const pinned = useMediaQuery(PINNED_QUERY)
  const rootRef = useRef<HTMLElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLUListElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  /** How far the track overflows the content column: its travel, and the length of the pinned stretch. */
  const distance = () => {
    const track = trackRef.current
    const viewport = viewportRef.current
    return track && viewport ? Math.max(0, track.scrollWidth - viewport.clientWidth) : 0
  }

  useEffect(() => {
    const root = rootRef.current
    const track = trackRef.current
    if (!pinned || !root || !track) return

    // The section is one screen tall plus the travel, so the sticky panel
    // stays put for exactly as long as the row needs to cross the column.
    const setHeight = () => {
      root.style.height = `calc(100svh + ${distance()}px)`
    }
    setHeight()

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          invalidateOnRefresh: true,
          onRefreshInit: setHeight,
        },
      })
    }, root)

    // Keyboard users: focusing a card scrolls the page to where that card
    // is fully in view (the horizontal offset maps 1:1 onto page scroll).
    const onFocus = (event: FocusEvent) => {
      const card = (event.target as HTMLElement).closest<HTMLElement>('li')
      if (!card) return
      const rootTop = root.getBoundingClientRect().top + window.scrollY
      const left = gsap.utils.clamp(0, distance(), card.offsetLeft - track.offsetLeft)
      window.scrollTo({ top: rootTop + left })
    }
    track.addEventListener('focusin', onFocus)

    // The new height moves everything below; let later triggers re-measure.
    ScrollTrigger.refresh()

    return () => {
      track.removeEventListener('focusin', onFocus)
      ctx.revert()
      root.style.height = ''
    }
  }, [pinned])

  const step = (dir: 1 | -1) => {
    if (pinned) {
      const root = rootRef.current
      const track = trackRef.current
      if (!root || !track) return
      const card = track.querySelector<HTMLElement>('li')
      const size = (card?.getBoundingClientRect().width ?? 400) + GAP_PX
      const rootTop = root.getBoundingClientRect().top + window.scrollY
      const max = distance()
      const current = gsap.utils.clamp(0, max, window.scrollY - rootTop)
      window.scrollTo({ top: rootTop + gsap.utils.clamp(0, max, current + dir * size), behavior: 'smooth' })
      return
    }
    const list = listRef.current
    if (!list) return
    const card = list.querySelector<HTMLElement>('li')
    const size = card ? card.getBoundingClientRect().width + GAP_PX : list.clientWidth * 0.8
    list.scrollBy({ left: dir * size, behavior: 'smooth' })
  }

  const cards = (
    <>
      {FEATURED.map((study, i) => (
        <li key={study.slug} className="w-[85vw] shrink-0 snap-start sm:w-[28rem] lg:w-[34rem]">
          <StudyCard study={study} image={CARD_IMAGES[i % CARD_IMAGES.length]} fill={pinned} />
        </li>
      ))}
      <li className="w-[70vw] shrink-0 snap-start sm:w-[18rem]">
        <AllStudiesCard />
      </li>
    </>
  )

  if (pinned) {
    return (
      <section
        ref={rootRef}
        id="case-studies"
        className={`relative scroll-mt-20 ${sectionVariantClasses[variant]}`.trim()}
      >
        <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-clip pb-8 pt-20">
          <Container>
            <Header onStep={step} />
          </Container>
          <Container className="mt-10 md:mt-12">
            <div ref={viewportRef}>
              <ul
                ref={trackRef}
                className="flex w-max items-stretch gap-5 will-change-transform"
                aria-label="Featured case studies"
              >
                {cards}
              </ul>
            </div>
          </Container>
        </div>
      </section>
    )
  }

  return (
    <Section id="case-studies" variant={variant} className="overflow-hidden">
      <Header onStep={step} />
      <ul
        ref={listRef}
        className="scrollbar-none -mx-5 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 md:mt-12 lg:-mx-10 lg:px-10"
        aria-label="Featured case studies"
      >
        {cards}
      </ul>
    </Section>
  )
}

function Header({ onStep }: { onStep: (dir: 1 | -1) => void }) {
  const controlClass =
    'inline-flex h-11 w-11 items-center justify-center rounded-btn border border-line-strong text-ink transition-colors hover:border-ink/50 hover:bg-surface-2 active:scale-[0.98]'

  return (
    <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="flex max-w-2xl flex-col gap-4">
        <h2 className="text-h2">Engineering work, end to end</h2>
        <p className="text-body-lg text-ink-muted">
          Challenge, architecture, implementation and outcome, written the way we deliver.
          These projects are illustrative: no client names, no invented numbers.
        </p>
      </div>
      <div className="hidden gap-2 md:flex">
        <button type="button" className={controlClass} onClick={() => onStep(-1)} aria-label="Previous case study">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </button>
        <button type="button" className={controlClass} onClick={() => onStep(1)} aria-label="Next case study">
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </Reveal>
  )
}

/**
 * One featured project. `fill` (pinned mode) gives the card a height that
 * fits the pinned screen (clamped between 22rem and 36rem) and lets the
 * photograph absorb the difference, so short laptop viewports never clip
 * the copy. Otherwise the photo keeps a 16:9 ratio and the card grows.
 */
function StudyCard({ study, image, fill }: { study: CaseStudy; image: string; fill: boolean }) {
  return (
    <article
      className={`flex flex-col overflow-hidden rounded-card border border-line bg-surface ${
        fill ? 'h-[clamp(22rem,calc(100svh-20rem),36rem)]' : 'h-full'
      }`}
    >
      <div className={fill ? 'min-h-[5rem] flex-1 overflow-hidden' : 'aspect-[16/9] overflow-hidden'}>
        <img
          src={image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-premium hover:scale-[1.03]"
        />
      </div>
      <div className={`flex flex-col gap-3 p-6 md:p-7 ${fill ? 'shrink-0' : 'flex-1'}`}>
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-subtle">
          {study.category}. Illustrative project
        </p>
        <h3 className={`text-h3 text-ink ${fill ? 'line-clamp-2' : ''}`.trim()}>{study.title}</h3>
        <p className="line-clamp-3 text-small text-ink-muted">{study.challenge}</p>
        <ul className="mt-1 flex list-none flex-wrap gap-1.5" aria-label="Key technologies">
          {study.technologies.slice(0, 4).map((tech) => (
            <li
              key={tech}
              className="rounded-btn border border-line px-2 py-0.5 font-mono text-[11px] text-ink-muted"
            >
              {tech}
            </li>
          ))}
        </ul>
        <Link
          to="/case-studies"
          onClick={() => trackEvent('case_study_teaser_click', { slug: study.slug })}
          className="group mt-auto inline-flex items-center gap-1.5 pt-4 text-small font-medium text-ink transition-colors hover:text-primary"
        >
          Read the case study
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  )
}

function AllStudiesCard() {
  return (
    <Link
      to="/case-studies"
      className="group flex h-full min-h-[18rem] flex-col justify-between rounded-card border border-line-strong p-6 text-ink transition-colors hover:border-ink/50 hover:bg-surface-2 md:p-7"
    >
      <span className="text-h3">All case studies</span>
      <ArrowRight
        className="h-8 w-8 transition-transform duration-300 ease-premium group-hover:translate-x-1.5"
        aria-hidden="true"
      />
    </Link>
  )
}
