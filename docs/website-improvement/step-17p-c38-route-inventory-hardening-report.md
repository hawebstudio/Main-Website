# Phase C3.10 — Route Inventory Blockers and Provider Guard

## 0. Verdict

**Blockers resolved, with one packaging caveat that only a commit can close.**

| Finding | Status | Evidence |
| :--- | :--- | :--- |
| **D-1** — inventory untracked, `next dev` 500s without it | **Resolved — committed in `5ad5583`** (see the post-commit note below) | `git ls-files -s lib/routing` shows both blobs; `git checkout-index -a` materializes them; `validate:inventory` passes in a copy that never ran a prior build |
| **D-2** — publish predicate duplicated | **Resolved** | One implementation in `lib/content/status.ts`, imported by `lib/content/source.ts` and by the generator; the mirror is deleted |
| **D-7** — inventory ignores `CONTENT_PROVIDER` | **Resolved** | `CONTENT_PROVIDER=sanity` fails `generate-route-inventory` and `build:prepare` with an explicit diagnostic, leaving the inventory untouched |
| Expanded HTTP validation | **Done, passing** | 18 valid paths, 9 ghost paths, 20 static routes, 192 sitemap URLs, 19 redirects, plus encoding/trailing-slash/reserved/RSC edge cases — exit 0 against an isolated production build |
| Inventory determinism | **Preserved** | SHA-256 `79e2cefc7d4ed00eac734d64dda3ef8b58bb8d6168f0e940a8ee9f180fe95e52`, identical before and after regeneration, and identical in an independent copy |

No production route changed. The inventory still holds 20 static paths, 9 dynamic patterns and 172 content paths, and its bytes did not move.

### Post-commit status (C3.11)

These findings were committed as `5ad5583e289b1a520a43cd84d5cfb840ff2745a5` on `remove-animations-for-performance` — 11 files, local only, not pushed. This document describes the state that produced the commit and is left as the record of that phase; `step-17q-c38-c310-integration-reconciliation-report.md` records what the committed state actually contains and how it was completed.

Three facts a reader of this report needs in order to read it correctly:

- **D-1 is fully closed** on disk and in Git: both `lib/routing` files are tracked at that commit.
- **`proxy.ts` is not in that commit**, so a clean checkout of `5ad5583` alone contains the guard and the table but no caller — the soft-404 fix is not active there until step-17q's integration commit.
- **The committed inventory describes the working tree, not `HEAD`.** It lists the five consolidated family slugs while the committed content still serves ten legacy ones, and that commit's `prepare.mts` does not regenerate the table. A build from it that skips regeneration would therefore 404 ten live pages. Step-17q adds regeneration before `next build` and the guard call.

---

## 1. Preflight

| Item | Value |
| :--- | :--- |
| Branch | `remove-animations-for-performance` |
| HEAD | `3a2c3535f1d1c28b0f3aac5935736a15b2df99e7` |
| `git status --short` | 74 entries before any edit (unchanged from the C3.9 report) |
| `git ls-files lib/routing` | empty — neither file tracked |
| `git check-ignore lib/routing/*` | no match — not ignored, simply never added |
| Port 3001 | PID 30184 (untouched before and after) |
| Port 3002 | PID 41304 (untouched before and after) |
| Port 3005 | free before every start; free now |
| CI | no `.github`, no workflow file anywhere; the only YAML is `pnpm-lock.yaml` / `pnpm-workspace.yaml` |

---

## 2. Root cause and minimal correction

### D-1 — the inventory was never added to version control

**Cause.** `proxy.ts` imports `lib/routing/content-path-guard.ts`, which imports `route-inventory.generated.json`. Both files were created by earlier phases and never staged. `.gitignore` does not mention them, so nothing was hiding them — they were simply left untracked.

**Why committing them is correct rather than ignoring them.** `pnpm dev` runs `next dev` only; it never runs `build:prepare`. So the proxy's static import is the *only* producer of that module in development, and it must exist in a checkout. `scripts/validation/check-dynamic-routes.mts` already tells the operator to "run `pnpm build:prepare` and commit the result", confirming the intended lifecycle. C3.9 measured the failure directly: with the JSON moved aside, `next dev` answered **HTTP 500 — Module not found: Can't resolve './route-inventory.generated.json'** via `proxy.ts`.

**Correction.** `git add` of exactly two paths — `lib/routing/content-path-guard.ts` and `lib/routing/route-inventory.generated.json`. Nothing else was staged; the 74 pre-existing entries are untouched.

**Status.** §10 forbade committing during this phase, so the files were staged (`A`). They were committed afterwards as `5ad5583` (see the post-commit note in §0); D-1 is closed.

### D-2 — two publish predicates

**Cause.** The generator carried a hand-copied mirror:

```ts
if (typeof entry.status === 'string') return entry.status === 'published'
return entry.draft !== true
```

against the runtime:

```ts
if (entry.status) return entry.status
if (entry.draft) return 'draft'
return 'published'
```

They agree for well-formed frontmatter but diverge wherever `status` is present and truthy yet not `'published'` — e.g. `status: 1` is *published* to the mirror and *draft* to the runtime. The staleness check re-derives with the same mirror, so the divergence could never surface as a failure: it would show up only as a page that exists being 404'd by the proxy, or a draft staying routable.

**Correction.** The predicate moved, unchanged, into a dependency-free module that both sides import. `lib/content/source.ts` keeps its public exports (so no importer changes) and re-exports from the new module; the generator's mirror is deleted and its MDX filter calls the shared function.

### D-7 — the inventory assumed Git

**Cause.** The enumerators read `content/services`, `content/work`, `lib/business/locations` and the MDX directories directly, while pages resolve content through `resolveProvider`, which honours `CONTENT_PROVIDER` (`config/content.ts`). With a CMS configured, the inventory would describe a site that no longer exists — and, again, the freshness check would agree with it.

**Correction.** One guard at the top of `buildRouteInventory()`, before any file is written:

> `CONTENT_PROVIDER="sanity" cannot be represented by the route inventory: it is derived from the git/MDX sources, so a CMS-backed site would 404 its own pages or serve URLs that no longer exist. Set CONTENT_PROVIDER=git, or extend the enumerators in scripts/shared/route-inventory.mts for that provider.`

No fallback to Git data, no CMS inventory implementation — as scoped.

---

## 3. Files changed

| File | Change | Why necessary |
| :--- | :--- | :--- |
| `lib/content/status.ts` | **new** — `resolveStatus` + `isPublished`, type-only import | Single implementation for D-2; dependency-free so `.mts` scripts can load it |
| `lib/content/source.ts` | −2 function bodies, +1 import, +1 re-export | Keeps every existing importer working |
| `scripts/shared/route-inventory.mts` | delete mirror, import shared predicate, add provider guard + `StatusFields` alias | D-2 and D-7 |
| `lib/routing/content-path-guard.ts` | staged unchanged | D-1 |
| `lib/routing/route-inventory.generated.json` | staged unchanged | D-1 |
| `scripts/validation/check-route-inventory.mts` | **new** — predicate table, staleness, provider fail-fast | §3 and §4 regression cover |
| `scripts/validation/check-dynamic-http.mts` | rewritten (see §6) | §5 coverage |
| `package.json` | `validate:inventory`, added to the `validate` chain | Wires the new check |

Deliberately not touched: `proxy.ts`, `next.config.mjs`, `app/**`, content, `scripts/build/prepare.mts`, `check-dynamic-routes.mts`.

---

## 4. Provider compatibility matrix

| `CONTENT_PROVIDER` | Inventory | Evidence |
| :--- | :--- | :--- |
| `git` (default, unset) | **supported** — 20 static / 9 patterns / 172 paths | `build:prepare` exit 0; inventory byte-identical |
| `sanity` | **fails fast** | `generate-route-inventory` exit **1**; `build:prepare` exit **1**; inventory hash unchanged after the failure |
| `decap`, `contentlayer`, `payload`, `notion`, `headless-api` | **fails fast (by construction)** | Inferred, not individually executed: the guard is a single `contentProviderConfig.type !== 'git'` comparison, and `config/content.ts` is the only source of that value. Every one of those types resolves to a different branch of `resolveProvider`. |

The guard runs before `writeJson`, so a failed preparation cannot leave a half-written or wrong inventory behind — verified by hashing the file before and after the failure.

---

## 5. Inventory determinism and clean checkout

| Check | Result |
| :--- | :--- |
| `build:prepare` in the repository | exit 0, hash `79e2cef…` before **and** after — byte-identical |
| `build:prepare` in an independent copy (no `.next`, fresh install) | exit 0, hash `79e2cef…` — identical across checkouts |
| `git checkout-index -a --prefix=<tmp>/` | both files materialized (`content-path-guard.ts`, `route-inventory.generated.json` @ `79e2cef…`) |
| `validate:inventory` in a copy that never ran a prior build | exit 0 (also proves no missing-module failure at that path) |
| Tampered inventory → `validate:inventory` | exit **1**, "does not match what the git sources generate"; restored to `79e2cef…` |

Adding empty-path or hand-edited entries now fails locally instead of 404-ing in production.

---

## 6. Expanded HTTP validation

`scripts/validation/check-dynamic-http.mts`, run with `BASE_URL=http://localhost:3005` against a production build of an isolated copy. Exit **0**, wall time **79.5 s** (it is a pre-deployment gate, deliberately not part of `pnpm validate`, which needs no server).

Coverage actually executed:

| Group | Assertions |
| :--- | :--- |
| 9 dynamic patterns | up to **two** valid paths each (18 when available) → 200, own canonical, non-empty non-404 `<title>`, `<h1>`, matching CSP nonce |
| 9 dynamic patterns | one ghost each → 404, `noindex`, **no** canonical, not-found `<title>`, matching nonce |
| 20 static paths | 200 + canonical + title + `<h1>` — includes `/work/client`, `/work/internal`, `/work/labs`, `/work/personal` and `/services/families`, which share a prefix with a dynamic shape |
| 19 redirects | source → **308**, `Location` equals the configured `destination`, destination itself 200 |
| Sitemap | 200, non-empty, every `<loc>` returns 200 (192 URLs, 8 in flight) |
| Trailing slash | valid + `/` → 308 to the normalized path; ghost + `/` → 308, then 404 |
| Encoding | percent-encoded **param** segment of a valid page → 200 with the decoded canonical; encoded ghost → 404; malformed `%E0%A4%A` → 404 (not 500) |
| Reserved target | `/__unmatched-content-path` → 404 `noindex` |
| RSC | ghost with `RSC: 1` → 404 |

Redirect sources and destinations are read from `next.config.mjs` at runtime instead of being copied into the test, so the two cannot drift — the same principle as D-2.

**Two things the new coverage found:**

1. Next answers config redirects with a **relative** `Location` (`/services/families/website-development`). The first version of the check called `new URL(location)` and aborted with "Invalid URL". Fixed by resolving against `BASE_URL`; this is a test bug, not a site bug.
2. Encoding a *literal* route segment (`/case%2Dstudies/…`) 404s inside Next's own routing before any page runs. That is not a content URL and the guard is not involved, so the check now encodes only the `[param]` positions; `/services/business%2Dwebsite%2Ddevelopment` → 200 with the normal-form canonical.

### Observed matrix (isolated production build)

| Request | Status | robots | canonical | Location |
| :--- | :-: | :--- | :--- | :--- |
| `/services/business-website-development` | 200 | `index, follow` | its own URL | — |
| `/services/families/website-development` | 200 | `index, follow` | its own URL | — |
| `/technologies/frontend/react` | 200 | `index, follow` | its own URL | — |
| `/services/c3p-ghost` | **404** | `noindex` | none | — |
| `/technologies/c3p-ghost/c3p-ghost` | **404** | `noindex` | none | — |
| `/services/c3p-ghost/` | 308 | — | — | `/services/c3p-ghost` |
| `/services/business-website-development/` | 308 | — | — | `/services/business-website-development` |
| `/services/business%2Dwebsite%2Ddevelopment` | 200 | `index, follow` | normal form | — |
| `/services/c3p%2Dghost` | **404** | `noindex` | none | — |
| `/services/%E0%A4%A` | 404 | `noindex` | none | — |
| `/__unmatched-content-path` | 404 | `noindex` | none | — |
| `/services/families/websites` | 308 | — | — | `/services/families/website-development` |
| `/services/c3p-ghost` + `RSC: 1` | 404 | — | — | — |
| `/services/c3p-ghost` + `RSC: 1` + `next-router-prefetch: 1` | 200 `text/x-component` | — | — | — |

Ghost 404s carry `Cache-Control: private, no-cache, no-store, max-age=0, must-revalidate`; nonce matched on `/`, `/services/c3p-ghost` and `/insights`.

**Set equality, re-measured on this build:** the inventory's 192 paths and the sitemap's 192 URLs are identical sets (`diff` empty). Nothing routable is excluded, nothing extra is allowed.

**Prefetch:** unchanged and still acceptable. Router prefetches bypass the matcher by design (`proxy.ts`), returning 200 `text/x-component` containing the 404 UI — invisible to crawlers, and removing the exclusion would reintroduce the baked-nonce CSP breakage the matcher comment documents. No action.

---

## 7. Build and CI entry points

| Entry point | Prepares inventory first? |
| :--- | :--- |
| `pnpm build` | **yes** — `build:prepare && next build && build:verify && seo:indexnow` |
| `pnpm dev` / `dev:turbo` | no, and it must not: it consumes the committed JSON (this is why D-1 mattered) |
| CI | none exists |
| Deploy config (`vercel.json`, Dockerfile, Netlify/CF config) | none in the repository |
| `seo:indexnow` | inert unless `INDEXNOW_ENABLED=true`; scripts do not load `.env` |

New guard: `build:prepare` now exits 1 (and therefore stops `pnpm build` before `next build`) when the provider is not Git, and `validate:inventory` exits 1 when the committed inventory no longer matches the sources. Both were exercised.

---

## 8. Commands executed

| Command | Exit | Result |
| :--- | :-: | :--- |
| `git rev-parse HEAD` / `git status --short` | 0 | `3a2c3535…`; 74 entries |
| `git ls-files lib/routing`, `git check-ignore` | 0 | 0 tracked, not ignored |
| `node scripts/build/prepare.mts` | 0 | 20 static, 9 patterns, 172 paths; hash identical |
| `CONTENT_PROVIDER=sanity node scripts/build/generate-route-inventory.mts` | **1** | provider diagnostic; hash unchanged |
| `CONTENT_PROVIDER=sanity node scripts/build/prepare.mts` (isolated) | **1** | `Build prepare failed`, inventory unchanged |
| `node scripts/validation/check-route-inventory.mts` | 0 | repository **and** isolated copy |
| ↳ with one fake service path added | **1** | staleness issue; restored |
| `node scripts/validation/check-dynamic-routes.mts` | 0 | passed |
| `pnpm type-check` | 0 | clean |
| `node scripts/validation/check-routes.mts` | 0 | 1 pre-existing `/ponytail` warning |
| `node scripts/validation/check-content.mts` | 0 | passed |
| `node scripts/validation/check-links.mts` | **1** | 102 pre-existing false positives (§9) |
| `node scripts/seo/check-seo.mts` | 0 | 18 pre-existing length warnings |
| `node scripts/seo/check-title-brand.mts` | 0 | passed |
| `npx eslint <5 changed files>` | **1** | 2 pre-existing unused imports in `lib/content/source.ts` (§9) |
| `pnpm install --frozen-lockfile --ignore-scripts` (isolated) | 0 | 21.9 s |
| `node scripts/build/prepare.mts` (isolated) | 0 | same hash as the repository |
| `npx next build` (isolated) | 0 | compiled 10.3 s, TypeScript 11.0 s, `ƒ Proxy` present |
| `next start -p 3005` (isolated) | — | ready in 1164 ms |
| `BASE_URL=http://localhost:3005 node scripts/validation/check-dynamic-http.mts` | 0 | covered matrix above, 79.5 s |
| `git checkout-index -a --prefix=…` | 0 | both `lib/routing` files present |
| `pnpm build`, `pnpm validate`, deploy, IndexNow | — | **not run** (§7: `validate` submits to IndexNow and builds into the shared `.next`) |

The check was run three times: two failures were bugs in the new test (relative `Location`, encoded literal segment), each fixed and re-run to green. They are recorded rather than silently corrected because they are exactly the cases the old validator never exercised.

---

## 9. Pre-existing issues deliberately left unchanged

1. **`validate:links` fails (exit 1, 102 assertions).** Every message points at `/services/…` (98) or `/work/…` (4) links inside `content/technologies/*.mdx`, including `/services/business-website-development`, which this phase served as **200** with its own canonical. The validator builds `knownRoutes` from `staticRoutes` plus MDX entries, and these targets are TypeScript-defined services, so it cannot see them. It is a validator blind spot, not broken content, and it is out of scope here.
2. **Two ESLint errors in `lib/content/source.ts`** — `serviceSchema`, `projectSchema` imported and never referenced. Present before this phase; the diff for this phase does not touch those imports. Left as-is so lint output stays attributable.
3. **18 `seo:check` length warnings** — unchanged from C3.9.
4. **`/ponytail` static-route warning** — unchanged from C3.9.
5. **`MODULE_TYPELESS_PACKAGE_JSON` warning** when the generator imports `lib/content/status.ts`. Cosmetic (Node reparses one small file); adding `"type": "module"` is deliberately avoided because `lib/content/providers/git.ts` documents the CJS-launcher breakage that follows.

---

## 10. Cleanup, ports and preservation

- **Port 3001** — PID 30184 before and after; never contacted.
- **Port 3002** — PID 41304 before and after; never restarted, `.next` untouched (mtime still `2026-10-14 19:50:29`).
- **Port 3005** — confirmed free immediately before starting; the isolated `next start` (PID 15932, command line verified to point at `%TEMP%\ha-c3p`) needed `taskkill` because Git Bash `kill` could not signal it; **3005 is free now**.
- **Temporaries** — `%TEMP%\ha-c3p`, `ha-c3p-index`, `ha-c3p-probe`, the probe HTML/headers, the runner script and the build log are deleted.
- **Repository** — no reset, clean, stash or checkout. All 74 pre-existing entries preserved; `git status --short` now reports 78, accounted for exactly: `lib/routing/` no longer collapses to a single `??` and instead shows two `A` entries (+1), `lib/content/source.ts` gained an `M` (+1), and two files are new `??` (`lib/content/status.ts`, `scripts/validation/check-route-inventory.mts`, +2). Inventory hash `79e2cef…` throughout; shared `.next` never built into (mtime unchanged).
- **Staged during this phase, committed afterwards** — `git diff --cached --name-only` listed exactly `lib/routing/content-path-guard.ts` and `lib/routing/route-inventory.generated.json`; both are in `5ad5583`.
- Nothing was deployed, published, or submitted to IndexNow. No owner identity appears in this report.

---

## 11. Remaining deployment-only checks and rollback

Still only provable on the real host:

1. The host's own 404 handling for the rewritten URL (the proxy rewrites to a non-routable path; local `next start` returns 404 with `noindex`).
2. Whether a CDN edge cached any pre-fix soft-404 response; purge those URLs after deploying.
3. Crawler and IndexNow behaviour for the previously soft-404ing URLs.
4. A traced deployment serving the inventory from the proxy bundle. C3.9 verified the bundle *contains* it inlined (no `node:fs`, no `content/` in `middleware.js.nft.json`); the deployed artefact itself is not re-verified here.

Rollback, narrow and additive: `git restore --staged lib/routing` plus deleting the new files returns the tree to its prior state; the inventory is generated data, so reverting it restores the previous route table exactly. A deployed rollback is a redeploy of the previous commit — no data migration, no schema, no infrastructure change is involved.

**Recommended next step:** commit the caller (`proxy.ts`) and build-time regeneration (`scripts/build/prepare.mts`) so the committed guard actually runs, then run the deployment checklist from the C3.9 report against a preview origin before promoting. Both are done in step-17q.
