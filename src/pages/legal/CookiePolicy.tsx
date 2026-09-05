import { Seo } from '@/lib/seo'
import { PageHeader } from '@/components/ui/PageHeader'
import { Section } from '@/components/ui/Section'
import { Alert } from '@/components/ui/Alert'
import { site } from '@/config/site'

const storedValues = [
  {
    name: 'Theme preference',
    detail:
      'Your light/dark theme choice, kept in your browser’s localStorage so the site remembers it on your next visit. It never leaves your device.',
  },
  {
    name: 'Consent choice',
    detail:
      'Whether you accepted or declined analytics, kept in localStorage so we do not ask again on every visit. It never leaves your device.',
  },
] as const

export default function CookiePolicy() {
  return (
    <>
      <Seo
        title="Cookie Policy"
        description="What this website stores in your browser: a theme preference, your consent choice, and optional analytics cookies only after you accept."
        path="/cookie-policy"
      />

      <PageHeader
        title="Cookie Policy"
        lead="What this website stores in your browser, and the choices you have. Last updated: [TBD]."
      />

      <Section variant="default">
        <div className="mx-auto flex max-w-prose flex-col gap-10">
          <Alert tone="info" title="[TBD: Replace with approved legal content]">
            This page is a placeholder and is not legal advice. The current
            behavior described below is accurate; the final wording will be
            provided by legal counsel.
          </Alert>

          <section>
            <h2 className="text-h3">What this site stores today</h2>
            <p className="mt-2 text-body text-ink-muted">
              By default, this website sets no cookies. It stores two small
              values in your browser, used only to make the site work the way
              you asked:
            </p>
            <ul className="mt-4 flex list-none flex-col gap-4">
              {storedValues.map(({ name, detail }) => (
                <li
                  key={name}
                  className="rounded-card border border-line bg-surface p-4"
                >
                  <h3 className="text-body font-semibold text-ink">{name}</h3>
                  <p className="mt-1 text-small text-ink-muted">{detail}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-h3">Analytics cookies: only with your consent</h2>
            <p className="mt-2 text-body text-ink-muted">
              If (and only if) you accept analytics in the consent banner,
              this site loads Google Analytics 4 via Google Tag Manager, which
              may set cookies to measure how the site is used in aggregate. If
              you decline, or take no action, no analytics scripts are loaded and
              no analytics cookies are set.
            </p>
            <p className="mt-3 text-body text-ink-muted">
              [TBD] The final policy will list the specific analytics cookies,
              their lifetimes and links to Google’s own privacy documentation.
            </p>
          </section>

          <section>
            <h2 className="text-h3">Managing your choices</h2>
            <p className="mt-2 text-body text-ink-muted">
              You can withdraw or change your consent at any time by clearing
              this site’s data in your browser settings, which removes the
              stored theme preference, consent choice and any analytics
              cookies. The consent banner will appear again on your next visit.
            </p>
            <p className="mt-3 text-body text-ink-muted">
              [TBD] A control to reopen the consent banner directly from this
              page will be documented here.
            </p>
          </section>

          <section>
            <h2 className="text-h3">Changes to this policy</h2>
            <p className="mt-2 text-body text-ink-muted">
              [TBD] How updates to this policy are published, with the date of
              the latest revision shown above.
            </p>
          </section>

          <section>
            <h2 className="text-h3">Contact</h2>
            <p className="mt-2 text-body text-ink-muted">
              Questions about cookies or this policy can be sent to{' '}
              <a
                href={`mailto:${site.privacyEmail}`}
                className="font-medium text-primary underline underline-offset-2"
              >
                {site.privacyEmail}
              </a>
              .
            </p>
          </section>
        </div>
      </Section>
    </>
  )
}
