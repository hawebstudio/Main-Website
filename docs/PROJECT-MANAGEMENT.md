# Project Management Guide

## Overview

The project management system tracks internal projects, milestones, tasks, deliverables, and time entries. It provides comprehensive tools for managing project lifecycles from planning to completion.

## Project Lifecycle

### Project Status

1. **Planning** - Project setup and planning
2. **In Progress** - Active development
3. **On Hold** - Temporarily paused
4. **Completed** - Project finished
5. **Cancelled** - Project cancelled

### Status Transitions

```
Planning → In Progress → Completed
           ↓
         On Hold
           ↓
         Cancelled
```

## Project Management

### Create a Project

```typescript
import { createProject } from '@/lib/projects'

const project = await createProject({
  name: 'Acme Corp Website Redesign',
  description: 'Complete website redesign for Acme Corp',
  clientId: 'client-id',
  status: 'planning',
  priority: 'high',
  startDate: '2024-01-15',
  endDate: '2024-03-15',
  estimatedBudget: 50000,
  assignedTo: ['user-id-1', 'user-id-2'],
})
```

### Update Project

```typescript
import { updateProject } from '@/lib/projects'

const updated = await updateProject('project-id', {
  status: 'in-progress',
  actualBudget: 52000,
})
```

### Get Projects by Client

```typescript
import { getProjectsByClient } from '@/lib/projects'

const projects = await getProjectsByClient('client-id')
```

### Get Projects by Assignee

```typescript
import { getProjectsByAssignedTo } from '@/lib/projects'

const projects = await getProjectsByAssignedTo('user-id')
```

## Milestone Management

### Create a Milestone

```typescript
import { createMilestone } from '@/lib/projects'

const milestone = await createMilestone({
  projectId: 'project-id',
  name: 'Design Phase Complete',
  description: 'All design assets delivered',
  dueDate: '2024-02-01',
  status: 'pending',
  order: 1,
})
```

### Get Milestones by Project

```typescript
import { getMilestonesByProject } from '@/lib/projects'

const milestones = await getMilestonesByProject('project-id')
```

### Update Milestone

```typescript
import { updateMilestone } from '@/lib/projects'

const updated = await updateMilestone('milestone-id', {
  status: 'completed',
})
```

## Task Management

### Create a Task

```typescript
import { createProjectTask } from '@/lib/projects'

const task = await createProjectTask({
  projectId: 'project-id',
  milestoneId: 'milestone-id',
  title: 'Design homepage',
  description: 'Create responsive homepage design',
  assignedTo: 'user-id',
  status: 'todo',
  priority: 'high',
  dueDate: '2024-01-20',
  estimatedHours: 8,
})
```

### Get Tasks by Project

```typescript
import { getTasksByProject } from '@/lib/projects'

const tasks = await getTasksByProject('project-id')
```

### Update Task

```typescript
import { updateProjectTask } from '@/lib/projects'

const updated = await updateProjectTask('task-id', {
  status: 'in-progress',
  actualHours: 4,
})
```

### Task Status

- **todo** - Not started
- **in-progress** - Currently working
- **review** - Under review
- **done** - Completed

### Task Priority

- **low** - Low priority
- **medium** - Medium priority
- **high** - High priority

## Deliverable Management

### Create a Deliverable

```typescript
import { createDeliverable } from '@/lib/projects'

const deliverable = await createDeliverable({
  projectId: 'project-id',
  name: 'Homepage Design',
  description: 'Figma design files for homepage',
  type: 'design',
  status: 'pending',
  dueDate: '2024-01-25',
  fileId: 'file-id',
})
```

### Get Deliverables by Project

```typescript
import { getDeliverablesByProject } from '@/lib/projects`

const deliverables = await getDeliverablesByProject('project-id')
```

### Update Deliverable

```typescript
import { updateDeliverable } from '@/lib/projects'

const updated = await updateDeliverable('deliverable-id', {
  status: 'delivered',
})
```

### Deliverable Types

- **design** - Design assets
- **code** - Code deliverables
- **document** - Documentation
- **other** - Other deliverables

### Deliverable Status

- **pending** - Not started
- **in-progress** - In progress
- **completed** - Completed
- **delivered** - Delivered to client

## Time Tracking

### Create Time Entry

```typescript
import { createTimeEntry } from '@/lib/projects'

const timeEntry = await createTimeEntry({
  projectId: 'project-id',
  taskId: 'task-id',
  userId: 'user-id',
  description: 'Worked on homepage design',
  hours: 4,
  date: '2024-01-18',
})
```

### Get Time Entries by Project

```typescript
import { getTimeEntriesByProject } from '@/lib/projects`

const entries = await getTimeEntriesByProject('project-id')
```

### Get Time Entries by User

```typescript
import { getTimeEntriesByUser } from '@/lib/projects'

const entries = await getTimeEntriesByUser('user-id')
```

## Project Views

### Kanban View

Organize tasks by status:

```
Todo | In Progress | Review | Done
-----|-------------|--------|-----
Task 1 | Task 3 | Task 5 | Task 7
List | Task 4 | Task 6 | Task 8
```

### List View

All tasks in a list with details:

```
Task Name | Assigned To | Status | Due Date | Priority
---------|-------------|--------|----------|----------
Task 1 | John | Todo | Jan 20 | High
Task 2 | Jane | In Progress | Jan 22 | Medium
```

### Timeline View

Visual timeline of milestones and tasks:

```
Jan 15  Jan 20  Jan 25  Feb 1
  |-------|-------|-------|
  Milestone 1   Milestone 2
```

## Project Metrics

### Get Project Metrics

```typescript
import { getProjectMetrics } from '@/lib/projects'

const metrics = await getProjectMetrics()
// Returns: { total, active, completed, totalBudget, actualBudget, averageProjectValue }
```

### Budget Variance

Calculate difference between estimated and actual budget:

```typescript
const variance = project.actualBudget - project.estimatedBudget
const variancePercent = (variance / project.estimatedBudget) * 100
```

### Task Completion Rate

```typescript
const tasks = await getTasksByProject('project-id')
const completed = tasks.filter(t => t.status === 'done').length
const completionRate = (completed / tasks.length) * 100
```

### Time Tracking Summary

```typescript
const entries = await getTimeEntriesByProject('project-id')
const totalHours = entries.reduce((sum, entry) => sum + entry.hours, 0)
const totalCost = totalHours * hourlyRate
```

## Best Practices

### Project Planning

1. **Define clear objectives**
   - Set project goals
   - Define success criteria
   - Identify stakeholders

2. **Create milestones**
   - Break project into phases
   - Set realistic deadlines
   - Define deliverables

3. **Assign tasks**
   - Assign to appropriate team members
   - Set priorities
   - Estimate time accurately

### Task Management

1. **Create detailed tasks**
   - Clear descriptions
   - Acceptance criteria
   - Dependencies

2. **Track progress**
   - Update status regularly
   - Log time spent
   - Note blockers

3. **Review and iterate**
   - Regular check-ins
   - Adjust estimates
   - Re-prioritize as needed

### Time Tracking

1. **Track all billable time**
   - Log time daily
   - Include descriptions
   - Link to tasks

2. **Review time reports**
   - Compare estimates to actual
   - Identify time sinks
   - Improve estimates

## Integration with Other Systems

### CRM

When a lead is won, create a project:

```typescript
import { createProject } from '@/lib/projects'

const project = await createProject({
  name: `${lead.company} Project`,
  clientId: lead.company,
  status: 'planning',
  priority: 'medium',
  estimatedBudget: lead.value || 0,
  assignedTo: [],
})
```

### Invoicing

When a project is completed, create an invoice:

```typescript
import { createInvoice } from '@/lib/invoicing'

const invoice = await createInvoice({
  projectId: project.id,
  clientId: project.clientId,
  invoiceNumber: `INV-${Date.now()}`,
  status: 'sent',
  subtotal: project.actualBudget || project.estimatedBudget || 0,
  tax: 0,
  total: project.actualBudget || project.estimatedBudget || 0,
  currency: 'USD',
})
```

### Files

Link deliverables to files:

```typescript
import { createDeliverable } from '@/lib/projects'

const deliverable = await createDeliverable({
  projectId: 'project-id',
  name: 'Design Files',
  type: 'design',
  fileId: 'file-id',
  status: 'delivered',
})
```

## Project API

### Projects API

**Create Project:** `POST /api/projects`
**Get Project:** `GET /api/projects/:id`
**Get All Projects:** `GET /api/projects`
**Update Project:** `PATCH /api/projects/:id`
**Delete Project:** `DELETE /api/projects/:id`

### Milestones API

**Create Milestone:** `POST /api/projects/:id/milestones`
**Get Milestones:** `GET /api/projects/:id/milestones`
**Update Milestone:** `PATCH /api/milestones/:id`

### Tasks API

**Create Task:** `POST /api/projects/:id/tasks`
**Get Tasks:** `GET /api/projects/:id/tasks`
**Update Task:** `PATCH /api/tasks/:id`

### Deliverables API

**Create Deliverable:** `POST /api/projects/:id/deliverables`
**Get Deliverables:** `GET /api/projects/:id/deliverables`
**Update Deliverable:** `PATCH /api/deliverables/:id`

### Time Entries API

**Create Time Entry:** `POST /api/projects/:id/time-entries`
**Get Time Entries:** `GET /api/projects/:id/time-entries`

## Troubleshooting

### Project Not Creating

- Check required fields
- Verify client ID exists
- Check user permissions

### Tasks Not Assigning

- Verify user ID is valid
- Check user exists
- Ensure user has project access

### Time Entries Not Saving

- Check project ID is valid
- Verify date format
- Ensure hours is a number
