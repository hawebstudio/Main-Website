# lib/crm

CRM owns lightweight lead-management contracts and pure utilities.

Belongs here:

- Lead, quote, newsletter subscriber, and customer contact types
- Form submission normalization
- Lead status, priority, source, tags, and pipeline helpers
- Validation, sanitization, filtering, sorting, grouping, and scoring

Does not belong here:

- Invoice, proposal, or file storage logic
- Company contact details from `lib/business`
- Email sending from `lib/communications`
- UI components or database clients

Payload CMS, HubSpot, Salesforce, Zoho, Notion, and Airtable adapters can map into these contracts later without changing components.
