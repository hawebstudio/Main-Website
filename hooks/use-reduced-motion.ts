'use client'

import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

/**
 * useReducedMotion — returns `true` when the user has requested
 * reduced motion in their OS settings. SSR-safe (defaults to `false`).
 *
 * Usage:
 * ```tsx
 * const prefersReducedMotion = useReducedMotion()
 * ```
 */
export function useReducedMotion(): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(QUERY)
    setMatches(mql.matches)

    function onChange(event: MediaQueryListEvent) {
      setMatches(event.matches)
    }

    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return matches
}
