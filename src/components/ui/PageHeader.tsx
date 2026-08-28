import type { ReactNode } from 'react'
import { Container } from './Container'
import { Reveal } from './Reveal'

interface PageHeaderProps {
  eyebrow?: string
  title: ReactNode
  lead?: ReactNode
  /** Optional CTA buttons or extra content under the lead. */
  children?: ReactNode
}

/** Consistent top-of-page header for interior pages (h1 lives here). */
export function PageHeader({ eyebrow, title, lead, children }: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden border-b border-line">
      <div className="grid-backdrop absolute inset-0" aria-hidden="true" />
      <Container className="relative py-16 md:py-20 lg:py-24">
        <Reveal className="flex max-w-3xl flex-col gap-5">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className="text-h1">{title}</h1>
          {lead && <p className="max-w-2xl text-body-lg text-ink-muted">{lead}</p>}
          {children && <div className="mt-2 flex flex-wrap gap-3">{children}</div>}
        </Reveal>
      </Container>
    </div>
  )
}
