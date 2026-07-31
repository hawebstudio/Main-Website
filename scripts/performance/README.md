# Performance Scripts

Purpose: summarize build artifacts and verify Core Web Vitals tracking for a static Next.js site.

Scripts:
- `bundle-analysis.ts` reports compiled JS and CSS asset sizes after `pnpm build`.
- `core-web-vitals.ts` validates metric tracking source coverage.
- `performance-report.ts` writes a high-level performance status report.

Inputs: `.next/static` after build and `lib/analytics/web-vitals.ts`.

Outputs: `reports/bundle-analysis.md` and `reports/performance.md`.

Usage: `pnpm performance:bundle`, `pnpm performance:vitals`, and `pnpm report:performance`.

Dependencies: Node.js only.

Future expansion: Lighthouse can be added when a CI/browser runtime is available.
