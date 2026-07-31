# lib/communications

Communications owns the contracts and helpers for messages between the website and people.

Belongs here:

- Email payload creation, email validation, and provider contracts
- Newsletter subscribe/unsubscribe payload normalization
- Contact request formatting and autoresponder-ready payloads
- Provider-independent notifications
- Template and formatting helpers

Does not belong here:

- CRM lead lifecycle logic
- Storage or file uploads
- Analytics tracking
- React components or authentication

Future Resend, Nodemailer, Buttondown, Beehiiv, ConvertKit, and admin alert integrations should plug into the provider contracts without changing UI code.
