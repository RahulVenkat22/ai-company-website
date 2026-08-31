import type { MouseEvent, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { trackEvent } from '@/lib/analytics'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
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
  'inline-flex items-center justify-center gap-2 rounded-btn font-semibold ' +
  'transition-colors duration-200 ease-premium select-none ' +
  'disabled:pointer-events-none disabled:opacity-55'

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-primary to-violet-acc text-white ' +
    'hover:brightness-110 active:brightness-95 transition-[filter] ' +
    'shadow-[0_1px_0_rgb(255_255_255/0.15)_inset,0_10px_24px_-8px_rgb(var(--c-primary)/0.6)]',
  secondary:
    'border border-line-strong bg-surface text-ink hover:border-line-strong ' +
    'hover:bg-surface-2 active:bg-surface-3',
  ghost: 'text-ink-muted hover:text-ink hover:bg-surface-2 active:bg-surface-3',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5 text-small',
  md: 'h-11 px-5 text-small',
  lg: 'h-12 px-6 text-body',
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

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    if (eventName) trackEvent(eventName, eventParams)
    onClick?.(e)
  }

  if (to) {
    return (
      <Link to={to} className={classes} onClick={handleClick} aria-label={ariaLabel}>
        {iconLeft}
        {children}
        {iconRight}
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
        {iconLeft}
        {children}
        {iconRight}
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
      {iconLeft}
      {children}
      {iconRight}
    </button>
  )
}
