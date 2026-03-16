import SplitType from 'split-type'
import { gsap, prefersReduced } from '@/lib/gsap'

type FadeUpOptions = {
  delay?: number
  stagger?: number
  trigger?: gsap.DOMTarget
  start?: string
}

export const setFinalVisible = (targets: gsap.TweenTarget): void => {
  gsap.set(targets, { opacity: 1, y: 0, x: 0, scale: 1 })
}

export const revealSectionTitle = (element: HTMLElement): (() => void) => {
  if (prefersReduced()) {
    setFinalVisible(element)
    return () => undefined
  }

  const split = new SplitType(element, { types: 'words' })

  split.words?.forEach((word: HTMLElement) => {
    const wrapper = document.createElement('span')
    wrapper.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:bottom'
    word.parentNode?.insertBefore(wrapper, word)
    wrapper.appendChild(word)
  })

  gsap.fromTo(
    split.words,
    { y: '110%', opacity: 0 },
    {
      y: '0%',
      opacity: 1,
      duration: 0.85,
      ease: 'power3.out',
      stagger: 0.065,
      scrollTrigger: {
        trigger: element,
        start: 'top 86%',
        toggleActions: 'play none none none',
      },
    },
  )

  return () => split.revert()
}

export const fadeUp = (targets: gsap.TweenTarget, options?: FadeUpOptions): void => {
  if (prefersReduced()) {
    setFinalVisible(targets)
    return
  }

  gsap.fromTo(
    targets,
    { opacity: 0, y: 26 },
    {
      opacity: 1,
      y: 0,
      duration: 0.75,
      ease: 'power2.out',
      delay: options?.delay ?? 0,
      stagger: options?.stagger ?? 0,
      scrollTrigger: {
        trigger: (options?.trigger ?? targets) as gsap.DOMTarget,
        start: options?.start ?? 'top 88%',
        toggleActions: 'play none none none',
      },
    },
  )
}
