import { useEffect, useState } from 'react'
import { ScrollTrigger, prefersReduced } from '@/lib/gsap'

export const useScrollProgress = (): number => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (prefersReduced()) {
      setProgress(0)
      return
    }

    const trigger = ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0,
      onUpdate: (self) => {
        setProgress(self.progress * 100)
      },
    })

    return () => trigger.kill()
  }, [])

  return progress
}
