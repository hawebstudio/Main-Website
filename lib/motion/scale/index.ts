import type { Variants } from 'framer-motion'
import { duration, ease, scale } from '../tokens'

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: scale.hidden },
  visible: { opacity: 1, scale: scale.visible, transition: { duration: duration.normal, ease: ease.outExpo } },
}

export const buttonScale = {
  whileHover: { scale: scale.hover },
  whileTap: { scale: scale.tap },
} as const
