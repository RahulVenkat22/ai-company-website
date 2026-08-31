import { ArrowRight, MessageSquare } from 'lucide-react'
import { ParallaxBand } from '@/components/ui/ParallaxBand'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'

/**
 * Pre-footer conversion band: full-bleed parallax photograph of a team at
 * work with the invitation on top. Both CTAs route to the contact page and
 * fire analytics events.
 */
export function FinalCTA() {
  return (
    <ParallaxBand
      id="final-cta"
      image="/images/band-meeting.jpg"
      ariaLabel="Start a project with us"
    >
      <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-caption font-semibold uppercase tracking-[0.14em] text-amber-300 backdrop-blur-sm">
          Let&rsquo;s build together
        </span>
        <h2 className="text-h2 text-balance text-white">
          Have a Technology Challenge? Let&rsquo;s Build the Solution.
        </h2>
        <p className="max-w-2xl text-body-lg text-slate-200">
          Whether you are exploring AI, modernizing your data platform,
          automating a business process or building a new application, our team
          can help turn the idea into a production-ready solution.
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
            className="border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
            eventName="consultation_cta_click"
            eventParams={{ location: 'final_cta' }}
            iconLeft={<MessageSquare className="h-4 w-4" aria-hidden="true" />}
          >
            Request a Consultation
          </Button>
        </div>
      </Reveal>
    </ParallaxBand>
  )
}
