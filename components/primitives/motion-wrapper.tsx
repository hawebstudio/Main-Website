'use client'

import type { ComponentType } from 'react'
import { motion, type HTMLMotionProps, type Variants } from 'framer-motion'
import { viewport as viewportDefaults } from '@/lib/motion/config'
import { fadeIn } from '@/lib/motion/variants'
import { cn } from '@/lib/utils'

type MotionTag = 'div' | 'section' | 'article' | 'aside' | 'header' | 'footer' | 'li' | 'ul'

type MotionWrapperProps = Omit<HTMLMotionProps<'div'>, 'variants' | 'viewport'> & {
  /** Framer Motion variants — defaults to fadeIn */
  variants?: Variants
  /** HTML element to render */
  as?: MotionTag
  /** Trigger animation on scroll into viewport */
  viewport?: boolean
  /** Viewport trigger options override */
  viewportOptions?: { once?: boolean; margin?: string; amount?: number }
}

/**
 * MotionWrapper — the single entry point for scroll-triggered and
 * entrance animations. Server components drop this client island in
 * where motion is needed. Automatically respects `prefers-reduced-motion`
 * via CSS (see globals.css).
 *
 * Usage:
 * ```tsx
 * <MotionWrapper variants={slideUp} viewport>
 *   <SomeServerComponent />
 * </MotionWrapper>
 * ```
 */
export function MotionWrapper({
  variants = fadeIn,
  as: Tag = 'div',
  viewport = true,
  viewportOptions,
  className,
  children,
  ...props
}: MotionWrapperProps) {
  const Component = motion.create(Tag) as ComponentType<HTMLMotionProps<'div'>>

  return (
    <Component
      variants={variants}
      initial="hidden"
      {...(viewport
        ? {
            whileInView: 'visible',
            viewport: {
              once: viewportOptions?.once ?? viewportDefaults.once,
              margin: viewportOptions?.margin ?? viewportDefaults.margin,
              amount: viewportOptions?.amount ?? viewportDefaults.amount,
            },
          }
        : { animate: 'visible' })}
      className={cn(className)}
      {...props}
    >
      {children}
    </Component>
  )
}