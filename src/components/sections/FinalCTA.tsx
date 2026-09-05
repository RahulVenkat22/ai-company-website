import { ArrowRight, MessageSquare } from 'lucide-react'
import { ParallaxBand } from '@/components/ui/ParallaxBand'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'

/**
 * Pre-footer conversion band: full-bleed parallax backdrop with the
 * invitation on top. Both CTAs route to the contact page and fire
 * analytics events. `background="story"` (homepage) drops the photo so the
 * band becomes a window onto the ScrollVideoStory video backdrop.
 */
export function FinalCTA({
  background = 'photo',
}: {
  background?: 'photo' | 'story'
} = {}) {
  return (
    <ParallaxBand
      id="final-cta"
      image={background === 'photo' ? '/images/band-meeting.jpg' : undefined}
      ariaLabel="Start a project with us"
    >
      <Reveal className="mx-auto flex max-w-4xl flex-col items-center gap-7 py-10 text-center md:py-16">
        <span className="inline-flex items-center gap-3 font-mono text-caption uppercase tracking-[0.24em] text-white/70">
          <span className="h-px w-7 bg-[#FF5E1C]" aria-hidden="true" />
          Let&rsquo;s build together
          <span className="h-px w-7 bg-[#FF5E1C]" aria-hidden="true" />
        </span>
        <h2 className="text-display text-balance text-white">
          Have a hard problem?{' '}
          <span className="accent-word !text-[#FF5E1C]">Let&rsquo;s solve it.</span>
        </h2>
        <p className="max-w-2xl text-body-lg text-white/80">
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
            Start a conversation
          </Button>
          <Button
            size="lg"
            variant="inverse"
            to="/contact"
            eventName="consultation_cta_click"
            eventParams={{ location: 'final_cta' }}
            iconLeft={<MessageSquare className="h-4 w-4" aria-hidden="true" />}
          >
            Request a consultation
          </Button>
        </div>
      </Reveal>
    </ParallaxBand>
  )
}
