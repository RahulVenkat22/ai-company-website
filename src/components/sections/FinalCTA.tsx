import { ArrowRight } from 'lucide-react'
import { ParallaxBand } from '@/components/ui/ParallaxBand'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { site } from '@/config/site'

/**
 * Pre-footer invitation: full-bleed scene with the headline left and the
 * single contact action right. One CTA label for the contact intent across
 * the whole site ("Start a project"), plus the plain email address as the
 * low-friction alternative. `background="story"` (homepage) drops the photo
 * so the band becomes a window onto the scroll-driven footage.
 */
export function FinalCTA({ background = 'photo' }: { background?: 'photo' | 'story' } = {}) {
  return (
    <ParallaxBand
      id="final-cta"
      image={background === 'photo' ? '/images/band-meeting.jpg' : undefined}
      ariaLabel="Start a project with us"
    >
      <Reveal className="grid gap-10 py-6 md:py-12 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <h2 className="text-display text-paper">
            Have a hard problem? <span className="text-signal">Let&rsquo;s solve it.</span>
          </h2>
          <p className="mt-6 max-w-xl text-body-lg text-paper/75">
            Tell us what you are trying to build or fix. An engineer reads every message
            and replies with a concrete next step.
          </p>
        </div>
        <div className="flex flex-col items-start gap-5 lg:col-span-4 lg:items-end">
          <Button
            size="lg"
            to="/contact#contact-form"
            eventName="cta_click"
            eventParams={{ cta: 'start_project', location: 'final_cta' }}
            iconRight={<ArrowRight aria-hidden="true" />}
          >
            Start a project
          </Button>
          <a
            href={`mailto:${site.email}`}
            className="text-small text-paper/70 underline-offset-4 transition-colors hover:text-paper hover:underline"
          >
            {site.email}
          </a>
        </div>
      </Reveal>
    </ParallaxBand>
  )
}
