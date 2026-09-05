import {
  Activity,
  CloudUpload,
  CodeXml,
  DatabaseBackup,
  FileText,
  Gauge,
  LifeBuoy,
  RefreshCw,
  Search,
  ShieldCheck,
  Wrench,
} from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

interface WebsiteManagementSectionProps {
  variant?: 'default' | 'alt' | 'deep'
}

interface ManagedService {
  label: string
  icon: typeof Wrench
}

const services: ManagedService[] = [
  { label: 'Website development', icon: CodeXml },
  { label: 'Website maintenance', icon: Wrench },
  { label: 'Website modernization', icon: RefreshCw },
  { label: 'Performance optimization', icon: Gauge },
  { label: 'Security updates', icon: ShieldCheck },
  { label: 'Monitoring', icon: Activity },
  { label: 'Backup strategy', icon: DatabaseBackup },
  { label: 'Cloud deployment', icon: CloudUpload },
  { label: 'Technical SEO', icon: Search },
  { label: 'Content management', icon: FileText },
  { label: 'Application support', icon: LifeBuoy },
]

/** Supporting-tier website management and ongoing support services. */
export function WebsiteManagementSection({
  variant = 'alt',
}: WebsiteManagementSectionProps) {
  return (
    <Section id="website-management" variant={variant}>
      <SectionHeading
        title="Keep your digital platforms secure, fast and continuously improving."
        lead="Ongoing engineering care for the platforms you already run: maintained, monitored and steadily modernized."
      />

      <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <Reveal
            key={service.label}
            as="li"
            delay={40 * i}
            className="flex items-center gap-3"
          >
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-btn border border-line bg-surface-2 text-primary"
              aria-hidden="true"
            >
              <service.icon size={16} aria-hidden="true" />
            </span>
            <span className="text-small text-ink-muted">{service.label}</span>
          </Reveal>
        ))}
      </ul>
    </Section>
  )
}
