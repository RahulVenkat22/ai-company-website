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
import { Card } from '@/components/ui/Card'
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
 * Compact industry grid. Copy is deliberately about adaptability of the
 * architectures — it makes no claims of prior industry experience or
 * client work.
 */
export function IndustriesSection({
  variant = 'default',
}: {
  variant?: 'default' | 'alt' | 'deep'
}) {
  return (
    <Section id="industries" variant={variant}>
      <SectionHeading
        eyebrow="Industries"
        title="Technology that adapts to your industry"
        lead="The same architectural patterns — retrieval, agents, data platforms, cloud, testing — take different shapes under different constraints. Here is how they adapt."
      />

      <ul className="grid list-none grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {industries.map(({ name, adapts }, i) => {
          const Icon = industryIcons[name] ?? Briefcase
          return (
            <Reveal as="li" key={name} delay={60 * (i % 5)}>
              <Card interactive className="flex h-full flex-col gap-3 p-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-card bg-accent/10 text-accent">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <h3 className="text-body font-semibold text-ink">{name}</h3>
                <p className="text-caption text-ink-muted">{adapts}</p>
              </Card>
            </Reveal>
          )
        })}
      </ul>

      <Reveal className="mt-8">
        <p className="text-caption text-ink-subtle">
          Listed as domains these architectures are designed to adapt to — not as claims
          of prior industry engagements.
        </p>
      </Reveal>
    </Section>
  )
}
