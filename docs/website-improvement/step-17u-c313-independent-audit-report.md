# HA Web Studio — Phase C3.13: Independent Audit of C3.12

**Audit Date**: 2026-10-21
**Auditor**: Independent Pair-Programming Agent (Antigravity IDE)
**Target Phase**: C3.12 (Content Quality System, SEO Research, M.A. Malik Page, and Scroll-to-Top UX)
**Prior Phase Report**: `docs/website-improvement/step-17t-c312-content-quality-seo-malik-scroll-report.md`
**Verdict**: **PASS (with documented pre-existing baseline warnings)**

---

## 1. Initial & Final Git State

- **Repository Root**: `D:\2. Agency\Main Website\ha-web-studio`
- **Branch**: `remove-animations-for-performance`
- **HEAD Commit**: `7fe04d1 fix: integrate dynamic route soft-404 guard`
- **Upstream Status**: Ahead of `origin/remove-animations-for-performance` by 2 commits (`5ad5583`, `7fe04d1`).
- **Working Tree Preservation**:
  - No `git reset`, `git clean`, `git stash`, or broad restores were executed.
  - All 74 pre-existing modified/untracked files preserved exactly as encountered.
  - No Git commits created.
  - No IndexNow URLs submitted.
  - No deployments or remote pushes initiated.

---

## 2. Diffs & Files Reviewed

### Modified Files Reviewed
1. `lib/business/company/index.ts`:
   - Updated `founder: "Mohd Azeem Malik"` to `founder: "M.A. Malik"` (+1 / -1).
   - Rationale: Eliminates leakage of the private legal name in global `localBusinessJsonLd` structured data across all marketing routes.
2. `components/layouts/deferred-globals.tsx`:
   - Dynamically imports `ScrollToTop` via `next/dynamic` with `{ ssr: false }` (+5 lines).
   - Rationale: Defers client-side scroll listener mounting until post-hydration; zero SSR payload impact.
3. `config/routes.ts`:
   - Added `malik: () => "/m-a-malik"` helper (+1 line).
4. `scripts/shared/toolkit.mts`:
   - Added `'/m-a-malik'` to `staticRoutes` (+1 line).
5. `lib/routing/route-inventory.generated.json`:
   - Incremented `staticPaths` from 20 to 21 with addition of `"/m-a-malik"`.

### Newly Created Files Reviewed
1. `app/(marketing)/m-a-malik/page.tsx` — Public profile route for M.A. Malik.
2. `components/navigation/scroll-to-top.tsx` — Restrained, accessible scroll-to-top control.
3. `tests/scroll-to-top.test.mts` — Unit and regression test suite for scroll-to-top behavior and accessibility.
4. `.agents/skills/ha-content-workflow/SKILL.md` — Reusable human-centered editorial workflow skill.
5. `docs/content/human-centered-content-workflow.md` — Full documentation of the 7-stage content quality pipeline and upstream licenses.
6. `docs/website-improvement/step-17t-c312-malik-page-draft.md` — Factual evidence audit and copy draft for founder route.
7. `docs/website-improvement/step-17t-c312-content-quality-seo-malik-scroll-report.md` — Primary C3.12 completion report.

---

## 3. Findings by Severity

| ID | Category | Severity | Summary | Status |
| :--- | :--- | :--- | :--- | :--- |
| **F-1** | Testing & QA | **Minor / Coverage Gap** | `tests/scroll-to-top.test.mts` originally validated component attributes purely through source regex checks rather than functional/behavioral execution. | **RESOLVED**: Added 5 behavioral test cases verifying scroll threshold calculation, reduced motion branching, keyboard accessibility states, WhatsApp vertical clearance geometry, and deferred SSR mounting. |
| **F-2** | Privacy | **Informational** | Global legal name was previously exported in `company.founder` (`lib/business/company/index.ts`), which caused `localBusinessJsonLd` to leak the legal name into site-wide HTML. | **VERIFIED RESOLVED**: Corrected in C3.12 to `"M.A. Malik"`. Comprehensive AST/regex scan of all source and content files confirmed zero occurrences of the legal name or personal handles. |
| **F-3** | Static Routes | **Pre-existing Warning** | `/ponytail` static route triggers a warning in `check-routes.mts` because it is not backed by a physical `page.tsx` file (handled dynamically or via redirect). | **DOCUMENTED LIMITATION**: Pre-existing across C3.9–C3.12; untouched to avoid disrupting external redirects. |
| **F-4** | SEO Meta Length | **Pre-existing Warning** | 18 meta title/description length warnings emitted by `scripts/seo/check-seo.mts` across case studies and insights. | **DOCUMENTED LIMITATION**: Pre-existing across C3.9–C3.12; copy was not altered during this phase to preserve established content. |

---

## 4. Audit of M.A. Malik Route & Privacy Protections

### Route & Content Audit (`app/(marketing)/m-a-malik/page.tsx`)
- **Metadata**:
  - `<title>`: `M.A. Malik | Studio Direction & Engineering — HA Web Studio`
  - `<meta name="description">`: Concise, actionable summary under 160 characters.
  - `<link rel="canonical">`: Explicit canonical to `https://hawebstudio.com/m-a-malik`.
- **Structured Data**:
  - Valid Schema.org `AboutPage` and `Person` JSON-LD nodes.
  - Person node specifies `name: "M.A. Malik"` and `jobTitle: "Studio Director & Technical Lead"`.
- **Heading Hierarchy & Semantics**:
  - Single `<h1>`: `M.A. Malik.`
  - `<h2>` sections: `Working Principles`, `Where We Add High Value`, `Clear Project Boundaries`.
  - Internal links: Direct links to `/services`, `/contact?intent=start-project`, and consultation CTA.
- **Factual Claims Verification**:
  - Grounded in verifiable technical specializations: Next.js, TypeScript, headless Shopify architecture, Core Web Vitals, deterministic routing.
  - Explains the origin of the "HA" initials (grandfather's initials) as a commitment to craft.
  - Out-of-scope boundaries explicitly stated (no generic template resale, no forced headless complexity for small stores, no fake ranking guarantees).
  - Zero fabricated credentials, client metrics, or employer affiliations.

### Comprehensive Privacy Scan
An automated script scanned every file across `app/`, `components/`, `content/`, `lib/`, `config/`, `public/`, and `scripts/`:
1. `devazeem`: **0 matches** in source code or public assets. (Appears only in internal historical documentation noting that it must remain private).
2. `https://www.linkedin.com/in/`: **0 matches** in source code or public assets. (Dummy URL `linkedin.com/in/janesmith` appears in `docs/CRM-GUIDE.md`).
3. `Mohd Azeem Malik`: **0 matches** in public source code or public assets.
4. `Azeem`: **0 matches** in public source code (one legacy reference `url: "https://github.com/benazeem/Cintegrate-backend"` exists in `content/work/index.ts` under non-authorial portfolio data).

### Live Route HTTP Probe (`localhost:3002`)
Live requests against active dev server (Port 3002) yielded:
- `/m-a-malik`: Status **200** | `devazeem`: **false** | `legalName`: **false** | `Azeem`: **false** | `M.A. Malik`: **true**
- `/`: Status **200** | `devazeem`: **false** | `legalName`: **false** | `Azeem`: **false**
- `/about`: Status **200** | `devazeem`: **false** | `legalName`: **false** | `Azeem`: **false**
- `/contact`: Status **200** | `devazeem`: **false** | `legalName`: **false** | `Azeem`: **false**
- `/services`: Status **200** | `devazeem`: **false** | `legalName`: **false** | `Azeem`: **false**

---

## 5. Audit of Scroll-to-Top Control

### Technical & Geometric Analysis (`components/navigation/scroll-to-top.tsx`)
1. **Event Throttling & Cleanup**:
   - Scroll event listener uses `requestAnimationFrame` ticking flag to eliminate main-thread jank.
   - Passive listener: `{ passive: true }`.
   - Complete unmount cleanup: `window.removeEventListener("scroll", handleScroll)` executed in `useEffect` return block.
2. **Reduced Motion Compliance**:
   - Evaluates `window.matchMedia("(prefers-reduced-motion: reduce)").matches`.
   - When active, executes instant `window.scrollTo({ top: 0, behavior: "auto" })`.
   - Tailwind `motion-reduce:transition-none motion-reduce:hover:transform-none` prevents CSS micro-animations.
3. **Accessibility**:
   - Rendered as `<button type="button">`.
   - Descriptive accessible name: `aria-label="Scroll to top of page"` and `title="Scroll to top"`.
   - Visible high-contrast focus indicator: `focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2`.
   - Prevents hidden keyboard focus traps: dynamically sets `tabIndex={visible ? 0 : -1}` and `aria-hidden={!visible}`.
   - Touch target: 40×40px (`size-10`) on mobile, 44×44px (`size-11`) on desktop (exceeds WCAG 2.2 AA 24×24px requirement).
4. **Collision Avoidance Geometry**:
   - `ScrollToTop` positioning: `bottom-24 right-6 sm:bottom-28 sm:right-8` (`z-40`).
   - `FloatingWhatsAppButton` positioning: `bottom-6 right-6 sm:bottom-8 sm:right-8` (`z-50`).
   - Mobile vertical clearance: 96px - 76px = **20px non-overlapping gap**.
   - Desktop vertical clearance: 112px - 84px = **28px non-overlapping gap**.
   - WhatsApp horizontal hover expansion (`group-hover:max-w-40`) expands exclusively to the left, with zero geometric interference with the scroll-to-top button above it.
5. **Mounting Point**:
   - Mounted via `next/dynamic` inside `components/layouts/deferred-globals.tsx` with `{ ssr: false }`.
   - Zero hydration mismatch; zero overhead on initial SSR payload.

---

## 6. Audit of Routing, Guard & Inventory Integration

1. **Deterministic Inventory Generation**:
   - `scripts/shared/route-inventory.mts` enumerates dynamic routes from authoritative data sources (`content/services`, `content/work`, `content/insights`, `content/case-studies`, `content/problems`, `content/technologies`, `lib/business/locations`).
   - Static pages discovered automatically via file walker (`app/**/page.tsx`), registering `/m-a-malik` deterministically.
   - Result: 21 static paths, 9 dynamic route shapes, 172 dynamic content paths.
2. **Provider Fail-Safe Invariant**:
   - `CONTENT_PROVIDER=sanity node scripts/build/generate-route-inventory.mts` immediately exits 1 with diagnostic message, preventing corruption of route tables.
3. **Dynamic Route Parameter Guard**:
   - All 8 dynamic route page components declare `export const dynamicParams = false;`.
   - `scripts/validation/check-dynamic-routes.mts` confirms complete alignment with inventory.
4. **Link Audit Invariant**:
   - `scripts/validation/check-links.mts` reads MDX plus TypeScript-defined collections via `readAllContentEntries()`, eliminating false-positive link errors.

---

## 7. Execution of Verification Commands

All commands independently executed and confirmed:

| Check / Gate | Command | Exit Code | Result Summary |
| :--- | :--- | :---: | :--- |
| **Unit & Regression Tests** | `node --test tests/**/*.test.mts` | **0** | **PASS**: 33 tests pass across 6 suites (including 6 scroll-to-top tests). |
| **Route Inventory Guard** | `node scripts/validation/check-route-inventory.mts` | **0** | **PASS**: Route inventory matches sources deterministically. |
| **Dynamic Routes Guard** | `node scripts/validation/check-dynamic-routes.mts` | **0** | **PASS**: All dynamic routes declare `dynamicParams = false`. |
| **Link Integrity Audit** | `node scripts/validation/check-links.mts` | **0** | **PASS**: Zero broken internal links across MDX and TypeScript collections. |
| **Static Route Validation** | `node scripts/validation/check-routes.mts` | **0** | **PASS** (1 pre-existing warning: `/ponytail`). |
| **Content Validation** | `node scripts/validation/check-content.mts` | **0** | **PASS**: Frontmatter, slugs, duplicates all valid. |
| **SEO Integrity Check** | `node scripts/seo/check-seo.mts` | **0** | **PASS** (18 pre-existing meta length warnings). |
| **SEO Title Brand Check** | `node scripts/seo/check-title-brand.mts` | **0** | **PASS**: Zero duplicate brand title occurrences. |
| **Card Overlap Guard** | `node scripts/validation/check-card-overlap.mts` | **0** | **PASS**: Service card heading layout validated. |
| **TypeScript Typecheck** | `pnpm type-check` (`tsc --noEmit`) | **0** | **PASS**: 0 type errors across whole codebase. |
| **ESLint Audit** | `npx eslint <C3.12 changed/created files>` | **0** | **PASS**: 0 lint errors or warnings. |

---

## 8. Environmental Safeguards & Listener Status

- **Port 3001** (`D:\2. Agency\HA`): PID 30184 active, untouched.
- **Port 3002** (`D:\2. Agency\Main Website\ha-web-studio`): PID 41304 active, untouched; shared `.next` directory preserved.
- **Port 3005**: Free before audit, free now.
- **IndexNow Protection**: No IndexNow scripts were executed; 0 URLs submitted.

---

## 9. Verdict & Recommendations

### Final Audit Verdict
**PASS**. The C3.12 implementation is thoroughly verified, technically disciplined, privacy-compliant, and regression-tested. No confirmed code defects remain. The expanded behavioral unit tests in `tests/scroll-to-top.test.mts` ensure long-term stability for the scroll-to-top component.

### Next Recommended Action
The working tree in `D:\2. Agency\Main Website\ha-web-studio` is in a healthy, verified state ready for operator review and staging. No commits have been made per project rules.
