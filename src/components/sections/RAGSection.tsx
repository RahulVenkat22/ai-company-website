import type { LucideIcon } from 'lucide-react'
import {
  ArrowDownWideNarrow,
  Binary,
  BookOpen,
  Bot,
  Boxes,
  BrainCircuit,
  Check,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Database,
  FileSearch,
  FileText,
  MessageCircleQuestion,
  MessageSquareQuote,
  Quote,
  Scissors,
  SearchCheck,
  User,
} from 'lucide-react'
import type { ReactNode } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

type Tone = 'primary' | 'accent'

interface PipelineStep {
  icon: LucideIcon
  label: string
  detail: string
  tone: Tone
}

const pipelineSteps: PipelineStep[] = [
  {
    icon: MessageCircleQuestion,
    label: 'Question',
    detail: 'A user asks in plain language',
    tone: 'primary',
  },
  {
    icon: FileSearch,
    label: 'Retrieve Knowledge',
    detail: 'Search every connected source',
    tone: 'primary',
  },
  {
    icon: ArrowDownWideNarrow,
    label: 'Rank',
    detail: 'Order passages by relevance',
    tone: 'primary',
  },
  {
    icon: Bot,
    label: 'Generate Answer',
    detail: 'The model writes from retrieved context',
    tone: 'primary',
  },
  {
    icon: Quote,
    label: 'Cite Sources',
    detail: 'Every answer shows its evidence',
    tone: 'accent',
  },
]

const capabilities: string[] = [
  'Retrieval-Augmented Generation',
  'Enterprise RAG',
  'Document intelligence',
  'Knowledge bases',
  'Semantic search',
  'Hybrid search',
  'Vector search',
  'Embeddings',
  'Reranking',
  'Enterprise search',
  'Private knowledge assistants',
  'Secure AI systems',
]

const technologies: { name: string; tone: 'neutral' | 'accent' }[] = [
  { name: 'PostgreSQL', tone: 'neutral' },
  { name: 'pgvector', tone: 'accent' },
  { name: 'Elasticsearch', tone: 'accent' },
  { name: 'Vector databases', tone: 'neutral' },
  { name: 'LangChain', tone: 'neutral' },
  { name: 'LangGraph', tone: 'accent' },
  { name: 'LLM APIs', tone: 'neutral' },
]

/** Mobile architecture chain, in logical order. */
interface MobileStep {
  icon: LucideIcon
  label: string
  caption: string
  tone: Tone
}

const mobileIndexingSteps: MobileStep[] = [
  {
    icon: FileText,
    label: 'Data Sources',
    caption: 'Documents · Databases · Wikis',
    tone: 'primary',
  },
  {
    icon: Scissors,
    label: 'Ingestion & Chunking',
    caption: 'Parse and split content into passages',
    tone: 'primary',
  },
  {
    icon: Binary,
    label: 'Embeddings',
    caption: 'Encode meaning as vectors',
    tone: 'primary',
  },
  {
    icon: Boxes,
    label: 'Vector Store',
    caption: 'pgvector · Elasticsearch',
    tone: 'accent',
  },
]

const mobileQuerySteps: MobileStep[] = [
  {
    icon: User,
    label: 'User Question',
    caption: 'Asked in plain language',
    tone: 'primary',
  },
  {
    icon: SearchCheck,
    label: 'Retriever + Reranker',
    caption: 'Hybrid search, reranked for relevance',
    tone: 'accent',
  },
  {
    icon: BrainCircuit,
    label: 'LLM + Context',
    caption: 'Prompted with retrieved passages only',
    tone: 'primary',
  },
  {
    icon: MessageSquareQuote,
    label: 'Grounded Answer',
    caption: 'Returned to the user with citations',
    tone: 'accent',
  },
]

/* ------------------------------------------------------------------ */
/* Diagram building blocks (CSS grid nodes + SVG flow edges)           */
/* ------------------------------------------------------------------ */

/** Shared 7-track grid: 4 node columns separated by 3 connector columns. */
const GRID_COLS =
  'grid-cols-[minmax(0,1fr)_2rem_minmax(0,1fr)_2rem_minmax(0,1fr)_2rem_minmax(0,1fr)]'

interface EdgeSegment {
  x1: string
  y1: string
  x2: string
  y2: string
}

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
        <span className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-line bg-surface-2 px-3 py-1 text-caption font-medium text-ink-muted">
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

function DiagramNode({
  icon: Icon,
  label,
  caption,
  tone = 'primary',
  live = false,
  children,
}: {
  icon: LucideIcon
  label: string
  caption?: string
  tone?: Tone
  /** Pulsing status dot for “always current” stores. */
  live?: boolean
  children?: ReactNode
}) {
  const tile = tone === 'accent' ? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary'
  const border = tone === 'accent' ? 'border-accent/40' : 'border-line'
  return (
    <div
      className={`relative flex h-full flex-col items-center justify-center gap-2 rounded-card border ${border} bg-surface-2 p-3 text-center`}
    >
      {live && (
        <span className="absolute right-2 top-2 h-1.5 w-1.5 animate-pulse-soft rounded-full bg-accent" />
      )}
      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-btn ${tile}`}>
        <Icon className="h-5 w-5" />
      </span>
      <span className="text-small font-semibold leading-snug text-ink">{label}</span>
      {caption && <span className="text-caption text-ink-muted">{caption}</span>}
      {children}
    </div>
  )
}

/** Grouped “Data Sources” node with three mini source rows. */
function SourcesNode() {
  return (
    <div className="flex h-full flex-col justify-center gap-2 rounded-card border border-line bg-surface-2 p-3">
      <span className="text-center text-small font-semibold text-ink">Data Sources</span>
      <span className="flex items-center gap-2 rounded-btn border border-line bg-surface px-2 py-1 text-caption text-ink-muted">
        <FileText className="h-3.5 w-3.5 shrink-0 text-primary" />
        Documents
      </span>
      <span className="flex items-center gap-2 rounded-btn border border-line bg-surface px-2 py-1 text-caption text-ink-muted">
        <Database className="h-3.5 w-3.5 shrink-0 text-primary" />
        Databases
      </span>
      <span className="flex items-center gap-2 rounded-btn border border-line bg-surface px-2 py-1 text-caption text-ink-muted">
        <BookOpen className="h-3.5 w-3.5 shrink-0 text-primary" />
        Wikis & intranets
      </span>
    </div>
  )
}

/** Small uppercase pipeline-lane label. */
function LaneLabel({ text, tone }: { text: string; tone: Tone }) {
  return (
    <span className="flex items-center gap-2">
      <span
        className={`h-1.5 w-1.5 rounded-full ${tone === 'accent' ? 'bg-accent' : 'bg-primary'}`}
      />
      <span className="text-caption font-semibold uppercase tracking-[0.14em] text-ink-subtle">
        {text}
      </span>
    </span>
  )
}

/** Vertical connector for stacked (mobile) chains. */
function VConnector({ colorClass = 'text-line-strong' }: { colorClass?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 14 28" className={`mx-auto h-7 w-3.5 ${colorClass}`}>
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

function MobileNode({ step }: { step: MobileStep }) {
  const tile =
    step.tone === 'accent' ? 'bg-accent/10 text-accent' : 'bg-primary/10 text-primary'
  const border = step.tone === 'accent' ? 'border-accent/40' : 'border-line'
  return (
    <div className={`flex items-center gap-3 rounded-card border ${border} bg-surface-2 p-3`}>
      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-btn ${tile}`}>
        <step.icon className="h-5 w-5" />
      </span>
      <span className="min-w-0">
        <span className="block text-small font-semibold text-ink">{step.label}</span>
        <span className="block text-caption text-ink-muted">{step.caption}</span>
      </span>
    </div>
  )
}

const horizontalRTL: EdgeSegment[] = [{ x1: '100%', y1: '50%', x2: '0', y2: '50%' }]

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

interface RAGSectionProps {
  variant?: 'default' | 'alt' | 'deep'
}

/** RAG & Enterprise AI — differentiator section with animated architecture. */
export function RAGSection({ variant = 'deep' }: RAGSectionProps) {
  return (
    <Section id="rag" variant={variant} bleed className="relative">
      <div aria-hidden="true" className="grid-backdrop absolute inset-0" />
      <Container className="relative">
        <SectionHeading
          eyebrow="RAG & Enterprise AI"
          title="Give AI access to your business knowledge"
          lead="Retrieval-Augmented Generation connects language models to your documents, databases and internal knowledge — so answers reflect your business, stay current, and cite their sources."
        />

        {/* RAG answer pipeline: Question → Retrieve → Rank → Generate → Cite */}
        <Reveal>
          <ol className="flex flex-col md:flex-row md:items-stretch">
            {pipelineSteps.map((step, i) => (
              <li key={step.label} className="flex flex-col md:flex-1 md:flex-row">
                {i > 0 && (
                  <>
                    <span className="md:hidden">
                      <VConnector />
                    </span>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 28 14"
                      className="hidden h-3.5 w-7 shrink-0 self-center text-line-strong md:block"
                    >
                      <line
                        x1="0"
                        y1="7"
                        x2="21"
                        y2="7"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="animate-flow"
                      />
                      <path d="M21 2l6 5-6 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </>
                )}
                <div className="relative flex flex-1 items-center gap-3 rounded-card border border-line bg-surface p-4 shadow-card md:flex-col md:justify-start md:gap-3 md:p-5 md:text-center">
                  <span
                    aria-hidden="true"
                    className="absolute right-3 top-2 font-mono text-caption text-ink-subtle"
                  >
                    {`0${i + 1}`}
                  </span>
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-btn ${
                      step.tone === 'accent'
                        ? 'bg-accent/10 text-accent'
                        : 'bg-primary/10 text-primary'
                    }`}
                  >
                    <step.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-small font-semibold text-ink">{step.label}</span>
                    <span className="block text-caption text-ink-muted">{step.detail}</span>
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* Architecture diagram */}
        <Reveal delay={120} className="mt-12">
          <Card className="relative overflow-hidden p-4 sm:p-6 lg:p-8">
            <h3 className="text-h4 text-ink">Inside an enterprise RAG system</h3>
            <figure className="mt-6">
              <div
                role="img"
                aria-label="Enterprise RAG architecture diagram. Indexing pipeline: documents, databases and wikis flow through ingestion and chunking, then embeddings, into a vector store built on pgvector or Elasticsearch. Query pipeline: a user question goes to a retriever and reranker, which pulls top-ranked context from the vector store; the language model answers from that context only and returns a grounded answer with citations to the user."
              >
                {/* Desktop: two lanes joined by routed flow edges */}
                <div className="hidden md:block">
                  <div className="mb-3">
                    <LaneLabel text="Indexing pipeline" tone="primary" />
                  </div>
                  <div className={`grid ${GRID_COLS}`}>
                    <SourcesNode />
                    <ArrowCell />
                    <DiagramNode
                      icon={Scissors}
                      label="Ingestion & Chunking"
                      caption="Parse and split content into passages"
                    />
                    <ArrowCell />
                    <DiagramNode
                      icon={Binary}
                      label="Embeddings"
                      caption="Encode meaning as vectors"
                    />
                    <ArrowCell />
                    <DiagramNode
                      icon={Boxes}
                      label="Vector Store"
                      caption="pgvector · Elasticsearch"
                      tone="accent"
                      live
                    />
                  </div>

                  {/* Vector store → retriever (routed edge across the band) */}
                  <div className={`grid ${GRID_COLS} h-16`}>
                    <div className="flex items-center">
                      <LaneLabel text="Query pipeline" tone="accent" />
                    </div>
                    <FlowCell
                      className="col-start-3"
                      colorClass="text-accent/70"
                      segments={[
                        { x1: '100%', y1: '50%', x2: '50%', y2: '50%' },
                        { x1: '50%', y1: '50%', x2: '50%', y2: '100%' },
                      ]}
                      arrow="down"
                    />
                    <FlowCell colorClass="text-accent/70" segments={horizontalRTL} />
                    <FlowCell
                      colorClass="text-accent/70"
                      segments={horizontalRTL}
                      chip="semantic search · top-k"
                    />
                    <FlowCell colorClass="text-accent/70" segments={horizontalRTL} />
                    <FlowCell
                      colorClass="text-accent/70"
                      segments={[
                        { x1: '50%', y1: '0', x2: '50%', y2: '50%' },
                        { x1: '50%', y1: '50%', x2: '0', y2: '50%' },
                      ]}
                    />
                  </div>

                  <div className={`grid ${GRID_COLS}`}>
                    <DiagramNode icon={User} label="User" caption="Asks in plain language" />
                    <ArrowCell />
                    <DiagramNode
                      icon={SearchCheck}
                      label="Retriever + Reranker"
                      caption="Hybrid search, reranked for relevance"
                      tone="accent"
                    />
                    <ArrowCell />
                    <DiagramNode
                      icon={BrainCircuit}
                      label="LLM + Context"
                      caption="Prompted with retrieved passages only"
                    />
                    <ArrowCell />
                    <DiagramNode
                      icon={MessageSquareQuote}
                      label="Grounded Answer"
                      caption="Every claim cites its source"
                      tone="accent"
                    >
                      <span className="flex flex-wrap justify-center gap-1">
                        <span className="rounded-full border border-line bg-surface px-2 py-0.5 font-mono text-caption text-ink-subtle">
                          [1] handbook.pdf
                        </span>
                        <span className="rounded-full border border-line bg-surface px-2 py-0.5 font-mono text-caption text-ink-subtle">
                          [2] wiki/policy
                        </span>
                      </span>
                    </DiagramNode>
                  </div>

                  {/* Answer returns to the user */}
                  <div className={`grid ${GRID_COLS} h-12`}>
                    <FlowCell
                      colorClass="text-primary/60"
                      segments={[
                        { x1: '100%', y1: '50%', x2: '50%', y2: '50%' },
                        { x1: '50%', y1: '50%', x2: '50%', y2: '0' },
                      ]}
                      arrow="up"
                    />
                    <FlowCell colorClass="text-primary/60" segments={horizontalRTL} />
                    <FlowCell colorClass="text-primary/60" segments={horizontalRTL} />
                    <FlowCell
                      colorClass="text-primary/60"
                      segments={horizontalRTL}
                      chip="grounded answer + citations"
                    />
                    <FlowCell colorClass="text-primary/60" segments={horizontalRTL} />
                    <FlowCell colorClass="text-primary/60" segments={horizontalRTL} />
                    <FlowCell
                      colorClass="text-primary/60"
                      segments={[
                        { x1: '50%', y1: '0', x2: '50%', y2: '50%' },
                        { x1: '50%', y1: '50%', x2: '0', y2: '50%' },
                      ]}
                    />
                  </div>
                </div>

                {/* Mobile: single vertical chain */}
                <div className="md:hidden">
                  <div className="mb-3">
                    <LaneLabel text="Indexing pipeline" tone="primary" />
                  </div>
                  {mobileIndexingSteps.map((step, i) => (
                    <div key={step.label}>
                      {i > 0 && <VConnector />}
                      <MobileNode step={step} />
                    </div>
                  ))}
                  <VConnector colorClass="text-accent/70" />
                  <div className="mb-3">
                    <LaneLabel text="Query pipeline" tone="accent" />
                  </div>
                  {mobileQuerySteps.map((step, i) => (
                    <div key={step.label}>
                      {i > 0 && <VConnector colorClass="text-accent/70" />}
                      <MobileNode step={step} />
                    </div>
                  ))}
                </div>
              </div>
              <figcaption className="mt-5 text-caption text-ink-muted">
                The indexing pipeline keeps the knowledge base current as content changes. At query
                time, every answer is retrieved, reranked and grounded in your sources before the
                model responds — and returned with citations.
              </figcaption>
            </figure>
          </Card>
        </Reveal>

        {/* Capabilities + stack */}
        <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-16">
          <Reveal>
            <h3 className="text-h4 text-ink">RAG capabilities</h3>
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
                Retrieval quality is an architecture problem before it is a model problem. We
                assemble the stack that fits your data, scale and security posture.
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
      </Container>
    </Section>
  )
}
