import { Moon, Sun } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useTheme } from '@/lib/theme'

/** Light/dark toggle. Preference persists via ThemeProvider. */
export function ThemeToggle({
  className = '',
  onDark = false,
}: {
  className?: string
  /** Explicit light colours for use over dark media in the light theme. */
  onDark?: boolean
}) {
  const { theme, toggleTheme } = useTheme()
  const reduce = useReducedMotion()
  const next = theme === 'dark' ? 'light' : 'dark'
  const Icon = theme === 'dark' ? Sun : Moon

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={`relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-btn border transition-colors duration-200 ${
        onDark
          ? 'border-paper/25 text-paper/85 hover:border-paper/60 hover:text-paper'
          : 'border-line text-ink-muted hover:border-line-strong hover:text-ink'
      } ${className}`.trim()}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          className="inline-flex"
          initial={reduce ? false : { rotate: -40, opacity: 0, scale: 0.7 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={reduce ? undefined : { rotate: 40, opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <Icon className="h-[17px] w-[17px]" aria-hidden="true" />
        </motion.span>
      </AnimatePresence>
    </button>
  )
}
