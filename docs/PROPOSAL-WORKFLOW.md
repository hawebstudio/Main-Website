# Proposal Workflow Guide

## Overview

The proposal system manages the entire proposal lifecycle from creation to acceptance. It supports multiple sections, line items, and terms, with version tracking and export capabilities.

## Proposal Lifecycle

### Proposal Status

1. **Draft** - Proposal being created
2. **Sent** - Proposal sent to client
3. **Reviewed** - Client has reviewed
4. **Accepted** - Client accepted proposal
5. **Rejected** - Client rejected proposal
6. **Expired** - Proposal expired

### Status Transitions

```
Draft → Sent → Reviewed → Accepted
              ↓
            Rejected
              ↓
            Expired
```

## Proposal Creation

### Create a Proposal

```typescript
import { createProposal } from '@/lib/proposals'

const proposal = await createProposal({
  leadId: 'lead-id',
  clientId: 'client-id',
  title: 'Website Development Proposal',
  status: 'draft',
  validUntil: '2024-02-15',
  subtotal: 10000,
  tax: 800,
  total: 10800,
  currency: 'USD',
})
```

## Proposal Structure

### Sections

Organize proposal into logical sections:

```typescript
import { createSection } from '@/lib/proposals'

const section = await createSection({
  proposalId: 'proposal-id',
  title: 'Design Phase',
  description: 'UI/UX design and branding',
  order: 1,
})
```

### Line Items

Add detailed line items to sections:

```typescript
import { createLineItem } from '@/lib/proposals'

const lineItem = await createLineItem({
  proposalId: 'proposal-id',
  sectionId: 'section-id',
  description: 'Homepage Design',
  quantity: 1,
  unitPrice: 2500,
  total: 2500,
  order: 1,
})
```

### Terms

Add terms and conditions:

```typescript
import { createTerm } from '@/lib/proposals'

const term = await createTerm({
  proposalId: 'proposal-id',
  title: 'Payment Terms',
  content: '50% upfront, 50% on completion',
  order: 1,
})
```

## Proposal Templates

### Standard Web Development Template

**Sections:**
1. Discovery & Planning
2. Design Phase
3. Development Phase
4. Testing & QA
5. Deployment & Launch

**Line Items:**
- Discovery meetings
- Wireframes & prototypes
- UI/UX design
- Frontend development
- Backend development
- Testing
- Deployment

**Terms:**
- Payment schedule
- Timeline
- Scope
- Revisions
- Support

## Proposal Workflow

### Step 1: Create from Lead

When a lead reaches "proposal" status:

```typescript
import { createProposal } from '@/lib/proposals'
import { getLeadById } from '@/lib/crm'

const lead = await getLeadById('lead-id')
const proposal = await createProposal({
  leadId: lead.id,
  clientId: lead.company,
  title: `Proposal for ${lead.company || lead.name}`,
  status: 'draft',
  subtotal: lead.value || 0,
  tax: 0,
  total: lead.value || 0,
  currency: 'USD',
})
```

### Step 2: Add Sections and Line Items

```typescript
// Add sections
await createSection({ proposalId: proposal.id, title: 'Design', order: 1 })
await createSection({ proposalId: proposal.id, title: 'Development', order: 2 })

// Add line items
await createLineItem({
  proposalId: proposal.id,
  sectionId: 'section-1-id',
  description: 'UI Design',
  quantity: 1,
  unitPrice: 5000,
  total: 5000,
  order: 1,
})
```

### Step 3: Add Terms

```typescript
await createTerm({
  proposalId: proposal.id,
  title: 'Payment Terms',
  content: '50% upfront, 50% on completion',
  order: 1,
})
```

### Step 4: Review and Send

```typescript
import { updateProposal } from '@/lib/proposals'

await updateProposal(proposal.id, {
  status: 'sent',
  sentAt: new Date().toISOString(),
})
```

### Step 5: Track Response

Monitor proposal status:

```typescript
const updated = await updateProposal(proposal.id, {
  status: 'reviewed',
})
```

### Step 6: Acceptance

When client accepts:

```typescript
await updateProposal(proposal.id, {
  status: 'accepted',
  acceptedAt: new Date().toISOString(),
})

// Trigger project creation
import { createProject } from '@/lib/projects'
await createProject({
  name: proposal.title,
  clientId: proposal.clientId,
  status: 'planning',
  priority: 'medium',
  estimatedBudget: proposal.total,
  assignedTo: [],
})
```

## Proposal Management

### Get Proposal by ID

```typescript
import { getProposalById } from '@/lib/proposals'

const proposal = await getProposalById('proposal-id')
```

### Get Proposals by Lead

```typescript
import { getProposalsByLead } from '@/lib/proposals'

const proposals = await getProposalsByLead('lead-id')
```

### Get Proposals by Client

```typescript
import { getProposalsByClient } from '@/lib/proposals'

const proposals = await getProposalsByClient('client-id')
```

### Update Proposal

```typescript
import { updateProposal } from '@/lib/proposals'

const updated = await updateProposal('proposal-id', {
  status: 'sent',
  subtotal: 12000,
  tax: 960,
  total: 12960,
})
```

## Version Control

### Create New Version

When making significant changes:

```typescript
import { updateProposal } from '@/lib/proposals'

const current = await getProposalById('proposal-id')
const newVersion = await createProposal({
  ...current,
  id: undefined,
  version: current.version + 1,
  status: 'draft',
  createdAt: undefined,
  updatedAt: undefined,
})
```

## Export

### Export to PDF

Generate PDF from proposal data:

```typescript
// In production, use a PDF generation library
import { jsPDF } from 'jspdf'

const doc = new jsPDF()
// Add proposal content
doc.save(`proposal-${proposal.id}.pdf`)
```

### Export to Word

Generate Word document:

```typescript
// In production, use a Word generation library
import { Document, Packer, Paragraph } from 'docx'

const doc = new Document({
  sections: [{
    properties: {},
    children: [
      new Paragraph({ text: proposal.title }),
      // Add more content
    ],
  }],
})
```

## Proposal Metrics

### Get Proposal Metrics

```typescript
import { getProposalMetrics } from '@/lib/proposals'

const metrics = await getProposalMetrics()
// Returns: { total, sent, accepted, acceptanceRate, totalValue }
```

### Acceptance Rate by Period

```typescript
const proposals = await getAllProposals()
const sentThisMonth = proposals.filter(p => 
  p.status === 'sent' && new Date(p.sentAt).getMonth() === new Date().getMonth()
)
const acceptedThisMonth = proposals.filter(p => 
  p.status === 'accepted' && new Date(p.acceptedAt).getMonth() === new Date().getMonth()
)
const acceptanceRate = (acceptedThisMonth.length / sentThisMonth.length) * 100
```

### Average Proposal Value

```typescript
const proposals = await getAllProposals()
const totalValue = proposals.reduce((sum, p) => sum + p.total, 0)
const averageValue = totalValue / proposals.length
```

## Best Practices

### Proposal Writing

1. **Clear scope definition**
   - Detailed deliverables
   - Exclusions listed
   - Timeline specified

2. **Pricing transparency**
   - Break down costs
   - Explain value
   - Payment terms clear

3. **Professional presentation**
   - Consistent formatting
   - Error-free content
   - Branded design

### Follow-up

1. **Send confirmation**
   - Email proposal
   - Request review
   - Set follow-up date

2. **Track engagement**
   - Monitor opens
   - Track views
   - Note questions

3. **Address concerns**
   - Respond quickly
   - Clarify scope
   - Negotiate terms

### Version Control

1. **Version for changes**
   - Increment version number
   - Note changes
   - Keep history

2. **Communicate updates**
   - Notify client
   - Explain changes
   - Get approval

## Integration with Other Systems

### CRM

Create proposal from lead:

```typescript
import { createProposal } from '@/lib/proposals'
import { getLeadById } from '@/lib/crm'

const lead = await getLeadById('lead-id')
const proposal = await createProposal({
  leadId: lead.id,
  clientId: lead.company,
  title: `Proposal for ${lead.company || lead.name}`,
  status: 'draft',
  subtotal: lead.value || 0,
  tax: 0,
  total: lead.value || 0,
  currency: 'USD',
})
```

### Projects

Create project from accepted proposal:

```typescript
import { createProject } from '@/lib/projects'

const project = await createProject({
  name: proposal.title,
  clientId: proposal.clientId,
  status: 'planning',
  priority: 'medium',
  estimatedBudget: proposal.total,
  assignedTo: [],
})
```

### Invoicing

Create invoice from proposal:

```typescript
import { createInvoice } from '@/lib/invoicing'

const invoice = await createInvoice({
  proposalId: proposal.id,
  clientId: proposal.clientId,
  invoiceNumber: `INV-${Date.now()}`,
  status: 'sent',
  subtotal: proposal.subtotal,
  tax: proposal.tax,
  total: proposal.total,
  currency: proposal.currency,
})
```

## Proposal API

### Proposals API

**Create Proposal:** `POST /api/proposals`
**Get Proposal:** `GET /api/proposals/:id`
**Get All Proposals:** `GET /api/proposals`
**Update Proposal:** `PATCH /api/proposals/:id`
**Delete Proposal:** `DELETE /api/proposals/:id`

### Sections API

**Create Section:** `POST /api/proposals/:id/sections`
**Get Sections:** `GET /api/proposals/:id/sections`
**Update Section:** `PATCH /api/sections/:id`

### Line Items API

**Create Line Item:** `POST /api/proposals/:id/line-items`
**Get Line Items:** `GET /api/proposals/:id/line-items`
**Update Line Item:** `PATCH /api/line-items/:id`

### Terms API

**Create Term:** `POST /api/proposals/:id/terms`
**Get Terms:** `GET /api/proposals/:id/terms`
**Update Term:** `PATCH /api/terms/:id`

## Troubleshooting

### Proposal Not Creating

- Check required fields
- Verify lead/client ID exists
- Check user permissions

### Line Items Not Adding

- Verify proposal ID is valid
- Check section ID exists
- Ensure calculations are correct

### Version Issues

- Always increment version number
- Keep track of changes
- Communicate with client
