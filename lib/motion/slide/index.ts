import type { Variants } from 'framer-motion'
import { distance, duration, ease } from '../tokens'

export const slideUp: Variants = {
  hidden: { opacity: 0, y: distance.md },
  visible: { opacity: 1, y: 0, transition: { duration: duration.normal, ease: ease.outExpo } },
}

export const slideDown: Variants = {
  hidden: { opacity: 0, y: -distance.md },
  visible: { opacity: 1, y: 0, transition: { duration: duration.normal, ease: ease.outExpo } },
}

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: distance.md },
  visible: { opacity: 1, x: 0, transition: { duration: duration.normal, ease: ease.outExpo } },
}

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -distance.md },
  visible: { opacity: 1, x: 0, transition: { duration: duration.normal, ease: ease.outExpo } },
}
