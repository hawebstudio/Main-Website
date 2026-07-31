# Analytics Scripts

Purpose: verify that Version 1 analytics wiring is present and document event helpers.

Scripts:
- `verify-ga4.ts` checks GA4 environment and provider wiring.
- `verify-clarity.ts` checks Microsoft Clarity environment and provider wiring.
- `verify-events.ts` checks event source coverage.
- `generate-event-report.ts` writes `reports/analytics-events.md`.

Inputs: `.env`, `components/analytics/analytics-provider.tsx`, and `lib/analytics/events.ts`.

Outputs: console validation results and `reports/analytics-events.md`.

Usage: `pnpm analytics:verify` or individual `pnpm analytics:*` commands.

Dependencies: Node.js only.

Future expansion: Search Console and Bing verification can be added once those integrations are present.
