/**
 * Slim capability band directly under the hero (prompt.md §8).
 * Text capabilities only — no vendor or partner logos, so nothing implies a
 * partnership or certification. Implemented as an accessible marquee: the
 * scrolling track is aria-hidden and duplicated 2x for a seamless loop, with
 * a static sr-only sentence carrying the content for assistive technology.
 * Reduced motion is handled globally (animations are disabled in CSS), which
 * leaves the first copy visible as a static strip.
 */

const CAPABILITIES = [
  'AI',
  'Data',
  'Cloud',
  'Analytics',
  'Automation',
  'Software Engineering',
]

interface CapabilityStripProps {
  /** Background band; the strip is bespoke (slim), so this maps to classes. */
  variant?: 'default' | 'alt' | 'deep'
}

const variantClasses: Record<NonNullable<CapabilityStripProps['variant']>, string> = {
  default: 'bg-surface',
  alt: 'bg-surface-2',
  deep: 'bg-surface-2/60',
}

/** One run of the capability words; rendered twice for the seamless loop. */
function StripRun() {
  return (
    <ul className="flex shrink-0 items-center">
      {CAPABILITIES.map((capability) => (
        <li
          key={capability}
          className="flex shrink-0 items-center text-caption font-semibold uppercase tracking-[0.22em] text-ink-subtle sm:text-small"
        >
          <span className="px-6 sm:px-9">{capability}</span>
          <span className="h-1 w-1 rounded-full bg-accent/60" />
        </li>
      ))}
    </ul>
  )
}

export function CapabilityStrip({ variant = 'default' }: CapabilityStripProps) {
  return (
    <section
      aria-label="Core capabilities"
      className={`border-y border-line ${variantClasses[variant]}`}
    >
      <p className="sr-only">
        Our core capabilities: AI, data, cloud, analytics, automation and software engineering.
      </p>
      <div className="overflow-hidden py-4" aria-hidden="true">
        <div className="flex w-max animate-marquee">
          <StripRun />
          <StripRun />
        </div>
      </div>
    </section>
  )
}
