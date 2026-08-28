import { lazy, Suspense } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

/**
 * Homepage hero. Bespoke section (not the shared <Section>) so the layout,
 * backdrop and vertical rhythm can be tuned independently. Owns the only h1
 * on the home page.
 *
 * The animated visualization (the only framer-motion component in the hero)
 * is lazy-loaded; the Suspense fallback is a static inline-SVG rendering of
 * the same network, so first paint never waits on framer-motion.
 */

const HeroVisualization = lazy(() => import('./HeroVisualization'))

/* ------------------------------------------------------------------ */
/* Static fallback — keep geometry in sync with HeroVisualization.tsx  */
/* ------------------------------------------------------------------ */

interface Pt {
  x: number
  y: number
}

const NODES = {
  problem: { x: 96, y: 92 },
  data: { x: 182, y: 214 },
  ai: { x: 340, y: 300 },
  automation: { x: 498, y: 356 },
  insights: { x: 574, y: 226 },
  outcome: { x: 584, y: 92 },
  cloud: { x: 104, y: 344 },
  rag: { x: 226, y: 430 },
  agents: { x: 408, y: 468 },
  apps: { x: 296, y: 148 },
  analytics: { x: 476, y: 168 },
} satisfies Record<string, Pt>

const SPINE_D = [
  `M 96 92 Q 108 170 182 214`,
  `M 182 214 Q 255 242 340 300`,
  `M 340 300 Q 425 318 498 356`,
  `M 498 356 Q 562 312 574 226`,
  `M 574 226 Q 600 158 584 92`,
]

const SATELLITE_EDGES: Array<[Pt, Pt]> = [
  [NODES.cloud, NODES.data],
  [NODES.cloud, NODES.ai],
  [NODES.rag, NODES.data],
  [NODES.rag, NODES.ai],
  [NODES.agents, NODES.ai],
  [NODES.agents, NODES.automation],
  [NODES.apps, NODES.ai],
  [NODES.analytics, NODES.ai],
  [NODES.analytics, NODES.insights],
]

const SATELLITES: Array<{ node: Pt; label: string }> = [
  { node: NODES.data, label: 'Data' },
  { node: NODES.rag, label: 'RAG' },
  { node: NODES.agents, label: 'Agents' },
  { node: NODES.cloud, label: 'Cloud' },
  { node: NODES.analytics, label: 'Analytics' },
  { node: NODES.automation, label: 'Automation' },
  { node: NODES.apps, label: 'Applications' },
  { node: NODES.insights, label: 'Insights' },
]

/** Static rendering of the hero network — same layout, no animation. */
function HeroVisualizationStatic() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute inset-x-8 inset-y-12 -z-10 rounded-full bg-primary/10 blur-3xl"
      />
      <svg
        viewBox="0 0 680 560"
        role="img"
        aria-label="Network diagram: a business problem flows through data, an AI core, automation and insights to a business outcome, supported by RAG, agents, cloud, analytics and application nodes."
        className="h-auto w-full max-h-[320px] sm:max-h-[400px] lg:max-h-none"
      >
        <g aria-hidden="true">
          <g className="text-line-strong" stroke="currentColor" strokeWidth={1} opacity={0.7}>
            {SATELLITE_EDGES.map(([a, b], i) => (
              <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
            ))}
          </g>

          <g
            className="text-primary"
            stroke="currentColor"
            strokeWidth={1.5}
            fill="none"
            strokeLinecap="round"
            opacity={0.55}
          >
            {SPINE_D.map((d) => (
              <path key={d} d={d} />
            ))}
          </g>

          <circle cx={NODES.ai.x} cy={NODES.ai.y} r={46} className="fill-primary" opacity={0.16} />
          <circle
            cx={NODES.outcome.x}
            cy={NODES.outcome.y}
            r={26}
            className="fill-accent"
            opacity={0.16}
          />
          <circle
            cx={NODES.agents.x}
            cy={NODES.agents.y}
            r={24}
            className="fill-violet-acc"
            opacity={0.16}
          />

          <circle
            cx={NODES.problem.x}
            cy={NODES.problem.y}
            r={10}
            className="fill-surface-2 stroke-line-strong"
            strokeWidth={1.5}
          />
          <circle cx={NODES.problem.x} cy={NODES.problem.y} r={3.5} className="fill-ink-subtle" />
          <text
            x={NODES.problem.x}
            y={NODES.problem.y - 22}
            textAnchor="middle"
            fontSize={10}
            fontWeight={600}
            letterSpacing="0.12em"
            className="fill-ink-subtle"
          >
            BUSINESS PROBLEM
          </text>

          <circle
            cx={NODES.outcome.x}
            cy={NODES.outcome.y}
            r={11}
            className="fill-accent/15 stroke-accent"
            strokeWidth={1.5}
          />
          <circle cx={NODES.outcome.x} cy={NODES.outcome.y} r={3.5} className="fill-accent" />
          <text
            x={NODES.outcome.x}
            y={NODES.outcome.y - 24}
            textAnchor="middle"
            fontSize={10}
            fontWeight={600}
            letterSpacing="0.12em"
            className="fill-accent"
          >
            BUSINESS OUTCOME
          </text>

          <circle
            cx={NODES.ai.x}
            cy={NODES.ai.y}
            r={28}
            className="fill-primary/15 stroke-primary"
            strokeWidth={1.5}
          />
          <circle
            cx={NODES.ai.x}
            cy={NODES.ai.y}
            r={36}
            fill="none"
            className="stroke-primary"
            strokeWidth={1}
            opacity={0.3}
            strokeDasharray="3 6"
          />
          <text
            x={NODES.ai.x}
            y={NODES.ai.y + 5}
            textAnchor="middle"
            fontSize={15}
            fontWeight={650}
            className="fill-ink"
          >
            AI
          </text>

          {SATELLITES.map(({ node, label }) => (
            <g key={label}>
              <circle
                cx={node.x}
                cy={node.y}
                r={13}
                className="fill-surface-2 stroke-line-strong"
                strokeWidth={1.25}
              />
              <circle cx={node.x} cy={node.y} r={3.5} className="fill-accent" opacity={0.85} />
              <text
                x={node.x}
                y={node.y + 30}
                textAnchor="middle"
                fontSize={12}
                fontWeight={550}
                letterSpacing="0.03em"
                className="fill-ink-muted"
              >
                {label}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

interface HeroProps {
  /**
   * Background band. The hero is a bespoke section (no shared <Section>
   * wrapper), so the variant maps directly to background classes.
   */
  variant?: 'default' | 'alt' | 'deep'
}

const heroVariantClasses: Record<NonNullable<HeroProps['variant']>, string> = {
  default: '',
  alt: 'bg-surface',
  deep: 'bg-surface-2/60 border-b border-line',
}

export function Hero({ variant = 'default' }: HeroProps) {
  return (
    <section className={`relative isolate overflow-hidden ${heroVariantClasses[variant]}`.trim()}>
      <div className="grid-backdrop absolute inset-0 -z-10" aria-hidden="true" />

      <div className="container-site grid items-center gap-12 py-16 md:py-22 lg:min-h-[calc(100vh-8rem)] lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-24">
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-3">
            <Badge tone="primary">
              <Sparkles size={13} aria-hidden="true" />
              AI Agents · RAG · Agentic AI
            </Badge>
          </div>

          <h1 className="mt-6 text-display">
            Engineering <span className="text-primary">Intelligence</span> for the Modern
            Enterprise.
          </h1>

          <p className="mt-6 max-w-xl text-body-lg text-ink-muted">
            We design and build AI-powered applications, intelligent agents, RAG systems, data
            platforms, cloud solutions and automated workflows that turn complex business
            challenges into measurable outcomes.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              to="/contact"
              size="lg"
              eventName="cta_click"
              eventParams={{ cta: 'start_project', location: 'hero' }}
              iconRight={<ArrowRight size={18} aria-hidden="true" />}
            >
              Start a Project
            </Button>
            <Button
              to="/ai-solutions"
              variant="secondary"
              size="lg"
              eventName="cta_click"
              eventParams={{ cta: 'explore_ai', location: 'hero' }}
            >
              Explore Our AI Solutions
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <Suspense fallback={<HeroVisualizationStatic />}>
            <HeroVisualization />
          </Suspense>
        </div>
      </div>
    </section>
  )
}
