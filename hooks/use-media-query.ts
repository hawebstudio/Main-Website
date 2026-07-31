'use client'

import { useEffect, useState } from 'react'

/**
 * useMediaQuery — generic CSS media query hook.
 * SSR-safe: returns `false` on the server, hydrates from the DOM.
 *
 * @param query - CSS media query string, e.g. `(min-width: 768px)`
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(query)
    setMatches(mql.matches)

    function onChange(event: MediaQueryListEvent) {
      setMatches(event.matches)
    }

    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}
