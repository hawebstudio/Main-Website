# lib/analytics

Analytics contains measurement contracts and browser-safe tracking helpers. It has no React components and no UI state.

Responsibilities:

- GA4 page views, events, conversions, outbound clicks, downloads, search, CTAs, forms, scroll, and engagement events
- Microsoft Clarity events, custom tags, and session identification
- Central event and conversion definitions
- Consent state helpers for future cookie banner integration
- Web vitals and performance snapshot contracts

Does not belong here:

- Analytics dashboards or fake reporting data
- React providers or script tags
- Provider credentials beyond public environment variable names

Future providers such as Google Search Console, Bing Webmaster, and custom analytics backends should adapt through these event and conversion contracts.
