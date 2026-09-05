import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'
import { navLinks } from '@/config/site'
import { Button } from '@/components/ui/Button'
import { useTheme } from '@/lib/theme'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'

/**
 * Fixed site navigation, 64/72px tall, one line on desktop (links from xl;
 * below that a slide-down menu). The menu open/close is a Framer Motion
 * presence transition; the bar's own show/hide on scroll is a CSS transform.
 * Fully keyboard operable: Escape closes the menu and returns focus.
 */
export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const location = useLocation()
  const { theme } = useTheme()
  const reduce = useReducedMotion()
  const isHome = location.pathname === '/'
  const [overHero, setOverHero] = useState(isHome)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  // Elevated background once scrolled; slide away when scrolling down deep
  // into the page, return the moment the user scrolls back up.
  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 8)
      setHidden(y > lastY && y > 480 && !open)
      setOverHero(isHome && y < window.innerHeight - 96)
      lastY = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [open, isHome])

  // The home hero is dark media in both themes. In the dark theme the tokens
  // already read light-on-dark; only the light theme needs explicit paper
  // colours while the bar is still over the hero.
  const overVideo = overHero && !open && theme === 'light'

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    const covered = document.querySelectorAll('main, footer')
    covered.forEach((el) => el.setAttribute('inert', ''))
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      covered.forEach((el) => el.removeAttribute('inert'))
    }
  }, [open])

  const linkBase =
    'whitespace-nowrap rounded-btn px-2 py-2 text-[13px] font-medium transition-colors duration-200 2xl:px-2.5 2xl:text-small'
  const desktopLink = ({ isActive }: { isActive: boolean }) =>
    `${linkBase} ${
      overVideo
        ? isActive
          ? 'text-paper'
          : 'text-paper/70 hover:text-paper'
        : isActive
          ? 'text-ink'
          : 'text-ink-muted hover:text-ink'
    }`
  const mobileLink = ({ isActive }: { isActive: boolean }) =>
    `block rounded-btn px-4 py-3 text-body font-medium transition-colors duration-200 ${
      isActive ? 'bg-surface-2 text-ink' : 'text-ink-muted hover:bg-surface-2 hover:text-ink'
    }`

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ease-premium focus-within:translate-y-0 motion-reduce:translate-y-0 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      } ${
        (scrolled || open) && !overVideo
          ? 'border-line bg-bg/85 backdrop-blur-md'
          : 'border-transparent bg-transparent'
      }`}
    >
      <nav aria-label="Main" className="container-site flex h-16 items-center justify-between gap-4 md:h-[72px]">
        <Logo onClick={() => setOpen(false)} onDark={overVideo} />

        <div className="hidden items-center gap-0.5 xl:flex">
          {navLinks
            .filter((l) => l.to !== '/')
            .map((link) => (
              <NavLink key={link.to} to={link.to} className={desktopLink}>
                {link.label}
              </NavLink>
            ))}
        </div>

        <div className="flex items-center gap-2.5">
          <ThemeToggle className="hidden md:inline-flex" onDark={overVideo} />
          <Button
            to="/contact"
            size="sm"
            className="hidden md:inline-flex"
            eventName="nav_cta_click"
            eventParams={{ location: 'navbar' }}
            iconRight={<ArrowRight className="hidden 2xl:block" aria-hidden="true" />}
          >
            Start a project
          </Button>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-btn border transition-colors xl:hidden ${
              overVideo
                ? 'border-paper/25 text-paper hover:border-paper/60'
                : 'border-line text-ink hover:border-line-strong'
            }`}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="mobile-menu"
            key="menu"
            className="border-t border-line bg-bg xl:hidden"
            initial={reduce ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="container-site max-h-[calc(100dvh-4rem)] overflow-y-auto py-4">
              <motion.ul
                className="flex flex-col gap-0.5"
                initial={reduce ? false : 'hidden'}
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.035 } } }}
              >
                {navLinks.map((link) => (
                  <motion.li
                    key={link.to}
                    variants={{ hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0 } }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <NavLink to={link.to} className={mobileLink} end={link.to === '/'}>
                      {link.label}
                    </NavLink>
                  </motion.li>
                ))}
              </motion.ul>
              <div className="mt-4 flex items-center gap-3 border-t border-line pt-4">
                <Button
                  to="/contact"
                  className="flex-1"
                  eventName="nav_cta_click"
                  eventParams={{ location: 'mobile_menu' }}
                  iconRight={<ArrowRight aria-hidden="true" />}
                >
                  Start a project
                </Button>
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
