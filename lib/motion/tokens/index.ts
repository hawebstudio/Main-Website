export const duration = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.35,
  slow: 0.5,
  slower: 0.8,
} as const

export const ease = {
  outExpo: [0.16, 1, 0.3, 1] as const,
  smooth: [0.4, 0, 0.2, 1] as const,
  outCubic: [0.33, 1, 0.68, 1] as const,
  outBack: [0.34, 1.56, 0.64, 1] as const,
} as const

export const spring = {
  snappy: { type: 'spring' as const, stiffness: 400, damping: 30 },
  gentle: { type: 'spring' as const, stiffness: 200, damping: 24 },
  bouncy: { type: 'spring' as const, stiffness: 300, damping: 15, mass: 0.8 },
} as const

export const stagger = {
  fast: 0.04,
  normal: 0.08,
  slow: 0.12,
} as const

export const distance = {
  sm: 12,
  md: 24,
  lg: 40,
} as const

export const opacity = {
  hidden: 0,
  visible: 1,
} as const

export const scale = {
  hidden: 0.95,
  visible: 1,
  hover: 1.02,
  tap: 0.98,
} as const

export const viewport = {
  once: true,
  margin: '-80px 0px',
  amount: 0.2 as const,
} as const
