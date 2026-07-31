# lib/automation

Automation contains provider-agnostic helpers for website automation and build-time workflows.

Responsibilities:

- Feed generation contracts for RSS, Atom-compatible data, and JSON Feed
- Sitemap and robots configuration helpers
- llms.txt resource generation
- Newsletter, notification, email, cron, sync, and report request contracts
- Content publish workflow task descriptors

Does not belong here:

- AI agents or prompt orchestration
- Backend job runners
- Direct calls to Resend, GitHub, Payload, S3, Google, Bing, or other providers
- UI components

Future integrations should consume these inputs and task descriptors from an adapter layer.
