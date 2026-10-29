# Step 17a: Service Catalogue Consolidation Audit & URL Migration Plan

**Date:** October 19, 2026
**Repository:** `D:\2. Agency\Main Website\ha-web-studio`
**Branch:** `remove-animations-for-performance`
**Phase:** Phase C1 (Audit and Planning Only — Zero Application Code or Content Modified)
**Launch Readiness:** **NOT READY**

---

## 1. Executive Summary & Context

HA Web Studio's current service catalogue is fragmented across **11 service families** and **31 individual services**. Several families contain only one or two offerings (e.g., `design`, `integrations`, `analytics`, `development`, `maintenance`), creating an unnecessarily shallow and confusing navigation structure for potential clients. Concurrently, several offerings exhibit overlapping positioning (e.g., CRO vs. Customer Acquisition, Local Maps vs. Local SEO, Website Planning vs. Scoping).

### Phase C1 Objectives:
1. **Exhaustive Catalogue Audit:** Provide an empirical inventory of all 11 families and 31 services derived directly from current codebase files.
2. **Six-Family Consolidation Plan:** Map every existing offering to one of six commercially coherent public families:
   1. **Website Development**
   2. **eCommerce Development**
   3. **Search & Discoverability**
   4. **Automation & Integrations**
   5. **Custom Web Applications**
   6. **Website Optimization & Care**
3. **URL Ecosystem & SEO Preservation:** Establish a zero-downtime URL migration and redirect plan. By design, **all 31 individual service URLs (`/services/[slug]`) are preserved unchanged**, preventing broken internal links across MDX case studies, insights, and search engine index listings. Family URLs are mapped cleanly with zero redirect loops or chains.
4. **Scope Safeguard:** **Audit and planning only.** No application code, schemas, routes, or content are altered during Phase C1.

---

## 2. Inventory of Current 11 Service Families

| # | Current Family Slug | Public Title | Services Count | Current URL | Description / Commercial Scope |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | `websites` | Websites | 6 | `/services/families/websites` | Comprehensive website strategy, design, custom development, and dynamic CMS content. |
| **2** | `design` | Design | 1 | `/services/families/design` | User interface and experience design, brand systems, and wireframing for digital products. |
| **3** | `ecommerce` | eCommerce | 4 | `/services/families/ecommerce` | Custom storefronts, Shopify/WooCommerce builds, payment gateways, and checkout flows. |
| **4** | `growth` | Growth | 5 | `/services/families/growth` | Lead capture, conversion optimization, local Google Maps visibility, and acquisition systems. |
| **5** | `seo-search` | SEO & Search | 4 | `/services/families/seo-search` | Technical SEO, search visibility strategy, structured data markup, and AI Answer Engine Optimization. |
| **6** | `business-systems` | Business Systems | 2 | `/services/families/business-systems` | Scheduling automation, calendar synchronization, and WhatsApp Business API integration. |
| **7** | `integrations` | Integrations | 1 | `/services/families/integrations` | Custom API connections, third-party webhook sync, and workflow automation. |
| **8** | `analytics` | Analytics | 1 | `/services/families/analytics` | Web analytics, Google Tag Manager event tracking, GA4 configuration, and conversion instrumentation. |
| **9** | `performance-security` | Performance & Security | 3 | `/services/families/performance-security` | Core Web Vitals optimization, Cloudflare security hardening, and code audit fixes. |
| **10** | `development` | Development | 2 | `/services/families/development` | Frontend UI engineering and bespoke full-stack web applications. |
| **11** | `maintenance` | Maintenance | 2 | `/services/families/maintenance` | Ongoing website support, software updates, monitoring, and platform replatforming. |

---

## 3. Comprehensive Inventory of all 31 Services

Derived directly from [content/services/index.ts](file:///D:/2.%20Agency/Main%20Website/ha-web-studio/content/services/index.ts) and child family definitions:

| # | Slug & Title | Current Family | Current URL | Intended Buyer | Core Deliverables / Capabilities | Overlap & Redundancy Analysis | Recommended Disposition | Proposed Family |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | `website-planning-strategy`<br>Website Planning & Strategy | `websites` | `/services/website-planning-strategy` | Founders & business owners planning a major new site or rebuild. | Architecture blueprint, user personas, sitemap, technology selection matrix. | Overlaps with the pre-sale scoping phase of `business-website-development`. | **Retain as Standalone Discovery Service** (useful for paid client roadmaps) | **Website Development** |
| **2** | `business-website-development`<br>Business Website Development | `websites` | `/services/business-website-development` | SMBs, corporate brands, and professional services firms. | Custom Next.js website, responsive layout, SEO baseline, contact integration. | Core flagship offering; no overlap. | **Retain Standalone (Flagship)** | **Website Development** |
| **3** | `website-redesign`<br>Website Redesign & Modernization | `websites` | `/services/website-redesign` | Established businesses with outdated, slow, or low-converting websites. | Brand modernizing, IA overhaul, responsive rebuild, content migration plan. | Clear upgrade path for legacy site owners; distinct commercial intent. | **Retain Standalone** | **Website Development** |
| **4** | `landing-page-development`<br>High-Conversion Landing Pages | `websites` | `/services/landing-page-development` | Growth marketers, PPC advertisers, campaign managers. | Focused single-page conversion architecture, lead capture integration, sub-second load times. | Distinct marketing asset focus; distinct buyer from corporate website. | **Retain Standalone** | **Website Development** |
| **5** | `website-launch-infrastructure-setup`<br>Website Launch & Infrastructure Setup | `websites` | `/services/website-launch-infrastructure-setup` | Developers, agencies, or teams needing robust deployment architecture. | Cloudflare DNS, Vercel/AWS setup, SSL certificates, environment config, staging pipelines. | High overlap with DevOps, hosting care, and `website-maintenance-support`. | **Reposition under Web Dev as Launch Ops or merge with Care** | **Website Development** |
| **6** | `cms-dynamic-content-development`<br>Headless CMS & Dynamic Content | `websites` | `/services/cms-dynamic-content-development` | Marketing teams needing independent editorial workflow without engineering bottlenecks. | Headless CMS setup (Sanity/Payload/Strapi), schema modeling, live preview, editor training. | Specialized technical capability frequently bundled into business website builds. | **Retain Standalone (Specialist Offering)** | **Website Development** |
| **7** | `website-ui-ux-design`<br>Website UI/UX Design | `design` | `/services/website-ui-ux-design` | Product managers and business owners needing bespoke visual systems before coding. | Figma prototypes, responsive design systems, accessibility checks, wireframes. | Sole offering in legacy `design` family; naturally belongs in Web Development. | **Re-parent to Web Dev (Retain Standalone)** | **Website Development** |
| **8** | `ecommerce-development`<br>Custom eCommerce Development | `ecommerce` | `/services/ecommerce-development` | High-volume merchants, complex catalog retailers, headless stores. | Custom Next.js storefront, cart architecture, checkout integration, inventory sync. | Flagship custom commerce offering. | **Retain Standalone (Flagship)** | **eCommerce Development** |
| **9** | `shopify-development`<br>Shopify Store Development | `ecommerce` | `/services/shopify-development` | D2C brands, emerging merchants seeking Shopify ecosystem. | Custom Shopify Liquid/Hydrogen theme, app configuration, payment gateway setup. | Platform-specific commercial search intent; very high query demand. | **Retain Standalone** | **eCommerce Development** |
| **10** | `woocommerce-development`<br>WooCommerce Development | `ecommerce` | `/services/woocommerce-development` | WordPress site owners seeking integrated online sales capabilities. | WooCommerce configuration, custom checkout, payment processing, speed tuning. | Platform-specific commercial search intent. | **Retain Standalone** | **eCommerce Development** |
| **11** | `ecommerce-specific-services`<br>eCommerce Feature Enhancements | `ecommerce` | `/services/ecommerce-specific-services` | Existing store owners needing specific technical upgrades. | Custom cart drawers, product bundle logic, checkout upsells, payment gateways. | Generic naming ("Specific Services"); overlaps with general store maintenance. | **Rename Display Title to: "eCommerce Store Optimization & Features"** (Keep URL) | **eCommerce Development** |
| **12** | `customer-acquisition`<br>Customer Acquisition Systems | `growth` | `/services/customer-acquisition` | Startups and B2B businesses needing systematic lead pipelines. | Funnel architecture, landing page flows, CRM routing, analytics instrumentation. | Broad agency marketing term; heavy overlap with `lead-capture-communication-setup` and `analytics-tracking-setup`. | **Refocus as "Growth Funnels & Lead Systems" or Merge** | **Automation & Integrations** (or Web Dev) |
| **13** | `lead-capture-communication-setup`<br>Lead Capture & Automation | `growth` | `/services/lead-capture-communication-setup` | Service businesses needing automated lead intake and response. | Form workflows, autoresponders, CRM routing, email/SMS notifications. | Clear systems and automation focus. | **Retain Standalone** | **Automation & Integrations** |
| **14** | `conversion-rate-optimization`<br>Conversion Rate Optimization (CRO) | `growth` | `/services/conversion-rate-optimization` | E-commerce and lead-gen sites with traffic but lagging conversions. | Usability audit, funnel friction analysis, heatmapping, UX fixes. | Overlaps with performance optimization and analytics tracking. | **Retain Standalone (Optimization Workstream)** | **Website Optimization & Care** |
| **15** | `google-business-maps-visibility`<br>Local Maps & Profile Optimization | `growth` | `/services/google-business-maps-visibility` | Brick-and-mortar and regional service businesses. | Google Business Profile optimization, local category alignment, review collection setup. | Heavy overlap with `local-seo-foundations`. Can exist as specialized micro-service. | **Retain Standalone (Local Search Entrypoint)** | **Search & Discoverability** |
| **16** | `local-seo-foundations`<br>Local SEO Foundations | `growth` | `/services/local-seo-foundations` | Multi-location businesses, regional contractors, professional practices. | Local NAP consistency, geo-targeted landing page structure, local schema markup. | Complementary to Google Maps profile setup. | **Retain Standalone** | **Search & Discoverability** |
| **17** | `technical-seo-setup`<br>Technical SEO Optimization | `seo-search` | `/services/technical-seo-setup` | Any commercial website wanting search crawlability and indexing health. | Crawl error remediation, canonicals, robots.txt, XML sitemaps, semantic hierarchy. | Flagship technical SEO offering. | **Retain Standalone (Flagship)** | **Search & Discoverability** |
| **18** | `search-visibility-setup`<br>Search Visibility Strategy | `seo-search` | `/services/search-visibility-setup` | Businesses needing an organic keyword and architectural content plan. | Keyword intent mapping, IA hierarchy, topical cluster architecture. | Strategic counterpart to technical SEO. | **Retain Standalone** | **Search & Discoverability** |
| **19** | `structured-data-schema-setup`<br>Structured Data & Schema Setup | `seo-search` | `/services/structured-data-schema-setup` | Publishing sites, ecommerce stores, and service companies wanting rich snippets. | Comprehensive JSON-LD schema (Organization, Service, FAQ, Product, Breadcrumbs). | Highly specialized deliverable; technically a component of Technical SEO. | **Retain Standalone (High technical proof)** | **Search & Discoverability** |
| **20** | `ai-search-visibility-answer-engine-optimization`<br>AI Search Visibility (AEO) | `seo-search` | `/services/ai-search-visibility-answer-engine-optimization` | Brands seeking citation and discovery in ChatGPT, Perplexity, and AI Overviews. | Semantic HTML, citation-ready fact architecture, llms.txt, conversational entity optimization. | Forward-looking differentiator for the agency. | **Retain Standalone** | **Search & Discoverability** |
| **21** | `booking-appointment-systems`<br>Automated Booking & Appointment Systems | `business-systems` | `/services/booking-appointment-systems` | Clinics, consultancies, agencies, and service providers. | Calendly/Cal.com integration, timezone handling, payment collection, calendar sync. | Clear operational business automation. | **Retain Standalone** | **Automation & Integrations** |
| **22** | `whatsapp-business-systems`<br>WhatsApp Business API & Automation | `business-systems` | `/services/whatsapp-business-systems` | Regional businesses in India/UAE/SEA where WhatsApp drives sales and support. | Official WhatsApp API setup, automated response flows, CRM sync, chat widgets. | Distinct regional competitive advantage for HA Web Studio. | **Retain Standalone** | **Automation & Integrations** |
| **23** | `third-party-api-integrations`<br>Third-Party & API Integrations | `integrations` | `/services/third-party-api-integrations` | Companies managing disparate SaaS tools and manual data transfers. | REST/GraphQL API integration, webhook endpoints, data syncing, automated workflows. | Core technical integration service. | **Retain Standalone (Flagship)** | **Automation & Integrations** |
| **24** | `analytics-tracking-setup`<br>Advanced Analytics & Tracking Setup | `analytics` | `/services/analytics-tracking-setup` | Marketing leads and founders needing reliable conversion data. | GA4 setup, Google Tag Manager container build, Clarity heatmaps, custom event tracking. | Essential measurement foundation for both automation and optimization. | **Retain Standalone** | **Automation & Integrations** (or Care) |
| **25** | `website-performance-optimization`<br>Website Performance & Speed Optimization | `performance-security` | `/services/website-performance-optimization` | Site owners failing Core Web Vitals (INP, LCP, CLS) or losing mobile visitors. | Asset compression, script deferral, server cache configuration, edge routing. | Flagship performance service with proven case studies. | **Retain Standalone (Flagship)** | **Website Optimization & Care** |
| **26** | `website-security-protection`<br>Enterprise Security & Protection | `performance-security` | `/services/website-security-protection` | Sites under attack or handling sensitive customer/lead data. | Cloudflare WAF rules, spam mitigation (Turnstile), SSL/TLS hardening, header security. | Essential infrastructure protection. | **Retain Standalone** | **Website Optimization & Care** |
| **27** | `website-audit-technical-fixes`<br>Technical Audit & Rescue | `performance-security` | `/services/website-audit-technical-fixes` | Clients with broken, buggy, or abandoned sites built by previous agencies. | Forensic codebase audit, bug triage, performance fix implementation, dependency upgrades. | Highly effective entrypoint for new client acquisitions. | **Retain Standalone** | **Website Optimization & Care** |
| **28** | `frontend-development`<br>Advanced Frontend Engineering | `development` | `/services/frontend-development` | Design studios, product teams, and startups needing specialized UI engineering. | React/Next.js component implementation, accessible UI, fluid CSS, state management. | Agency-to-agency and contract engineering service. | **Retain Standalone** | **Custom Web Applications** |
| **29** | `custom-web-application-development`<br>Custom Web Application Development | `development` | `/services/custom-web-application-development` | Businesses needing bespoke internal portals, customer dashboards, or SaaS MVPs. | Full-stack Next.js/Node/PostgreSQL application, auth systems, database modeling, API architecture. | Flagship application development service. | **Retain Standalone (Flagship)** | **Custom Web Applications** |
| **30** | `website-maintenance-support`<br>Premium Maintenance & Ongoing Support | `maintenance` | `/services/website-maintenance-support` | Active businesses needing ongoing technical peace of mind. | Routine updates, uptime monitoring, automated backups, priority emergency fix hours. | Core recurring retainer offering. | **Retain Standalone (Flagship)** | **Website Optimization & Care** |
| **31** | `website-migration-replatforming`<br>Website Migration & Replatforming | `maintenance` | `/services/website-migration-replatforming` | Companies switching tech stacks, hosting, CMS, or domains. | URL redirect mapping, data migration scripts, zero-downtime DNS cutover, SEO equity preservation. | High-risk, high-value technical project. | **Retain Standalone** | **Website Optimization & Care** |

---

## 4. The Six Proposed Public Families

### Family 1: Website Development
- **Proposed Slug:** `website-development` (with legacy alias `websites`)
- **Display Title:** `Website Development`
- **Badge:** `Architecture & Engineering`
- **Commercial Scope:** Bespoke digital flagships, corporate websites, marketing sites, and brand redesigns engineered for performance, maintainability, and clean editorial workflows.
- **Assigned Services (7):**
  1. `business-website-development` (Flagship)
  2. `website-redesign`
  3. `landing-page-development`
  4. `website-ui-ux-design` (Re-parented from `design`)
  5. `cms-dynamic-content-development`
  6. `website-planning-strategy`
  7. `website-launch-infrastructure-setup`

### Family 2: eCommerce Development
- **Proposed Slug:** `ecommerce` (retained)
- **Display Title:** `eCommerce Development`
- **Badge:** `Commerce Architecture`
- **Commercial Scope:** High-performing online stores, custom checkout architectures, and scalable platform implementations that make purchasing intuitive and transactions reliable.
- **Assigned Services (4):**
  1. `ecommerce-development` (Flagship)
  2. `shopify-development`
  3. `woocommerce-development`
  4. `ecommerce-specific-services` (Display title updated to "eCommerce Store Optimization & Features")

### Family 3: Search & Discoverability
- **Proposed Slug:** `search-discoverability` (replaces `seo-search`)
- **Display Title:** `Search & Discoverability`
- **Badge:** `SEO & Answer Engines`
- **Commercial Scope:** Technical SEO, architectural search strategy, structured data, local maps visibility, and AI search visibility to ensure your business is accurately found and cited.
- **Assigned Services (6):**
  1. `technical-seo-setup` (Flagship)
  2. `search-visibility-setup`
  3. `structured-data-schema-setup`
  4. `ai-search-visibility-answer-engine-optimization`
  5. `local-seo-foundations` (Re-parented from `growth`)
  6. `google-business-maps-visibility` (Re-parented from `growth`)

### Family 4: Automation & Integrations
- **Proposed Slug:** `automation-integrations` (consolidates `business-systems` & `integrations`)
- **Display Title:** `Automation & Integrations`
- **Badge:** `Workflows & APIs`
- **Commercial Scope:** Connecting websites, CRM platforms, scheduling software, and messaging channels to eliminate manual data entry and streamline customer communications.
- **Assigned Services (5):**
  1. `third-party-api-integrations` (Flagship, re-parented from `integrations`)
  2. `booking-appointment-systems` (Re-parented from `business-systems`)
  3. `whatsapp-business-systems` (Re-parented from `business-systems`)
  4. `lead-capture-communication-setup` (Re-parented from `growth`)
  5. `analytics-tracking-setup` (Re-parented from `analytics`)

### Family 5: Custom Web Applications
- **Proposed Slug:** `custom-web-applications` (replaces `development`)
- **Display Title:** `Custom Web Applications`
- **Badge:** `Full-Stack Engineering`
- **Commercial Scope:** Purpose-built web applications, customer portals, internal tooling, and modern frontend interfaces built with React, Next.js, and robust relational backends.
- **Assigned Services (2):**
  1. `custom-web-application-development` (Flagship)
  2. `frontend-development`

### Family 6: Website Optimization & Care
- **Proposed Slug:** `website-optimization-care` (consolidates `performance-security` & `maintenance`)
- **Display Title:** `Website Optimization & Care`
- **Badge:** `Performance, Security & Uptime`
- **Commercial Scope:** Ongoing technical maintenance, Core Web Vitals optimization, enterprise security hardening, technical audits, and complex platform migrations.
- **Assigned Services (7):**
  1. `website-performance-optimization` (Flagship, re-parented from `performance-security`)
  2. `website-maintenance-support` (Flagship Retainer, re-parented from `maintenance`)
  3. `website-security-protection` (Re-parented from `performance-security`)
  4. `website-audit-technical-fixes` (Re-parented from `performance-security`)
  5. `website-migration-replatforming` (Re-parented from `maintenance`)
  6. `conversion-rate-optimization` (Re-parented from `growth`)
  7. `customer-acquisition` (Assigned here or under Automation; see Ambiguity Section)

---

## 5. URL Migration & Preservation Strategy

### 5.1 Service URLs (Zero-Change Policy)
- **Principle:** Every individual service URL stays at `/services/[slug]`.
- **Finding:** All 31 service URLs are preserved **100% unchanged**.
- **Impact:** **Zero broken internal links** across all 11 case studies, 16 insights, and location pages. Zero search equity disruption for indexed service detail pages.

### 5.2 Service Family URLs Old-to-New Mapping

| Current Family URL | Proposed Canonical URL | Status / Migration Action | Redirect Rule Needed? |
| :--- | :--- | :--- | :--- |
| `/services/families/websites` | `/services/families/website-development` *(or retain `websites` as canonical slug)* | Rename & Redirect | `301 permanent: /services/families/websites -> /services/families/website-development` |
| `/services/families/ecommerce` | `/services/families/ecommerce` | **Preserve Unchanged** | None (identical URL) |
| `/services/families/seo-search` | `/services/families/search-discoverability` | Consolidate & Redirect | `301 permanent: /services/families/seo-search -> /services/families/search-discoverability` |
| `/services/families/growth` | `/services/families/search-discoverability` *(or split)* | Retire / Redirect | `301 permanent: /services/families/growth -> /services/families/search-discoverability` |
| `/services/families/business-systems` | `/services/families/automation-integrations` | Consolidate & Redirect | `301 permanent: /services/families/business-systems -> /services/families/automation-integrations` |
| `/services/families/integrations` | `/services/families/automation-integrations` | Consolidate & Redirect | `301 permanent: /services/families/integrations -> /services/families/automation-integrations` |
| `/services/families/analytics` | `/services/families/automation-integrations` | Consolidate & Redirect | `301 permanent: /services/families/analytics -> /services/families/automation-integrations` |
| `/services/families/development` | `/services/families/custom-web-applications` | Rename & Redirect | `301 permanent: /services/families/development -> /services/families/custom-web-applications` |
| `/services/families/performance-security` | `/services/families/website-optimization-care` | Consolidate & Redirect | `301 permanent: /services/families/performance-security -> /services/families/website-optimization-care` |
| `/services/families/maintenance` | `/services/families/website-optimization-care` | Consolidate & Redirect | `301 permanent: /services/families/maintenance -> /services/families/website-optimization-care` |
| `/services/families/design` | `/services/families/website-development` | Consolidate & Redirect | `301 permanent: /services/families/design -> /services/families/website-development` |

### 5.3 Existing Redirect Compatibility & Avoiding Chains/Loops
Inspection of [next.config.mjs](file:///D:/2.%20Agency/Main%20Website/ha-web-studio/next.config.mjs) reveals 11 pre-existing family redirects:
- Legacy rule: `/services/families/website-development -> /services/families/websites`
- Legacy rule: `/services/families/ecommerce-development -> /services/families/ecommerce`
- Legacy rule: `/services/families/seo-search-visibility -> /services/families/seo-search`
- Legacy rule: `/services/families/local-business-visibility -> /services/families/growth`
- Legacy rule: `/services/families/custom-web-applications -> /services/families/development`
- Legacy rule: `/services/families/website-performance -> /services/families/performance-security`
- Legacy rule: `/services/families/website-maintenance -> /services/families/maintenance`

**Critical Safeguard Against Redirect Chains:**
When adopting the 6 new family URLs, pre-existing rules must be updated directly to target the new canonical destination rather than chaining through intermediate slugs:
- `/services/families/website-development` becomes the canonical destination; rule from `websites` points to `website-development` (or vice versa).
- `/services/families/seo-search-visibility` must redirect directly to `/services/families/search-discoverability`, NOT to `seo-search` first.
- `/services/families/custom-web-applications` becomes the canonical destination; rule from `development` points directly to `custom-web-applications`.
- `/services/families/website-performance` and `/services/families/website-maintenance` must redirect directly to `/services/families/website-optimization-care`.

---

## 6. Content & SEO Quality Guidelines

To preserve credibility and avoid past editorial issues, all copy produced during the future implementation must adhere to these standards:

1. **No Unsupported Conversion Claims:** Avoid promising specific conversion rate jumps (e.g., "+35% conversion increase") without published case study evidence. Replace with objective architecture descriptions: *"funnels and checkout flows engineered for clarity, speed, and reduced friction."*
2. **No Guaranteed Search Rankings or AI Citations:** Do not claim guaranteed #1 rankings or automatic citations by ChatGPT/Perplexity. State accurately: *"structured data and content architecture built to maximize machine crawlability, factual clarity, and answer engine indexability."*
3. **Distinguish Client Work from Technical Case Studies:** Clearly label internal architecture studies (such as `ha-web-studio-architecture`) and technical foundations as engineering practices, reserving client case studies for verified client deliveries.
4. **No Artificial AI Placeholders or Writing Instructions:** All service copy must be genuine, client-facing prose written from an authoritative engineering agency perspective.

---

## 7. Ambiguous Services & Explicit Decision Points

Before implementing the consolidation in Phase C2, three positioning questions require explicit sign-off:

### Decision 1: Destination of `customer-acquisition` (Service #12)
- **Option A (Recommended):** Re-parent into **Automation & Integrations** as "Lead Acquisition & Inbound Systems" alongside `lead-capture-communication-setup`.
- **Option B:** Re-parent into **Website Optimization & Care** alongside CRO.
- **Option C:** Retire offering and redirect `/services/customer-acquisition` to `/services/lead-capture-communication-setup`.

### Decision 2: Canonical Slugs for Family URLs
- **Option A (Descriptive Slugs):** Use full descriptive slugs:
  - `/services/families/website-development`
  - `/services/families/ecommerce`
  - `/services/families/search-discoverability`
  - `/services/families/automation-integrations`
  - `/services/families/custom-web-applications`
  - `/services/families/website-optimization-care`
- **Option B (Shorter Slugs):** Keep shorter legacy slugs where possible (`websites`, `ecommerce`, `search`, `automation`, `apps`, `care`).

### Decision 3: Merging vs. Retaining Overlapping Services
- `local-seo-foundations` vs. `google-business-maps-visibility`: Recommend retaining both as distinct standalone URLs to capture separate search intents, while presenting them as complementary under "Search & Discoverability".
- `website-planning-strategy` vs. `business-website-development`: Recommend retaining `website-planning-strategy` as a standalone advisory/discovery project.

---

## 8. Proposed Phase C2 Implementation Sequence

Once this plan is approved, implementation should execute in the following controlled stages:

1. **Stage 1 — Family Definitions & Schema:**
   - Update [content/services/index.ts](file:///D:/2.%20Agency/Main%20Website/ha-web-studio/content/services/index.ts) with the 6 approved family objects.
   - Update family references in each child service file.
2. **Stage 2 — Redirect Rules & Route Helpers:**
   - Add 301 redirects in [next.config.mjs](file:///D:/2.%20Agency/Main%20Website/ha-web-studio/next.config.mjs) flattening all legacy family routes to the 6 new destinations.
   - Update [config/routes.ts](file:///D:/2.%20Agency/Main%20Website/ha-web-studio/config/routes.ts) and navigation components.
3. **Stage 3 — Content Verification:**
   - Execute `pnpm type-check` (`tsc --noEmit`).
   - Execute `pnpm validate:content` and `pnpm validate:routes`.
   - Run `scripts/validation/test-service-relations.mts`.

---

## 9. Launch Readiness

- **Current Status:** **NOT READY**
- **Phase C1 completed:** Audit and consolidation planning successfully delivered. Zero application files modified.
