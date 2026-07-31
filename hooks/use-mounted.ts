'use client'

import { useEffect, useState } from 'react'

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
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted
}
