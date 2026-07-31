# lib/seo

SEO centralizes metadata, canonical URLs, OpenGraph, Twitter cards, robots directives, sitemap helpers, JSON-LD schema, keywords, titles, descriptions, images, URL helpers, and validation.

Pages should call `createMetadata` and JSON-LD helpers from this library rather than constructing metadata inline.

Design decisions:

- `metadata.ts` and `json-ld.ts` remain compatibility entry points for existing App Router pages.
- New focused modules provide smaller exports for future Payload CMS, AI search, AEO, and dynamic metadata.
- No React components live here.

Future providers should map content data into `PageMetadataInput` and schema helpers without changing page components.
