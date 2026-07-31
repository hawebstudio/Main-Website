export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal_sent' | 'won' | 'lost' | 'archived'
export type LeadPriority = 'low' | 'medium' | 'high'
export type LeadSource = 'website' | 'referral' | 'linkedin' | 'cold_outreach' | 'partner' | 'newsletter' | 'other'
export type CrmFormType = 'contact' | 'quote' | 'newsletter' | 'support' | 'partnership'

export interface Lead {
  id?: string
  name: string
  email: string
  phone?: string
  company?: string
  message?: string
  status: LeadStatus
  priority: LeadPriority
  source: LeadSource
  tags: string[]
  score?: number
  createdAt?: string
  updatedAt?: string
}

export interface IncomingFormSubmission {
  type: CrmFormType
  name?: string
  email: string
  phone?: string
  company?: string
  message?: string
  source?: LeadSource
  tags?: string[]
}

export interface QuoteRequest {
  name: string
  email: string
  company?: string
  budget?: string
  timeline?: string
  goals: string
}

export interface NewsletterSubscriber {
  email: string
  name?: string
  status: 'subscribed' | 'unsubscribed'
  source?: LeadSource
  tags: string[]
}

export interface CustomerContact {
  id?: string
  name: string
  email: string
  phone?: string
  company?: string
  title?: string
  notes?: string
}

export interface PipelineStage {
  status: LeadStatus
  label: string
  order: number
}
