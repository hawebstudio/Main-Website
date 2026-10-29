# Redesign Pass 5 — Luxury, Reading Flow, and Link Preservation

## Design changes
- Replaced the previous earthy/olive palette with a luxury editorial palette: ivory-white surfaces, ink-charcoal text, deep plum actions, and restrained champagne brass. The dark theme now uses champagne rather than green as its action accent.
- Reordered homepage sections around a buyer decision journey: business problems → service fit → selected client work → approach → process → principles → technical capabilities.
- Made section-level calls to action visible on mobile instead of hiding them below the desktop breakpoint.
- Added research-informed reading-flow helpers for clear heading hierarchy, comfortable text measure, and anchor landing offsets.
- Kept native smooth scrolling, Next.js smooth-scroll routing behavior, and reduced-motion support.

## Link preservation
- Compared internal and external link literals in the original `HA(4).zip` against Pass 4 before this pass. Existing external URLs were unchanged. The expected `/m-a-malik` page and `/work/ms-signature-scents` internal project link were added in the previous pass.
- `/socials` was intentionally removed as a dedicated page in a previous pass; this pass adds a permanent redirect from `/socials` to `/about` so old inbound links do not end at a 404.
- The original archive had 28 distinct hard-coded internal paths and 21 distinct external URLs; the Pass 4 source has 29 internal paths and the same 21 external URLs. No external URL literals were removed. The only removed internal path is `/socials`, intentionally replaced by a redirect; `/m-a-malik` and `/work/ms-signature-scents` are additions. A source-level pass found 29 page files, 29 internal path literals, and no unresolved literal paths after accounting for dynamic routes, public assets, API routes, and redirects.
- A stale `/ponytail` route helper existed without a matching page; a permanent redirect to `/services` was added as an additional dead-end guard.
- Existing service redirects and route definitions are retained. This is a source-level audit; live HTTP checks and browser QA require a running deployment.

## Research used
- Nielsen Norman Group, “F-Shaped Pattern of Reading: Misunderstood, But Still Relevant”: scanning varies by user goal and page structure; use formatting to make relevant information easier to find. https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/
- Nielsen Norman Group, “Text Scanning Patterns: Eyetracking Evidence”: F-pattern, spotted, layer-cake, and commitment patterns depend on content and context. https://www.nngroup.com/articles/text-scanning-patterns-eyetracking/
- Nielsen Norman Group, “Concise, SCANNABLE, and Objective”: concise, scannable, factual writing supports web usability. https://www.nngroup.com/articles/concise-scannable-and-objective-how-to-write-for-the-web/
- W3C WCAG 2.2, Contrast Minimum: 4.5:1 for normal text and 3:1 for large text. https://www.w3.org/TR/wcag/
- Luxury website design guidance informed the restrained near-black/ivory/metallic accent direction; it is a visual convention, not a scientific guarantee of perceived luxury. https://webstix.com/the-webstix-blog/how-to-create-a-luxury-brand-website/

## Verification status
- ZIP integrity, typecheck, production build, live link crawling, and browser QA must be reported separately. No successful production build or live HTTP verification is claimed by this changelog.
- TypeScript syntax transpilation passed for the four modified TSX files; `next.config.mjs` passed Node syntax checking. The production build could not be run: this workspace has no installed dependencies and Corepack could not reach `registry.npmjs.org` to fetch pnpm. No claim is made that a full build or browser rendering passed.
