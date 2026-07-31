# Permission Model

## Overview

HA Web Studio uses a role-based access control (RBAC) system to manage permissions across all business systems. This ensures that users have appropriate access to data and features based on their role.

## User Roles

### Admin

**Description:** Full system access with ability to manage users and settings.

**Permissions:**
- Full access to all modules
- Can create, read, update, delete all data
- Can manage users and permissions
- Can modify system settings
- Access to all reports and analytics

**Use Cases:**
- Business owners
- System administrators
- Operations managers

### Team Member

**Description:** Access to operational systems for daily work.

**Permissions:**
- Create, read, update leads
- Read, update clients
- Create, read, update projects
- Create, read, update proposals
- Read invoices
- Create, read files
- Create, read communications
- Read analytics

**Cannot:**
- Manage users
- Modify system settings
- Delete critical data
- Access financial reports

**Use Cases:**
- Project managers
- Developers
- Designers
- Sales team

### Client

**Description:** Limited access to own data only.

**Permissions:**
- Read own projects
- Read own files
- Read own invoices
- Create, read own communications
- Update own approvals

**Cannot:**
- Access other clients' data
- Modify project details
- Create proposals
- Access internal systems

**Use Cases:**
- Client contacts
- Client stakeholders

## Permission Matrix

| Resource | Action | Admin | Team | Client |
|----------|--------|-------|------|--------|
| **Users** | | | | |
| | Create | ✅ | ❌ | ❌ |
| | Read | ✅ | ❌ | ❌ |
| | Update | ✅ | ❌ | ❌ |
| | Delete | ✅ | ❌ | ❌ |
| **Leads** | | | | |
| | Create | ✅ | ✅ | ❌ |
| | Read | ✅ | ✅ | ❌ |
| | Update | ✅ | ✅ | ❌ |
| | Delete | ✅ | ❌ | ❌ |
| **Clients** | | | | |
| | Create | ✅ | ❌ | ❌ |
| | Read | ✅ | ✅ | Own |
| | Update | ✅ | ✅ | ❌ |
| | Delete | ✅ | ❌ | ❌ |
| **Projects** | | | | |
| | Create | ✅ | ✅ | ❌ |
| | Read | ✅ | ✅ | Own |
| | Update | ✅ | ✅ | ❌ |
| | Delete | ✅ | ❌ | ❌ |
| **Proposals** | | | | |
| | Create | ✅ | ✅ | ❌ |
| | Read | ✅ | ✅ | ❌ |
| | Update | ✅ | ✅ | ❌ |
| | Delete | ✅ | ❌ | ❌ |
| **Invoices** | | | | |
| | Create | ✅ | ❌ | ❌ |
| | Read | ✅ | ✅ | Own |
| | Update | ✅ | ❌ | ❌ |
| | Delete | ✅ | ❌ | ❌ |
| **Files** | | | | |
| | Create | ✅ | ✅ | ❌ |
| | Read | ✅ | ✅ | Own |
| | Update | ✅ | ✅ | ❌ |
| | Delete | ✅ | ❌ | ❌ |
| **Communications** | | | | |
| | Create | ✅ | ✅ | Own |
| | Read | ✅ | ✅ | Own |
| | Update | ✅ | ✅ | Own |
| | Delete | ✅ | ❌ | ❌ |
| **Analytics** | | | | |
| | Read | ✅ | ✅ | ❌ |
| **Settings** | | | | |
| | Read | ✅ | ❌ | ❌ |
| | Update | ✅ | ✅ | ❌ |

## Permission Implementation

### Permission Check Function

```typescript
import { hasPermission } from '@/lib/auth'

// Check if user can perform action
const canCreateLeads = hasPermission(user, 'leads', 'create')
const canReadProjects = hasPermission(user, 'projects', 'read')
const canDeleteInvoices = hasPermission(user, 'invoices', 'delete')
```

### Resource Access Check

```typescript
import { canAccessResource } from '@/lib/auth'

// Check if user can access specific resource
const canAccessProject = canAccessResource(user, 'projects', 'project-123')
const canAccessInvoice = canAccessResource(user, 'invoices', 'invoice-456')
```

## Data Isolation

### Client Isolation

Clients can only access their own data:

```typescript
function filterClientData(data: any[], user: User) {
  if (user.role === 'client' && user.clientId) {
    return data.filter(item => item.clientId === user.clientId)
  }
  return data
}
```

### Team Member Filtering

Team members see data assigned to them:

```typescript
function filterTeamData(data: any[], user: User) {
  if (user.role === 'team') {
    return data.filter(item => 
      item.assignedTo === user.id || 
      item.assignedTo?.includes(user.id)
    )
  }
  return data
}
```

### Admin Full Access

Admins see all data:

```typescript
function filterAdminData(data: any[], user: User) {
  if (user.role === 'admin') {
    return data
  }
  return []
}
```

## Permission Configuration

### Role Permissions Definition

```typescript
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: [
    { resource: '*', action: 'manage' },
    { resource: 'users', action: 'manage' },
    { resource: 'leads', action: 'manage' },
    { resource: 'clients', action: 'manage' },
    { resource: 'projects', action: 'manage' },
    { resource: 'proposals', action: 'manage' },
    { resource: 'invoices', action: 'manage' },
    { resource: 'files', action: 'manage' },
    { resource: 'communications', action: 'manage' },
    { resource: 'analytics', action: 'read' },
    { resource: 'settings', action: 'manage' },
  ],
  team: [
    { resource: 'leads', action: 'create' },
    { resource: 'leads', action: 'read' },
    { resource: 'leads', action: 'update' },
    { resource: 'clients', action: 'read' },
    { resource: 'clients', action: 'update' },
    { resource: 'projects', action: 'create' },
    { resource: 'projects', action: 'read' },
    { resource: 'projects', action: 'update' },
    { resource: 'proposals', action: 'create' },
    { resource: 'proposals', action: 'read' },
    { resource: 'proposals', action: 'update' },
    { resource: 'invoices', action: 'read' },
    { resource: 'files', action: 'create' },
    { resource: 'files', action: 'read' },
    { resource: 'communications', action: 'create' },
    { resource: 'communications', action: 'read' },
    { resource: 'analytics', action: 'read' },
  ],
  client: [
    { resource: 'own-projects', action: 'read' },
    { resource: 'own-files', action: 'read' },
    { resource: 'own-invoices', action: 'read' },
    { resource: 'own-communications', action: 'create' },
    { resource: 'own-communications', action: 'read' },
    { resource: 'own-approvals', action: 'update' },
  ],
}
```

## Custom Permissions

### Adding Custom Roles

To add a custom role (e.g., "Sales Manager"):

```typescript
type UserRole = 'admin' | 'team' | 'client' | 'sales-manager'

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  // ... existing roles
  'sales-manager': [
    { resource: 'leads', action: 'manage' },
    { resource: 'clients', action: 'read' },
    { resource: 'proposals', action: 'manage' },
    { resource: 'analytics', action: 'read' },
  ],
}
```

### Adding Custom Permissions

To add a custom permission:

```typescript
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: [
    // ... existing permissions
    { resource: 'reports', action: 'export' },
  ],
  team: [
    // ... existing permissions
    { resource: 'reports', action: 'read' },
  ],
}
```

## Permission Testing

### Test Permission Check

```typescript
import { hasPermission } from '@/lib/auth'

describe('hasPermission', () => {
  it('should allow admin to manage leads', () => {
    const admin = { role: 'admin' } as User
    expect(hasPermission(admin, 'leads', 'manage')).toBe(true)
  })

  it('should not allow team to delete leads', () => {
    const team = { role: 'team' } as User
    expect(hasPermission(team, 'leads', 'delete')).toBe(false)
  })

  it('should allow client to read own communications', () => {
    const client = { role: 'client' } as User
    expect(hasPermission(client, 'own-communications', 'read')).toBe(true)
  })
})
```

### Test Resource Access

```typescript
import { canAccessResource } from '@/lib/auth'

describe('canAccessResource', () => {
  it('should allow admin to access any resource', () => {
    const admin = { role: 'admin' } as User
    expect(canAccessResource(admin, 'projects', 'any-id')).toBe(true)
  })

  it('should allow client to access own resource', () => {
    const client = { role: 'client', clientId: 'client-123' } as User
    expect(canAccessResource(client, 'projects', 'client-123')).toBe(true)
  })

  it('should not allow client to access other resource', () => {
    const client = { role: 'client', clientId: 'client-123' } as User
    expect(canAccessResource(client, 'projects', 'client-456')).toBe(false)
  })
})
```

## Security Best Practices

### Principle of Least Privilege

- Grant minimum required permissions
- Review permissions regularly
- Remove unnecessary access
- Audit permission changes

### Permission Auditing

```typescript
// Log permission checks
function logPermissionCheck(user: User, resource: string, action: string, result: boolean) {
  console.log(`Permission check: ${user.email} -> ${action} ${resource} = ${result}`)
  // In production, send to audit log
}
```

### Session Management

- Implement session timeouts
- Use secure cookies
- Implement refresh tokens
- Log suspicious activity

### Data Encryption

- Encrypt sensitive data at rest
- Use HTTPS for all communications
- Implement secure headers
- Regular security audits

## Troubleshooting

### Permission Denied

- Check user role
- Verify permission configuration
- Check resource ownership
- Review middleware settings

### Data Not Showing

- Verify user has read permission
- Check data filtering logic
- Ensure resource ownership
- Review access control

### Unauthorized Access

- Check route protection
- Verify middleware configuration
- Review permission checks
- Check session validity
