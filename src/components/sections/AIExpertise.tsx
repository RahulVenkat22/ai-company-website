import { ChevronRight } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
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
  /** Background photograph (public path, /images/expertise). */
  image: string
}

const capabilities: Capability[] = [
  {
    name: 'Generative AI',
    description:
      'Text, code and content generation on foundation models, tuned to your domain with guardrails.',
    image: '/images/expertise/system-lattice.jpg',
  },
  {
    name: 'AI Agents',
    description:
      'Autonomous agents that plan, call tools and complete tasks, with human oversight where it matters.',
    image: '/images/expertise/system-assembly.jpg',
  },
  {
    name: 'Agentic AI',
    description:
      'Goal-driven systems that decompose work, reason over state and recover from failure mid-task.',
    image: '/images/expertise/system-flow.jpg',
  },
  {
    name: 'RAG',
    description:
      'Retrieval-augmented generation grounded in your documents, with citations and access control.',
    image: '/images/expertise/rag.jpg',
  },
  {
    name: 'Enterprise AI',
    description:
      'AI integrated with identity, audit and data governance so it can run inside a regulated business.',
    image: '/images/expertise/enterprise-ai.jpg',
  },
  {
    name: 'AI Assistants',
    description:
      'Role-specific copilots for support, sales and operations teams, connected to internal systems.',
    image: '/images/expertise/ai-assistants.jpg',
  },
  {
    name: 'AI Automation',
    description:
      'Model-powered pipelines that classify, route and act on incoming work without manual triage.',
    image: '/images/expertise/ai-automation.jpg',
  },
  {
    name: 'AI Application Development',
    description:
      'Production web and mobile applications with AI in the core product loop, not bolted on.',
    image: '/images/expertise/ai-app-dev.jpg',
  },
  {
    name: 'Computer-Using Agents',
    description:
      'Agents that operate real software UIs to complete multi-step tasks.',
    image: '/images/expertise/computer-using-agents.jpg',
  },
  {
    name: 'Multi-Agent Systems',
    description:
      'Networks of specialised agents coordinating through shared state and defined protocols.',
    image: '/images/expertise/multi-agent.jpg',
  },
  {
    name: 'AI Solution Architecture',
    description:
      'Model selection, orchestration patterns, evaluation and cost design across the full system.',
    image: '/images/expertise/solution-architecture.jpg',
  },
  {
    name: 'AI-Powered Workflows',
    description:
      'Business processes redesigned around model steps, approvals and structured handoffs.',
    image: '/images/expertise/ai-workflows.jpg',
  },
  {
    name: 'Intelligent Document Processing',
    description:
      'Extraction, classification and validation across contracts, invoices and unstructured files.',
    image: '/images/expertise/document-processing.jpg',
  },
  {
    name: 'AI Decision Support',
    description:
      'Models and analytics that surface options, risk and evidence at the point of decision.',
    image: '/images/expertise/decision-support.jpg',
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
        title="AI that goes beyond the chatbot"
        lead="We work across the complete AI lifecycle: from strategy and architecture through data, models and retrieval to agents, applications, automation and deployment. One team owns the system end to end, so what ships is engineered for production, not a demo."
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
        {capabilities.map(({ name, description, image }, i) => (
          <Reveal
            as="li"
            key={name}
            delay={80 * (i % 3)}
            className={i === 0 ? 'lg:col-span-2' : ''}
          >
            {/* Photo tile: the image is the card. Text sits on a dark
                bottom scrim, so colors are explicit white in both themes. */}
            <div className="group card-lift relative h-full overflow-hidden rounded-card border border-line hover:border-line-strong hover:shadow-card">
              <img
                src={image}
                alt=""
                loading="lazy"
                width={800}
                height={450}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-scene/90 via-scene/55 to-scene/35"
                aria-hidden="true"
              />
              <div className="relative flex min-h-[15rem] flex-col justify-end gap-1.5 p-5">
                <h4 className="text-body font-semibold text-paper">{name}</h4>
                <p className="text-small text-paper/85">{description}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </ul>

      <Reveal>
        <blockquote className="mt-14 max-w-3xl border-l-2 border-accent pl-6 md:mt-18 md:pl-8">
          <p className="text-h3 text-ink">
            We engineer AI systems for real business workflows: not just
            demonstrations.
          </p>
        </blockquote>
      </Reveal>
    </Section>
  )
}
