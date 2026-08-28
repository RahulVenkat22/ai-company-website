import { ArrowRight, MessageSquare } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'

interface FinalCTAProps {
  variant?: 'default' | 'alt' | 'deep'
}

/**
 * Pre-footer conversion band (prompt.md §34). A single bordered panel with a
 * restrained accent edge and technical grid backdrop; both CTAs route to the
 * contact page and fire analytics events.
 */
export function FinalCTA({ variant = 'default' }: FinalCTAProps) {
  return (
    <Section id="final-cta" variant={variant} ariaLabel="Start a project with us">
      <Reveal>
        <div className="relative overflow-hidden rounded-card border border-line bg-surface px-6 py-14 text-center shadow-card sm:px-10 md:py-18">
          {/* Decorative layers */}
          <div className="grid-backdrop absolute inset-0" aria-hidden="true" />
          <div
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-accent"
            aria-hidden="true"
          />
          <div
            className="absolute -top-24 left-1/2 h-48 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6">
            <h2 className="text-h2 text-balance">
              Have a Technology Challenge? Let&rsquo;s Build the Solution.
            </h2>
            <p className="max-w-2xl text-body-lg text-ink-muted">
              Whether you are exploring AI, modernizing your data platform,
              automating a business process or building a new application, our
              team can help turn the idea into a production-ready solution.
            </p>
            <div className="mt-2 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
              <Button
                size="lg"
                to="/contact"
                eventName="cta_click"
                eventParams={{ cta: 'start_conversation', location: 'final_cta' }}
                iconRight={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
              >
                Start a Conversation
              </Button>
              <Button
                size="lg"
                variant="secondary"
                to="/contact"
                eventName="consultation_cta_click"
                eventParams={{ location: 'final_cta' }}
                iconLeft={<MessageSquare className="h-4 w-4" aria-hidden="true" />}
              >
                Request a Consultation
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
