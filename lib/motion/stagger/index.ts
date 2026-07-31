import type { Variants } from 'framer-motion'
import { duration, ease, stagger } from '../tokens'

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: stagger.normal, delayChildren: 0.1 } },
}

export const staggerContainerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: stagger.fast, delayChildren: 0.05 } },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: duration.normal, ease: ease.outExpo } },
}
