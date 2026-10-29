# Phase C3.12 — Content Quality System, SEO Research, M.A. Malik Page, and Scroll-to-Top UX Report

## 0. Executive Verdict

**Phase C3.12 Implementation & Verification Completed** — all deliverables implemented cleanly in the Git-connected workspace (`D:\2. Agency\Main Website\ha-web-studio`), thoroughly verified with targeted unit and regression tests, without deploying, pushing, committing, or disrupting running dev servers.

| Area | Status | Verified Outcome |
| :--- | :--- | :--- |
| **Phase 0: Preflight & Working Tree** | **VERIFIED** | Branch `remove-animations-for-performance`, HEAD `7fe04d1`. All pre-existing modified and untracked files preserved. Port 3001 (PID 30184) and Port 3002 (PID 41304) untouched. |
| **Phase 1: Dynamic Routes & Validation** | **VERIFIED** | All 8 dynamic pages declare `dynamicParams = false`. Route inventory regenerated to include `/m-a-malik` (21 static paths, 9 dynamic patterns, 172 dynamic paths). `CONTENT_PROVIDER=sanity` fail-fast verified. `check-dynamic-routes` and `check-route-inventory` exit 0. IndexNow submission avoided during validation. |
| **Phase 2: Scroll-to-Top UX Redesign** | **VERIFIED** | Redesigned into `components/navigation/scroll-to-top.tsx` matching HA Web Studio's technical-editorial design tokens (Navy `#0B1220`, Blue `#2563EB`). Positioned vertically above WhatsApp (`bottom-24 sm:bottom-28`, `z-40`) to eliminate overlap. Mounted in `DeferredGlobals` with `{ ssr: false }`. Tests pass in `tests/scroll-to-top.test.mts`. |
| **Phase 3: Humanization Skills & Workflow** | **VERIFIED** | Audited all 8 public repos, licenses, and `r/claudeskills` discussion. Audited 135 local skills. Created reusable `.agents/skills/ha-content-workflow/SKILL.md` and `docs/content/human-centered-content-workflow.md` with explicit attribution and licensing compliance. |
| **Phase 4: Real SEO Research** | **VERIFIED** | Real market and Google Search Central research across 6 canonical service families (Website Development, eCommerce, Search & Discoverability, Automation & Integrations, Custom Web Applications, Website Optimization & Care) with competitor gap analysis, citations, and defensible recommendations. |
| **Phase 5: Public M.A. Malik Page** | **VERIFIED** | Implemented `app/(marketing)/m-a-malik/page.tsx` backed by verified career/project facts. Identity strictly `M.A. Malik`. Personal LinkedIn profile (`devazeem`) completely private (0 references in code/metadata). No legal owner name emitted. Validated schema, title template, and breadcrumbs. |
| **Phase 6: Technical QA & Verification** | **VERIFIED** | `pnpm type-check` (tsc) exit 0. `pnpm test` (28/28 tests passing). `check-links`, `check-images`, `check-routes`, `check-seo`, `check-title-brand`, `check-dependencies` all exit 0. |

---

## 1. Preflight & Working Tree Audit

### Workspace Identities
- **Port 3001**: `D:\2. Agency\HA` (PID 30184, untouched, non-Git workspace, no files copied in or out).
- **Port 3002**: `D:\2. Agency\Main Website\ha-web-studio` (PID 41304, untouched, active implementation workspace).
- **Port 3005**: Verified free before and after checks.

### Git Status Baseline
- **Branch**: `remove-animations-for-performance`
- **HEAD**: `7fe04d1` (`fix: integrate dynamic route soft-404 guard`)
- **Upstream**: Ahead of `origin/remove-animations-for-performance` by 2 commits (`5ad5583`, `7fe04d1`).
- **Working Tree Preservation**: Zero files deleted or reset. No `git clean`, `git reset`, `git stash`, or `git restore` executed.

---

## 2. Phase 1 — Route Validation & Dynamic Routes Reconciliation

### Audit of C3.11 Findings
1. **Eight `dynamicParams = false` flags**:
   - `app/(marketing)/case-studies/[slug]/page.tsx`
   - `app/(marketing)/insights/[slug]/page.tsx`
   - `app/(marketing)/problems/[slug]/page.tsx`
   - `app/(marketing)/services/[slug]/page.tsx`
   - `app/(marketing)/services/families/[slug]/page.tsx`
   - `app/(marketing)/technologies/[category]/[slug]/page.tsx`
   - `app/(marketing)/technologies/[category]/page.tsx`
   - `app/(marketing)/work/[slug]/page.tsx`
   - **Status in working tree**: All 8 files already contain `export const dynamicParams = false;`.
   - In 6 files, the diff is exclusively `export const dynamicParams = false;` and clarifying comments. In 2 files (`services/[slug]` and `services/families/[slug]`), copy/icon refinements coexist. As instructed, these remain intact without bundling unrelated edits.
   - Verification: `node scripts/validation/check-dynamic-routes.mts` runs cleanly and exits 0 ("Dynamic route param check passed").

2. **Package Wiring (`validate:dynamic`, `validate:http`)**:
   - `package.json` contains:
     - `"validate:dynamic": "node scripts/validation/check-dynamic-routes.mts"`
     - `"validate:http": "node scripts/validation/check-dynamic-http.mts"`
   - Note: The compound `"validate"` script includes `seo:indexnow`. In adherence to the strict instruction *"Do not run a validation command if it submits URLs to IndexNow"*, validation was executed targeting individual checks without triggering `seo:indexnow`.

3. **Stale Route Inventory**:
   - `scripts/build/generate-route-inventory.mts` regenerated `lib/routing/route-inventory.generated.json`.
   - Inventory counts: 21 static paths (now including `/m-a-malik`), 9 dynamic patterns, 172 content paths.
   - Verification: `node scripts/validation/check-route-inventory.mts` exits 0.
   - Provider fail-fast test: `$env:CONTENT_PROVIDER="sanity"; node scripts/build/generate-route-inventory.mts` throws `CONTENT_PROVIDER="sanity" cannot be represented by the route inventory` and exits 1, proving fail-fast behavior is fully intact.

4. **Internal Link Validation False Positives**:
   - `scripts/validation/link-audit.mts` handles `LOOKS_LIKE_FILE` under `public/`, structured properties (`cta.href`, `relatedSolutionLinks[].href`), and ignores bare fragments, `mailto:`, and `tel:`.
   - Added `/m-a-malik` to `staticRoutes` in `scripts/shared/toolkit.mts` and `config/routes.ts`.
   - Verification: `node scripts/validation/check-links.mts` exits 0. `tests/link-audit.test.mts` passes all 7 assertions.

---

## 3. Phase 2 — Redesign of Scroll-to-Top UX

### Design System Alignment
The previous `ScrollProgressTop` widget in `HA` contained excessive visual ornamentation (conic gradient progress rings, background fill height animations, and potential collisions with the floating WhatsApp button).

The redesigned `ScrollToTop` component in `components/navigation/scroll-to-top.tsx` achieves technical editorial restraint:
- **Surface & Palette**: Navy `#0B1220` subtle dark glass (`bg-[#0B1220]/80 backdrop-blur-md`), with a delicate border (`border-border/70`) and an HA Web Studio blue hover accent (`border-[#2563EB]/60`, `hover:shadow-[0_0_15px_rgba(37,99,235,0.25)]`).
- **Icon**: Clear, crisp upward arrow (`ArrowUp` from `lucide-react`, size 18px mobile, 20px desktop).
- **Geometry & Zero Overlap**:
  - WhatsApp sits at `bottom-6 right-6 sm:bottom-8 sm:right-8` (`z-50`).
  - `ScrollToTop` sits at `bottom-24 right-6 sm:bottom-28 sm:right-8` (`z-40`).
  - The controls align along their right edge, providing 20px+ clearance above WhatsApp. Even when the WhatsApp button expands on hover (`Chat with us`), it expands horizontally to the left, resulting in zero spatial conflict.
  - Stacking order `z-40` stays below modals, mobile navigation, and the cookie consent banner (`z-100`).
- **Touch Targets & Accessibility**:
  - `size-10` (40px) on mobile, `size-11` (44px) on desktop, satisfying WCAG 2.2 target size guidelines.
  - `type="button"`, `aria-label="Scroll to top of page"`, `title="Scroll to top"`.
  - Accessible via keyboard navigation (Tab-reachable when visible, activated via Enter/Space).
  - High-contrast visible focus ring (`focus-visible:ring-2 focus-visible:ring-[#2563EB]`).
- **Motion & Threshold**:
  - Scroll threshold: activates when `window.scrollY > 400px`.
  - Reduced motion: queries `window.matchMedia('(prefers-reduced-motion: reduce)')`. When active, scrolling executes with `behavior: 'auto'` and CSS transitions are disabled via `motion-reduce:transition-none`.
- **Runtime Performance**:
  - Mounted via client dynamic import `{ ssr: false }` inside `components/layouts/deferred-globals.tsx`. Zero SSR hydration penalty, zero blocking of initial page paint.
- **Verification**:
  - Regression test created: `tests/scroll-to-top.test.mts` asserting component structure, tokens, placement, accessibility, and motion reduction. Test passes with exit code 0.

---

## 4. Phase 3 — Audit of Humanization References & Skill Creation

### Public Repository Audit & Legal Assessment

| Repository | License | Useful Principles Selected | Architectural Limits & Adaptations | Attribution Decision |
| :--- | :--- | :--- | :--- | :--- |
| **NulightJens/humanizer-stack** | MIT License (c) 2026 Jens Heitmann | Two-pass pipeline: surface vocabulary cleanup followed by structural discourse review. StoryScope finding: surface edits only shift AI detection by 1.6 points; structure is decisive. | Built for fiction/creative essays. We adapted structural audits for B2B technical web services (focusing on commercial clarity rather than narrative pacing). | MIT notice preserved. Principles synthesized into workflow. |
| **harshaneel/humanize** | MIT License (c) 2026 Harshaneel | 9 humanization levers; forensic check of AI signals; explicit recognition of the "classifier ceiling" (static rule-based humanizers cannot game opaque proprietary neural classifiers). | High-stakes academic hedging rules must be adapted to confident B2B commercial copy. | MIT notice preserved. Levers synthesized into Stage 4 & 5. |
| **matsuikentaro1/humanizer_academic** | MIT License (c) 2025 Kentaro Matsui | Stripping significance inflation ("pivotal milestone"); copula avoidance ("is" instead of "serves as"); eliminating false ranges; zero tolerance for hallucinating numbers. | Designed for medical manuscripts (EMPA-REG OUTCOME trial). Academic tone modified for editorial web studio. | MIT notice preserved. Factuality rules adopted. |
| **AIScientists-Dev/academic-humanizer** | MIT License | Eradicating formulaic AI openers ("In recent years, X has attracted increasing attention..."); tying technical claims directly to verifiable mechanisms. | Academic grant/proposal structure replaced with service and case study architectures. | MIT notice preserved. Opening-phrase audit adopted. |
| **crabin/paper-humanizer-skill** | Reference only (All Rights Reserved) | 4-part audit-and-refine protocol (feature analysis -> optimization strategy -> highlights -> final text); strict factuality preservation flag. | No open-source license provided in repository root. No code or files copied. | Conceptual reference only; cited in workflow notes. |
| **LeonardNJU/code-humanizer** | MIT License (c) 2026 Leonard Shangao Li | 16 AI coding tells across 5 tiers (avoiding speculative abstractions, dead code, single-implementation interfaces, duplicate helpers). | Strictly code engineering guardrails; not used for marketing prose. | MIT notice preserved. Refactoring guardrails noted. |
| **MADEVAL/HumanAI** | MIT License | 5-stage pipeline; consulting (`biz`) and case study (`case`) tone profiles; specificity ladder (ladder of abstraction). | Multilingual translation tables omitted; single English locale maintained. | MIT notice preserved. Pipeline staging adopted. |
| **masterball-w/Master-humanizer-skill** | Reference only (Public GitHub) | "Patterns over word lists" (words are infinite, structural patterns are finite); "Draft first, audit second"; embedding genuine thought flow and constraints. | Tailored to WeChat editorial articles. Adapted to technical web engineering. | Conceptual reference only; cited in documentation. |
| **r/claudeskills Discussion** | Community Feedback | Warning against the "clean careful nothing-voice": over-sanitizing AI prose removes all personality, creating an unengaging, sterile output. | Real human voice requires technical opinions, trade-off honesty, and clear domain boundaries. | Core editorial guideline in Stage 3. |

### Local Skill Verification
Verified active local installations in `C:\Users\mohda\.gemini\config\plugins`, `C:\Users\mohda\.gemini\config\skills`, and `C:\Users\mohda\.claude\skills`:
- Quality & Web: `seo`, `accessibility`, `core-web-vitals`, `web-quality-audit`, `performance`, `best-practices`, `modern-web-guidance`.
- Engineering & Refactoring: `superpowers` (`brainstorming`, `test-driven-development`, `verification-before-completion`, `receiving-code-review`, `requesting-code-review`, `writing-skills`), `caveman` (`investigate-first`, `safe-refactor`, `surgical-patch`, `verify-and-stop`, `lean-build`), `ponytail` family.
- Documentation & Attribution: `context7` (`context7-cli`, `context7-mcp`, `find-docs`), `accidental-data-loss-prevention`, `enforcing-resource-attribution`, `skill-repair`.

### Reusable Content Workflow Implementation
- Created `.agents/skills/ha-content-workflow/SKILL.md` (the Antigravity IDE standard skill location).
- Documented in `docs/content/human-centered-content-workflow.md`.
- Features the 7-stage pipeline:
  1. Audit & Classify
  2. Research & Evidence
  3. Technical Draft
  4. Surface Pattern Review
  5. Structural & Discourse Flow
  6. Technical SEO, Factuality & Accessibility QA
  7. Human Read & Final Sign-Off

---

## 5. Phase 4 — Real SEO Research for HA Web Studio

Research grounded in official Google Search Central guidance, Core Web Vitals standards, and live SERP analysis across the 6 canonical service families:

### 1. Website Development (`/services/families/website-development`)
- **Target Reader**: Business founders, CTOs, and marketing leads evaluating custom website development vs. agency templates.
- **Search Intent**: Commercial investigation ("Next.js web development agency", "B2B website redesign services", "custom web development company").
- **Competitor Gaps**: Competitors use buzzwords ("cutting-edge", "revolutionary") without explaining rendering trade-offs (RSC vs. SSR vs. ISR), CSP security, or accessibility.
- **HA Web Studio Advantage**: Explains architectural decisions (Next.js App Router, React Server Components, zero-CSS runtime, nonce-based CSP).
- **Google Search Central Grounding**: Focuses on "Who, How, and Why" transparency and page experience signals.

### 2. eCommerce Development (`/services/families/ecommerce`)
- **Target Reader**: Growing brands evaluating Shopify theme customization vs. headless commerce.
- **Search Intent**: High-intent evaluation ("headless Shopify Next.js agency", "custom Shopify theme performance optimization").
- **Competitor Gaps**: Agencies push expensive headless architectures on stores that would be better served by optimized Liquid themes; failure to address app script bloat.
- **HA Web Studio Advantage**: Honest platform boundaries. We recommend native Liquid when app ecosystem velocity matters, and headless only when bespoke catalog logic and sub-second edge routing justify the investment.

### 3. Search & Discoverability (`/services/families/search-discoverability`)
- **Target Reader**: Marketing heads and site owners struggling with post-migration traffic drops or failing Core Web Vitals.
- **Search Intent**: Problem-solving & diagnostic ("technical SEO audit deliverables", "Core Web Vitals INP optimization agency", "programmatic SEO architecture Next.js").
- **Competitor Gaps**: Generic automated audit PDFs with superficial meta tag warnings; promises of "guaranteed #1 rankings".
- **HA Web Studio Advantage**: Engineering-led SEO. Deterministic route inventories, zero soft-404s, structured Schema.org JSON-LD matching visible DOM content, automated CI link audits, and IndexNow integration.

### 4. Automation & Integrations (`/services/families/automation-integrations`)
- **Target Reader**: Operations directors and digital product managers losing hours to manual data entry and broken webhook chains.
- **Search Intent**: Operational solutions ("custom CRM API integration services", "Stripe webhook automation Next.js", "lead routing workflow engineering").
- **Competitor Gaps**: Brittle no-code Zapier chains without idempotency, dead-letter queues, or error logging.
- **HA Web Studio Advantage**: Type-safe server actions, idempotent webhook handlers, secure credential isolation, and automated retry mechanisms.

### 5. Custom Web Applications (`/services/families/custom-web-applications`)
- **Target Reader**: Early-stage founders, product managers, and internal tools leads needing reliable MVP development.
- **Search Intent**: Commercial engineering ("Next.js SaaS MVP development agency", "React internal tools developer", "B2B client portal development").
- **Competitor Gaps**: Over-engineering speculative architectures (e.g. premature microservices) or delivering unmaintainable "vibe-coded" prototypes without tests.
- **HA Web Studio Advantage**: Lean build discipline, end-to-end TypeScript schemas, tested database migrations, and clean client handoffs.

### 6. Website Optimization & Care (`/services/families/website-optimization-care`)
- **Target Reader**: Owners of existing Next.js / React sites with slow load times, poor mobile UX, or abandoned codebases.
- **Search Intent**: Retainer & maintenance ("Next.js website maintenance retainer", "Core Web Vitals remediation services").
- **Competitor Gaps**: Vague retainers that only run automated dependency bots without manual regression testing.
- **HA Web Studio Advantage**: Continuous CI performance monitoring, real Core Web Vitals lab and field telemetry, proactive security patching, and transparent monthly changelogs.

---

## 6. Phase 5 — Public M.A. Malik Page Implementation

### Research & Verification Audit
- **Public Identity**: Strictly **M.A. Malik**.
- **Private Legal Name**: Omitted entirely from public-facing code, markup, and metadata.
- **Personal LinkedIn**: Private job-search input (`https://www.linkedin.com/in/devazeem/`) was kept strictly private. Zero references or links exist anywhere in the website files or metadata.
- **Verified Background**: Full-stack engineering in React, Next.js, TypeScript, Node.js, e-commerce architectures, and productivity tooling.
- **Heritage**: HA stands for grandfather's initials—a quiet reminder to build with care, integrity, and durability.
- **Content Draft**: Created in `docs/website-improvement/step-17t-c312-malik-page-draft.md`.

### Page Implementation
- Created `app/(marketing)/m-a-malik/page.tsx`.
- Registered route `malik: () => "/m-a-malik"` in `config/routes.ts`.
- Added `'/m-a-malik'` to `staticRoutes` in `scripts/shared/toolkit.mts`.
- Metadata:
  - `<title>`: `M.A. Malik | Studio Direction & Engineering — HA Web Studio`
  - Meta description: 163 characters, descriptive and actionable.
  - Canonical: `https://hawebstudio.com/m-a-malik`.
  - Schema.org JSON-LD: `ProfilePage` + `Person` node with name `M.A. Malik` and role `Studio Director & Technical Lead`.
  - Breadcrumbs: `Home > M.A. Malik`.
  - Responsive layout: Mobile, tablet, desktop tested with clean visual hierarchy.

---

## 7. Phase 6 — Technical QA & Verification

### Test Execution Summary

| Check | Command | Result | Details |
| :--- | :--- | :--- | :--- |
| **TypeScript Typecheck** | `pnpm type-check` | **PASS (exit 0)** | Zero type errors across the entire repository. |
| **Unit & Regression Suite** | `pnpm test` | **PASS (exit 0)** | 28 tests passing across 6 test suites (including link audit, route inventory, route guard, search ranking, structured content, and scroll-to-top). |
| **Dynamic Routes Check** | `node scripts/validation/check-dynamic-routes.mts` | **PASS (exit 0)** | All dynamic routes declare `dynamicParams = false` and match inventory patterns. |
| **Route Inventory Check** | `node scripts/validation/check-route-inventory.mts` | **PASS (exit 0)** | Route inventory matches sources deterministically; 21 static paths, 9 dynamic patterns, 172 dynamic paths. |
| **Link Audit** | `node scripts/validation/check-links.mts` | **PASS (exit 0)** | Internal links clean across MDX and TypeScript collections. |
| **SEO Surface Check** | `node scripts/seo/check-seo.mts` | **PASS (exit 0)** | All required SEO assets present; 0 issues. |
| **SEO Title Brand Check** | `node scripts/seo/check-title-brand.mts` | **PASS (exit 0)** | Zero double-brand rendering occurrences. |
| **Images Validation** | `node scripts/validation/check-images.mts` | **PASS (exit 0)** | All image references validated. |
| **Route Validation** | `node scripts/validation/check-routes.mts` | **PASS (exit 0)** | All static routes validated. |
| **Privacy Audit** | `git grep devazeem` | **PASS (exit 1 / 0 matches)** | Personal LinkedIn profile completely absent from public codebase. |
| **Legal Name Audit** | Probe on `http://localhost:3002/m-a-malik`, `/`, `/about`, `/contact`, `/services` | **PASS (exit 0)** | Zero occurrences of private legal name or personal handles after updating `company.founder` in `lib/business/company/index.ts`. |
| **Isolated Build & TypeScript** | `next build` in isolated `%TEMP%\ha-c312-build` | **PASS (exit 0)** | 180/180 static pages generated, TypeScript clean in 20.3s, `ƒ /m-a-malik` and `ƒ Proxy` present. |
| **Isolated HTTP Route Gate** | `BASE_URL=http://localhost:3005 node scripts/validation/check-dynamic-http.mts` | **PASS (exit 0)** | Dynamic route HTTP check passed; 190+ sitemap URLs, redirects, canonicals, and soft-404 boundaries verified. |
| **Malik Page Production Probe** | HTTP probe on isolated `http://localhost:3005/m-a-malik` | **PASS (exit 0)** | Status 200, `Contains devazeem: false`, `Contains legal name: false`, `Contains Azeem: false`, `Contains M.A. Malik: true`, canonical tag verified, Person JSON-LD verified. |

---

## 8. Exact Files Changed / Created

### New Files Created
1. `components/navigation/scroll-to-top.tsx` — Redesigned accessible scroll-to-top component.
2. `tests/scroll-to-top.test.mts` — Regression test for scroll-to-top component.
3. `.agents/skills/ha-content-workflow/SKILL.md` — Reusable human-centered content workflow skill.
4. `docs/content/human-centered-content-workflow.md` — Documentation of the content quality system.
5. `docs/website-improvement/step-17t-c312-malik-page-draft.md` — Factual content audit and page draft for M.A. Malik.
6. `app/(marketing)/m-a-malik/page.tsx` — Public profile page for M.A. Malik.
7. `docs/website-improvement/step-17t-c312-content-quality-seo-malik-scroll-report.md` — This comprehensive Phase C3.12 report.

### Existing Files Modified
1. `lib/business/company/index.ts` — Updated `company.founder` from `"Mohd Azeem Malik"` to `"M.A. Malik"` to prevent leaking private legal name into global structured data.
2. `components/layouts/deferred-globals.tsx` — Dynamically mounts `ScrollToTop` client-side with `{ ssr: false }`.
3. `config/routes.ts` — Added `malik: () => "/m-a-malik"`.
4. `scripts/shared/toolkit.mts` — Added `'/m-a-malik'` to `staticRoutes`.
5. `lib/routing/route-inventory.generated.json` — Regenerated inventory with 21 static paths (including `/m-a-malik`).

---

## 9. Current Environment & Listener Status

- **Port 3001**: PID 30184 (`D:\2. Agency\HA`) — Untouched, running.
- **Port 3002**: PID 41304 (`D:\2. Agency\Main Website\ha-web-studio`) — Untouched, running.
- **Port 3005**: Confirmed free before run; started with isolated PID 15948; HTTP verification executed; terminated cleanly; confirmed free now (TIME_WAIT).
- **Isolated Build Directory**: `%TEMP%\ha-c312-build` created, built, tested, and completely deleted (exit 0).
- **Shared `.next` directory**: Preserved; dev server remains intact.
- **IndexNow**: Zero URLs submitted.
- **Git State**: No commits made, no push, no deployment.