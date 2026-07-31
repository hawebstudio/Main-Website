import { fadeUp } from '../fade'

export const scrollReveal = fadeUp
export const scrollFade = fadeUp
export const scrollProgress = {
  initial: { scaleX: 0 },
  animate: { scaleX: 1 },
} as const
