import type { PipelineStage } from './types'

export const pipelineStages: PipelineStage[] = [
  { status: 'new', label: 'New', order: 1 },
  { status: 'contacted', label: 'Contacted', order: 2 },
  { status: 'qualified', label: 'Qualified', order: 3 },
  { status: 'proposal_sent', label: 'Proposal Sent', order: 4 },
  { status: 'won', label: 'Won', order: 5 },
  { status: 'lost', label: 'Lost', order: 6 },
  { status: 'archived', label: 'Archived', order: 7 },
]

export const defaultLeadStatus = 'new' as const
export const defaultLeadPriority = 'medium' as const
