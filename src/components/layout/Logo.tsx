import { Link } from 'react-router-dom'
import { site } from '@/config/site'

/**
 * Placeholder wordmark (prompt.md 46: replace with the real logo). The mark
 * is a quiet node-and-edge glyph in ink with a single signal-coloured node.
 */
export function Logo({
  onClick,
  onDark = false,
}: {
  onClick?: () => void
  /** Explicit light colours for use over dark media in the light theme. */
  onDark?: boolean
}) {
  const ink = onDark ? 'text-paper' : 'text-ink'
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label={`${site.name}, home`}
      className={`flex items-center gap-2.5 ${ink}`}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0">
        <rect x="0.75" y="0.75" width="22.5" height="22.5" rx="5" className="stroke-current opacity-30" strokeWidth="1.5" />
        <path d="M7.5 16.5 12 7.5l4.5 9M9 13.5h6" className="stroke-current" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="7.5" r="1.9" className="fill-signal" />
      </svg>
      <span className="text-[17px] font-medium leading-none tracking-[-0.02em]">{site.wordmark}</span>
    </Link>
  )
}
