'use client'

import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

/**
 * PageTransition — wraps page content with a smooth Framer Motion
 * fade-in animation that fires on every route change.
 *
 * Uses a simple "fade in new content" approach that works reliably
 * with Next.js App Router streaming — no AnimatePresence exit
 * animations which can conflict with React Server Components.
 *
 * This is a client component but it only wraps children —
 * the actual page content is still server-rendered and streamed in.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const prevPathname = useRef(pathname)

  // Detect real route changes to re-trigger animation
  const isNewRoute = prevPathname.current !== pathname
  if (isNewRoute) {
    prevPathname.current = pathname
  }

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
