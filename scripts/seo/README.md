# SEO Scripts

Purpose: generate and validate search-facing static assets for the Version 1 Next.js site.

Scripts:
- `generate-llms.ts` writes `public/llms.txt` and `public/llms-full.txt`.
- `generate-meta-report.ts` writes `reports/seo-meta.md`.
- `generate-schema-report.ts` writes `reports/schema.md`.
- `generate-breadcrumbs.ts` writes `public/generated/breadcrumbs.json` and `reports/breadcrumbs.md`.
- `check-seo.ts` validates metadata, canonical values, duplicates, and required SEO files.

`sitemap.xml` and `robots.txt` are served by the dynamic `app/sitemap.ts` and
`app/robots.ts` routes (real content, always in sync) — there's no static
generator script for either, and there shouldn't be one, since a static
`public/sitemap.xml` or `public/robots.txt` file conflicts with those routes
at build time.

Inputs: `content/`, `content/services/index.ts`, `content/work/index.ts`, `app/sitemap.ts`, `app/robots.ts`.

Outputs: `public/llms*.txt`, `public/generated/`, `reports/`.

Usage: run through package scripts such as `pnpm seo:llms` and `pnpm seo:check`.

Dependencies: Node.js, TypeScript type stripping, `gray-matter`.

Future expansion: CMS-backed content providers, dynamic sitemap partitioning, RSS/Atom generation, and AI retrieval reports can be added behind the shared toolkit without changing script contracts.
