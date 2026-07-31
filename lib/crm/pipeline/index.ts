import type { Lead, LeadStatus } from '../types'
import { statusOrder } from '../status'

export function scoreLead(lead: Lead): number {
  let score = 0
  if (lead.company) score += 15
  if (lead.phone) score += 10
  if (lead.message && lead.message.length > 80) score += 20
  if (lead.priority === 'high') score += 25
  if (lead.tags.includes('quote')) score += 20
  return score
}

export function groupLeadsByStatus(leads: Lead[]): Record<LeadStatus, Lead[]> {
  return leads.reduce(
    (groups, lead) => {
      groups[lead.status].push(lead)
      return groups
    },
    {
      new: [],
      contacted: [],
      qualified: [],
      proposal_sent: [],
      won: [],
      lost: [],
      archived: [],
    } as Record<LeadStatus, Lead[]>,
  )
}

export function sortLeadsByPipeline(leads: Lead[]): Lead[] {
  return [...leads].sort((a, b) => statusOrder(a.status) - statusOrder(b.status))
}
