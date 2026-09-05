import { ArrowRight, Home } from 'lucide-react'
import { Seo } from '@/lib/seo'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'

/** Small decorative "broken connection" node motif. */
function BrokenNodeGraphic() {
  return (
    <svg
      viewBox="0 0 240 80"
      className="h-16 w-auto text-line-strong"
      aria-hidden="true"
      focusable="false"
    >
      {/* left node, connected */}
      <circle cx="24" cy="40" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="32" y1="40" x2="92" y2="40" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" className="animate-flow" />
      {/* middle node, connected */}
      <circle cx="102" cy="40" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
      {/* broken link: dashed stub + gap + crossed-out fragment */}
      <line x1="110" y1="40" x2="142" y2="40" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
      <path d="M154 32l12 16M166 32l-12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* right node, adrift */}
      <circle cx="210" cy="28" r="8" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.45" />
      <line x1="196" y1="52" x2="204" y2="36" stroke="currentColor" strokeWidth="2" strokeDasharray="3 5" opacity="0.45" />
    </svg>
  )
}

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page Not Found"
        description="The page you were looking for does not exist. Head back to the homepage or get in touch."
        path="/404"
        noindex
      />

      <Section
        variant="default"
        ariaLabel="Page not found"
        className="flex min-h-[60vh] items-center"
      >
        <Reveal className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
          <BrokenNodeGraphic />
          <p className="text-display font-semibold leading-none tracking-tight text-ink">
            404
          </p>
          <div className="flex flex-col gap-2">
            <h1 className="text-h2">This page doesn&rsquo;t exist.</h1>
            <p className="text-body-lg text-ink-muted">
              The link may be outdated, or the address mistyped. Nothing here
              is broken on your end.
            </p>
          </div>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <Button
              to="/"
              variant="primary"
              iconLeft={<Home className="h-4 w-4" aria-hidden="true" />}
            >
              Back to home
            </Button>
            <Button
              to="/contact#contact-form"
              variant="secondary"
              iconRight={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
              eventName="cta_click"
              eventParams={{ cta: 'start_project', location: 'not-found' }}
            >
              Start a project
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  )
}
