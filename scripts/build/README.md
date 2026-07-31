# Build Scripts

Purpose: prepare and verify generated assets before deployment.

Scripts:
- `prepare.ts`: checks required project folders and writes a build manifest.
- `verify.ts`: verifies required build-time assets and warns if optional generated search output is missing.
- `clean.ts`: removes generated script artifacts.
- `prebuild.ts` and `postbuild.ts`: CI-friendly aliases.

Inputs: project folders, `app/`, `public/`, and generated search assets.

Outputs: `.next-build-manifest.json` and console validation results.

Usage: `pnpm build:prepare`, `pnpm build:verify`, and `pnpm build:clean`.

Examples: run `pnpm build:prepare` before deployment checks.

Dependencies: Node.js and the shared toolkit.

Future expansion: CI-specific build gates, deployment manifests, and Vercel build summaries can plug in here.
