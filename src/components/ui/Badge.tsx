import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type BadgeVariant = 'teal' | 'featured'

type BadgeProps = {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

export default function Badge({ children, variant = 'teal', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex rounded-badge bg-teal-bg px-2.5 py-0.5 font-syne text-ui-badge font-bold uppercase text-teal',
        variant === 'featured' && 'bg-teal-bg text-teal',
        className,
      )}
    >
      {children}
    </span>
  )
}
