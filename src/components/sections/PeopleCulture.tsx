import { ArrowRight, HeartHandshake, Smile, Users } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { Drift } from '@/components/ui/Drift'

interface PeopleCultureProps {
  variant?: 'default' | 'alt' | 'deep'
}

const HIGHLIGHTS = [
  {
    icon: Users,
    title: 'Your team, extended',
    description:
      'We work alongside your people — sharing context, decisions and wins — not behind a ticket queue.',
  },
  {
    icon: Smile,
    title: 'Technology with a human face',
    description:
      'Every system we ship is designed for the people who use it: clear, helpful and pleasant to work with.',
  },
  {
    icon: HeartHandshake,
    title: 'Partners beyond launch',
    description:
      'We stay engaged after go-live, measuring outcomes and improving the system as your business grows.',
  },
] as const

/**
 * Human-centric collage band: candid team photography on one side,
 * people-first value props on the other.
 */
export function PeopleCulture({ variant = 'alt' }: PeopleCultureProps) {
  return (
    <Section id="people" variant={variant} ariaLabel="The people behind the technology">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Photo collage — columns drift at different speeds for depth */}
        <div className="relative grid grid-cols-2 gap-4 sm:gap-5">
          <Drift amp={16}>
            <Reveal className="photo-frame aspect-[3/4]">
              <img
                src="/images/team-success.jpg"
                alt="Team members smiling while reviewing work together on a laptop"
                loading="lazy"
              />
            </Reveal>
          </Drift>
          <Drift amp={-26} className="flex flex-col gap-4 sm:gap-5">
            <Reveal delay={120} className="photo-frame aspect-[4/3]">
              <img
                src="/images/happy-handshake.jpg"
                alt="Two people sealing a partnership with a handshake"
                loading="lazy"
              />
            </Reveal>
            <Reveal delay={240} className="photo-frame aspect-[4/3]">
              <img
                src="/images/team-laptop.jpg"
                alt="Engineers pair-programming at a shared screen"
                loading="lazy"
              />
            </Reveal>
          </Drift>

          {/* Floating badge */}
          <Reveal
            variant="fade"
            delay={350}
            className="absolute -bottom-5 left-1/2 -translate-x-1/2"
          >
            <div className="animate-float-slow flex items-center gap-2.5 rounded border border-line bg-surface px-4 py-2.5 shadow-card">
              <Smile className="h-4 w-4 text-accent" aria-hidden="true" />
              <span className="text-small font-medium text-ink">
                Built by humans, powered by AI
              </span>
            </div>
          </Reveal>
        </div>

        {/* Copy */}
        <div className="flex flex-col gap-6">
          <Reveal className="flex flex-col gap-4">
            <p className="eyebrow">People first</p>
            <h2 className="text-h2">
              Great AI is built by <span className="accent-word">happy people</span>,
              for happy people
            </h2>
            <p className="text-body-lg text-ink-muted">
              Behind every model, pipeline and agent is a team that cares about
              the humans on both ends of the system — the people who build with
              us and the people who use what we build.
            </p>
          </Reveal>

          <ul className="flex flex-col gap-5">
            {HIGHLIGHTS.map((h, i) => (
              <Reveal as="li" key={h.title} delay={i * 100} className="flex gap-4">
                <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <h.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-h4">{h.title}</h3>
                  <p className="text-body text-ink-muted">{h.description}</p>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={200}>
            <Button
              to="/about"
              variant="secondary"
              iconRight={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
              eventName="cta_click"
              eventParams={{ cta: 'meet_the_team', location: 'people_culture' }}
            >
              Meet the Team
            </Button>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
