# Content Scripts

Purpose: validate and maintain MDX content for services, work, case studies, problems, insights, and technologies.

Scripts:
- `create-content.ts` creates a draft MDX file for supported MDX collections.
- `validate-frontmatter.ts` checks titles, descriptions, slugs, authors, and thin content.
- `check-slugs.ts` validates slug format and duplicate slugs.
- `check-duplicates.ts` finds duplicate titles and descriptions.
- `sort-content.ts` writes a content ordering report.
- `generate-related-content.ts` writes related-content candidates.
- `reading-time.ts` writes reading time estimates.
- `toc.ts` writes table-of-contents coverage.

Inputs: `content/` MDX files, `content/services/index.ts`, and `content/work/index.ts`.

Outputs: reports under `reports/` and new MDX drafts when using `create-content.ts`.

Usage examples:
- `pnpm content:validate`
- `pnpm content:slugs`
- `pnpm content:reading-time`
- `pnpm content:create insights "New Article Title"`

Dependencies: Node.js and `gray-matter`.

Future expansion: Payload CMS imports, editorial workflow checks, feed generation, and AI-assisted content QA can consume the same normalized content model.
