import type { ReactNode } from 'react'

type BadgeTone = 'neutral' | 'accent' | 'primary' | 'violet'

interface BadgeProps {
  children: ReactNode
  tone?: BadgeTone
  className?: string
}

const tones: Record<BadgeTone, string> = {
  neutral: 'border-line text-ink-muted',
  accent: 'border-accent/35 text-accent',
  primary: 'border-primary/35 text-primary',
  violet: 'border-violet-acc/35 text-violet-acc',
}

/** Small squared tag for capabilities, technologies and section labels. */
export function Badge({ children, tone = 'neutral', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded border px-2.5 py-1 font-mono text-caption ${tones[tone]} ${className}`.trim()}
    >
      {children}
    </span>
  )
}
