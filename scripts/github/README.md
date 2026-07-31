# GitHub Scripts

Purpose: report public GitHub links referenced by portfolio content.

Scripts:
- `generate-github-report.ts` writes `reports/github.md`.

Inputs: `publicLinks` from work and other content entries.

Outputs: `reports/github.md`.

Usage: `pnpm github:report`.

Dependencies: Node.js only.

Future expansion: live repository metadata can be synced later through a GitHub provider adapter.
