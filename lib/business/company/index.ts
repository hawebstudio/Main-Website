import type { BrandColor, SocialProfile } from "../types";

export const company = {
  name: "HA Web Studio",
  legalName: "HA Web Studio",
  tagline:
    "High-performance websites and web applications for ambitious businesses.",
  shortDescription:
    "HA Web Studio is a digital product studio crafting high-performance websites, design systems, and web applications.",
  longDescription:
    "HA Web Studio helps businesses plan, build, improve, and scale their digital presence through focused web development, ecommerce, SEO, analytics, and custom application services.",
  establishedYear: 2026,
  founder: "Mohd Azeem Malik",
  businessEmail: "contact@hawebstudio.com",
  primaryPhone: "+917668356622",
  timezone: "Asia/Calcutta",
  language: "en",
  locale: "en_US",
  copyright: `© ${new Date().getFullYear()} HA Web Studio. All rights reserved.`,
} as const;

export const branding = {
  logos: {
    mark: "/icon.svg",
    light: "/icon-light-32x32.png",
    dark: "/icon-dark-32x32.png",
    apple: "/apple-icon.png",
    wordmark: "/HAwebstudio_logo.webp",
  },
  favicons: ["/icon.svg", "/icon-light-32x32.png", "/icon-dark-32x32.png"],
  colors: {
    primary: [{ name: "Primary", value: "#0969DA" }] satisfies BrandColor[],
    secondary: [{ name: "Ink", value: "#0a0a0c" }] satisfies BrandColor[],
    accent: [{ name: "Surface", value: "#f7f7f8" }] satisfies BrandColor[],
  },
  typography: {
    sans: "Geist",
    mono: "Geist Mono",
  },
  assets: {
    openGraph: "/og.png",
  },
} as const;

export const contact = {
  emails: {
    general: "contact@hawebstudio.com",
    sales: "contact@hawebstudio.com",
    support: "contact@hawebstudio.com",
    careers: "contact@hawebstudio.com",
    partnerships: "contact@hawebstudio.com",
  },
  phones: {
    primary: "+917668356622",
    whatsapp: "+917668356622",
  },
  urls: {
    contact: "/contact",
    whatsapp: "https://wa.me/+917668356622",
    calendly: "",
  },
} as const;

export const socialProfiles: SocialProfile[] = [
  {
    name: "Google Business Profile",
    url: "https://local.google.com/place?placeid=ChIJIQw7nP37DDkRs6YddBXa41c",
    username: "HA Web Studio",
    icon: "google",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/hawebstudio/",
    username: "hawebstudio",
    icon: "instagram",
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/hawebstudioHQ/",
    username: "hawebstudioHQ",
    icon: "facebook",
    featured: true,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/hawebstudio/",
    username: "hawebstudio",
    icon: "linkedin",
    featured: true,
  },
  {
    name: "X",
    url: "https://x.com/hawebstudio",
    username: "hawebstudio",
    icon: "x",
    featured: true,
  },
  {
    name: "GitHub",
    url: "https://github.com/hawebstudio",
    username: "hawebstudio",
    icon: "github",
  },
  {
    name: "Pinterest",
    url: "https://in.pinterest.com/hawebstudio/",
    username: "hawebstudio",
    icon: "pinterest",
  },
  {
    name: "Threads",
    url: "https://www.threads.com/@hawebstudio",
    username: "hawebstudio",
    icon: "threads",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@hawebstudio",
    username: "hawebstudio",
    icon: "youtube",
  },
];

export const socialLinks = Object.fromEntries(
  socialProfiles.map((profile) => [profile.icon, profile.url]),
) as Record<string, string>;

export const socialUrls = socialProfiles.map((profile) => profile.url);

export const featuredSocialProfiles = socialProfiles.filter(
  (profile) => profile.featured,
);

export const featuredSocialLinks = Object.fromEntries(
  featuredSocialProfiles.map((profile) => [profile.icon, profile.url]),
) as Record<string, string>;

export const legal = {
  privacyUrl: "/privacy",
  termsUrl: "/terms",
  cookiesUrl: "/cookies",
  license: "All rights reserved.",
} as const;

export const metadataDefaults = {
  canonicalBaseUrl:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://hawebstudio.com",
  titleTemplate: `%s - ${company.name}`,
  defaultTitle: company.name,
  description: company.shortDescription,
  keywords: [
    "web studio",
    "digital agency",
    "web development",
    "design systems",
    "Next.js",
  ],
  authors: [{ name: company.name }],
  openGraph: {
    image: branding.assets.openGraph,
    type: "website",
  },
  twitter: {
    handle: "@hawebstudio",
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
} as const;
