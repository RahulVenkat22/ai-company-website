import { Link } from 'react-router-dom'
import { site } from '@/config/site'

/**
 * Placeholder wordmark (prompt.md §46 — replace with the real logo).
 * The mark is a simple abstract "node + connections" glyph consistent with
 * the technical visual language of the site.
 */
export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label={`${site.name} — home`}
      className="flex items-center gap-2.5"
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect x="1" y="1" width="26" height="26" rx="7" className="fill-primary/15 stroke-primary/60" />
        <circle cx="9" cy="19" r="2.4" className="fill-accent" />
        <circle cx="14" cy="9" r="2.4" className="fill-primary" />
        <circle cx="19.5" cy="16.5" r="2.4" className="fill-violet-acc" />
        <path
          d="M10.5 17.2 12.8 11M15.8 10.5l2.4 4.2M11.4 19h5.7"
          className="stroke-ink-subtle"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-[17px] font-semibold tracking-tight text-ink">
        {site.wordmark}
      </span>
    </Link>
  )
}
