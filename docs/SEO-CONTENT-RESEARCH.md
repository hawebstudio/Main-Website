# HA Web Studio — SEO and Search-Intent Research (13 October 2026)

## Scope and method

This review covers the content inventory in `content/` and the main public routes. The companion `SEO-CONTENT-INTENT-MAP.csv` inventories every Markdown/MDX page found in services, problem pages, insights, case studies, and technology pages, assigning a draft intent and treatment. Those labels are a starting map, not a substitute for query-level Search Console exports, live SERP checks, or owner verification.

## What the supplied Search Console export suggests

The provided performance export showed the homepage with 753 impressions / 4 clicks, `/services/business-website-development` with 51 impressions / 2 clicks, `/technologies/cms/payload-cms` with 614 impressions / 1 click, and `/technologies/cloud-infrastructure/vercel` with 373 impressions / 1 click. This is an early sample, not enough to infer stable CTR or ranking trends. Prioritize a clearer commercial homepage and business-website service path, then improve technical pages' titles/snippets and make their relationship to services explicit.

## Primary intent groups

- **Homepage:** commercial investigation — quickly explain who HA helps, which problems it solves, what it builds, and how to start. Avoid positioning as a broad “everything digital” agency.
- **Service pages:** transactional/commercial — describe fit, deliverables, scope boundaries, workflow, dependencies, typical decision factors, and how to request a quote. Do not invent prices, delivery times, client counts, or guarantees.
- **Problem pages:** problem-aware — lead with symptoms and diagnosis, explain practical options, then link to the relevant service only where it is a genuine next step. Avoid doorway pages with near-identical copy.
- **Technology pages:** informational/evaluation — answer “what is it?”, “when is it useful?”, “what are the trade-offs?”, and “how does it fit this project's requirements?”. Do not claim a technology guarantees SEO or rankings.
- **Insights:** answer the question in the opening, explain steps and trade-offs, cite primary documentation, include examples that add real value, and link to relevant services. Keep updates tied to actual changes.
- **Case studies:** evidence/proof — clearly label internal, personal, client, and experimental work. Describe actual role, constraints, implementation, and outcomes; no made-up ROI or performance numbers.

## Recommended service positioning

1. **Business website development** — custom business websites for service firms and small teams; clear positioning, responsive UI, CMS where needed, lead capture, technical SEO foundations, and deployment.
2. **Website redesign** — improve structure, content clarity, accessibility, performance and conversion paths while preserving existing URLs and search equity wherever possible.
3. **Ecommerce development** — storefronts and integrations based on platform fit; describe catalog, payments, shipping, inventory, and content requirements rather than promising revenue.
4. **Web application development** — custom tools and workflows where off-the-shelf software is insufficient; clarify requirements, user roles, data, integrations and maintenance.
5. **Technical SEO implementation** — crawl/indexability, metadata, canonical/redirect consistency, structured data, sitemap/robots, and performance diagnostics; distinguish implementation from ongoing SEO campaigns.

## Editorial rules for every page

- One primary intent per URL; use related phrases naturally, not as a keyword list.
- Distinct, accurate title and H1. Google may derive title links from both page titles and visible headings; avoid boilerplate and keyword stuffing.
- Lead with the answer/value for the intended visitor; do not bury it under generic positioning.
- Include proof only when it can be verified. Where a case study has no measured outcomes, describe the shipped work and constraints instead.
- Use descriptive internal-link text. Connect articles to the most relevant service and connect service pages to useful proof.
- Preserve indexed URLs. Any URL removal or slug change requires a closest-equivalent redirect and post-launch monitoring.
- Do not create thin pages solely to target variants of a keyword. Merge pages that answer the same intent unless there is a clear audience/use-case distinction.
- Add FAQ content only when it answers real buyer questions; FAQ markup does not guarantee a search enhancement.

## Research sources

- Google Search Central, helpful and people-first content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google Search Central, title links: https://developers.google.com/search/docs/appearance/title-link
- Google Search Central, SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google Search Central, developer SEO guide: https://developers.google.com/search/docs/fundamentals/get-started-developers
- GSAP ScrollTrigger: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- GSAP matchMedia and reduced-motion conditions: https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/
- Public competitor/service-page review: search results for ecommerce development and technical SEO services in India, including https://www.webthropic.com/in/services/ecommerce-website-development and https://www.praveenpatel.com/services/technical-seo-audit. Competitor claims are not copied or treated as independently verified market facts.

## Important limitation

This pass maps every inventoried content file to an intent and research treatment. It does **not** mean every article has undergone a full line-by-line rewrite, and it does not claim that keyword volume or ranking gains have been validated. Before publishing each content page, compare its primary query against the current Search Console query/page exports and inspect the live SERP for that query.
