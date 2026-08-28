import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getConsent, setConsent } from '@/lib/analytics'
import { Button } from '@/components/ui/Button'

/**
 * Minimal, non-intrusive analytics consent banner. Analytics scripts load
 * only after "Accept" (see lib/analytics.ts). The choice is persisted.
 */
export function ConsentBanner() {
  const [decided, setDecided] = useState(() => getConsent() !== null)

  if (decided) return null

  const decide = (state: 'granted' | 'denied') => {
    setConsent(state)
    setDecided(true)
  }

  return (
    <div
      role="region"
      aria-label="Cookie and analytics consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-surface/95 backdrop-blur-md"
    >
      <div className="container-site flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-small text-ink-muted">
          We use optional analytics cookies to understand how visitors use this
          site. No marketing trackers, no unnecessary personal data.{' '}
          <Link to="/cookie-policy" className="font-medium text-ink underline underline-offset-2">
            Cookie Policy
          </Link>
        </p>
        <div className="flex shrink-0 gap-2.5">
          <Button variant="secondary" onClick={() => decide('denied')}>
            Decline
          </Button>
          <Button onClick={() => decide('granted')}>Accept</Button>
        </div>
      </div>
    </div>
  )
}
