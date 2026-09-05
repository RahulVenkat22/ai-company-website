import { Check, Cloud, CloudCog, Server } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

interface CloudSectionProps {
  variant?: 'default' | 'alt' | 'deep'
}

interface Provider {
  name: string
  icon: typeof Cloud
  services: string[]
}

const providers: Provider[] = [
  {
    name: 'Google Cloud',
    icon: Cloud,
    services: [
      'BigQuery',
      'Vertex AI',
      'Cloud Run',
      'Cloud Storage',
      'Cloud Functions',
      'GKE',
      'Cloud SQL',
    ],
  },
  {
    name: 'AWS',
    icon: Server,
    services: ['EC2', 'S3', 'Lambda', 'RDS', 'ECS', 'EKS', 'CloudFront', 'Bedrock'],
  },
  {
    name: 'Microsoft Azure',
    icon: CloudCog,
    services: [
      'Azure AI',
      'Azure OpenAI',
      'Azure Functions',
      'Azure Storage',
      'Azure SQL',
      'AKS',
      'Azure Machine Learning',
    ],
  },
]

const cloudServices = [
  'Cloud migration',
  'Cloud architecture',
  'Cloud-native applications',
  'Serverless applications',
  'AI infrastructure',
  'Data platforms',
  'DevOps',
  'CI/CD',
  'Monitoring',
  'Cost optimization',
]

/** Cloud engineering capabilities across the three major providers. */
export function CloudSection({ variant = 'default' }: CloudSectionProps) {
  return (
    <Section id="cloud-engineering" variant={variant}>
      <SectionHeading
        title="Cloud engineering without the complexity"
        lead="We design, build and run cloud platforms on Google Cloud, AWS and Microsoft Azure: architectures sized to your workload, automated from day one, and ready for AI."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {providers.map((provider, i) => (
          <Reveal key={provider.name} delay={80 * i} className="h-full">
            <Card as="article" className="h-full p-6">
              <div className="flex items-center gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-btn bg-primary/10 text-primary"
                  aria-hidden="true"
                >
                  <provider.icon size={20} aria-hidden="true" />
                </span>
                <h3 className="text-h4">{provider.name}</h3>
              </div>
              <ul className="mt-5 space-y-2.5">
                {provider.services.map((service) => (
                  <li
                    key={service}
                    className="flex items-center gap-2.5 text-small text-ink-muted"
                  >
                    <span
                      className="h-1 w-1 shrink-0 rounded-full bg-accent/70"
                      aria-hidden="true"
                    />
                    {service}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120} className="mt-12">
        <h3 className="text-h4">What we deliver</h3>
        <ul className="mt-5 flex flex-wrap gap-2.5">
          {cloudServices.map((service) => (
            <li key={service}>
              <Badge tone="neutral">
                <Check size={13} className="text-accent" aria-hidden="true" />
                {service}
              </Badge>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  )
}
