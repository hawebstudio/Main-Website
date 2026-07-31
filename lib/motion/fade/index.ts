import type { Variants } from 'framer-motion'
import { distance, duration, ease } from '../tokens'

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.normal, ease: ease.smooth } },
}

export const fadeOut: Variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0, transition: { duration: duration.fast, ease: ease.smooth } },
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: distance.md },
  visible: { opacity: 1, y: 0, transition: { duration: duration.normal, ease: ease.outExpo } },
}

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -distance.md },
  visible: { opacity: 1, y: 0, transition: { duration: duration.normal, ease: ease.outExpo } },
}
