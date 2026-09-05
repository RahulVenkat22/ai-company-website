import type { MouseEvent, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { trackEvent } from '@/lib/analytics'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'inverse'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  /** Internal route — renders a react-router Link. */
  to?: string
  /** External URL — renders an anchor. */
  href?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: (e: MouseEvent<HTMLElement>) => void
  className?: string
  /** Icon rendered after the label. */
  iconRight?: ReactNode
  /** Icon rendered before the label. */
  iconLeft?: ReactNode
  /** Analytics event fired on click (see lib/analytics.ts). */
  eventName?: string
  eventParams?: Record<string, string | number | boolean>
  ariaLabel?: string
}

const base =
  'inline-flex items-center justify-center gap-2.5 rounded-full font-medium ' +
  'transition-colors duration-200 ease-premium select-none ' +
  'disabled:pointer-events-none disabled:opacity-55'

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-ink-inverse hover:bg-primary-hover active:bg-primary',
  secondary:
    'border border-ink/30 bg-transparent text-ink ' +
    'hover:border-ink hover:bg-surface-2/60 active:bg-surface-3',
  ghost: 'text-ink-muted hover:text-ink hover:bg-surface-2 active:bg-surface-3',
  // For always-dark photo/video backdrops (PageHeader, bands), where theme
  // tokens would go dark-on-dark in the light theme.
  inverse:
    'border border-white/35 bg-white/5 text-white backdrop-blur-sm ' +
    'hover:border-white/70 hover:bg-white/15 active:bg-white/20',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-small',
  md: 'h-11 px-5 text-small',
  lg: 'h-[3.25rem] px-6 text-body',
}

/* Icons sit inside a small circular chip, echoing the editorial pill CTA. */
const chipBySize: Record<ButtonSize, string> = {
  sm: 'h-6 w-6 [&>svg]:h-3.5 [&>svg]:w-3.5',
  md: 'h-7 w-7',
  lg: 'h-8 w-8',
}

const chipByVariant: Record<ButtonVariant, string> = {
  primary: 'bg-white/20 text-current',
  secondary: 'bg-primary/10 text-primary',
  ghost: '',
  inverse: 'bg-white/15 text-current',
}

const chipMargin: Record<ButtonSize, { left: string; right: string }> = {
  sm: { left: '-ml-1.5', right: '-mr-1.5' },
  md: { left: '-ml-2', right: '-mr-2' },
  lg: { left: '-ml-2.5', right: '-mr-2.5' },
}

function IconChip({
  children,
  variant,
  size,
  side,
}: {
  children: ReactNode
  variant: ButtonVariant
  size: ButtonSize
  side: 'left' | 'right'
}) {
  if (variant === 'ghost') return <>{children}</>
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-full ${chipBySize[size]} ${
        chipByVariant[variant]
      } ${side === 'left' ? chipMargin[size].left : chipMargin[size].right}`}
    >
      {children}
    </span>
  )
}

/**
 * Unified button/link. Renders a router Link when `to` is given, an anchor
 * when `href` is given, otherwise a native button. Minimum touch target is
 * maintained by size heights.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  type = 'button',
  disabled,
  onClick,
  className = '',
  iconRight,
  iconLeft,
  eventName,
  eventParams,
  ariaLabel,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`.trim()

  const left = iconLeft ? (
    <IconChip variant={variant} size={size} side="left">
      {iconLeft}
    </IconChip>
  ) : null
  const right = iconRight ? (
    <IconChip variant={variant} size={size} side="right">
      {iconRight}
    </IconChip>
  ) : null

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    if (eventName) trackEvent(eventName, eventParams)
    onClick?.(e)
  }

  if (to) {
    return (
      <Link to={to} className={classes} onClick={handleClick} aria-label={ariaLabel}>
        {left}
        {children}
        {right}
      </Link>
    )
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onClick={handleClick}
        aria-label={ariaLabel}
        target="_blank"
        rel="noopener noreferrer"
      >
        {left}
        {children}
        {right}
      </a>
    )
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={classes}
      onClick={handleClick}
      aria-label={ariaLabel}
    >
      {left}
      {children}
      {right}
    </button>
  )
}
