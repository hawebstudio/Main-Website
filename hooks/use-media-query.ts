'use client'

import { useSyncExternalStore } from 'react'

/**
 * useMediaQuery — generic CSS media query hook.
 * SSR-safe: returns `false` on the server, hydrates from the DOM.
 *
 * @param query - CSS media query string, e.g. `(min-width: 768px)`
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
    const mql = window.matchMedia(query)
    mql.addEventListener('change', onStoreChange)
    return () => mql.removeEventListener('change', onStoreChange)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}
