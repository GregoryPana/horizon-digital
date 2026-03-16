import type { useGSAPConfig } from '@gsap/react'
import { useGSAP } from '@/lib/gsap'

export const useScopedGSAP = (callback: () => void, config: useGSAPConfig): void => {
  useGSAP(callback, config)
}
