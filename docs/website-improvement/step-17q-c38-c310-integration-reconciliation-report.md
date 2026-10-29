# Phase C3.11 — Reconcile C3.8 Proxy Integration With C3.10 Commit

## 0. Verdict

**Integration committed and verified** — outcome A.

Commit `5ad5583` shipped the route-inventory guard and its generated table but not the two things that make them run: `proxy.ts` never calls `isUnknownContentPath`, and `scripts/build/prepare.mts` never regenerates the table. Both diffs turned out to be pure, separable integration edits with no unrelated work, so they are committed here together with the 404 boundary's metadata and both reports.

One finding changed the shape of the commit. **The table committed in `5ad5583` describes the working tree, not `HEAD`**: 172 dynamic paths against `HEAD`'s 177. Five consolidated family slugs are in it that `HEAD` does not serve, and ten legacy family slugs are missing that `HEAD` *does* serve. Without build-time regeneration, a build from that commit would 404 ten live pages. With the regeneration added here, a clean checkout of this commit builds the correct table — verified end to end.

| Question | Answer |
| :--- | :--- |
| Is the dependency chain complete at `5ad5583`? | Files yes, **caller no** — `proxy.ts` is uncommitted there |
| Is the fix active in the current working tree? | **Yes**, verified in C3.10 and re-verified here |
| Is the fix active in a clean checkout of `5ad5583`? | **No** — nothing imports the guard |
| Is it active in a clean checkout of this commit? | **Yes** — verified by building `HEAD` + the three files in isolation |
| Is the committed inventory safe at `HEAD` without regeneration? | **No** — it would 404 the 10 legacy family pages |

---

## 1. Preflight

| Item | Value |
| :--- | :--- |
| Repository root | `D:/2. Agency/Main Website/ha-web-studio` |
| Branch | `remove-animations-for-performance` |
| HEAD | `5ad5583e289b1a520a43cd84d5cfb840ff2745a5` (`fix: harden dynamic route inventory validation`) |
| Upstream | `ahead 1` — commit is local; nothing pushed |
| `git status --short` | 115 entries: 50 modified, 65 untracked, 0 staged |
| Port 3001 | PID 30184 — not contacted |
| Port 3002 | PID 41304 — not contacted |
| Port 3005 | free at the start; free now |

The 115 counts are not comparable to the C3.10 figure of 78: committing one file inside a wholly untracked `docs/website-improvement/` made Git expand that directory into 47 individual entries. 50 + 65 = 115 accounts for all of it, and every pre-existing entry is still present.

---

## 2. Dependency audit

The runtime chain the C3.8 work depends on:

```
proxy.ts  →  @/lib/routing/content-path-guard  →  ./route-inventory.generated.json
                                                   ↑ written by scripts/build/prepare.mts
                                                     via scripts/shared/route-inventory.mts
```

| Link | State before this phase | Needed for the fix to run? |
| :--- | :--- | :--- |
| `lib/routing/content-path-guard.ts` | **committed** (`5ad5583`) | yes |
| `lib/routing/route-inventory.generated.json` | **committed** (`5ad5583`) | yes, but stale at `HEAD` (§3) |
| `lib/content/status.ts` + generator predicate | committed | yes |
| `proxy.ts` guard block + import | **uncommitted** | **yes** — the only caller |
| `scripts/build/prepare.mts` regeneration | **uncommitted** | **yes** — otherwise builds use the stale table |
| `app/not-found.tsx` metadata (`canonical: null`, `title: 'Page not found'`) | **uncommitted** | **yes** — the document the guard rewrites to (§4) |
| `app/**/[slug]/page.tsx` `dynamicParams = false` (8 files) | uncommitted | no — production is handled by the proxy; this governs the dev server |
| `next.config.mjs` family redirects | uncommitted | no — different change set |
| `package.json` `validate:dynamic` / `validate:http` entries | uncommitted | no — the checks are runnable directly |

`proxy.ts` and `prepare.mts` were each a single-purpose diff (14 and 17 lines); neither carried unrelated edits, so no hunk-level conflict existed. The eight page files were **not** separable: they mix the `dynamicParams = false` flag with unrelated copy rewrites in the same file, which is why they stay with their own change set.

---

## 3. The stale-table finding

Measured, not inferred: `git checkout-index` of `HEAD` into a clean directory, then `node scripts/build/prepare.mts` re-derived the table from the committed content.

| | Committed at `5ad5583` | `HEAD` content |
| :--- | :--- | :--- |
| Static paths | 20 | 20 |
| Dynamic patterns | 9 | 9 |
| Dynamic paths | 172 | **177** |
| SHA-256 | `79e2cef…` | `82eedd9…` |

Set difference:

- **In the committed table, absent from `HEAD` content (5):** `/services/families/automation-integrations`, `/custom-web-applications`, `/search-discoverability`, `/website-development`, `/website-optimization-care` — the consolidated families, which only exist in the uncommitted content.
- **In `HEAD` content, absent from the committed table (10):** `/services/families/analytics`, `/business-systems`, `/design`, `/development`, `/growth`, `/integrations`, `/maintenance`, `/performance-security`, `/seo-search`, `/websites` — the legacy families, which `HEAD` still serves.

`HEAD`'s `next.config.mjs` redirects *from* the consolidated slugs *to* the legacy ones (11 rules, the inverse of the working tree's 19). So the five table-only paths land on redirects and are harmless, while the ten missing ones are real pages the guard would rewrite to 404 if the table were used as-is.

This is a direct consequence of committing generated data ahead of the content it describes. It does not need the inventory re-committed here: `pnpm build` now regenerates before `next build`, so every build produces a table that matches its own content. It does mean `pnpm validate:inventory` fails in a clean checkout of `HEAD` with the correct diagnostic until the content change set lands.

---

## 4. Exact changes

| File | Change | Why it is necessary |
| :--- | :--- | :--- |
| `proxy.ts` | +1 import, +13-line guarded rewrite (CSP header preserved) | the only caller of `isUnknownContentPath`; without it the commit is inert |
| `scripts/build/prepare.mts` | +1 import, +16-line try/catch that writes the inventory before `next build` | makes builds self-correcting instead of trusting a committed blob |
| `app/not-found.tsx` | +`Metadata` import and `metadata = { title: 'Page not found', alternates: { canonical: null } }` | measured defect: without it every 404 inherited the homepage canonical and the site title |
| `docs/.../step-17p-…md` | post-commit note + four corrected statements | the report claimed the inventory was uncommitted, which stopped being true at `5ad5583` |
| `docs/.../step-17q-…md` | this report | phase deliverable |

`app/not-found.tsx` is a single-purpose diff (a metadata export plus one blank line removed) with no unrelated edits, and it is what makes the guard's output match the contract C3.10 verified. The first candidate build, without it, produced 24 validator failures — all of them `404 response leaked a canonical URL (https://hawebstudio.com)` and `expected the not-found title, got "HA Web Studio"` — which is why it is in this commit rather than left behind.

---

## 5. Verification

The artifact under test was built exactly as it will be committed: `git checkout-index -a` of `HEAD` into an isolated directory, then the three files copied over. Nothing else from the working tree was present.

| Check | Result |
| :--- | :--- |
| `pnpm install --frozen-lockfile --ignore-scripts` | exit 0, 45.1 s |
| `node scripts/build/prepare.mts` | exit 0 — `20 static paths, 9 dynamic patterns, 177 content paths` |
| second `build:prepare` | exit 0, **identical** SHA-256 `82eedd9…` — deterministic |
| `npx next build` | exit 0 — compiled 17.4 s, TypeScript 21.2 s, `ƒ Proxy` present |
| `pnpm type-check` | exit 0 |
| `node scripts/validation/check-route-inventory.mts` | exit 0 — predicate table, staleness, provider spawn |
| `CONTENT_PROVIDER=sanity node scripts/build/generate-route-inventory.mts` | exit **1**, `CONTENT_PROVIDER="sanity" cannot be represented`, inventory hash unchanged |
| `BASE_URL=http://localhost:3005 node scripts/validation/check-dynamic-http.mts` | exit **0**, 49.0 s (without `not-found.tsx`: exit 1, 24 issues — §4) |
| Inventory inside the built proxy bundle | present in the proxy's server chunk (`.next/server/chunks/[root-of-the-server]__0nekykk._.js`) |
| Determinism across checkouts | table matches the content it was built from, 197 = 197 static+dynamic paths |

Observed matrix on the integration candidate (`HEAD` content + three files):

| Request | Result |
| :--- | :--- |
| `/services/business-website-development` | 200 |
| `/services/families/analytics` (legacy, exists at `HEAD`) | 200 — present in the regenerated table |
| `/services/families/website-development` (consolidated) | 308 → `/services/families/websites` (`HEAD`'s redirect wins) |
| `/services/c3p-ghost` | **404**, `noindex`, no canonical, `<title>Page not found — HA Web Studio` |
| `/services/c3p-ghost/` | 308 to the unslashed path |
| `/__unmatched-content-path` | 404, `noindex` |
| `/sitemap.xml` | 200, 197 `<loc>` entries = 197 inventory paths, every one 200 |
| 11 `HEAD` redirects, 20 static routes, 18 valid dynamic paths | 308→200 and 200 respectively, asserted by the validator |

`node scripts/validation/check-dynamic-routes.mts` **fails at `HEAD`** with 8 issues: every committed `[slug]` page declares `generateStaticParams` but lacks `export const dynamicParams = false`. Those flags live in the page change set that is still uncommitted. This is a known, documented consequence rather than a regression — the production 404 does not depend on the flag (the proxy rejects before routing), the flag only keeps the development server honest, and the check is not wired into the committed `validate` chain.

---

## 6. Commit decision — A

Staged: the three integration files plus the corrected and new reports. Both integration diffs were confirmed identical to the bytes that were built and tested (`cmp`), and `git diff --cached --check` passed before committing.

Subject: `fix: integrate dynamic route soft-404 guard`. No amend of `5ad5583`, no push, no deploy.

---

## 7. Working tree

- 115 entries before, and only the committed files left it. All 50 modified and 65 untracked entries remain; nothing was reset, cleaned, stashed or restored.
- The generated inventory in the working tree still matches the working tree's content (`79e2cef…`) and is untouched by this phase.
- The shared `.next` was never used; builds ran only in `%TEMP%`.

---

## 8. Remaining risks

1. **`HEAD`'s committed table is stale relative to its content** until the content change set lands. Builds are correct because they regenerate; `validate:inventory` will report the mismatch in a clean checkout, and `git status` will show the inventory as modified after any working-tree build.
2. **The 8 `dynamicParams = false` flags are still uncommitted**, so `validate:dynamic` fails at this commit and unknown slugs still render softly in `next dev` (never in production).
3. **`package.json` does not wire `validate:dynamic`/`validate:http`** at this commit; the checks are runnable as documented but not part of `pnpm validate`.
4. Deployment-only checks from step-17p §11 still apply: host 404 handling, CDN-cached pre-fix soft-404 URLs, crawler behaviour, and a traced deployment serving the inlined table.

---

## 9. Environments

Port 3001 (PID 30184) and 3002 (PID 41304) were never contacted. Port 3005 was confirmed free before each start, used by a single isolated `next start` and released with `taskkill` on the verified PID. The isolated copy and its logs were deleted. Nothing was deployed, published, pushed or submitted to IndexNow. No owner identity appears in this report.
