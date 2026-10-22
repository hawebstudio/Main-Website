'use client'

import { useSyncExternalStore } from 'react'

/**
 * useMounted — returns `true` after the component has mounted on the client.
 * Use to guard client-only rendering and prevent hydration mismatches.
 *
 * Usage:
 * ```tsx
 * const mounted = useMounted()
 * if (!mounted) return null
 * ```
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )
}
