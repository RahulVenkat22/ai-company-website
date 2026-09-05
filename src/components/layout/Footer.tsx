import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUp } from 'lucide-react'
import { footerLinkGroups, site } from '@/config/site'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

/**
 * Site footer: always-dark scene band with the brand statement, four link
 * groups, contact placeholders, legal, and the wordmark repeated as a large
 * cropped watermark along the bottom edge. Fixed scene colours so the band
 * is identical in both themes.
 */
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden border-t border-paper/10 bg-scene text-paper">
      <Container className="relative py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div className="max-w-sm">
            <Link to="/" className="text-[19px] font-medium tracking-[-0.02em] text-paper">
              {site.wordmark}
            </Link>
            <p className="mt-5 text-small text-paper/65">
              We combine AI, data, cloud and software engineering to build intelligent
              solutions for real business problems.
            </p>
            <div className="mt-7">
              <Button
                to="/contact"
                variant="inverse"
                eventName="cta_click"
                eventParams={{ cta: 'start_project', location: 'footer' }}
                iconRight={<ArrowRight aria-hidden="true" />}
              >
                Start a project
              </Button>
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
            {footerLinkGroups.map((group) => (
              <div key={group.title}>
                <h2 className="font-mono text-[11px] uppercase tracking-[0.14em] text-paper/60">
                  {group.title}
                </h2>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-small text-paper/75 transition-colors duration-200 hover:text-paper"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <dl className="mt-14 grid gap-6 border-t border-paper/10 pt-8 text-small sm:grid-cols-3">
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-paper/60">Email</dt>
            <dd className="mt-2 text-paper/80">{site.email}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-paper/60">Phone</dt>
            <dd className="mt-2 text-paper/80">{site.phone}</dd>
          </div>
          <div>
            <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-paper/60">Address</dt>
            <dd className="mt-2 text-paper/80">{site.address}</dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-col gap-4 border-t border-paper/10 pt-6 text-caption text-paper/55 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <ul className="flex flex-wrap gap-x-4">
              <li>LinkedIn: {site.social.linkedin}</li>
              <li>X: {site.social.x}</li>
              <li>GitHub: {site.social.github}</li>
            </ul>
            <a
              href="#main-content"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-paper/70 transition-colors hover:text-paper"
            >
              <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
              Back to top
            </a>
          </div>
        </div>
      </Container>

      {/* Cropped wordmark watermark along the bottom edge (CSS content, decorative) */}
      <div
        aria-hidden="true"
        data-watermark={site.wordmark}
        className="watermark pointer-events-none relative -mb-[0.22em] mt-2 select-none overflow-hidden"
      />
    </footer>
  )
}
