import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * Animated hero network: Business Problem → Data → AI → Automation →
 * Insights → Business Outcome, with satellite capability nodes around the
 * AI core. This is one of only two files allowed to import framer-motion
 * (see docs/STYLEGUIDE.md) and is loaded via React.lazy from Hero.tsx.
 *
 * NOTE: node geometry is duplicated in the static Suspense fallback inside
 * Hero.tsx — keep both in sync if coordinates change.
 */

interface Pt {
  x: number
  y: number
}

interface QEdge {
  from: Pt
  ctrl: Pt
  to: Pt
}

/* ------------------------------------------------------------------ */
/* Geometry (viewBox 0 0 680 560)                                      */
/* ------------------------------------------------------------------ */

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

/** Main story spine: gentle quadratic curves, drawn + carrying packets. */
const SPINE: QEdge[] = [
  { from: NODES.problem, ctrl: { x: 108, y: 170 }, to: NODES.data },
  { from: NODES.data, ctrl: { x: 255, y: 242 }, to: NODES.ai },
  { from: NODES.ai, ctrl: { x: 425, y: 318 }, to: NODES.automation },
  { from: NODES.automation, ctrl: { x: 562, y: 312 }, to: NODES.insights },
  { from: NODES.insights, ctrl: { x: 600, y: 158 }, to: NODES.outcome },
]

type NodeKey = keyof typeof NODES

/** Idle capability edges connecting satellites to the core flow. */
const SATELLITE_EDGES: Array<[NodeKey, NodeKey]> = [
  ['cloud', 'data'],
  ['cloud', 'ai'],
  ['rag', 'data'],
  ['rag', 'ai'],
  ['agents', 'ai'],
  ['agents', 'automation'],
  ['apps', 'ai'],
  ['analytics', 'ai'],
  ['analytics', 'insights'],
]

const SATELLITES: Array<{ key: NodeKey; label: string }> = [
  { key: 'data', label: 'Data' },
  { key: 'rag', label: 'RAG' },
  { key: 'agents', label: 'Agents' },
  { key: 'cloud', label: 'Cloud' },
  { key: 'analytics', label: 'Analytics' },
  { key: 'automation', label: 'Automation' },
  { key: 'apps', label: 'Applications' },
  { key: 'insights', label: 'Insights' },
]

const quadD = (e: QEdge) =>
  `M ${e.from.x} ${e.from.y} Q ${e.ctrl.x} ${e.ctrl.y} ${e.to.x} ${e.to.y}`

const quadAt = (e: QEdge, t: number): Pt => {
  const mt = 1 - t
  return {
    x: mt * mt * e.from.x + 2 * mt * t * e.ctrl.x + t * t * e.to.x,
    y: mt * mt * e.from.y + 2 * mt * t * e.ctrl.y + t * t * e.to.y,
  }
}

/* Sampled points along the full spine — packets animate cx/cy through them. */
const STEPS = 8
const SPINE_POINTS: Pt[] = SPINE.flatMap((edge, i) => {
  const count = i === SPINE.length - 1 ? STEPS + 1 : STEPS
  return Array.from({ length: count }, (_, j) => quadAt(edge, j / STEPS))
})
const SPINE_XS = SPINE_POINTS.map((p) => p.x)
const SPINE_YS = SPINE_POINTS.map((p) => p.y)
const SPINE_OPACITY = SPINE_POINTS.map((_, i) => {
  const t = i / (SPINE_POINTS.length - 1)
  if (t < 0.06) return (t / 0.06) * 0.9
  if (t > 0.94) return ((1 - t) / 0.06) * 0.9
  return 0.9
})

/* ------------------------------------------------------------------ */
/* Motion pieces                                                       */
/* ------------------------------------------------------------------ */

interface PacketProps {
  xs: number[]
  ys: number[]
  opacity: number[]
  duration: number
  delay: number
  className: string
}

/** A small data dot travelling along sampled path points. */
function Packet({ xs, ys, opacity, duration, delay, className }: PacketProps) {
  return (
    <motion.circle
      r={3}
      className={className}
      initial={{ opacity: 0 }}
      animate={{ cx: xs, cy: ys, opacity }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: 2.6,
        ease: 'linear',
      }}
    />
  )
}

interface HaloProps {
  node: Pt
  r: number
  className: string
  delay: number
  animate: boolean
}

/** Soft pulsing glow behind a node. */
function Halo({ node, r, className, delay, animate }: HaloProps) {
  if (!animate) {
    return <circle cx={node.x} cy={node.y} r={r} className={className} opacity={0.16} />
  }
  return (
    <motion.circle
      cx={node.x}
      cy={node.y}
      r={r}
      className={className}
      initial={{ opacity: 0.08 }}
      animate={{ opacity: [0.08, 0.24, 0.08] }}
      transition={{ duration: 6, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function HeroVisualization() {
  const reducedMotion = useReducedMotion() ?? false

  /**
   * Subtle interactivity (§7): hovering a capability node highlights it and
   * its connections. Pointer-only by design — the graphic is decorative
   * (aria-hidden), gates no content, and stays out of the tab order.
   */
  const [active, setActive] = useState<NodeKey | null>(null)
  const isEdgeHot = (a: NodeKey, b: NodeKey) =>
    active !== null && (active === a || active === b)

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
          {/* Idle capability edges */}
          <g className="text-line-strong" stroke="currentColor" strokeWidth={1}>
            {SATELLITE_EDGES.map(([ka, kb], i) => {
              const a = NODES[ka]
              const b = NODES[kb]
              const hot = isEdgeHot(ka, kb)
              const hotClass = hot ? 'text-accent' : ''
              if (reducedMotion) {
                return (
                  <line
                    key={i}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    opacity={hot ? 0.95 : 0.7}
                    strokeWidth={hot ? 1.5 : 1}
                    className={hotClass}
                  />
                )
              }
              return (
                <motion.line
                  key={i}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  className={hotClass}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: 1,
                    opacity: hot ? 0.95 : 0.7,
                    strokeWidth: hot ? 1.6 : 1,
                  }}
                  transition={{
                    pathLength: { duration: 1.4, delay: 0.5 + i * 0.12, ease: 'easeInOut' },
                    opacity: { duration: 0.25 },
                    strokeWidth: { duration: 0.25 },
                  }}
                />
              )
            })}
          </g>

          {/* Story spine */}
          <g
            className="text-primary"
            stroke="currentColor"
            strokeWidth={1.5}
            fill="none"
            strokeLinecap="round"
          >
            {SPINE.map((edge, i) =>
              reducedMotion ? (
                <path key={i} d={quadD(edge)} opacity={0.55} />
              ) : (
                <motion.path
                  key={i}
                  d={quadD(edge)}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.55 }}
                  transition={{ duration: 1.1, delay: 0.25 + i * 0.35, ease: 'easeInOut' }}
                />
              ),
            )}
          </g>

          {/* Data packets on the spine and two branch edges */}
          {!reducedMotion && (
            <g className="text-accent">
              <Packet
                xs={SPINE_XS}
                ys={SPINE_YS}
                opacity={SPINE_OPACITY}
                duration={7.5}
                delay={2.2}
                className="fill-accent"
              />
              <Packet
                xs={SPINE_XS}
                ys={SPINE_YS}
                opacity={SPINE_OPACITY}
                duration={7.5}
                delay={7.2}
                className="fill-primary"
              />
              <Packet
                xs={[NODES.agents.x, NODES.ai.x]}
                ys={[NODES.agents.y, NODES.ai.y]}
                opacity={[0, 0.7, 0.7, 0]}
                duration={4}
                delay={4}
                className="fill-violet-acc"
              />
              <Packet
                xs={[NODES.analytics.x, NODES.insights.x]}
                ys={[NODES.analytics.y, NODES.insights.y]}
                opacity={[0, 0.7, 0.7, 0]}
                duration={4}
                delay={6}
                className="fill-accent"
              />
            </g>
          )}

          {/* Glows behind key nodes */}
          <Halo node={NODES.ai} r={46} className="fill-primary" delay={0} animate={!reducedMotion} />
          <Halo
            node={NODES.outcome}
            r={26}
            className="fill-accent"
            delay={2.5}
            animate={!reducedMotion}
          />
          <Halo
            node={NODES.agents}
            r={24}
            className="fill-violet-acc"
            delay={4.5}
            animate={!reducedMotion}
          />

          {/* Endpoint nodes */}
          <g>
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
          </g>

          {/* AI core */}
          <g
            onPointerEnter={() => setActive('ai')}
            onPointerLeave={() => setActive(null)}
          >
            <motion.circle
              cx={NODES.ai.x}
              cy={NODES.ai.y}
              className="fill-primary/15 stroke-primary"
              strokeWidth={1.5}
              initial={false}
              animate={{ r: active === 'ai' ? 31 : 28 }}
              transition={{ duration: 0.25 }}
            />
            <circle
              cx={NODES.ai.x}
              cy={NODES.ai.y}
              r={36}
              fill="none"
              className="stroke-primary"
              strokeWidth={1}
              opacity={active === 'ai' ? 0.55 : 0.3}
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
          </g>

          {/* Satellite capability nodes */}
          {SATELLITES.map(({ key, label }) => {
            const node = NODES[key]
            const hot = active === key
            return (
              <g
                key={label}
                onPointerEnter={() => setActive(key)}
                onPointerLeave={() => setActive(null)}
              >
                {/* enlarged invisible hit area for comfortable hovering */}
                <circle cx={node.x} cy={node.y} r={26} fill="transparent" />
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  className={
                    hot
                      ? 'fill-surface-2 stroke-accent'
                      : 'fill-surface-2 stroke-line-strong'
                  }
                  strokeWidth={hot ? 1.6 : 1.25}
                  initial={false}
                  animate={{ r: hot ? 15 : 13 }}
                  transition={{ duration: 0.25 }}
                />
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={3.5}
                  className="fill-accent"
                  opacity={hot ? 1 : 0.85}
                />
                <text
                  x={node.x}
                  y={node.y + 30}
                  textAnchor="middle"
                  fontSize={12}
                  fontWeight={hot ? 620 : 550}
                  letterSpacing="0.03em"
                  className={hot ? 'fill-ink' : 'fill-ink-muted'}
                >
                  {label}
                </text>
              </g>
            )
          })}
        </g>
      </svg>
    </div>
  )
}
