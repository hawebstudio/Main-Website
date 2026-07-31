# HA Web Studio — Architecture

This document defines the architectural patterns and conventions for the HA Web Studio project.
The codebase is designed for scalability, maintainability, and reusability following a strict design system.

## 1. Core Principles

- **Server-First:** Default to React Server Components. Only use `"use client"` when interactivity or browser APIs (like hooks) are absolutely necessary.
- **Data-Driven:** Navigation, SEO, and content configurations are abstracted from the UI. UI components render what they are given.
- **Design System Native:** Do not use raw Tailwind utility classes for colors (e.g., `bg-white`, `text-blue-500`). Always use the semantic tokens defined in `globals.css` (e.g., `bg-background`, `text-primary`).

## 2. Directory Structure

```text
/app
  /(marketing)     # Public pages with SiteHeader and SiteFooter
  /api             # Future API routes
/components
  /cards           # Domain-specific cards mapping content to UI
  /data            # Display components (tables, stats, timelines)
  /layouts         # Shared layout primitives (Gallery, Split, Bento)
  /navigation      # Header, Footer, Breadcrumbs
  /primitives      # Low-level building blocks (Container, Heading)
  /sections        # Page-level blocks (HeroWrapper, CtaSection)
  /seo             # JSON-LD injection and metadata
  /states          # Empty, Loading, Error components
  /ui              # shadcn/ui components (Buttons, Inputs, etc.)
/config
  routes.ts        # Single source of truth for all internal URLs
  site.ts          # Global site information
  navigation.ts    # Header/Footer structure
/content
  /services        # MDX files for services
  /work            # MDX files for portfolio
  ...
/hooks             # Shared React hooks (useMediaQuery, useReducedMotion)
/lib
  /content         # Content loading, schemas, and types
  /motion          # Shared Framer Motion configs and variants
  /seo             # Metadata and JSON-LD utilities
  utils.ts         # Generic utilities (cn)
```

## 3. Component Guidelines

- **Primitives (`/components/primitives`):** The absolute foundation. Only these components should define page-level constraints (like `max-width` in `Container`) or base typography scales (in `Heading` and `Text`).
- **Layouts (`/components/layouts`):** Structural components that dictate how their children are arranged. They should be content-agnostic.
- **Sections (`/components/sections`):** Reusable page sections that combine layouts and primitives.
- **Cards (`/components/cards`):** The `ContentCard` is the base visual representation. Domain cards (`ServiceCard`, `ProjectCard`) adapt domain models to the `ContentCard` interface.

## 4. Routing & URLs

**Never hardcode paths.** All internal links must use the `routes` object from `config/routes.ts`:

```tsx
// ❌ Bad
<Link href={`/work/${slug}`}>View Project</Link>

// ✅ Good
import { routes } from '@/config/routes'
<Link href={routes.work.detail(slug)}>View Project</Link>
```

## 5. Content & Types

- Content interfaces live in `lib/content/types.ts`.
- Content validation schemas live in `lib/content/schemas.ts`.
- Pages fetch content via abstractions in `lib/content/source.ts`. They do not know whether content comes from MDX or a CMS.

## 6. Motion & Animations

All entrance animations and scroll triggers must use the shared `<MotionWrapper>` primitive, which respects OS-level `prefers-reduced-motion` settings automatically.

```tsx
import { MotionWrapper } from '@/components/primitives/motion-wrapper'
import { slideUp } from '@/lib/motion/variants'

export function AnimatedSection() {
  return (
    <MotionWrapper variants={slideUp} viewport>
      <div>Content</div>
    </MotionWrapper>
  )
}
```

## 7. SEO & Metadata

Pages generate metadata using the central factory in `lib/seo/metadata.ts`.

```tsx
import { createMetadata } from '@/lib/seo/metadata'

export const metadata = createMetadata({
  title: 'Page Title',
  description: 'Page description',
  path: '/page-path',
})
```

Structured data (JSON-LD) is generated via builders in `lib/seo/json-ld.ts` and rendered via the `<JsonLd>` component.
