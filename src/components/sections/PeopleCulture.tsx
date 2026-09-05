import { HeartHandshake, Smile, Users } from 'lucide-react'
import { Section } from '@/components/ui/Section'
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
      'We work alongside your people, sharing context, decisions and wins, not behind a ticket queue.',
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
 * People band: candid team photography in a drifting collage on one side
 * (GSAP scroll drift for depth), people-first principles on the other.
 */
export function PeopleCulture({ variant = 'default' }: PeopleCultureProps) {
  return (
    <Section id="people" variant={variant} ariaLabel="The people behind the technology">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative grid grid-cols-2 gap-4 sm:gap-5">
          <Drift amp={16}>
            <Reveal className="photo-frame aspect-[3/4]">
              <img
                src="/images/team-success.jpg"
                alt="Team members reviewing work together on a laptop"
                loading="lazy"
              />
            </Reveal>
          </Drift>
          <Drift amp={-26} className="flex flex-col gap-4 sm:gap-5">
            <Reveal delay={120} className="photo-frame aspect-[4/3]">
              <img src="/images/happy-handshake.jpg" alt="Two people shaking hands" loading="lazy" />
            </Reveal>
            <Reveal delay={240} className="photo-frame aspect-[4/3]">
              <img
                src="/images/team-laptop.jpg"
                alt="Engineers pair-programming at a shared screen"
                loading="lazy"
              />
            </Reveal>
          </Drift>
        </div>

        <div className="flex flex-col gap-8">
          <Reveal className="flex flex-col gap-4">
            <h2 className="text-h2">The people behind the systems</h2>
            <p className="text-body-lg text-ink-muted">
              Behind every model, pipeline and agent is a team that cares about the humans on
              both ends: the people who build with us and the people who use what we build.
            </p>
          </Reveal>

          <ul className="flex flex-col gap-6">
            {HIGHLIGHTS.map((h, i) => (
              <Reveal as="li" key={h.title} delay={i * 90} className="flex gap-4">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-btn bg-surface-3 text-ink">
                  <h.icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-h4">{h.title}</h3>
                  <p className="mt-1 text-body text-ink-muted">{h.description}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
