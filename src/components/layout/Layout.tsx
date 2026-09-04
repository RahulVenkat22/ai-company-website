import { Suspense, type ReactNode } from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { ConsentBanner } from './ConsentBanner'
import { ScrollManager } from './ScrollManager'
import { ScrollProgress } from './ScrollProgress'

/**
 * Site shell: skip link, sticky navbar, routed content, footer, consent.
 * The skip link targets #main-content for keyboard/screen-reader users.
 */
export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[60] -translate-y-24 rounded-btn bg-primary px-4 py-2.5 text-small font-semibold text-ink-inverse transition-transform duration-200 focus:translate-y-0"
      >
        Skip to content
      </a>
      <ScrollManager />
      <Navbar />
      <ScrollProgress />
      <main id="main-content" tabIndex={-1} className="flex-1 pt-16 outline-none md:pt-[72px]">
        <Suspense
          fallback={
            <div
              className="flex min-h-[50vh] items-center justify-center text-small text-ink-subtle"
              role="status"
              aria-live="polite"
            >
              Loading…
            </div>
          }
        >
          {children}
        </Suspense>
      </main>
      <Footer />
      <ConsentBanner />
    </div>
  )
}
