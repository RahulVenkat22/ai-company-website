import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ArrowRight, Menu, X } from 'lucide-react'
import { navLinks } from '@/config/site'
import { Button } from '@/components/ui/Button'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'

/**
 * Sticky site navigation. Desktop links appear from xl; below that a
 * touch-friendly slide-down menu is used. Fully keyboard operable:
 * Escape closes the menu and focus returns to the toggle button.
 */
export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const location = useLocation()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close the mobile menu on navigation.
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  // Elevated background once scrolled; slide away when scrolling down deep
  // into the page, return the moment the user scrolls back up. Never hidden
  // while the mobile menu is open, and focus-within reveals it via CSS.
  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 8)
      setHidden(y > lastY && y > 480 && !open)
      lastY = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [open])

  // Escape closes the menu; lock body scroll and make the covered page
  // content inert while open so Tab cannot reach hidden elements.
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
    'whitespace-nowrap rounded-btn px-1.5 py-2 text-[13px] font-medium transition-colors duration-200 2xl:px-2.5 2xl:text-small'
  const desktopLink = ({ isActive }: { isActive: boolean }) =>
    `${linkBase} ${isActive ? 'text-ink' : 'text-ink-muted hover:text-ink'}`
  const mobileLink = ({ isActive }: { isActive: boolean }) =>
    `block rounded-btn px-4 py-3 text-body font-medium transition-colors duration-200 ${
      isActive ? 'bg-surface-2 text-ink' : 'text-ink-muted hover:bg-surface-2 hover:text-ink'
    }`

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ease-premium focus-within:translate-y-0 motion-reduce:translate-y-0 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      } ${
        scrolled || open
          ? 'border-line bg-bg/90 backdrop-blur-md'
          : 'border-transparent bg-transparent'
      }`}
    >
      <nav aria-label="Main" className="container-site flex h-16 items-center justify-between gap-4 md:h-[72px]">
        <Logo onClick={() => setOpen(false)} />

        {/* Desktop navigation */}
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
          <ThemeToggle className="hidden md:inline-flex" />
          <Button
            to="/contact"
            size="sm"
            className="hidden whitespace-nowrap md:inline-flex"
            eventName="nav_cta_click"
            eventParams={{ location: 'navbar' }}
            iconRight={
              <ArrowRight className="hidden h-4 w-4 2xl:block" aria-hidden="true" />
            }
          >
            Let's Build Something Intelligent
          </Button>

          {/* Mobile menu toggle */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-btn border border-line text-ink transition-colors hover:border-line-strong xl:hidden"
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        hidden={!open}
        className="border-t border-line bg-bg xl:hidden"
      >
        <div className="container-site max-h-[calc(100dvh-4rem)] overflow-y-auto py-4">
          <ul className="flex flex-col gap-0.5">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} className={mobileLink} end={link.to === '/'}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-3 border-t border-line pt-4">
            <Button
              to="/contact"
              className="flex-1"
              eventName="nav_cta_click"
              eventParams={{ location: 'mobile_menu' }}
              iconRight={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
            >
              Let's Build Something Intelligent
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
