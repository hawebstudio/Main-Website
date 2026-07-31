# Support Workflow Guide

## Overview

The communication system manages all client and internal communications including messages, threads, announcements, and activity logs. It provides a centralized hub for all business communications.

## Communication Types

### Message Types

- **message** - Direct message
- **announcement** - System announcement
- **email-log** - Email correspondence log
- **meeting-note** - Meeting notes

### Message Status

- **draft** - Message being composed
- **sent** - Message sent
- **read** - Message read by recipient
- **archived** - Message archived

## Message Management

### Create a Message

```typescript
import { createMessage } from '@/lib/communications'

const message = await createMessage({
  type: 'message',
  status: 'sent',
  subject: 'Project Update',
  content: 'Here is the latest update on your project...',
  from: 'user-id',
  to: ['client-user-id'],
  projectId: 'project-id',
  clientId: 'client-id',
})
```

### Get Messages by Project

```typescript
import { getMessagesByProject } from '@/lib/communications'

const messages = await getMessagesByProject('project-id')
```

### Get Messages by Client

```typescript
import { getMessagesByClient } from '@/lib/communications'

const messages = await getMessagesByClient('client-id')
```

### Update Message

```typescript
import { updateMessage } from '@/lib/communications'

const updated = await updateMessage('message-id', {
  status: 'read',
  readAt: new Date().toISOString(),
})
```

## Thread Management

### Create a Thread

```typescript
import { createThread } from '@/lib/communications'

const thread = await createThread({
  subject: 'Project Discussion',
  participants: ['user-id-1', 'user-id-2', 'client-user-id'],
  projectId: 'project-id',
  clientId: 'client-id',
  messages: [],
})
```

### Get Thread by ID

```typescript
import { getThreadById } from '@/lib/communications'

const thread = await getThreadById('thread-id')
```

### Get Threads by Project

```typescript
import { getThreadsByProject } from '@/lib/communications'

const threads = await getThreadsByProject('project-id')
```

### Add Message to Thread

```typescript
import { addMessageToThread } from '@/lib/communications'

const updated = await addMessageToThread('thread-id', 'message-id')
```

## Announcements

### Create an Announcement

```typescript
import { createAnnouncement } from '@/lib/communications'

const announcement = await createAnnouncement({
  title: 'System Maintenance',
  content: 'The system will be down for maintenance on Sunday...',
  priority: 'high',
  targetAudience: 'all',
  createdBy: 'admin-user-id',
  expiresAt: '2024-01-20T00:00:00Z',
})
```

### Get Active Announcements

```typescript
import { getActiveAnnouncements } from '@/lib/communications'

const announcements = await getActiveAnnouncements()
```

### Get Announcements by Audience

```typescript
import { getAnnouncementsByAudience } from '@/lib/communications'

const announcements = await getAnnouncementsByAudience('team')
```

### Target Audience

- **all** - All users
- **admin** - Admin users only
- **team** - Team members only
- **clients** - Client users only

## Support Workflow

### Step 1: Receive Support Request

```typescript
import { createMessage } from '@/lib/communications'

const message = await createMessage({
  type: 'message',
  status: 'sent',
  subject: 'Support Request',
  content: 'I need help with...',
  from: 'client-user-id',
  to: ['support-team-id'],
  clientId: 'client-id',
})
```

### Step 2: Create Support Thread

```typescript
import { createThread } from '@/lib/communications'

const thread = await createThread({
  subject: 'Support Request - Issue Description',
  participants: ['client-user-id', 'support-team-id'],
  clientId: 'client-id',
  messages: [message.id],
})
```

### Step 3: Assign to Team Member

```typescript
import { createTask } from '@/lib/crm'

const task = await createTask({
  title: 'Resolve support request',
  description: 'Help client with their issue',
  assignedTo: 'support-team-id',
  priority: 'high',
  status: 'in-progress',
})
```

### Step 4: Communicate with Client

```typescript
await createMessage({
  type: 'message',
  status: 'sent',
  subject: 'Update on your support request',
  content: 'We are working on your issue...',
  from: 'support-team-id',
  to: ['client-user-id'],
  threadId: thread.id,
})
```

### Step 5: Resolve Issue

```typescript
await updateTask(task.id, {
  status: 'completed',
})

await createMessage({
  type: 'message',
  status: 'sent',
  subject: 'Issue Resolved',
  content: 'Your issue has been resolved...',
  from: 'support-team-id',
  to: ['client-user-id'],
  threadId: thread.id,
})
```

## Email Integration

### Log Email

```typescript
import { createMessage } from '@/lib/communications'

const message = await createMessage({
  type: 'email-log',
  status: 'sent',
  subject: 'Email Subject',
  content: 'Email content...',
  from: 'sender@example.com',
  to: ['recipient@example.com'],
  projectId: 'project-id',
})
```

### Send Email

```typescript
// In production, integrate with email service
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

await transporter.sendMail({
  from: process.env.SMTP_FROM,
  to: 'recipient@example.com',
  subject: 'Subject',
  text: 'Content',
})

// Log the email
await createMessage({
  type: 'email-log',
  status: 'sent',
  subject: 'Subject',
  content: 'Content',
  from: process.env.SMTP_FROM,
  to: ['recipient@example.com'],
})
```

## Meeting Notes

### Create Meeting Note

```typescript
import { createMessage } from '@/lib/communications'

const note = await createMessage({
  type: 'meeting-note',
  status: 'sent',
  subject: 'Project Kickoff Meeting',
  content: `
Attendees: John, Jane, Client
Date: 2024-01-15
Agenda:
1. Project overview
2. Timeline discussion
3. Next steps

Action Items:
- John: Create wireframes by Jan 20
- Jane: Set up development environment
- Client: Provide brand assets
  `,
  from: 'user-id',
  to: ['all'],
  projectId: 'project-id',
})
```

## Communication Best Practices

### Client Communication

1. **Be responsive**
   - Respond within 24 hours
   - Acknowledge receipt
   - Set expectations

2. **Be clear**
   - Use plain language
   - Avoid jargon
   - Provide context

3. **Be professional**
   - Maintain tone
   - Proofread messages
   - Use proper formatting

### Internal Communication

1. **Document decisions**
   - Record meeting notes
   - Log important emails
   - Track action items

2. **Keep threads organized**
   - Use descriptive subjects
   - Add relevant participants
   - Archive old threads

3. **Use announcements wisely**
   - Target appropriate audience
   - Set expiration dates
   - Keep content concise

### Support Workflow

1. **Acknowledge quickly**
   - Respond within 1 hour
   - Set expectations
   - Provide timeline

2. **Track progress**
   - Update regularly
   - Notify of delays
   - Confirm resolution

3. **Follow up**
   - Ensure satisfaction
   - Document solution
   - Learn from issues

## Integration with Other Systems

### Projects

Link messages to projects:

```typescript
import { createMessage } from '@/lib/communications'

const message = await createMessage({
  type: 'message',
  subject: 'Project Update',
  content: 'Update...',
  from: 'user-id',
  to: ['client-user-id'],
  projectId: 'project-id',
})
```

### CRM

Link messages to leads:

```typescript
const message = await createMessage({
  type: 'message',
  subject: 'Follow-up',
  content: 'Following up on our discussion...',
  from: 'user-id',
  to: ['lead-contact-id'],
  leadId: 'lead-id',
})
```

### Tasks

Create tasks from messages:

```typescript
import { createTask } from '@/lib/crm'

const task = await createTask({
  title: 'Action from message',
  description: message.content,
  assignedTo: 'user-id',
  priority: 'medium',
  status: 'pending',
})
```

## Communication API

### Messages API

**Create Message:** `POST /api/communications/messages`
**Get Message:** `GET /api/communications/messages/:id`
**Get Messages by Project:** `GET /api/communications/messages?projectId=:id`
**Get Messages by Client:** `GET /api/communications/messages?clientId=:id`
**Update Message:** `PATCH /api/communications/messages/:id`

### Threads API

**Create Thread:** `POST /api/communications/threads`
**Get Thread:** `GET /api/communications/threads/:id`
**Get Threads by Project:** `GET /api/communications/threads?projectId=:id`
**Add Message to Thread:** `POST /api/communications/threads/:id/messages`

### Announcements API

**Create Announcement:** `POST /api/communications/announcements`
**Get Announcement:** `GET /api/communications/announcements/:id`
**Get Active Announcements:** `GET /api/communications/announcements?active=true`

## Troubleshooting

### Message Not Sending

- Check recipient IDs
- Verify user exists
- Check permissions

### Thread Not Creating

- Verify participant IDs
- Check project/client ID
- Ensure message exists

### Announcement Not Showing

- Check target audience
- Verify expiration date
- Ensure user role matches
