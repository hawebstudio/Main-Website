# Authentication & User Management

## Overview

HA Web Studio uses a secure authentication system with role-based access control (RBAC) to protect internal business systems. The system supports three user roles: Admin, Team Member, and Client.

## User Roles

### Admin
- Full access to all systems
- Can manage users, permissions, and settings
- Can view and modify all data
- Access to admin dashboard

### Team Member
- Access to operational systems (CRM, projects, proposals)
- Can create and manage leads, projects, proposals
- Can view client information
- Cannot manage users or system settings

### Client
- Access to client portal only
- Can view their own projects, files, invoices
- Can send messages
- Cannot access other clients' data

## Authentication API

### Login

**Endpoint:** `POST /api/auth/login`

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password",
  "remember": false
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "1",
    "email": "user@example.com",
    "name": "User Name",
    "role": "admin"
  },
  "redirect": "/admin"
}
```

### Logout

**Endpoint:** `POST /api/auth/logout`

**Response:**
```json
{
  "success": true
}
```

### Register

**Endpoint:** `POST /api/auth/register`

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful. Please check your email to verify your account.",
  "user": {
    "id": "2",
    "email": "john@example.com",
    "name": "John Doe",
    "role": "client"
  }
}
```

### Forgot Password

**Endpoint:** `POST /api/auth/forgot-password`

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "If an account exists with this email, a password reset link has been sent."
}
```

### Reset Password

**Endpoint:** `POST /api/auth/reset-password`

**Request:**
```json
{
  "token": "reset-token",
  "password": "newpassword123",
  "confirmPassword": "newpassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset successful. You can now log in with your new password."
}
```

## Permission System

### Permission Check

```typescript
import { hasPermission } from '@/lib/auth'

const canManage = hasPermission(user, 'leads', 'create')
```

### Resource Access Check

```typescript
import { canAccessResource } from '@/lib/auth'

const canAccess = canAccessResource(user, 'projects', 'project-123')
```

### Role Permissions

| Role | Leads | Clients | Projects | Proposals | Invoices | Files | Settings |
|------|-------|---------|----------|-----------|----------|-------|----------|
| Admin | Full | Full | Full | Full | Full | Full | Full |
| Team | Create/Read/Update | Read/Update | Create/Read/Update | Create/Read/Update | Read | Create/Read | - |
| Client | - | Own | Own | - | Own | Own | - |

## Session Management

### Session Cookies

- `auth-token`: Authentication token (httpOnly, secure in production)
- `user-role`: User role (httpOnly, secure in production)

### Session Duration

- Default: 24 hours
- Remember me: 30 days

## Security Best Practices

1. **Never commit credentials** - Use environment variables
2. **Use HTTPS in production** - All auth endpoints require HTTPS
3. **Implement rate limiting** - Prevent brute force attacks
4. **Use strong passwords** - Minimum 8 characters
5. **Enable email verification** - Verify user email addresses
6. **Regular security audits** - Review dependencies and code

## Middleware

### Public Routes

- `/` - Homepage
- `/about` - About page
- `/services` - Services
- `/work` - Portfolio
- `/contact` - Contact
- `/login` - Login
- `/register` - Register
- `/forgot-password` - Forgot password

### Admin Routes

- `/admin` - Admin dashboard
- `/admin/leads` - Leads management
- `/admin/clients` - Client management
- `/admin/projects` - Project management
- `/admin/proposals` - Proposal management
- `/admin/invoices` - Invoice management
- `/admin/files` - File management
- `/admin/communications` - Communication center
- `/admin/analytics` - Analytics
- `/admin/settings` - Settings
- `/admin/users` - User management

### Client Routes

- `/portal` - Client portal
- `/portal/dashboard` - Client dashboard
- `/portal/projects` - Client projects
- `/portal/documents` - Client documents
- `/portal/invoices` - Client invoices
- `/portal/messages` - Client messages

## User Management

### Create User

```typescript
import { createUser } from '@/lib/auth'

const user = await createUser({
  name: 'John Doe',
  email: 'john@example.com',
  role: 'team',
  emailVerified: true,
})
```

### Update User

```typescript
import { updateUser } from '@/lib/auth'

const updated = await updateUser('user-id', {
  name: 'John Smith',
  department: 'Development',
})
```

### Delete User

```typescript
import { deleteUser } from '@/lib/auth'

await deleteUser('user-id')
```

## Environment Variables

```bash
# Authentication
AUTH_SECRET=your-secret-key
AUTH_URL=http://localhost:3000

# Email (for verification and password reset)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASSWORD=your-password
SMTP_FROM=noreply@hawebstudio.com
```

## Troubleshooting

### Login Fails

- Check email and password are correct
- Verify user account exists
- Check if email is verified
- Check server logs for errors

### Session Expires

- User is logged out after session duration
- Implement refresh tokens for longer sessions
- Check cookie settings

### Permission Denied

- Verify user role
- Check permission configuration
- Ensure user is assigned correct role
- Check resource ownership (for clients)

## Future Enhancements

- OAuth integration (Google, GitHub, etc.)
- Two-factor authentication (2FA)
- Session refresh tokens
- Password strength requirements
- Account lockout after failed attempts
- Audit logging for security events
