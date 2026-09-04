import {
  BrainCircuit,
  Database,
  DraftingCompass,
  Layers,
  ServerCog,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'

interface Reason {
  title: string
  description: string
  icon: LucideIcon
}

const reasons: Reason[] = [
  {
    title: 'AI-First Thinking',
    description:
      'We identify opportunities where AI can create meaningful business value. Just as importantly, we say clearly when a simpler system will serve you better.',
    icon: BrainCircuit,
  },
  {
    title: 'Architecture Before Implementation',
    description:
      'We design the right solution before building it. Data flows, integration points and failure modes are worked out on paper while changing them is still cheap.',
    icon: DraftingCompass,
  },
  {
    title: 'Data-Driven Engineering',
    description:
      'We transform fragmented data into useful intelligence. Governed models and single metric definitions come first, so every dashboard and AI feature stands on trusted ground.',
    icon: Database,
  },
  {
    title: 'Production Mindset',
    description:
      'We build solutions designed for real-world environments. Monitoring, error handling, evaluation and rollback paths are part of the build, not an afterthought.',
    icon: ServerCog,
  },
  {
    title: 'Security by Design',
    description:
      'Security and data protection are considered throughout the lifecycle. Access control, encryption and audit trails are designed in from the first architecture diagram.',
    icon: ShieldCheck,
  },
  {
    title: 'End-to-End Capability',
    description:
      'From AI and data to applications, cloud, testing and ongoing support. One team carries the work from problem statement to production and stays accountable after launch.',
    icon: Layers,
  },
]

/**
 * Six reasons technology teams choose us, in a 2x3 tile grid with
 * staggered reveal.
 */
export function WhyChooseUs({
  variant = 'alt',
}: {
  variant?: 'default' | 'alt' | 'deep'
}) {
  return (
    <Section id="why-choose-us" variant={variant}>
      <SectionHeading
        eyebrow="Why Us"
        title="Why technology teams choose us"
        lead="Not a list of buzzwords — the working principles that shape how every engagement is scoped, architected and delivered."
      />

      <ul className="grid list-none grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {reasons.map(({ title, description, icon: Icon }, i) => (
          <Reveal as="li" key={title} delay={80 * (i % 3)}>
            <Card interactive className="flex h-full flex-col gap-4 p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-card bg-primary/10 text-primary">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <h3 className="text-h4 text-ink">{title}</h3>
              <p className="text-small text-ink-muted">{description}</p>
            </Card>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
