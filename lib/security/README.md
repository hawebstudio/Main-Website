# lib/security

Security contains public marketing-site security helpers. It is not an auth library.

Responsibilities:

- Security headers and CSP construction
- Sanitization for query params, search input, contact fields, and URLs
- Validation for email, phone, URL, names, contact payloads, and search payloads
- Simple rate-limit interfaces, spam checks, honeypot support, cookies, CSRF helpers, and env validation

Does not belong here:

- Authentication, authorization, sessions, JWT, OAuth, or user roles beyond lightweight server-action checks
- Enterprise security modules
- UI components

Future Cloudflare, Upstash Redis, Vercel Edge Config, or Sentry integrations should replace adapters behind these utilities without changing application code.
