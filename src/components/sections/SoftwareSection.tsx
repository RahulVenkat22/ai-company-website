import { Boxes, Check, Database, Monitor, Server } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

interface SoftwareSectionProps {
  variant?: 'default' | 'alt' | 'deep'
}

const services = [
  'Web applications',
  'Enterprise applications',
  'SaaS platforms',
  'AI-powered web applications',
  'Mobile applications',
  'AI mobile applications',
  'Backend development',
  'API development',
  'REST APIs',
  'Microservices',
  'Application modernization',
  'System integration',
]

interface StackGroup {
  label: string
  icon: typeof Monitor
  items: string[]
}

const stack: StackGroup[] = [
  { label: 'Frontend', icon: Monitor, items: ['React', 'TypeScript', 'Next.js'] },
  {
    label: 'Backend',
    icon: Server,
    items: ['Python', 'FastAPI', 'Django', 'Node.js'],
  },
  {
    label: 'Databases',
    icon: Database,
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
  },
  {
    label: 'Infrastructure',
    icon: Boxes,
    items: ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Azure', 'Google Cloud'],
  },
]

/** Software and application development services with the core stack. */
export function SoftwareSection({ variant = 'alt' }: SoftwareSectionProps) {
  return (
    <Section id="software" variant={variant}>
      <SectionHeading
        eyebrow="Software Engineering"
        title="From idea to production-ready application"
        lead="Full-lifecycle engineering — architecture, build, integration and modernization — with the same production standards whether the application is AI-powered or not."
      />

      <Reveal>
        <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li
              key={service}
              className="flex items-center gap-2.5 text-small text-ink-muted"
            >
              <Check size={16} className="shrink-0 text-accent" aria-hidden="true" />
              {service}
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stack.map((group, i) => (
          <Reveal key={group.label} delay={80 * i} className="h-full">
            <Card variant="outline" className="h-full p-5">
              <h3 className="flex items-center gap-2.5 text-small font-semibold text-ink">
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-btn bg-primary/10 text-primary"
                  aria-hidden="true"
                >
                  <group.icon size={16} aria-hidden="true" />
                </span>
                {group.label}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <Badge tone="neutral">{item}</Badge>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
