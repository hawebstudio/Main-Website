import type { PublishedLocation } from '../types'

/**
 * Published, indexable location pages.
 *
 * Scope for this launch: the Delhi/NCR region hub plus its five Tier 1
 * cities (Delhi, Noida, Gurugram, Ghaziabad, Faridabad) — the starting
 * scope Phase 1's LOCATION_KEYWORD_RESEARCH.md recommended. Every other
 * state/city in the brief stays research-only data in `data/candidates.ts`
 * until there is genuine, verifiable local content to justify a page.
 *
 * Every claim below is either (a) a real, checkable fact about the region's
 * business ecosystem, or (b) an honest statement about HA Web Studio's own
 * remote-first delivery model. Nothing here fabricates a local office,
 * team, client, review, or statistic.
 */
export const publishedLocations: PublishedLocation[] = [
  {
    slug: 'delhi-ncr',
    type: 'region',
    name: 'Delhi NCR',
    state: 'Delhi / Haryana / Uttar Pradesh',
    tier: 1,
    indexable: true,
    seoTitle: 'Web Development Company Serving Delhi NCR | HA Web Studio',
    seoDescription:
      'HA Web Studio designs and builds websites, ecommerce stores, and web applications for businesses across Delhi NCR — Delhi, Noida, Gurugram, Ghaziabad, and Faridabad.',
    h1: 'Web Development Company Serving Delhi NCR',
    intro:
      'Delhi NCR is India\'s largest single market for digital services, spanning the National Capital Territory of Delhi and the surrounding commercial cities of Noida, Gurugram, Ghaziabad, and Faridabad. HA Web Studio works remotely with businesses across this region to build custom websites, ecommerce stores, and web applications.',
    servicesIntro:
      'Whichever part of NCR a business is based in, the underlying need is usually the same: a fast, credible, search-friendly website or web application that can support sales, hiring, and brand trust. HA Web Studio provides custom website development, ecommerce development, Next.js and React development, website redesigns, web applications, and technical SEO.',
    businessContext:
      'NCR is not one uniform market. Delhi itself concentrates trading, professional services, and government-adjacent business; Gurugram is India\'s largest corporate and startup hub outside Bengaluru; Noida has a dense IT, media, and manufacturing base; Ghaziabad and Faridabad carry significant industrial and trading activity. A website strategy that works for a Gurugram SaaS company rarely fits a Ghaziabad manufacturer as-is — see each city page for how that plays out.',
    whyModernWebsite:
      'Because NCR businesses increasingly compete for the same digitally-savvy customer base — whether that customer is in the same city or across the country — a slow, outdated, or non-mobile-friendly website is a competitive disadvantage regardless of which NCR city a business is registered in.',
    deliveryModel:
      'HA Web Studio operates as a remote-first studio: discovery calls, planning, design reviews, and progress updates happen over video call, email, and WhatsApp, with the same process used for every NCR city listed here. There is no physical branch office in any specific NCR city.',
    industries: ['Professional & B2B services', 'Retail & D2C ecommerce', 'Manufacturing & trading', 'SaaS & technology startups', 'Real estate & consulting'],
    primaryKeyword: 'web development company in Delhi NCR',
    secondaryKeywords: [
      'website development company Delhi NCR',
      'web design company Delhi NCR',
      'ecommerce development company Delhi NCR',
      'Next.js development company Delhi NCR',
      'website redesign services Delhi NCR',
    ],
    longTailKeywords: [
      'custom website development for businesses in Delhi NCR',
      'professional web development company for NCR startups',
      'ecommerce website development for NCR retail brands',
    ],
    faqs: [
      {
        question: 'Does HA Web Studio have a physical office in Delhi NCR?',
        answer:
          'No. HA Web Studio is a remote-first studio and does not claim a physical branch in any specific NCR city. Every project — regardless of which NCR city a business is in — is delivered through video calls, email, and WhatsApp.',
      },
      {
        question: 'Which NCR cities does HA Web Studio actually work with?',
        answer:
          'Businesses across Delhi, Noida, Gurugram, Ghaziabad, and Faridabad, and more broadly anywhere in India or abroad — NCR is simply where a meaningful share of current inquiries originate.',
      },
      {
        question: 'Should a Gurugram startup and a Ghaziabad manufacturer expect the same website approach?',
        answer:
          'No — the underlying development process is the same, but the site structure, content priorities, and features differ by business type and audience, not by city name alone. See the relevant city page for specifics.',
      },
    ],
    relatedLocationSlugs: ['delhi', 'noida', 'gurugram', 'ghaziabad', 'faridabad'],
    relatedServiceFamilySlugs: ['websites', 'development', 'ecommerce'],
  },
  {
    slug: 'delhi',
    type: 'city',
    name: 'Delhi',
    state: 'Delhi',
    regionSlug: 'delhi-ncr',
    tier: 1,
    indexable: true,
    seoTitle: 'Web Development Company in Delhi | HA Web Studio',
    seoDescription:
      'HA Web Studio builds custom websites, ecommerce stores, and web applications for businesses in Delhi — remote-first, transparent, and built on modern frameworks.',
    h1: 'Web Development Company in Delhi',
    intro:
      'Delhi is home to one of India\'s largest concentrations of trading firms, professional service providers, consultancies, and small-to-mid-size businesses. HA Web Studio works with Delhi-based businesses remotely to design and build websites, ecommerce stores, and web applications built on modern frameworks like Next.js and React.',
    servicesIntro:
      'For a Delhi business, that typically means a business/marketing website that establishes credibility quickly, an ecommerce store for a retail or trading business moving online, or a redesign of an existing site that no longer reflects the business or loads fast enough on mobile.',
    businessContext:
      'Delhi\'s business base is dominated by trading houses, professional and legal/financial services, consultancies, and a large small-business and retail sector concentrated in markets like Karol Bagh, Chandni Chowk, Nehru Place, and Connaught Place. Many of these businesses still rely on word-of-mouth or marketplace listings rather than an owned website, which is where a well-built site creates a real, direct advantage.',
    whyModernWebsite:
      'A Delhi business competing for attention against thousands of other listings on Google, Justdial, or marketplace platforms needs a website that loads quickly, ranks for relevant local and category searches, and gives potential customers a reason to trust the business before ever making contact.',
    deliveryModel:
      'Every Delhi engagement runs remotely: a discovery call to understand the business, a planning and scoping phase, design and development in stages with regular review checkpoints, testing, deployment, and post-launch support — the same delivery model used everywhere HA Web Studio works.',
    industries: ['Trading & wholesale', 'Professional & legal/financial services', 'Retail & D2C', 'Hospitality & real estate', 'Consulting'],
    primaryKeyword: 'web development company in Delhi',
    secondaryKeywords: [
      'web development services in Delhi',
      'website development company in Delhi',
      'web design company in Delhi',
      'custom web development Delhi',
      'ecommerce development company Delhi',
      'Next.js development company Delhi',
      'React development company Delhi',
      'website redesign services Delhi',
    ],
    longTailKeywords: [
      'custom web development services for businesses in Delhi',
      'professional website development for small businesses in Delhi',
      'Next.js website development company in Delhi',
      'custom ecommerce website development in Delhi',
      'SEO friendly website development in Delhi',
    ],
    faqs: [
      {
        question: 'Does HA Web Studio have an office in Delhi?',
        answer:
          'No — HA Web Studio is a remote-first studio without a physical Delhi branch. Discovery, design reviews, and project updates all happen over call, email, and WhatsApp.',
      },
      {
        question: 'Can a Delhi business get an ecommerce website built, not just a marketing site?',
        answer:
          'Yes. Ecommerce development is one of HA Web Studio\'s core services, alongside business/marketing websites, web applications, and website redesigns.',
      },
      {
        question: 'How long does a typical Delhi business website take to build?',
        answer:
          'It depends on scope — a focused marketing website is a different timeline from a full ecommerce store or custom application. Timelines are scoped per project during the discovery call rather than quoted generically.',
      },
      {
        question: 'Can HA Web Studio redesign an existing Delhi business website instead of starting from scratch?',
        answer:
          'Yes — website redesign is a standard service, whether the goal is faster load times, a modern look, better mobile experience, or improved SEO structure.',
      },
    ],
    relatedLocationSlugs: ['delhi-ncr', 'noida', 'gurugram'],
    relatedServiceFamilySlugs: ['websites', 'ecommerce', 'seo-search'],
  },
  {
    slug: 'noida',
    type: 'city',
    name: 'Noida',
    state: 'Uttar Pradesh',
    regionSlug: 'delhi-ncr',
    tier: 1,
    indexable: true,
    seoTitle: 'Web Development Company in Noida | HA Web Studio',
    seoDescription:
      'HA Web Studio designs and develops websites, ecommerce stores, and web applications for IT, media, and D2C businesses in Noida.',
    h1: 'Web Development Company in Noida',
    intro:
      'Noida has grown into one of NCR\'s densest hubs for IT services, media/production companies, and manufacturing, alongside a fast-growing D2C and startup scene. HA Web Studio builds custom websites, ecommerce stores, and web applications for Noida-based businesses.',
    servicesIntro:
      'Noida businesses most often need a credible, technically solid marketing site (especially IT and services companies pitching to enterprise clients), a performant ecommerce store for D2C brands, or a custom web application to support internal or client-facing workflows.',
    businessContext:
      'Noida\'s Sector-based business parks house a large concentration of IT/ITES companies, media and production houses, and export-oriented manufacturers, alongside Film City\'s media ecosystem. This creates unusually strong demand for both highly professional B2B websites and, separately, fast-scaling D2C ecommerce brands.',
    whyModernWebsite:
      'An IT services or B2B company based in Noida is frequently evaluated by prospective clients on its website alone before a first call ever happens — a dated or slow site actively works against sales credibility in a market this competitive.',
    deliveryModel:
      'Remote delivery end-to-end: discovery, planning, design, development, testing, deployment, and support, with the same process used for every NCR city on this site.',
    industries: ['IT services & ITES', 'Media & production', 'D2C ecommerce & retail', 'Manufacturing & export', 'Startups & SaaS'],
    primaryKeyword: 'web development company in Noida',
    secondaryKeywords: [
      'web development services in Noida',
      'website development company in Noida',
      'web design company in Noida',
      'custom website development Noida',
      'ecommerce development company Noida',
      'Next.js development company Noida',
      'React development company Noida',
    ],
    longTailKeywords: [
      'custom web development services for businesses in Noida',
      'professional website development for IT companies in Noida',
      'Next.js website development company in Noida',
      'D2C ecommerce website development in Noida',
    ],
    faqs: [
      {
        question: 'Does HA Web Studio work with Noida IT and services companies specifically?',
        answer:
          'Yes — B2B/enterprise-facing websites for IT and professional services companies are one of the more common project types from Noida, alongside D2C ecommerce builds.',
      },
      {
        question: 'Does HA Web Studio build websites for Noida D2C and retail brands?',
        answer:
          'Yes, including full ecommerce stores, not just marketing pages for a retail brand.',
      },
      {
        question: 'Is there a Noida office for in-person meetings?',
        answer:
          'No — HA Web Studio operates remotely; all planning and review meetings happen over video call, email, or WhatsApp.',
      },
      {
        question: 'Can HA Web Studio build a web application, not just a website, for a Noida business?',
        answer:
          'Yes — custom web application development is a standard service alongside websites and ecommerce.',
      },
    ],
    relatedLocationSlugs: ['delhi-ncr', 'ghaziabad', 'delhi'],
    relatedServiceFamilySlugs: ['development', 'ecommerce', 'websites'],
  },
  {
    slug: 'gurugram',
    type: 'city',
    name: 'Gurugram',
    state: 'Haryana',
    regionSlug: 'delhi-ncr',
    tier: 1,
    indexable: true,
    seoTitle: 'Web Development Company in Gurugram | HA Web Studio',
    seoDescription:
      'HA Web Studio builds high-performance websites and web applications for startups, SaaS companies, and corporates in Gurugram.',
    h1: 'Web Development Company in Gurugram',
    intro:
      'Gurugram is India\'s largest corporate and startup hub outside Bengaluru, home to a dense mix of SaaS companies, corporate headquarters, consulting firms, and D2C brands. HA Web Studio builds custom websites, web applications, and ecommerce stores for Gurugram-based businesses.',
    servicesIntro:
      'Gurugram engagements typically lean toward polished corporate/SaaS marketing websites, product-led web applications, and performance- and SEO-conscious rebuilds of existing sites that no longer match the pace of a fast-growing company.',
    businessContext:
      'Gurugram concentrates Fortune 500 India offices, a large SaaS and B2B tech startup base, management consulting firms, and a growing D2C ecosystem — a market where competitors are often well-funded and already investing seriously in their own web presence.',
    whyModernWebsite:
      'In a market as competitive and well-capitalized as Gurugram, a website is frequently the first serious impression a prospective client, investor, or hire forms of a company — speed, design quality, and clear positioning matter more here than in most other NCR markets.',
    deliveryModel:
      'Fully remote: discovery, planning, design, development, testing, deployment, and ongoing support, run the same way for every Gurugram engagement.',
    industries: ['SaaS & B2B technology', 'Corporate & consulting', 'D2C ecommerce', 'Real estate', 'Financial services'],
    primaryKeyword: 'web development company in Gurugram',
    secondaryKeywords: [
      'web development services in Gurugram',
      'website development company in Gurugram',
      'web design company in Gurugram',
      'SaaS website development Gurugram',
      'Next.js development company Gurugram',
      'React development company Gurugram',
      'website redesign services Gurugram',
    ],
    longTailKeywords: [
      'custom web application development for startups in Gurugram',
      'high performance website development in Gurugram',
      'SaaS marketing website development company Gurugram',
      'website redesign services for businesses in Gurugram',
    ],
    faqs: [
      {
        question: 'Does HA Web Studio build websites specifically for SaaS/startup companies in Gurugram?',
        answer:
          'Yes — SaaS and B2B tech marketing websites, along with the product-facing web applications behind them, are a regular project type from Gurugram.',
      },
      {
        question: 'Can HA Web Studio redesign a Gurugram company\'s existing website?',
        answer:
          'Yes, website redesign — covering performance, design, mobile experience, and SEO structure — is a standard service.',
      },
      {
        question: 'Is there a physical HA Web Studio office in Gurugram?',
        answer:
          'No — HA Web Studio works remotely with Gurugram clients, the same as with clients anywhere else.',
      },
      {
        question: 'Does HA Web Studio provide technical SEO alongside web development for Gurugram businesses?',
        answer:
          'Yes, technical SEO is offered as part of or alongside a website build for businesses that want the site to actually rank, not just look good.',
      },
    ],
    relatedLocationSlugs: ['delhi-ncr', 'faridabad', 'delhi'],
    relatedServiceFamilySlugs: ['development', 'seo-search', 'websites'],
  },
  {
    slug: 'ghaziabad',
    type: 'city',
    name: 'Ghaziabad',
    state: 'Uttar Pradesh',
    regionSlug: 'delhi-ncr',
    tier: 1,
    indexable: true,
    seoTitle: 'Web Development Company in Ghaziabad | HA Web Studio',
    seoDescription:
      'HA Web Studio builds websites and ecommerce stores for trading, manufacturing, and retail businesses in Ghaziabad.',
    h1: 'Web Development Company in Ghaziabad',
    intro:
      'Ghaziabad is one of NCR\'s largest industrial and trading centers, with a business base spanning manufacturing, wholesale trading, and a growing retail and services sector. HA Web Studio builds custom websites and ecommerce stores for Ghaziabad-based businesses.',
    servicesIntro:
      'Ghaziabad businesses most commonly need a business website that establishes online credibility for the first time, or an ecommerce presence for a trading/retail business that has relied on offline distribution until now.',
    businessContext:
      'Ghaziabad\'s economy is anchored by manufacturing (particularly engineering goods and consumer products) and wholesale trading, much of which has historically operated without a strong digital presence — leaving real room for a well-built website to become a genuine differentiator rather than a formality.',
    whyModernWebsite:
      'For a Ghaziabad manufacturer or trading business, a website often functions as a digital storefront and credibility check for B2B buyers who research a supplier online before ever placing an order — a missing or outdated site can quietly cost deals.',
    deliveryModel:
      'Remote delivery throughout: discovery, planning, design, development, testing, deployment, and support — the same process used for every location HA Web Studio works with.',
    industries: ['Manufacturing & engineering goods', 'Wholesale & B2B trading', 'Retail', 'Logistics & distribution'],
    primaryKeyword: 'web development company in Ghaziabad',
    secondaryKeywords: [
      'web development services in Ghaziabad',
      'website development company in Ghaziabad',
      'web design company in Ghaziabad',
      'ecommerce development company Ghaziabad',
      'custom website development Ghaziabad',
    ],
    longTailKeywords: [
      'business website development for manufacturers in Ghaziabad',
      'B2B website development company in Ghaziabad',
      'ecommerce website development for trading businesses in Ghaziabad',
    ],
    faqs: [
      {
        question: 'Does HA Web Studio build websites for manufacturing and trading businesses in Ghaziabad?',
        answer:
          'Yes — B2B-focused business websites for manufacturers and trading companies are a common project type from Ghaziabad, in addition to ecommerce and retail sites.',
      },
      {
        question: 'Can a Ghaziabad business that has never had a website start with HA Web Studio?',
        answer:
          'Yes — a first website (not a redesign) is a normal starting point, and the discovery call is built around understanding a business with no prior digital presence.',
      },
      {
        question: 'Is there a Ghaziabad office to visit in person?',
        answer:
          'No — HA Web Studio is remote-first; everything runs over call, email, and WhatsApp.',
      },
    ],
    relatedLocationSlugs: ['delhi-ncr', 'noida', 'delhi'],
    relatedServiceFamilySlugs: ['websites', 'ecommerce'],
  },
  {
    slug: 'faridabad',
    type: 'city',
    name: 'Faridabad',
    state: 'Haryana',
    regionSlug: 'delhi-ncr',
    tier: 1,
    indexable: true,
    seoTitle: 'Web Development Company in Faridabad | HA Web Studio',
    seoDescription:
      'HA Web Studio builds websites and web applications for industrial, manufacturing, and services businesses in Faridabad.',
    h1: 'Web Development Company in Faridabad',
    intro:
      'Faridabad is one of North India\'s largest industrial belts, with a business base concentrated in manufacturing, engineering, and B2B services. HA Web Studio builds custom websites and web applications for Faridabad-based businesses.',
    servicesIntro:
      'Faridabad businesses most often need a professional B2B website that can support an existing sales process, or a custom web application/portal to handle inquiries, catalogs, or internal workflows more efficiently than spreadsheets and email.',
    businessContext:
      'Faridabad\'s industrial base spans automotive components, engineering goods, and general manufacturing, supplying both domestic and export markets — a segment where buyers increasingly expect a real website with product details and company information before initiating contact.',
    whyModernWebsite:
      'A Faridabad manufacturer competing for B2B and export orders is often compared against suppliers who already have a clear, professional web presence — a missing or outdated website puts the business at a disadvantage before a conversation even starts.',
    deliveryModel:
      'Remote delivery from discovery through to post-launch support, consistent with every other HA Web Studio engagement.',
    industries: ['Manufacturing & engineering', 'Automotive components', 'Industrial B2B services', 'Export-oriented trading'],
    primaryKeyword: 'web development company in Faridabad',
    secondaryKeywords: [
      'web development services in Faridabad',
      'website development company in Faridabad',
      'web design company in Faridabad',
      'custom website development Faridabad',
      'web application development Faridabad',
    ],
    longTailKeywords: [
      'B2B website development for manufacturers in Faridabad',
      'custom web application development for industrial businesses in Faridabad',
      'professional website development for export businesses in Faridabad',
    ],
    faqs: [
      {
        question: 'Does HA Web Studio build websites for industrial and manufacturing businesses in Faridabad?',
        answer:
          'Yes — professional B2B websites for manufacturing and industrial businesses are a regular project type from Faridabad.',
      },
      {
        question: 'Can HA Web Studio build a customer/dealer portal, not just a website, for a Faridabad business?',
        answer:
          'Yes — custom web application development is offered for businesses that need more than a static website, such as a portal, catalog system, or internal tool.',
      },
      {
        question: 'Is there a Faridabad office?',
        answer:
          'No — HA Web Studio works remotely with Faridabad clients the same way it does everywhere else.',
      },
    ],
    relatedLocationSlugs: ['delhi-ncr', 'gurugram', 'delhi'],
    relatedServiceFamilySlugs: ['development', 'websites'],
  },
]
