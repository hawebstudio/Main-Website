import type { Lead, LeadPriority, LeadStatus } from '../types'

export function createLeadRecord(input: Omit<Lead, 'createdAt' | 'updatedAt'>): Lead {
  const now = new Date().toISOString()
  return {
    ...input,
    createdAt: now,
    updatedAt: now,
  }
}

export function updateLeadStatus(lead: Lead, status: LeadStatus): Lead {
  return {
    ...lead,
    status,
    updatedAt: new Date().toISOString(),
  }
}

export function updateLeadPriority(lead: Lead, priority: LeadPriority): Lead {
  return {
    ...lead,
    priority,
    updatedAt: new Date().toISOString(),
  }
}
