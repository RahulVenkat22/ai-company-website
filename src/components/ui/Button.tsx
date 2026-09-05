import type { MouseEvent, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { trackEvent } from '@/lib/analytics'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'inverse'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  /** Internal route: renders a react-router Link. */
  to?: string
  /** External URL: renders an anchor. */
  href?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: (e: MouseEvent<HTMLElement>) => void
  className?: string
  /** Icon rendered after the label (nudges right on hover). */
  iconRight?: ReactNode
  /** Icon rendered before the label. */
  iconLeft?: ReactNode
  /** Analytics event fired on click (see lib/analytics.ts). */
  eventName?: string
  eventParams?: Record<string, string | number | boolean>
  ariaLabel?: string
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-btn font-medium ' +
  'transition-colors duration-200 ease-premium select-none whitespace-nowrap ' +
  'disabled:pointer-events-none disabled:opacity-50'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-ink-inverse hover:bg-primary-hover',
  secondary:
    'border border-line-strong bg-transparent text-ink hover:border-ink/50 hover:bg-surface-2',
  ghost: 'text-ink-muted hover:text-ink hover:bg-surface-2',
  // For always-dark photo/video scenes, where theme tokens would flip in the
  // light theme.
  inverse:
    'border border-paper/30 bg-paper/5 text-paper backdrop-blur-sm ' +
    'hover:border-paper/60 hover:bg-paper/10',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5 text-small',
  md: 'h-11 px-5 text-small',
  lg: 'h-12 px-6 text-body',
}

const MotionLink = motion.create(Link)

const iconVariants = {
  rest: { x: 0 },
  hover: { x: 3 },
}

/**
 * Unified button/link. Renders a router Link when `to` is given, an anchor
 * when `href` is given, otherwise a native button. Press feedback and the
 * icon nudge are Framer Motion; scroll-driven motion never targets this
 * element, so the two libraries never share a node.
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
  const reduce = useReducedMotion()
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`.trim()

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    if (eventName) trackEvent(eventName, eventParams)
    onClick?.(e)
  }

  const motionProps = reduce
    ? {}
    : {
        initial: 'rest',
        animate: 'rest',
        whileHover: 'hover',
        whileTap: { scale: 0.98 },
        transition: { type: 'spring' as const, stiffness: 420, damping: 28 },
      }

  const iconClass = 'inline-flex shrink-0 items-center [&>svg]:h-4 [&>svg]:w-4'
  const content = (
    <>
      {iconLeft && <span className={iconClass}>{iconLeft}</span>}
      <span>{children}</span>
      {iconRight && (
        <motion.span className={iconClass} variants={reduce ? undefined : iconVariants}>
          {iconRight}
        </motion.span>
      )}
    </>
  )

  if (to) {
    return (
      <MotionLink
        to={to}
        className={classes}
        onClick={handleClick}
        aria-label={ariaLabel}
        {...motionProps}
      >
        {content}
      </MotionLink>
    )
  }

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        onClick={handleClick}
        aria-label={ariaLabel}
        target="_blank"
        rel="noopener noreferrer"
        {...motionProps}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      className={classes}
      onClick={handleClick}
      aria-label={ariaLabel}
      {...motionProps}
    >
      {content}
    </motion.button>
  )
}
