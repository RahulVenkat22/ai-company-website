import type { LucideIcon } from 'lucide-react'
import {
  AppWindow,
  Bot,
  Brain,
  Check,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  CircleCheckBig,
  Database,
  Flag,
  Globe,
  ListChecks,
  MessageCircleQuestion,
  MessageSquare,
  Play,
  RefreshCw,
  ShieldCheck,
  Target,
  User,
  Wrench,
} from 'lucide-react'
import { Fragment } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

type Tone = 'primary' | 'accent'

interface LoopStep {
  icon: LucideIcon
  label: string
}

const agenticLoop: LoopStep[] = [
  { icon: Target, label: 'Goal' },
  { icon: Brain, label: 'Reason' },
  { icon: ListChecks, label: 'Plan' },
  { icon: Wrench, label: 'Use Tools' },
  { icon: Play, label: 'Execute' },
  { icon: ShieldCheck, label: 'Verify' },
  { icon: Flag, label: 'Complete' },
]

interface FlowNode {
  icon: LucideIcon
  label: string
  caption: string
  tone: Tone
  live?: boolean
}

const architectureNodes: FlowNode[] = [
  { icon: User, label: 'User', caption: 'Shares the goal', tone: 'primary' },
  {
    icon: Bot,
    label: 'AI Agent',
    caption: 'Reasons, plans, orchestrates',
    tone: 'accent',
    live: true,
  },
  { icon: Wrench, label: 'Tools', caption: 'MCP · function calling', tone: 'primary' },
  { icon: Globe, label: 'APIs', caption: 'Internal & external services', tone: 'primary' },
  { icon: Database, label: 'Database', caption: 'Reads & writes data', tone: 'primary' },
  { icon: AppWindow, label: 'Applications', caption: 'Operates software directly', tone: 'primary' },
  { icon: CircleCheckBig, label: 'Result', caption: 'Verified against the goal', tone: 'accent' },
]

const capabilities: string[] = [
  'AI Agents',
  'Multi-Agent Systems',
  'Agentic Workflows',
  'Tool-using AI',
  'Computer-Using Agents',
  'Autonomous workflows',
  'AI task automation',
  'Enterprise AI agents',
  'AI orchestration',
]

const technologies: { name: string; tone: 'neutral' | 'accent' }[] = [
  { name: 'LangGraph', tone: 'accent' },
  { name: 'LangChain', tone: 'neutral' },
  { name: 'CrewAI', tone: 'neutral' },
  { name: 'MCP', tone: 'accent' },
  { name: 'A2A', tone: 'neutral' },
  { name: 'OpenAI-compatible APIs', tone: 'neutral' },
  { name: 'Anthropic', tone: 'neutral' },
  { name: 'Google Vertex AI', tone: 'neutral' },
  { name: 'AWS Bedrock', tone: 'neutral' },
]

/* ------------------------------------------------------------------ */
/* Diagram building blocks                                             */
/* ------------------------------------------------------------------ */

/** 13-track grid: 7 node columns separated by 6 connector columns. */
const GRID_COLS =
  'grid-cols-[minmax(0,1fr)_1.25rem_minmax(0,1fr)_1.25rem_minmax(0,1fr)_1.25rem_minmax(0,1fr)_1.25rem_minmax(0,1fr)_1.25rem_minmax(0,1fr)_1.25rem_minmax(0,1fr)]'

interface EdgeSegment {
  x1: string
  y1: string
  x2: string
  y2: string
}

const horizontalRTL: EdgeSegment[] = [{ x1: '100%', y1: '50%', x2: '0', y2: '50%' }]

/** Grid cell carrying animated flow-line segments (and optional chip/arrowhead). */
function FlowCell({
  segments,
  chip,
  arrow,
  className = '',
  colorClass = 'text-line-strong',
}: {
  segments: EdgeSegment[]
  chip?: string
  arrow?: 'up' | 'down'
  className?: string
  colorClass?: string
}) {
  return (
    <div aria-hidden="true" className={`relative ${colorClass} ${className}`.trim()}>
      <svg className="absolute inset-0 h-full w-full">
        {segments.map((s) => (
          <line
            key={`${s.x1}-${s.y1}-${s.x2}-${s.y2}`}
            x1={s.x1}
            y1={s.y1}
            x2={s.x2}
            y2={s.y2}
            stroke="currentColor"
            strokeWidth="1.5"
            className="animate-flow"
          />
        ))}
      </svg>
      {arrow === 'down' && (
        <ChevronDown className="absolute bottom-0 left-1/2 h-3.5 w-3.5 -translate-x-1/2" />
      )}
      {arrow === 'up' && (
        <ChevronUp className="absolute left-1/2 top-0 h-3.5 w-3.5 -translate-x-1/2" />
      )}
      {chip && (
        <span className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded border border-accent/40 bg-surface-2 px-3 py-1 font-mono text-caption text-ink-muted">
          {chip}
        </span>
      )}
    </div>
  )
}

/** Horizontal connector between two nodes in the same row. */
function ArrowCell() {
  return (
    <div aria-hidden="true" className="relative text-line-strong">
      <svg className="absolute inset-0 h-full w-full">
        <line
          x1="0"
          y1="50%"
          x2="100%"
          y2="50%"
          stroke="currentColor"
          strokeWidth="1.5"
          className="animate-flow"
        />
      </svg>
      <ChevronRight className="absolute -right-1 top-1/2 h-3 w-3 -translate-y-1/2" />
    </div>
  )
}

function DiagramNode({ node }: { node: FlowNode }) {
  const tile = node.tone === 'accent' ? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary'
  const border = node.tone === 'accent' ? 'border-accent/40' : 'border-line'
  return (
    <div
      className={`relative flex h-full flex-col items-center justify-start gap-2 rounded-card border ${border} bg-surface-2 p-3 text-center`}
    >
      {node.live && (
        <span className="absolute right-2 top-2 h-1.5 w-1.5 animate-pulse-soft rounded-full bg-accent" />
      )}
      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-btn ${tile}`}>
        <node.icon className="h-5 w-5" />
      </span>
      <span className="text-small font-semibold leading-snug text-ink">{node.label}</span>
      <span className="text-caption text-ink-muted">{node.caption}</span>
    </div>
  )
}

/** Vertical connector for the stacked (mobile) chain. */
function VConnector() {
  return (
    <svg aria-hidden="true" viewBox="0 0 14 28" className="mx-auto h-7 w-3.5 text-line-strong">
      <line
        x1="7"
        y1="0"
        x2="7"
        y2="21"
        stroke="currentColor"
        strokeWidth="1.5"
        className="animate-flow"
      />
      <path d="M2 21l5 6 5-6" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

interface AgentsSectionProps {
  variant?: 'default' | 'alt' | 'deep'
}

/** AI Agents & Agentic AI — contrast panel, agent loop and architecture flow. */
export function AgentsSection({ variant = 'default' }: AgentsSectionProps) {
  return (
    <Section id="agents" variant={variant}>
      <SectionHeading
        eyebrow="AI Agents & Agentic AI"
        title="AI that acts, not just answers"
        lead="Agentic systems pursue goals, not prompts. We build agents that reason about an objective, plan the work, call tools across your stack, and verify their own results — with the guardrails enterprises require."
      />

      {/* Traditional vs agentic contrast */}
      <Reveal>
        <div className="grid gap-6 md:grid-cols-5">
          <Card variant="outline" className="flex flex-col p-6 md:col-span-2">
            <h3 className="text-h4 text-ink-muted">Traditional AI</h3>
            <p className="mt-1 text-caption text-ink-subtle">Answers, then stops.</p>
            <ol className="mt-6 flex flex-wrap items-center gap-2">
              <li className="flex items-center gap-1.5 rounded-full border border-line bg-surface-2 px-3 py-1.5 text-small text-ink-muted">
                <MessageCircleQuestion className="h-4 w-4 text-ink-subtle" aria-hidden="true" />
                Question
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-4 w-4 text-ink-subtle" />
              </li>
              <li className="flex items-center gap-1.5 rounded-full border border-line bg-surface-2 px-3 py-1.5 text-small text-ink-muted">
                <MessageSquare className="h-4 w-4 text-ink-subtle" aria-hidden="true" />
                Answer
              </li>
            </ol>
            <p className="mt-auto pt-6 text-small text-ink-muted">
              A single prompt in, a single response out — limited to what the model already knows,
              with no tools and no follow-through.
            </p>
          </Card>

          <div className="relative overflow-hidden rounded-card border border-accent/30 bg-surface p-6 shadow-card md:col-span-3">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-accent/5"
            />
            <div className="relative flex h-full flex-col">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-h4 text-ink">Agentic AI</h3>
                <Badge tone="accent">Goal-driven</Badge>
              </div>
              <p className="mt-1 text-caption text-ink-muted">Pursues an outcome, then proves it.</p>
              <ol className="mt-6 flex flex-wrap items-center gap-y-3">
                {agenticLoop.map((step, i) => (
                  <li key={step.label} className="flex items-center">
                    {i > 0 && (
                      <ChevronRight
                        className="mx-1.5 h-4 w-4 shrink-0 text-accent/70"
                        aria-hidden="true"
                      />
                    )}
                    <span className="flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-small font-medium text-ink">
                      <step.icon className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      {step.label}
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-auto flex items-start gap-2 pt-6 text-small text-ink-muted">
                <RefreshCw className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                If verification fails, the agent re-plans and tries again — the loop runs until the
                goal is met.
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Agent architecture flow */}
      <Reveal delay={120} className="mt-12">
        <Card className="relative overflow-hidden p-4 sm:p-6 lg:p-8">
          <div aria-hidden="true" className="grid-backdrop absolute inset-0" />
          <div className="relative">
            <h3 className="text-h4 text-ink">How an agent gets work done</h3>
            <figure className="mt-6">
              <div
                role="img"
                aria-label="Agent architecture diagram. A user gives a goal to an AI agent. The agent uses tools to call APIs, read and write databases, and operate applications, producing a result verified against the goal. A feedback loop returns from the applications to the agent: it observes each outcome, verifies it, and re-plans until the work is complete."
              >
                {/* Desktop: horizontal chain with a verify/re-plan loop-back */}
                <div className="hidden lg:block">
                  <div className={`grid ${GRID_COLS}`}>
                    {architectureNodes.map((node, i) => (
                      <Fragment key={node.label}>
                        {i > 0 && <ArrowCell />}
                        <DiagramNode node={node} />
                      </Fragment>
                    ))}
                  </div>
                  <div className={`grid ${GRID_COLS} h-14`}>
                    <FlowCell
                      className="col-start-3"
                      colorClass="text-accent/70"
                      segments={[
                        { x1: '100%', y1: '50%', x2: '50%', y2: '50%' },
                        { x1: '50%', y1: '50%', x2: '50%', y2: '0' },
                      ]}
                      arrow="up"
                    />
                    <FlowCell colorClass="text-accent/70" segments={horizontalRTL} />
                    <FlowCell colorClass="text-accent/70" segments={horizontalRTL} />
                    <FlowCell colorClass="text-accent/70" segments={horizontalRTL} />
                    <FlowCell
                      colorClass="text-accent/70"
                      segments={horizontalRTL}
                      chip="observe · verify · re-plan"
                    />
                    <FlowCell colorClass="text-accent/70" segments={horizontalRTL} />
                    <FlowCell colorClass="text-accent/70" segments={horizontalRTL} />
                    <FlowCell colorClass="text-accent/70" segments={horizontalRTL} />
                    <FlowCell
                      colorClass="text-accent/70"
                      segments={[
                        { x1: '50%', y1: '0', x2: '50%', y2: '50%' },
                        { x1: '50%', y1: '50%', x2: '0', y2: '50%' },
                      ]}
                    />
                  </div>
                </div>

                {/* Mobile / tablet: vertical chain */}
                <div className="lg:hidden">
                  {architectureNodes.map((node, i) => (
                    <div key={node.label}>
                      {i > 0 && <VConnector />}
                      <div
                        className={`flex items-center gap-3 rounded-card border ${
                          node.tone === 'accent' ? 'border-accent/40' : 'border-line'
                        } bg-surface-2 p-3`}
                      >
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-btn ${
                            node.tone === 'accent'
                              ? 'bg-accent/10 text-accent'
                              : 'bg-primary/10 text-primary'
                          }`}
                        >
                          <node.icon className="h-5 w-5" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-small font-semibold text-ink">
                            {node.label}
                          </span>
                          <span className="block text-caption text-ink-muted">{node.caption}</span>
                        </span>
                      </div>
                    </div>
                  ))}
                  <div className="mt-4 flex items-start gap-2 rounded-card border border-dashed border-accent/40 bg-accent/5 p-3 text-caption text-ink-muted">
                    <RefreshCw className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    The agent observes each result, verifies it against the goal, and re-plans
                    until the work is complete.
                  </div>
                </div>
              </div>
              <figcaption className="mt-5 text-caption text-ink-muted">
                One loop, end to end: the agent acts through tools, observes what happened,
                verifies it against the goal, and re-plans until the result stands.
              </figcaption>
            </figure>
          </div>
        </Card>
      </Reveal>

      {/* Capabilities + stack */}
      <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-16">
        <Reveal>
          <h3 className="text-h4 text-ink">Agent capabilities</h3>
          <ul className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {capabilities.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-small text-ink">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={120}>
          <Card className="h-full p-6">
            <h3 className="text-h4 text-ink">We build with</h3>
            <p className="mt-2 text-small text-ink-muted">
              Frameworks, protocols and model platforms we work with today. Recommendations follow
              your requirements and constraints — not vendor defaults.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <li key={tech.name}>
                  <Badge tone={tech.tone}>{tech.name}</Badge>
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </div>
    </Section>
  )
}
