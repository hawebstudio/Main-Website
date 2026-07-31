# Validation Scripts

Purpose: project-level checks for content, routes, links, images, dependencies, and environment configuration.

Scripts:
- `check-content.ts` runs frontmatter, slug, and duplicate checks.
- `check-links.ts` validates internal content links.
- `check-images.ts` validates image references.
- `check-routes.ts` compares static route expectations with App Router pages.
- `check-dependencies.ts` checks package script presence and likely unused dependencies.
- `check-env.ts` checks optional public analytics configuration.

Inputs: project source files and `.env`.

Outputs: console validation results suitable for CI.

Usage: `pnpm validate:*` or `pnpm validate`.

Dependencies: Node.js and the shared toolkit.

Future expansion: CI annotations, external link checking, and stricter dependency policies can be layered in later.
