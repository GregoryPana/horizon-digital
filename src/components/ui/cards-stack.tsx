"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

interface CardStickyProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number
  incrementY?: number
  incrementZ?: number
}

const ContainerScroll = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, style, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("relative w-full", className)}
      style={style}
      {...props}
    >
      {children}
    </div>
  )
})
ContainerScroll.displayName = "ContainerScroll"

const CardSticky = React.forwardRef<HTMLDivElement, CardStickyProps>(
  (
    {
      index,
      incrementY = 24,
      incrementZ = 10,
      children,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const zIndex = (index + 1) * incrementZ

    return (
      <div
        ref={ref}
        style={{
          position: "sticky",
          top: `calc(var(--sticky-top, 15vh) + ${index} * var(--sticky-increment, ${incrementY}px))`,
          zIndex,
          ...style,
        }}
        className={cn(className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

CardSticky.displayName = "CardSticky"

export { ContainerScroll, CardSticky }
