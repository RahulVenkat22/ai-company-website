import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/lib/theme'

/** Light/dark toggle. Preference persists via ThemeProvider. */
export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()
  const next = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-btn border border-line text-ink-muted transition-colors duration-200 hover:border-line-strong hover:text-ink ${className}`.trim()}
    >
      {theme === 'dark' ? (
        <Sun className="h-[18px] w-[18px]" aria-hidden="true" />
      ) : (
        <Moon className="h-[18px] w-[18px]" aria-hidden="true" />
      )}
    </button>
  )
}
