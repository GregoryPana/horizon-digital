import { useScrollProgress } from '@/hooks/useScrollProgress'

export default function ScrollProgressBar() {
  const progress = useScrollProgress()

  return (
    <div
      id="scroll-progress-bar"
      className="pointer-events-none fixed left-0 top-0 z-progressBar h-px bg-teal"
      style={{ width: `${progress}%` }}
    />
  )
}
