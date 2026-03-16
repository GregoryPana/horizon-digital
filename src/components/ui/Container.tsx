import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type ContainerProps = {
  children: ReactNode
  className?: string
}

export default function Container({ children, className }: ContainerProps) {
  return <div className={cn('mx-auto max-w-site px-gut-sm sm:px-gut-md md:px-gutter', className)}>{children}</div>
}
