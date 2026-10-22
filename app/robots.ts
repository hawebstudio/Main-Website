import type { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/404'],
      },
      // AI and answer-engine crawlers. The `*` rule above already allows these,
      // so this group is an explicit statement of intent: if the wildcard is
      // ever tightened, AI-assisted search and citation access should stay on.
      // Trademarked tokens belong to their operators; the studio makes no claim
      // that listing them produces citations or visibility.
      {
        userAgent: [
          // Model-training / retrieval crawlers
          'GPTBot',
          'ClaudeBot',
          'CCBot',
          'Meta-ExternalAgent',
          'Google-Extended',
          'Applebot-Extended',
          // Answer-engine indexing
          'OAI-SearchBot',
          'PerplexityBot',
          'Claude-SearchBot',
          'DuckAssistBot',
          'Applebot',
          // User-triggered fetches (a person asking an assistant to open the page)
          'ChatGPT-User',
          'Claude-User',
          'Perplexity-User',
          'MistralAI-User',
        ],
        allow: '/',
        disallow: ['/api/', '/_next/', '/404'],
      },
    ],
    sitemap: [`${siteConfig.url}/sitemap.xml`, `${siteConfig.url}/rss.xml`, `${siteConfig.url}/atom.xml`],
    host: siteConfig.url,
  }
}
