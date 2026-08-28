import type { ReactNode } from 'react'
import { CheckCircle2, AlertTriangle, Info } from 'lucide-react'

type AlertTone = 'success' | 'error' | 'info'

interface AlertProps {
  tone: AlertTone
  title?: string
  children: ReactNode
  className?: string
}

const tones: Record<AlertTone, { wrap: string; icon: ReactNode }> = {
  success: {
    wrap: 'border-emerald-500/35 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300',
    icon: <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />,
  },
  error: {
    wrap: 'border-red-500/35 bg-red-500/10 text-red-800 dark:text-red-300',
    icon: <AlertTriangle className="h-5 w-5 shrink-0" aria-hidden="true" />,
  },
  info: {
    wrap: 'border-primary/35 bg-primary/10 text-primary',
    icon: <Info className="h-5 w-5 shrink-0" aria-hidden="true" />,
  },
}

/** Status alert with role="status"/"alert" for screen readers. */
export function Alert({ tone, title, children, className = '' }: AlertProps) {
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={`flex items-start gap-3 rounded-card border p-4 text-small ${tones[tone].wrap} ${className}`.trim()}
    >
      {tones[tone].icon}
      <div>
        {title && <p className="mb-0.5 font-semibold">{title}</p>}
        <div className="[&_a]:underline">{children}</div>
      </div>
    </div>
  )
}
