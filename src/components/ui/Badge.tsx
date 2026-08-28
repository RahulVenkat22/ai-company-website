import type { ReactNode } from 'react'

type BadgeTone = 'neutral' | 'accent' | 'primary' | 'violet'

interface BadgeProps {
  children: ReactNode
  tone?: BadgeTone
  className?: string
}

const tones: Record<BadgeTone, string> = {
  neutral: 'border-line bg-surface-2 text-ink-muted',
  accent: 'border-accent/30 bg-accent/10 text-accent',
  primary: 'border-primary/30 bg-primary/10 text-primary',
  violet: 'border-violet-acc/30 bg-violet-acc/10 text-violet-acc',
}

/** Small pill label for capabilities, technologies and section tags. */
export function Badge({ children, tone = 'neutral', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-caption font-medium ${tones[tone]} ${className}`.trim()}
    >
      {children}
    </span>
  )
}
