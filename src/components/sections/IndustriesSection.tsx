import {
  Boxes,
  Briefcase,
  Building2,
  Factory,
  GraduationCap,
  HeartPulse,
  Landmark,
  ShoppingBag,
  ShoppingCart,
  Truck,
  type LucideIcon,
} from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { industries } from '@/data/industries'

const industryIcons: Record<string, LucideIcon> = {
  Healthcare: HeartPulse,
  Finance: Landmark,
  Retail: ShoppingBag,
  Manufacturing: Factory,
  Logistics: Truck,
  Education: GraduationCap,
  SaaS: Boxes,
  'Real Estate': Building2,
  'Professional Services': Briefcase,
  'E-commerce': ShoppingCart,
}

/**
 * Industry index as one hairline grid (ten cells, no card chrome). Copy is
 * about how the architectures adapt to each domain; it makes no claims of
 * prior industry experience or client work.
 */
export function IndustriesSection({ variant = 'default' }: { variant?: 'default' | 'alt' | 'deep' }) {
  return (
    <Section id="industries" variant={variant}>
      <SectionHeading
        title="Technology that adapts to your industry"
        lead="The same architectural patterns (retrieval, agents, data platforms, cloud, testing) take different shapes under different constraints."
      />

      <ul className="grid list-none gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
        {industries.map(({ name, adapts }, i) => {
          const Icon = industryIcons[name] ?? Briefcase
          return (
            <Reveal as="li" key={name} delay={50 * (i % 5)} className="flex h-full flex-col gap-3 bg-surface p-5 md:p-6">
              <Icon aria-hidden="true" className="h-5 w-5 text-ink-subtle" />
              <h3 className="text-body font-medium text-ink">{name}</h3>
              <p className="text-caption text-ink-muted">{adapts}</p>
            </Reveal>
          )
        })}
      </ul>

      <Reveal className="mt-6">
        <p className="text-caption text-ink-subtle">
          Listed as domains these architectures are designed to adapt to, not as claims of
          prior industry engagements.
        </p>
      </Reveal>
    </Section>
  )
}
