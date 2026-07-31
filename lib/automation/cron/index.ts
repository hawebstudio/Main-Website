import type { AutomationFrequency } from '../types'

export interface CronSchedule {
  id: string
  frequency: AutomationFrequency
  description: string
}

export function createCronSchedule(input: CronSchedule): CronSchedule {
  return input
}
