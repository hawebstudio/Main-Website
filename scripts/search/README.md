# Search Scripts

Purpose: build static search documents for the current FlexSearch-ready frontend.

Scripts:
- `generate-documents.ts` writes normalized searchable documents.
- `generate-keywords.ts` writes keyword-to-URL mappings.
- `generate-search-index.ts` writes `public/search/search-index.json`.
- `validate-search.ts` checks index shape.

Inputs: static content collections and TypeScript content data.

Outputs: `public/search/documents.json`, `public/search/keywords.json`, `public/search/search-index.json`.

Usage: `pnpm search:build` and `pnpm search:validate`.

Dependencies: Node.js and the shared script toolkit.

Future expansion: Algolia, Typesense, Payload Search, and Meilisearch exporters should consume the same normalized documents.
