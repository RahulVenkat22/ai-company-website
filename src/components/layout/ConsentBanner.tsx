import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { getConsent, setConsent } from '@/lib/analytics'
import { Button } from '@/components/ui/Button'

/**
 * Compact analytics consent card, bottom-right, that never covers the hero
 * copy. Analytics scripts load only after "Accept" (see lib/analytics.ts);
 * the choice is persisted. Enter/exit is a Framer Motion presence transition.
 */
export function ConsentBanner() {
  const [decided, setDecided] = useState(() => getConsent() !== null)
  const reduce = useReducedMotion()

  const decide = (state: 'granted' | 'denied') => {
    setConsent(state)
    setDecided(true)
  }

  return (
    <AnimatePresence>
      {!decided && (
        <motion.div
          key="consent"
          role="region"
          aria-label="Cookie and analytics consent"
          className="fixed inset-x-4 bottom-4 z-50 rounded-card border border-line bg-surface/95 p-5 shadow-card-hover backdrop-blur-md sm:inset-x-auto sm:bottom-6 sm:right-6 sm:max-w-sm"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: 12 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-small text-ink-muted">
            We use optional analytics cookies to understand how visitors use this site. No
            marketing trackers, no unnecessary personal data.{' '}
            <Link to="/cookie-policy" className="font-medium text-ink underline underline-offset-2">
              Cookie policy
            </Link>
          </p>
          <div className="mt-4 flex gap-2.5">
            <Button size="sm" variant="secondary" onClick={() => decide('denied')}>
              Decline
            </Button>
            <Button size="sm" onClick={() => decide('granted')}>
              Accept
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
