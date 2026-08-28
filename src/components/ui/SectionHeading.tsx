import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  /** Small uppercase label above the title. */
  eyebrow?: string
  title: ReactNode
  /** Supporting paragraph under the title. */
  lead?: ReactNode
  align?: 'left' | 'center'
  /** Heading level, defaults to h2. */
  as?: 'h1' | 'h2' | 'h3'
  className?: string
}

/** Consistent section heading block: eyebrow, title, lead. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  as: Tag = 'h2',
  className = '',
}: SectionHeadingProps) {
  const alignClass =
    align === 'center' ? 'text-center mx-auto items-center' : 'text-left'
  const sizeClass = Tag === 'h1' ? 'text-h1' : Tag === 'h3' ? 'text-h3' : 'text-h2'

  return (
    <Reveal className={`mb-10 flex max-w-3xl flex-col gap-4 md:mb-14 ${alignClass} ${className}`.trim()}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag className={sizeClass}>{title}</Tag>
      {lead && <p className="max-w-2xl text-body-lg text-ink-muted">{lead}</p>}
    </Reveal>
  )
}
