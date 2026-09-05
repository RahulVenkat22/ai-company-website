import { useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { caseStudies } from '@/data/caseStudies'
import { trackEvent } from '@/lib/analytics'

/** Illustrative imagery per featured project (stored in /public/images). */
const CARD_IMAGES = ['/images/band-tech.jpg', '/images/team-laptop.jpg', '/images/band-office.jpg']

/**
 * Case study previews as a native horizontal scroll-snap row: wide cards,
 * one story per card, a partial next card visible as the affordance, and
 * prev/next buttons for pointer users. No scroll hijacking.
 */
export function CaseStudiesSection({ variant = 'default' }: { variant?: 'default' | 'alt' | 'deep' }) {
  const featured = caseStudies.slice(0, 3)
  const listRef = useRef<HTMLUListElement>(null)

  const scrollBy = (dir: 1 | -1) => {
    const list = listRef.current
    if (!list) return
    const card = list.querySelector<HTMLElement>('li')
    const step = card ? card.getBoundingClientRect().width + 20 : list.clientWidth * 0.8
    list.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  const controlClass =
    'inline-flex h-11 w-11 items-center justify-center rounded-btn border border-line-strong text-ink transition-colors hover:border-ink/50 hover:bg-surface-2 active:scale-[0.98]'

  return (
    <Section id="case-studies" variant={variant} className="overflow-hidden">
      <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="flex max-w-2xl flex-col gap-4">
          <h2 className="text-h2">Engineering work, end to end</h2>
          <p className="text-body-lg text-ink-muted">
            Challenge, architecture, implementation and outcome, written the way we deliver.
            These projects are illustrative: no client names, no invented numbers.
          </p>
        </div>
        <div className="hidden gap-2 md:flex">
          <button type="button" className={controlClass} onClick={() => scrollBy(-1)} aria-label="Previous case study">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button type="button" className={controlClass} onClick={() => scrollBy(1)} aria-label="Next case study">
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </Reveal>

      <ul
        ref={listRef}
        className="scrollbar-none -mx-5 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 md:mt-12 lg:-mx-10 lg:px-10"
        aria-label="Featured case studies"
      >
        {featured.map((study, i) => (
          <li key={study.slug} className="w-[85vw] shrink-0 snap-start sm:w-[28rem] lg:w-[34rem]">
            <article className="flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface">
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={CARD_IMAGES[i % CARD_IMAGES.length]}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-premium hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6 md:p-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-subtle">
                  {study.category}. Illustrative project
                </p>
                <h3 className="text-h3 text-ink">{study.title}</h3>
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
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-premium group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
            </article>
          </li>
        ))}
        <li className="w-[70vw] shrink-0 snap-start sm:w-[18rem]">
          <Link
            to="/case-studies"
            className="group flex h-full min-h-[18rem] flex-col justify-between rounded-card border border-line-strong p-6 text-ink transition-colors hover:border-ink/50 hover:bg-surface-2 md:p-7"
          >
            <span className="text-h3">All case studies</span>
            <ArrowRight className="h-8 w-8 transition-transform duration-300 ease-premium group-hover:translate-x-1.5" aria-hidden="true" />
          </Link>
        </li>
      </ul>
    </Section>
  )
}
