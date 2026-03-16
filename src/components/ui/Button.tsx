import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'ghost'

type ButtonProps = {
  variant: ButtonVariant
  href?: string
  onClick?: () => void
  children: ReactNode
  showArrow?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

const baseClass =
  'inline-flex items-center gap-2 rounded-btn px-6 py-3 font-syne text-ui-btn transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal/20'

const variantClass: Record<ButtonVariant, string> = {
  primary:
    'group bg-teal font-bold text-black hover:-translate-y-0.5 hover:opacity-90',
  ghost:
    'border border-border-strong font-medium text-cream hover:border-white/25 hover:bg-white/5',
}

function Arrow() {
  return <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
}

export default function Button({
  variant,
  href,
  onClick,
  children,
  showArrow,
  className,
  type = 'button',
}: ButtonProps) {
  const shouldShowArrow = showArrow ?? variant === 'primary'
  const classes = cn(baseClass, variantClass[variant], className)

  if (href) {
    const isInternal = href.startsWith('/')

    if (isInternal) {
      return (
        <Link to={href} className={classes} onClick={onClick}>
          {children}
          {shouldShowArrow ? <Arrow /> : null}
        </Link>
      )
    }

    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
        {shouldShowArrow ? <Arrow /> : null}
      </a>
    )
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
      {shouldShowArrow ? <Arrow /> : null}
    </button>
  )
}
