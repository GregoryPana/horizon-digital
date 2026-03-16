import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'

const INTERACTIVE_SELECTOR = 'a, button, .interactive, .service-card, .work-card, .faq-item'

export const useCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const pointer = useRef({ x: -50, y: -50, rx: -50, ry: -50 })
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      setEnabled(false)
      return
    }

    setEnabled(true)

    const onMove = (event: MouseEvent): void => {
      pointer.current.x = event.clientX
      pointer.current.y = event.clientY

      if (dotRef.current) {
        dotRef.current.style.left = `${event.clientX}px`
        dotRef.current.style.top = `${event.clientY}px`
      }
    }

    const animate = (): void => {
      const p = pointer.current
      p.rx += (p.x - p.rx) * 0.11
      p.ry += (p.y - p.ry) * 0.11

      if (ringRef.current) {
        ringRef.current.style.left = `${p.rx}px`
        ringRef.current.style.top = `${p.ry}px`
      }

      rafRef.current = window.requestAnimationFrame(animate)
    }

    const onOver = (event: MouseEvent): void => {
      const target = event.target as Element | null
      if (!target?.closest(INTERACTIVE_SELECTOR)) {
        return
      }

      gsap.to(dotRef.current, { scale: 2.4, duration: 0.2, ease: 'power2.out' })
      gsap.to(ringRef.current, { width: 52, height: 52, duration: 0.25, ease: 'power2.out' })
    }

    const onOut = (event: MouseEvent): void => {
      const target = event.target as Element | null
      if (!target?.closest(INTERACTIVE_SELECTOR)) {
        return
      }

      gsap.to(dotRef.current, { scale: 1, duration: 0.2, ease: 'power2.out' })
      gsap.to(ringRef.current, { width: 36, height: 36, duration: 0.25, ease: 'power2.out' })
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    animate()

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      window.cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return {
    dotRef,
    ringRef,
    enabled,
  }
}
