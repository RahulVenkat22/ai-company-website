import { ArrowRight, ArrowUpRight, PhoneCall } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'

/**
 * Homepage teaser of the delivery process — the editorial "steps row":
 * a photographic lead card, two cream step panels and a dark question
 * card, side by side. The full six-stage timeline lives on /about.
 */

const STEPS = [
  {
    step: '02',
    title: 'Architect & Build',
    description:
      'The right architecture designed before a line of code, then built, integrated and validated against real data and real workflows.',
  },
  {
    step: '03',
    title: 'Deploy & Improve',
    description:
      'Shipped securely to the cloud, tested thoroughly, monitored in production — and improved continuously after launch.',
  },
]

export function ProcessTeaser() {
  return (
    <Section id="how-we-work" ariaLabel="How we work">
      <SectionHeading
        eyebrow="How we work"
        title={
          <>
            Every step of the way to <span className="accent-word">production</span>
          </>
        }
        lead="From the first conversation to keys-in-hand production, every stage is designed to be transparent, deliberate and carefully considered."
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {/* Photographic lead card — step 01 */}
        <Reveal className="h-full">
          <div className="relative isolate flex h-full min-h-[22rem] flex-col justify-between overflow-hidden rounded-card p-7">
            <div
              className="absolute inset-0 -z-20 bg-cover bg-center"
              style={{ backgroundImage: 'url(/images/band-collab.jpg)' }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 -z-10 bg-gradient-to-t from-[#130F0D]/85 via-[#130F0D]/40 to-[#130F0D]/30"
              aria-hidden="true"
            />
            <div>
              <h3 className="text-h3 text-white">Discover & Analyze</h3>
              <p className="mt-2 text-small text-white/80">
                Real problems, real data, real constraints — understood first.
              </p>
            </div>
            <div className="flex items-end justify-between">
              <Button
                size="sm"
                to="/about#how-we-work"
                variant="inverse"
                eventName="cta_click"
                eventParams={{ cta: 'process_full', location: 'process_teaser' }}
                iconRight={<ArrowUpRight className="h-4 w-4" aria-hidden="true" />}
              >
                Start your journey
              </Button>
              <span
                className="font-serif text-[4.5rem] leading-none text-white/60"
                aria-hidden="true"
              >
                01
              </span>
            </div>
          </div>
        </Reveal>

        {/* Cream step panels */}
        {STEPS.map(({ step, title, description }, i) => (
          <Reveal key={step} delay={(i + 1) * 90} className="h-full">
            <div className="flex h-full min-h-[22rem] flex-col justify-between rounded-card border border-line bg-surface p-7">
              <p className="font-mono text-caption uppercase tracking-[0.18em] text-ink-subtle">
                Step {step}.
              </p>
              <div>
                <h3 className="text-h3 text-ink">{title}</h3>
                <p className="mt-3 text-small text-ink-muted">{description}</p>
              </div>
            </div>
          </Reveal>
        ))}

        {/* Dark question card */}
        <Reveal delay={270} className="h-full">
          <div className="flex h-full min-h-[22rem] flex-col justify-between rounded-card bg-[#191310] p-7 text-[#F4EEE3]">
            <PhoneCall className="h-8 w-8 text-[#FF5E1C]" aria-hidden="true" />
            <div>
              <h3 className="text-h3 text-[#F4EEE3]">Have a question?</h3>
              <p className="mt-3 text-small text-[#F4EEE3]/70">
                Real availability, real scope, real timelines — ask us anything
                about your project.
              </p>
              <div className="mt-6">
                <Button
                  size="sm"
                  to="/contact"
                  eventName="cta_click"
                  eventParams={{ cta: 'process_question', location: 'process_teaser' }}
                  iconRight={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
                >
                  Talk to us
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
