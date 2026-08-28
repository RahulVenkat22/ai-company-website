import type { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
}

/** Max-width 1280px content container with responsive padding. */
export function Container({ children, className = '' }: ContainerProps) {
  return <div className={`container-site ${className}`.trim()}>{children}</div>
}
