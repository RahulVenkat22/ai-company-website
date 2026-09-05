import { Check, Shield, ShieldCheck, ShieldEllipsis } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

interface SecuritySectionProps {
  variant?: 'default' | 'alt' | 'deep'
}

interface CapabilityGroup {
  label: string
  icon: typeof Shield
  items: string[]
}

const groups: CapabilityGroup[] = [
  {
    label: 'Secure architecture',
    icon: Shield,
    items: [
      'Secure application architecture',
      'Secure API design',
      'Secure cloud architecture',
      'Secure data pipelines',
      'Secure AI architecture',
    ],
  },
  {
    label: 'Identity & access',
    icon: ShieldCheck,
    items: [
      'Encryption',
      'Authentication',
      'Authorization',
      'Role-Based Access Control',
      'Identity Management',
    ],
  },
  {
    label: 'Protection & assurance',
    icon: ShieldEllipsis,
    items: [
      'Data privacy',
      'Security monitoring',
      'Vulnerability management',
      'Auditability',
    ],
  },
]

/** Security and data protection capabilities, framed as security by design. */
export function SecuritySection({ variant = 'deep' }: SecuritySectionProps) {
  return (
    <Section id="security" variant={variant} className="relative overflow-hidden">
      <div className="grid-backdrop absolute inset-0" aria-hidden="true" />
      <div className="relative">
        <Reveal className="mb-5">
          <Badge tone="primary">
            <ShieldCheck size={13} aria-hidden="true" />
            Security by Design
          </Badge>
        </Reveal>
        <SectionHeading
          title="Built for trust, designed for scale"
          lead="Security is not a feature we add before launch. It shapes how we design architectures, model access, move data and operate systems: from the first design review onward."
          className="mb-10 md:mb-12"
        />

        <Reveal className="mb-12">
          <blockquote className="rounded-card border border-primary/30 bg-primary/5 p-6 md:p-8">
            <p className="max-w-3xl text-h4 font-medium text-ink">
              &ldquo;We engineer systems with security, privacy and data
              protection at the core.&rdquo;
            </p>
          </blockquote>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {groups.map((group, i) => (
            <Reveal key={group.label} delay={80 * i} className="h-full">
              <Card as="article" variant="outline" className="h-full bg-surface p-6">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-btn bg-primary/10 text-primary"
                    aria-hidden="true"
                  >
                    <group.icon size={20} aria-hidden="true" />
                  </span>
                  <h3 className="text-h4">{group.label}</h3>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-small text-ink-muted"
                    >
                      <Check
                        size={15}
                        className="shrink-0 text-accent"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal delay={160} className="mt-10">
          <p className="max-w-3xl text-small text-ink-muted">
            Security is a continuous discipline, not a finished state. We build
            controls in from the start, monitor them in production, and keep
            validating them as systems and threats evolve.
          </p>
        </Reveal>
      </div>
    </Section>
  )
}
