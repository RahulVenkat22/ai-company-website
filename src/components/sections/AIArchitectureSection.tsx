import {
  AppWindow,
  Bot,
  Brain,
  Check,
  ChevronDown,
  ClipboardList,
  Cloud,
  Database,
  Layers,
  Network,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'

interface ArchitectureLayer {
  name: string
  annotation: string
  icon: LucideIcon
  /** The AI core layers get the accent tone. */
  core?: boolean
}

const layers: ArchitectureLayer[] = [
  {
    name: 'Business Requirements',
    annotation: 'Goals, constraints, success criteria',
    icon: ClipboardList,
  },
  {
    name: 'Data Sources',
    annotation: 'Systems, documents, event streams',
    icon: Database,
  },
  {
    name: 'Data / Knowledge Layer',
    annotation: 'Pipelines, embeddings, vector stores',
    icon: Layers,
  },
  {
    name: 'RAG / AI Orchestration',
    annotation: 'Retrieval, routing, prompt flows',
    icon: Network,
    core: true,
  },
  {
    name: 'Models',
    annotation: 'Foundation and fine-tuned models',
    icon: Brain,
    core: true,
  },
  {
    name: 'AI Agents',
    annotation: 'Reasoning, planning, task execution',
    icon: Bot,
    core: true,
  },
  {
    name: 'Tools / APIs',
    annotation: 'Function calls, integrations, actions',
    icon: Wrench,
  },
  {
    name: 'Applications',
    annotation: 'User-facing products and copilots',
    icon: AppWindow,
  },
  {
    name: 'Cloud Infrastructure',
    annotation: 'Compute, scaling, deployment',
    icon: Cloud,
  },
  {
    name: 'Monitoring & Security',
    annotation: 'Observability, guardrails, access control',
    icon: ShieldCheck,
  },
]

const capabilities = [
  'LLM architecture',
  'RAG architecture',
  'Agentic AI architecture',
  'Multi-agent architecture',
  'AI data pipelines',
  'Vector search architecture',
  'Model integration',
  'AI security architecture',
  'Cloud AI architecture',
  'AI application architecture',
  'Enterprise AI platforms',
  'AI governance architecture',
]

interface AIArchitectureSectionProps {
  variant?: 'default' | 'alt' | 'deep'
}

/**
 * AI Solution Architecture: layered stack diagram (business requirements down
 * to monitoring & security) plus the architecture capability checklist.
 */
export function AIArchitectureSection({ variant = 'alt' }: AIArchitectureSectionProps) {
  return (
    <Section id="architecture" variant={variant}>
      <SectionHeading
        title="From AI idea to production architecture"
        lead="As your AI solution architecture partner, we design the data, model, agent and infrastructure layers as one coherent system: so what you validate in a prototype reaches production without being rebuilt along the way."
      />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-14">
        {/* Layered architecture diagram: a visible, ordered layer list. */}
        <ol
          aria-label="AI solution architecture stack: ten layers from business requirements down to monitoring and security"
          className="min-w-0"
        >
          {layers.map((layer, i) => {
            const Icon = layer.icon
            const tint = i % 2 === 0 ? 'bg-surface-2' : 'bg-surface-2/50'
            const tile = layer.core
              ? 'bg-accent/10 text-accent'
              : 'bg-primary/10 text-primary'
            return (
              <Reveal as="li" key={layer.name} delay={i * 60} className="min-w-0">
                <div
                  className={`flex items-center gap-3 rounded-card border border-line px-4 py-3 sm:gap-4 ${tint}`}
                >
                  <span
                    aria-hidden="true"
                    className="w-6 shrink-0 text-caption font-semibold tabular-nums text-ink-subtle"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${tile}`}
                  >
                    <Icon aria-hidden="true" size={18} />
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col gap-0.5 md:flex-row md:items-center md:justify-between md:gap-4">
                    <span className="text-small font-semibold text-ink">
                      {layer.name}
                    </span>
                    <span className="text-caption text-ink-muted md:text-right">
                      {layer.annotation}
                    </span>
                  </span>
                </div>
                {i < layers.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="flex flex-col items-center text-line-strong"
                  >
                    <span className="h-2.5 w-px bg-line-strong" />
                    <ChevronDown className="-mt-1.5 h-3.5 w-3.5" size={14} />
                  </span>
                )}
              </Reveal>
            )
          })}
        </ol>

        {/* Capability checklist */}
        <Reveal delay={120} className="lg:self-start">
          <div className="rounded-card border border-line bg-surface p-6 md:p-8">
            <h3 className="text-h4 text-ink">Architecture capabilities</h3>
            <p className="mt-2 text-small text-ink-muted">
              The disciplines we bring to every engagement, from the first
              whiteboard session to the production review.
            </p>
            <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {capabilities.map((capability) => (
                <li key={capability} className="flex items-start gap-2.5">
                  <Check
                    aria-hidden="true"
                    className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                    size={16}
                  />
                  <span className="text-small text-ink-muted">{capability}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
