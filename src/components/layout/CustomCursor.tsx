import { useCursor } from '@/hooks/useCursor'

export default function CustomCursor() {
  const { dotRef, ringRef, enabled } = useCursor()

  if (!enabled) {
    return null
  }

  return (
    <>
      <div ref={dotRef} className="pointer-events-none fixed -left-10 -top-10 z-cursor h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal" />
      <div
        ref={ringRef}
        className="pointer-events-none fixed -left-10 -top-10 z-ring h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-teal/30"
      />
    </>
  )
}
