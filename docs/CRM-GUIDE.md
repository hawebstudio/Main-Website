# CRM Usage Guide

## Overview

The CRM (Customer Relationship Management) system manages leads, contacts, companies, activities, and tasks. It provides a complete pipeline for tracking leads from initial contact to conversion.

## Lead Pipeline

### Pipeline Stages

1. **New** - Initial lead captured
2. **Qualified** - Lead qualified as potential customer
3. **Discovery** - Requirements gathering phase
4. **Proposal** - Proposal sent to lead
5. **Negotiation** - Contract negotiation
6. **Won** - Lead converted to customer
7. **Lost** - Lead not converted

### Lead Status Transitions

```
New → Qualified → Discovery → Proposal → Negotiation → Won
                                      ↓
                                    Lost
```

## Lead Management

### Create a Lead

```typescript
import { createLead } from '@/lib/crm'

const lead = await createLead({
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1 555-123-4567',
  company: 'Acme Corp',
  status: 'new',
  source: 'website',
  value: 10000,
  notes: 'Interested in web development',
  assignedTo: 'user-id',
})
```

### Update Lead Status

```typescript
import { updateLead } from '@/lib/crm'

const updated = await updateLead('lead-id', {
  status: 'qualified',
  lastContactAt: new Date().toISOString(),
})
```

### Get Leads by Status

```typescript
import { getLeadsByStatus } from '@/lib/crm'

const qualifiedLeads = await getLeadsByStatus('qualified')
```

### Pipeline Metrics

```typescript
import { getPipelineMetrics } from '@/lib/crm'

const metrics = await getPipelineMetrics()
// Returns: { total, byStatus, totalValue }
```

## Contact Management

### Create a Contact

```typescript
import { createContact } from '@/lib/crm'

const contact = await createContact({
  name: 'Jane Smith',
  email: 'jane@example.com',
  phone: '+1 555-987-6543',
  company: 'Acme Corp',
  title: 'CTO',
  linkedin: 'https://linkedin.com/in/janesmith',
  notes: 'Key decision maker',
})
```

### Update Contact

```typescript
import { updateContact } from '@/lib/crm'

const updated = await updateContact('contact-id', {
  title: 'VP Engineering',
})
```

## Company Management

### Create a Company

```typescript
import { createCompany } from '@/lib/crm'

const company = await createCompany({
  name: 'Acme Corp',
  website: 'https://acme.com',
  industry: 'Technology',
  size: '50-100',
  address: '123 Main St, San Francisco, CA',
  contacts: ['contact-id-1', 'contact-id-2'],
})
```

### Get Company by ID

```typescript
import { getCompanyById } from '@/lib/crm'

const company = await getCompanyById('company-id')
```

## Activity Tracking

### Create an Activity

```typescript
import { createActivity } from '@/lib/crm'

const activity = await createActivity({
  type: 'call',
  leadId: 'lead-id',
  description: 'Discussed project requirements',
  createdBy: 'user-id',
})
```

### Get Activities by Lead

```typescript
import { getActivitiesByLead } from '@/lib/crm'

const activities = await getActivitiesByLead('lead-id')
```

### Activity Types

- **call** - Phone call
- **email** - Email correspondence
- **meeting** - In-person or virtual meeting
- **note** - General note
- **task** - Task completion

## Task Management

### Create a Task

```typescript
import { createTask } from '@/lib/crm'

const task = await createTask({
  title: 'Follow up with lead',
  description: 'Send proposal draft',
  leadId: 'lead-id',
  assignedTo: 'user-id',
  dueDate: '2024-01-15',
  priority: 'high',
  status: 'pending',
})
```

### Update Task

```typescript
import { updateTask } from '@/lib/crm'

const updated = await updateTask('task-id', {
  status: 'completed',
})

### Get Tasks by Assignee

```typescript
import { getTasksByAssignedTo } from '@/lib/crm'

const tasks = await getTasksByAssignedTo('user-id')
```

### Task Priorities

- **low** - Low priority
- **medium** - Medium priority
- **high** - High priority

### Task Status

- **pending** - Not started
- **in-progress** - Currently working
- **completed** - Finished

## Lead Sources

Track where leads come from:

- **website** - Website contact form
- **referral** - Customer referral
- **linkedin** - LinkedIn outreach
- **cold-outreach** - Cold email/call
- **partner** - Partner referral
- **other** - Other source

## Best Practices

### Lead Qualification

1. **New → Qualified**
   - Verify lead information
   - Confirm budget and timeline
   - Assess fit with services

2. **Qualified → Discovery**
   - Schedule discovery call
   - Gather requirements
   - Identify key stakeholders

3. **Discovery → Proposal**
   - Create proposal
   - Define scope and timeline
   - Provide pricing

4. **Proposal → Negotiation**
   - Address concerns
   - Negotiate terms
   - Prepare contract

5. **Negotiation → Won**
   - Sign contract
   - Onboard client
   - Create project

### Activity Logging

- Log all interactions with leads
- Include key points discussed
- Note next steps
- Assign follow-up tasks

### Task Management

- Create tasks for all follow-ups
- Set appropriate due dates
- Assign to responsible team member
- Mark as completed when done

## CRM API

### Leads API

**Create Lead:** `POST /api/crm/leads`
**Get Lead:** `GET /api/crm/leads/:id`
**Get All Leads:** `GET /api/crm/leads`
**Update Lead:** `PATCH /api/crm/leads/:id`
**Delete Lead:** `DELETE /api/crm/leads/:id`

### Contacts API

**Create Contact:** `POST /api/crm/contacts`
**Get Contact:** `GET /api/crm/contacts/:id`
**Get All Contacts:** `GET /api/crm/contacts`
**Update Contact:** `PATCH /api/crm/contacts/:id`

### Companies API

**Create Company:** `POST /api/crm/companies`
**Get Company:** `GET /api/crm/companies/:id`
**Get All Companies:** `GET /api/crm/companies`
**Update Company:** `PATCH /api/crm/companies/:id`

### Activities API

**Create Activity:** `POST /api/crm/activities`
**Get Activities by Lead:** `GET /api/crm/activities?leadId=:id`

### Tasks API

**Create Task:** `POST /api/crm/tasks`
**Get Task:** `GET /api/crm/tasks/:id`
**Get Tasks by Assignee:** `GET /api/crm/tasks?assignedTo=:id`
**Update Task:** `PATCH /api/crm/tasks/:id`

## Integration with Other Systems

### Proposals

When a lead reaches "proposal" status, automatically create a proposal:

```typescript
import { createProposal } from '@/lib/proposals'

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

When a lead is "won", automatically create a project:

```typescript
import { createProject } from '@/lib/projects'

const project = await createProject({
  name: `${lead.company} Project`,
  clientId: lead.company,
  status: 'planning',
  priority: 'medium',
  assignedTo: [],
  estimatedBudget: lead.value || 0,
})
```

## Reporting

### Pipeline Conversion Rate

Calculate conversion rate from new to won:

```typescript
const newLeads = await getLeadsByStatus('new')
const wonLeads = await getLeadsByStatus('won')
const conversionRate = (wonLeads.length / newLeads.length) * 100
```

### Average Deal Size

```typescript
const wonLeads = await getLeadsByStatus('won')
const totalValue = wonLeads.reduce((sum, lead) => sum + (lead.value || 0), 0)
const averageValue = totalValue / wonLeads.length
```

### Lead Source Distribution

```typescript
const allLeads = await getAllLeads()
const bySource = allLeads.reduce((acc, lead) => {
  acc[lead.source] = (acc[lead.source] || 0) + 1
  return acc
}, {} as Record<string, number>)
```

## Troubleshooting

### Lead Not Updating

- Check lead ID is correct
- Verify user has permission
- Check server logs for errors

### Activities Not Showing

- Ensure lead ID is correct
- Check activity creation succeeded
- Verify user has permission to view

### Tasks Not Assigning

- Check user ID is valid
- Verify user exists
- Check task creation succeeded
