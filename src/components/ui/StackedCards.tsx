import { Children, useEffect, useRef, type ReactNode } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/gsap'

interface StackedCardsProps {
  children: ReactNode
  /** Sticky offset below the fixed navbar, in rem. */
  top?: number
}

/**
 * Stacking-cards scroller: each card sticks below the navbar and the next
 * one slides up to cover it, while the covered card scales back and dims
 * (GSAP scrub). The stacking itself is plain CSS `position: sticky`, so with
 * reduced motion (or without JS) it still reads as an ordinary card list —
 * cards simply cover each other without the scale-away polish.
 *
 * Children must have an opaque background (e.g. <Card>): a covered card sits
 * directly beneath the next one.
 */
export function StackedCards({ children, top = 6 }: StackedCardsProps) {
  const rootRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('[data-stack-item]', root)
      items.forEach((item, i) => {
        const next = items[i + 1]
        if (!next) return
        // As the next card approaches its sticky position, the covered card
        // recedes: scaled down slightly and darkened. Brightness, not
        // opacity — a transparent card would expose the cards (and video
        // backdrop) stacked beneath it. fromTo with explicit endpoints:
        // a plain .to() re-captures its start from the already-dimmed
        // value on ScrollTrigger refreshes, compounding the dim until
        // deep cards render almost black.
        gsap.fromTo(
          item.firstElementChild,
          { scale: 1, filter: 'brightness(1)' },
          {
            scale: 0.94,
            filter: 'brightness(0.82)',
            transformOrigin: 'center top',
            ease: 'none',
            scrollTrigger: {
              trigger: next,
              start: 'top bottom',
              end: 'top 20%',
              scrub: true,
            },
          },
        )
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <ul ref={rootRef} className="relative flex list-none flex-col gap-8">
      {Children.map(children, (child, i) => (
        <li
          data-stack-item
          className="sticky"
          style={{ top: `${top + i * 1.25}rem` }}
        >
          {child}
        </li>
      ))}
    </ul>
  )
}
