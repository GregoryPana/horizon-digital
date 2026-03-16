import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type EyebrowProps = {
  children: ReactNode
  className?: string
  centered?: boolean
}

export default function Eyebrow({ children, className, centered = false }: EyebrowProps) {
  return (
    <p
      className={cn(
        'flex items-center gap-2 font-syne text-ui-eyebrow font-medium uppercase text-teal',
        centered && 'justify-center',
        className,
      )}
    >
      <span aria-hidden="true" className="text-ui-badge">
        ✦
      </span>
      {children}
    </p>
  )
}
