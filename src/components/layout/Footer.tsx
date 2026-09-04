import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { footerLinkGroups, site } from '@/config/site'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Logo } from './Logo'

/** Site footer: brand, link groups, contact placeholders, legal. */
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line bg-surface">
      <Container className="py-14 md:py-18">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          {/* Brand block */}
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-small text-ink-muted">
              We combine AI, data, cloud and software engineering to build
              intelligent solutions for real business problems.
            </p>
            <p className="mt-4 font-mono text-caption uppercase tracking-[0.16em] text-ink-subtle">
              AI / Data / Cloud / Automation / Engineering
            </p>
            <div className="mt-6">
              <Button
                to="/contact"
                size="sm"
                variant="secondary"
                eventName="cta_click"
                eventParams={{ cta: 'footer_start_project', location: 'footer' }}
                iconRight={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
              >
                Start a project
              </Button>
            </div>
          </div>

          {/* Link groups */}
          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerLinkGroups.map((group) => (
              <div key={group.title}>
                <h2 className="font-mono text-caption uppercase tracking-[0.14em] text-ink-subtle">
                  {group.title}
                </h2>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-small text-ink-muted transition-colors duration-200 hover:text-ink"
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

        {/* Contact placeholders */}
        <div className="mt-12 grid gap-4 border-t border-line pt-8 text-small text-ink-subtle sm:grid-cols-3">
          <p>
            <span className="font-medium text-ink-muted">Email: </span>
            {site.email}
          </p>
          <p>
            <span className="font-medium text-ink-muted">Phone: </span>
            {site.phone}
          </p>
          <p>
            <span className="font-medium text-ink-muted">Address: </span>
            {site.address}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-line pt-6 text-caption text-ink-subtle md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>
            Social: LinkedIn {site.social.linkedin} · X {site.social.x} · GitHub{' '}
            {site.social.github}
          </p>
        </div>
      </Container>
    </footer>
  )
}
