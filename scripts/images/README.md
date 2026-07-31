# Image Scripts

Purpose: validate image references and generate simple static image assets for Version 1.

Scripts:
- `validate-images.ts` checks local image references and MDX alt text.
- `generate-favicons.ts` verifies the favicon assets already used by the site.

Open Graph / Twitter card images are generated at request time by
`app/api/og/route.tsx` (Next.js `ImageResponse`) instead of a build script —
see `lib/seo/images/index.ts#dynamicOgImageUrl`. There's nothing to
pre-generate or commit to `public/`.

Inputs: `public/`, `content/`, `app/`, and `components/`.

Outputs: validation output only.

Usage: `pnpm images:validate` and `pnpm images:favicons`.

Dependencies: Node.js only.

Future expansion: add provider adapters for S3, Cloudinary, ImageKit, or Payload Media when the site actually uses external media storage.
