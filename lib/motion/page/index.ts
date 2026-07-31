import type { Variants } from 'framer-motion'
import { duration, ease } from '../tokens'

export const pageEnter: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.fast, ease: ease.smooth } },
}

export const sectionReveal = pageEnter
