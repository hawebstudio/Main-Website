# Content

MDX-ready content directory. Each collection maps 1:1 to a content model in
`lib/content/types.ts` and is validated by the schemas in `lib/content/schemas.ts`.

```
content/
  services/       -> Service        (/services/[slug])
  work/           -> Project        (/work/[slug])
  case-studies/   -> CaseStudy      (/case-studies/[slug])
  technologies/   -> Technology     (/technologies/[slug])
  insights/       -> Insight        (/insights/[slug])
  problems/       -> Problem        (/problems/[slug])
```

## Conventions

- One `.mdx` file per entry: `content/insights/my-post.mdx`
- Filename = slug (kebab-case)
- Frontmatter must satisfy the matching Zod schema
- Set `draft: true` to exclude an entry from production
- Pages consume content ONLY through `lib/content/source.ts`
