import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function RouteChangeTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // We want to jump to top immediately on route change
    // This ensures the next page starts at the top
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])

  return null
}
