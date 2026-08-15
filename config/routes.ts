export const routes = {
  home: () => "/",
  services: {
    index: () => "/services",
    detail: (slug: string) => `/services/${slug}`,
    family: (slug: string) => `/services/families/${slug}`,
  },
  work: {
    index: () => "/work",
    client: () => "/work/client",
    personal: () => "/work/personal",
    internal: () => "/work/internal",
    labs: () => "/work/labs",
    detail: (slug: string) => `/work/${slug}`,
  },
  caseStudies: {
    index: () => "/case-studies",
    detail: (slug: string) => `/case-studies/${slug}`,
  },
  technologies: {
    index: () => "/technologies",
    category: (slug: string) => `/technologies/${slug}`,
    detail: (categoryOrSlug: string, slug?: string) =>
      slug ? `/technologies/${categoryOrSlug}/${slug}` : `/technologies/${categoryOrSlug}`,
  },
  locations: {
    index: () => "/locations",
    detail: (slug: string) => `/locations/${slug}`,
  },
  insights: {
    index: () => "/insights",
    detail: (slug: string) => `/insights/${slug}`,
  },
  problems: {
    index: () => "/problems",
    detail: (slug: string) => `/problems/${slug}`,
  },
  search: (query?: string) => (query ? `/search?q=${encodeURIComponent(query)}` : "/search"),
  about: () => "/about",
  websiteGrowthAssessment: () => "/website-growth-assessment",
  contact: (intent?: string) => (intent ? `/contact?intent=${encodeURIComponent(intent)}` : "/contact"),
  socials: () => "/socials",
  privacy: () => "/privacy",
  terms: () => "/terms",
  cookies: () => "/cookies",
  ponytail: () => "/ponytail",
} as const;
