# lib/business

Business configuration is the source of truth for HA Web Studio identity, contact details, navigation, branding, metadata defaults, legal links, statistics, locations, services, socials, and global FAQs.

This library contains data and tiny helpers only. UI components should import from this library instead of duplicating company details.

## Structure

- `company/` — **single file for everything brand/company related**: `company`, `branding`, `contact`, `socialProfiles`/`socialLinks`/`socialUrls`, `legal`, and `metadataDefaults`. Update the business name, logo, colors, contact info, or social links here.
- `navigation/` — header/footer navigation, breadcrumb roots, quick links.
- `faq/` — global FAQ entries.
- `statistics/` — homepage/about statistics.
- `locations/` — service locations and remote coverage.
- `services/` — service family slugs (sourced from `content/services`).
- `types.ts` — shared types used across the business config.
- `constants.ts` — re-exports everything above for convenient `@/lib/business` imports.

Belongs here:

- Company, contact, legal, social, location, and brand data
- Navigation definitions and reusable link groups
- Metadata defaults used by app-level config
- Reusable business statistics and FAQs

Does not belong here:

- React components
- CRM records, invoices, proposals, or persistence logic
- Analytics events or automation jobs

Future integrations such as Payload CMS, S3, CRM systems, and Google APIs should adapt into these types without changing component contracts.
