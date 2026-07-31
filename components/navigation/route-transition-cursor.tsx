'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

const NAVIGATING_CLASS = 'is-navigating'
// Safety net: if a click doesn't turn into a real navigation (e.g. a
// same-page hash link, a link to the page you're already on, or a click
// that gets cancelled), don't leave the cursor stuck forever.
const FALLBACK_TIMEOUT_MS = 4000

function isInternalNavigationClick(event: MouseEvent) {
  // Ignore modified clicks (open in new tab, etc.) and non-left clicks.
  if (event.defaultPrevented) return false
  if (event.button !== 0) return false
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false

  const anchor = (event.target as HTMLElement)?.closest?.('a[href]') as HTMLAnchorElement | null
  if (!anchor) return false
  if (anchor.target && anchor.target !== '_self') return false
  if (anchor.hasAttribute('download')) return false

  const url = new URL(anchor.href, window.location.href)
  if (url.origin !== window.location.origin) return false

  // Same-page anchor (e.g. "#pricing") or a link back to the current URL
  // isn't a real page navigation, so don't show a loading cursor for it.
  const isSamePage = url.pathname === window.location.pathname && url.search === window.location.search
  if (isSamePage) return false

  return true
}

/**
 * RouteTransitionCursor — mount once near the root layout. It has no
 * visible UI of its own; it just toggles `is-navigating` on <html> for
 * the time between an internal link click and the new page finishing
 * its render, which globals.css turns into a `cursor: progress` state.
 */
export function RouteTransitionCursor() {
  const pathname = usePathname()
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function clearNavigating() {
    document.documentElement.classList.remove(NAVIGATING_CLASS)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  function startNavigating() {
    document.documentElement.classList.add(NAVIGATING_CLASS)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(clearNavigating, FALLBACK_TIMEOUT_MS)
  }

  // The new page has finished rendering — turn the loading cursor off.
  useEffect(() => {
    clearNavigating()
  }, [pathname])

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (isInternalNavigationClick(event)) startNavigating()
    }

    function onPopState() {
      startNavigating()
    }

    document.addEventListener('click', onClick)
    window.addEventListener('popstate', onPopState)

    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('popstate', onPopState)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return null
}
