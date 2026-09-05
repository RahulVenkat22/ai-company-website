import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUp } from 'lucide-react'
import { footerLinkGroups, site } from '@/config/site'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

/**
 * Editorial site footer: always-dark espresso band with serif link
 * columns, contact placeholders, legal — and the wordmark repeated as a
 * giant cropped watermark along the bottom edge. Colors are explicit
 * (not theme tokens) so the band is identical in both themes.
 */
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-[#191310] text-[#F4EEE3]">
      <Container className="relative py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          {/* Brand block */}
          <div className="max-w-sm">
            <Link to="/" className="font-serif text-3xl tracking-tight text-[#F4EEE3]">
              {site.wordmark}
            </Link>
            <p className="mt-5 text-small text-[#F4EEE3]/65">
              We combine AI, data, cloud and software engineering to build
              intelligent solutions for real business problems.
            </p>
            <p className="mt-5 font-mono text-caption uppercase tracking-[0.18em] text-[#F4EEE3]/45">
              AI · Data · Cloud · Automation · Engineering
            </p>
            <div className="mt-7">
              <Button
                to="/contact"
                variant="inverse"
                eventName="cta_click"
                eventParams={{ cta: 'footer_start_project', location: 'footer' }}
                iconRight={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
              >
                Start a project
              </Button>
            </div>
          </div>

          {/* Link groups — serif editorial links */}
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
            {footerLinkGroups.map((group) => (
              <div key={group.title}>
                <h2 className="font-mono text-caption uppercase tracking-[0.16em] text-[#F4EEE3]/45">
                  {group.title}
                </h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="font-serif text-[1.05rem] leading-snug text-[#F4EEE3]/80 transition-colors duration-200 hover:text-[#F4EEE3]"
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
        <div className="mt-14 grid gap-4 border-t border-[#F4EEE3]/15 pt-8 text-small text-[#F4EEE3]/55 sm:grid-cols-3">
          <p>
            <span className="font-medium text-[#F4EEE3]/75">Email: </span>
            {site.email}
          </p>
          <p>
            <span className="font-medium text-[#F4EEE3]/75">Phone: </span>
            {site.phone}
          </p>
          <p>
            <span className="font-medium text-[#F4EEE3]/75">Address: </span>
            {site.address}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-[#F4EEE3]/15 pt-6 text-caption text-[#F4EEE3]/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <p>
              Social: LinkedIn {site.social.linkedin} · X {site.social.x} · GitHub{' '}
              {site.social.github}
            </p>
            <a
              href="#main-content"
              className="inline-flex items-center gap-2 font-mono uppercase tracking-[0.18em] text-[#F4EEE3]/70 transition-colors hover:text-[#F4EEE3]"
            >
              <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
              Back to top
            </a>
          </div>
        </div>
      </Container>

      {/* Giant cropped wordmark watermark along the bottom edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none relative -mb-[0.24em] mt-4 select-none overflow-hidden"
      >
        <p className="whitespace-nowrap text-center font-serif text-[clamp(5rem,17vw,16rem)] leading-none tracking-tight text-[#F4EEE3]/[0.07]">
          {site.wordmark}
        </p>
      </div>
    </footer>
  )
}
