# Scripts

Purpose: build-time automation for the static HA Web Studio Version 1 site.

Scope: asset generation, content validation, SEO outputs, search indexes, analytics checks, performance reports, GitHub link reports, and developer summaries.

Architecture:
- `shared/` contains reusable primitives.
- Category folders contain executable TypeScript entry points.
- Business logic stays in `lib/`; scripts consume public project data and generate build artifacts or reports.

Usage: run the grouped commands in `package.json`, for example `pnpm search:build`, `pnpm seo:check`, `pnpm validate`, and `pnpm report:summary`.

Dependencies: Node.js 24 native TypeScript execution and existing project dependencies.

Future expansion: provider-specific integrations should be added as adapters behind the shared content/document model.
