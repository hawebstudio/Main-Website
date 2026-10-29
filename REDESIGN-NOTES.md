# HA Web Studio website redesign — first pass

This archive is based on the latest supplied `HA(4).zip`.

## What changed

- Replaced the centered, card-heavy homepage hero with an asymmetric editorial layout, a warm cream/paper, espresso-ink, olive, clay and muted-brass palette, oversized display typography, a real project screenshot, and three clear service routes.
- Updated shared color tokens from dark-first liquid glass to a warm light-first editorial system while preserving semantic tokens used by existing routes/components. Explicit `.dark` token values remain available.
- Reduced the use of glass styling in the navigation and shared content cards; made the nav less capsule-like and content cards more editorial.
- Reworked homepage approach, services, selected-work, process, technology and FAQ section headings/copy.
- Removed an unsupported “95+ Average Lighthouse performance score” claim; the supporting row now describes the studio’s approach rather than claiming metrics.
- Homepage featured work is now filtered to live client work with a cover image. Internal, personal, and in-progress work remains in the wider Work area.
- Rewrote the homepage metadata description/title and shared company description; removed the `v0.app` generator string.
- Re-encoded two favicon assets that were JPEG data saved under `.png` filenames.
- Added `docs/DESIGN_DIRECTION.md` with visual, editorial, accessibility, and proof standards. Added a content-intent inventory for 134 content files, revised key service positioning and ten high-value insight metadata records, and introduced a small GSAP/ScrollTrigger entrance layer with reduced-motion handling.

## Important not to assume

This is a source-level first pass, not a verified production build. The uploaded ZIP did not include `node_modules`, and dependency installation timed out in this environment, so TypeScript/build verification could not run with actual Next.js/React types installed.

Before deployment:
1. Run `pnpm install --frozen-lockfile` and `pnpm type-check`, `pnpm lint`, `pnpm validate`, and `pnpm build`.
2. Check mobile widths and all public routes in a browser, particularly shared page backgrounds/components because the global palette changed.
3. Set and verify `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_CLARITY_PROJECT_ID`, and email environment variables. No `.env` file was in the supplied archive.
4. Fix and test the current analytics consent default: the existing AnalyticsProvider sends a global `granted` consent default before a regional `denied` default. That does not match the cookie banner's statement that analytics stays dormant until the visitor chooses; consent should default to denied globally and only update after the visitor opts in where required.
5. Validate the contact submission in production; currently the server action can return success while Resend is unconfigured, without the email actually being sent.
6. Test favicon delivery and social image previews after deploy.

## Direction references applied

The design borrows general principles, not layouts or copy: distinct page hierarchy and composition, more specific writing, less repeated card geometry, portfolio-first evidence, readable typography, truthful claims, clear conversion routes, and reduced decorative motion. See the user-provided links for source references.

## Search Console exports supplied on 2026-10-13

The attached performance export shows early search visibility but low click-through at the time of export: the homepage is listed at 753 impressions / 4 clicks; `/services/business-website-development` at 51 impressions / 2 clicks; `/technologies/cms/payload-cms` at 614 impressions / 1 click; and `/technologies/cloud-infrastructure/vercel` at 373 impressions / 1 click. Query data includes branded terms such as `ha web` (108 impressions / 1 click) and technical terms such as `cloudflare implementation`, `bing webmaster tools`, and `payload cms` with impressions but no clicks in that export.

Use this as a baseline rather than proof of what the new design will do. It supports prioritising a clear business-website service path and keeping technology articles as supporting content, with more descriptive titles and snippets. Do not rename or remove indexed URLs during this design pass without a separate redirect/canonical plan. The coverage export also shows a mix of redirects, not-found URLs, and crawled/discovered-but-not-indexed URLs; review those separately in Search Console before launch.


## Pass 2 additions

- Replaced the remaining blue/purple hero glows with olive, clay and brass tones across shared templates.
- Added subtle tactile panel/card depth using offset shadows and small hover movement rather than 3D objects.
- Added GSAP ScrollTrigger reveals to shared sections and the homepage hero, with `prefers-reduced-motion` handling and cleanup.
- Added `docs/SEO-CONTENT-RESEARCH.md` and `docs/SEO-CONTENT-INTENT-MAP.csv`. The map covers 134 MD/MDX content records. Ten insight title/description pairs and core business website positioning were revised. This is not a line-by-line rewrite of all 134 content bodies; remaining copy still needs editorial review against query/page data.
- GSAP was added to package metadata and the lockfile, but dependency resolution and build validation could not be run because the package registry was unreachable in this environment. Verify the lockfile with `pnpm install --lockfile-only` / `pnpm install --frozen-lockfile` locally before merging.
