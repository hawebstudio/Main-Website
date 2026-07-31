# Report Scripts

Purpose: generate developer-facing Markdown reports from existing pipeline data.

Scripts:
- `project-report.ts` summarizes project configuration.
- `content-report.ts` summarizes content inventory.
- `seo-report.ts` runs SEO report generators.
- `performance-report.ts` runs performance report generators.
- `summary.ts` writes a pipeline summary.

Inputs: project files, content entries, generated assets, and build output.

Outputs: Markdown files under `reports/`.

Usage: `pnpm report:*` or `pnpm report:summary`.

Dependencies: Node.js and the shared toolkit.

Future expansion: JSON exports and dashboard ingestion can reuse the same report data.
