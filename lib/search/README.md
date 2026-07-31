# lib/search

Search centralizes the website search contract. Components should use this library instead of importing a search provider directly.

Version 1 is client-side and FlexSearch-ready. The provider dynamically uses FlexSearch when the dependency is available and falls back to the same weighted local query helpers in this checkout because installing `flexsearch` was blocked by an external pnpm virtual-store path.

Responsibilities:

- Normalize searchable documents for services, work, case studies, problems, insights, and technologies
- Build and cache search documents
- Query, filter, rank, highlight, suggest, serialize, and deserialize search data
- Keep the UI isolated from FlexSearch or any future provider

Future providers such as Algolia, Meilisearch, Typesense, and Payload Search should implement the `SearchProvider` contract.
