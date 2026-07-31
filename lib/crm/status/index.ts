import { pipelineStages } from '../constants'
import type { LeadStatus } from '../types'

export function statusLabel(status: LeadStatus): string {
  return pipelineStages.find((stage) => stage.status === status)?.label ?? status
}

export function statusOrder(status: LeadStatus): number {
  return pipelineStages.find((stage) => stage.status === status)?.order ?? Number.MAX_SAFE_INTEGER
}
