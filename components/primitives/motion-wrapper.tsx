'use client'

import { motion, type HTMLMotionProps, type Variants } from 'framer-motion'
import { viewport as viewportDefaults } from '@/lib/motion/config'
import { fadeIn } from '@/lib/motion/variants'
import { cn } from '@/lib/utils'

type MotionTag = 'div' | 'section' | 'article' | 'aside' | 'header' | 'footer' | 'li' | 'ul'

interface MotionWrapperProps extends Omit<HTMLMotionProps<'div'>, 'variants' | 'viewport'> {
  /** Framer Motion variants — defaults to fadeIn */
  variants?: Variants
  /** HTML element to render */
  as?: MotionTag
  /** Trigger animation on scroll into viewport */
  viewport?: boolean
  /** Viewport trigger options override */
  viewportOptions?: { once?: boolean; margin?: string; amount?: number }
} & (
  | { as?: 'div'; props?: HTMLMotionProps<'div'> }
  | { as: 'section'; props?: HTMLMotionProps<'section'> }
  | { as: 'article'; props?: HTMLMotionProps<'article'> }
  | { as: 'aside'; props?: HTMLMotionProps<'aside'> }
  | { as: 'header'; props?: HTMLMotionProps<'header'> }
  | { as: 'footer'; props?: HTMLMotionProps<'footer'> }
  | { as: 'li'; props?: HTMLMotionProps<'li'> }
  | { as: 'ul'; props?: HTMLMotionProps<'ul'> }
)

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
  const Component = motion.create(Tag)

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
