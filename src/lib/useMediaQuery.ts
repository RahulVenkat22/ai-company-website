import { useEffect, useState } from 'react'

/**
 * Tracks a CSS media query and re-renders when it flips (viewport resize,
 * OS motion preference change). Reads the initial value synchronously so the
 * first render already matches the environment.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setMatches(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])

  return matches
}
