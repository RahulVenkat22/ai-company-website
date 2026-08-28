import {
  BarChart3,
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  GitBranch,
  Sparkles,
  Workflow,
  type LucideIcon,
} from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { techStack } from '@/data/techStack'

/** Icon per stack group; keys must match `techStack` group names. */
const groupIcons: Record<string, LucideIcon> = {
  'AI / ML': BrainCircuit,
  'Generative AI': Sparkles,
  'AI Engineering': Workflow,
  Data: Database,
  'BI & Visualization': BarChart3,
  Cloud: Cloud,
  'Application Engineering': Code2,
  DevOps: GitBranch,
}

/** Groups that get the accent icon tile to keep the AI-first hierarchy. */
const aiGroups = new Set(['AI / ML', 'Generative AI', 'AI Engineering'])

/**
 * Technology ecosystem (prompt.md §25): eight capability groups rendered as
 * text-first cards — an ecosystem, not a logo wall. AI groups lead and carry
 * accent-tinted icon tiles.
 */
export function TechnologyStackSection({
  variant = 'default',
}: {
  variant?: 'default' | 'alt' | 'deep'
}) {
  return (
    <Section id="technology-stack" variant={variant}>
      <SectionHeading
        eyebrow="Technology Stack"
        title="An Ecosystem, Not a Logo Wall."
        lead="We do not lead with tools. Each engagement starts from the problem, and the stack is chosen to fit it — for quality, cost, security and the systems you already run. These are the technologies we reach for most often."
      />

      <ul className="grid list-none grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {techStack.map(({ group, blurb, items }, i) => {
          const Icon = groupIcons[group] ?? Code2
          const isAi = aiGroups.has(group)
          return (
            <Reveal as="li" key={group} delay={80 * (i % 4)}>
              <Card interactive className="flex h-full flex-col gap-4 p-6">
                <span
                  className={`flex h-11 w-11 items-center justify-center rounded-card ${
                    isAi
                      ? 'bg-accent/10 text-accent'
                      : 'bg-surface-3 text-ink-muted'
                  }`}
                >
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-h4 text-ink">{group}</h3>
                  <p className="text-small text-ink-muted">{blurb}</p>
                </div>
                <ul className="mt-auto flex list-none flex-wrap gap-1.5 pt-2">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line bg-surface-2 px-2.5 py-0.5 text-caption font-medium text-ink-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          )
        })}
      </ul>

      <p className="mt-8 max-w-2xl text-caption text-ink-subtle">
        Product names are the property of their respective owners. Listing a
        technology does not imply certification or partnership.
      </p>
    </Section>
  )
}
