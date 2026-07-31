import type { RobotsRule } from '../types'

export function createRobotsRules(input: {
  rules: RobotsRule[]
  sitemap?: string | string[]
  host?: string
}) {
  return input
}
