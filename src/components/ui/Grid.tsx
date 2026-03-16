import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type GridProps = {
  children: ReactNode
  className?: string
  gapClass?: string
}

export default function Grid({ children, className, gapClass }: GridProps) {
  return (
    <div className={cn('grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12', gapClass ?? 'gap-x-col-gap md:gap-x-col-md sm:gap-x-col-sm', className)}>
      {children}
    </div>
  )
}
