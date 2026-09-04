import {
  AppWindow,
  Bot,
  Brain,
  Building2,
  ChevronRight,
  DraftingCompass,
  FileSearch,
  GitBranch,
  MessagesSquare,
  MousePointerClick,
  Network,
  Route,
  ScanText,
  TrendingUp,
  Workflow,
  type LucideIcon,
} from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'

const lifecycleSteps = [
  'AI Strategy',
  'Architecture',
  'Data',
  'Models',
  'RAG',
  'Agents',
  'Applications',
  'Automation',
  'Deployment',
]

interface Capability {
  name: string
  description: string
  icon: LucideIcon
}

const capabilities: Capability[] = [
  {
    name: 'Generative AI',
    description:
      'Text, code and content generation on foundation models, tuned to your domain with guardrails.',
    icon: Brain,
  },
  {
    name: 'AI Agents',
    description:
      'Autonomous agents that plan, call tools and complete tasks, with human oversight where it matters.',
    icon: Bot,
  },
  {
    name: 'Agentic AI',
    description:
      'Goal-driven systems that decompose work, reason over state and recover from failure mid-task.',
    icon: Route,
  },
  {
    name: 'RAG',
    description:
      'Retrieval-augmented generation grounded in your documents, with citations and access control.',
    icon: FileSearch,
  },
  {
    name: 'Enterprise AI',
    description:
      'AI integrated with identity, audit and data governance so it can run inside a regulated business.',
    icon: Building2,
  },
  {
    name: 'AI Assistants',
    description:
      'Role-specific copilots for support, sales and operations teams, connected to internal systems.',
    icon: MessagesSquare,
  },
  {
    name: 'AI Automation',
    description:
      'Model-powered pipelines that classify, route and act on incoming work without manual triage.',
    icon: Workflow,
  },
  {
    name: 'AI Application Development',
    description:
      'Production web and mobile applications with AI in the core product loop, not bolted on.',
    icon: AppWindow,
  },
  {
    name: 'Computer-Using Agents',
    description:
      'Agents that operate real software UIs to complete multi-step tasks.',
    icon: MousePointerClick,
  },
  {
    name: 'Multi-Agent Systems',
    description:
      'Networks of specialised agents coordinating through shared state and defined protocols.',
    icon: Network,
  },
  {
    name: 'AI Solution Architecture',
    description:
      'Model selection, orchestration patterns, evaluation and cost design across the full system.',
    icon: DraftingCompass,
  },
  {
    name: 'AI-Powered Workflows',
    description:
      'Business processes redesigned around model steps, approvals and structured handoffs.',
    icon: GitBranch,
  },
  {
    name: 'Intelligent Document Processing',
    description:
      'Extraction, classification and validation across contracts, invoices and unstructured files.',
    icon: ScanText,
  },
  {
    name: 'AI Decision Support',
    description:
      'Models and analytics that surface options, risk and evidence at the point of decision.',
    icon: TrendingUp,
  },
]

/**
 * Flagship AI positioning section: lifecycle stepper, 14 capability cards
 * and the closing engineering statement.
 */
export function AIExpertise({
  variant = 'default',
}: {
  variant?: 'default' | 'alt' | 'deep'
}) {
  return (
    <Section id="ai-expertise" variant={variant}>
      <SectionHeading
        eyebrow="AI Expertise"
        title="AI that goes beyond the chatbot"
        lead="We work across the complete AI lifecycle — from strategy and architecture through data, models and retrieval to agents, applications, automation and deployment. One team owns the system end to end, so what ships is engineered for production, not a demo."
      />

      <Reveal>
        <h3 className="sr-only">The AI delivery lifecycle</h3>
        <ol
          aria-label="AI delivery lifecycle from strategy to deployment"
          className="flex flex-col gap-2 md:flex-row md:flex-wrap md:items-center md:gap-y-3"
        >
          {lifecycleSteps.map((step, i) => (
            <li
              key={step}
              className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3"
            >
              <span className="inline-flex items-center gap-2.5 rounded border border-line bg-surface-2 px-3.5 py-2 text-small font-medium text-ink">
                <span aria-hidden="true" className="font-mono text-caption text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {step}
              </span>
              {i < lifecycleSteps.length - 1 && (
                <ChevronRight
                  aria-hidden="true"
                  className="ml-4 h-4 w-4 rotate-90 text-ink-subtle md:ml-0 md:rotate-0"
                />
              )}
            </li>
          ))}
        </ol>
      </Reveal>

      <h3 className="sr-only">AI capabilities</h3>
      <ul className="mt-12 grid list-none grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:mt-16">
        {capabilities.map(({ name, description, icon: Icon }, i) => (
          <Reveal as="li" key={name} delay={80 * (i % 3)}>
            <Card
              variant="outline"
              interactive
              className="flex h-full items-start gap-4 p-5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-card bg-primary/10 text-primary">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <span className="flex flex-col gap-1">
                <h4 className="text-body font-semibold text-ink">{name}</h4>
                <p className="text-small text-ink-muted">{description}</p>
              </span>
            </Card>
          </Reveal>
        ))}
      </ul>

      <Reveal>
        <blockquote className="mt-14 max-w-3xl border-l-2 border-accent pl-6 md:mt-18 md:pl-8">
          <p className="text-h3 font-semibold text-ink">
            We engineer AI systems for real business workflows — not just
            demonstrations.
          </p>
        </blockquote>
      </Reveal>
    </Section>
  )
}
