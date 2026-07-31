import type { z } from 'zod'
import type { ContentProvider } from './types'

/**
 * Generic headless CMS API provider stub.
 * Implement fetch logic when migrating to Sanity, Payload, Notion, etc.
 * The interface contract is stable — only this adapter changes.
 */
export function createHeadlessApiProvider<T>(
  apiUrl: string,
  collection: string,
  schema: z.ZodType<T>,
  apiToken?: string,
): ContentProvider<T> {
  return {
    type: 'headless-api',
    async getAll() {
      const headers: Record<string, string> = { Accept: 'application/json' }
      if (apiToken) headers.Authorization = `Bearer ${apiToken}`

      const response = await fetch(`${apiUrl}/collections/${collection}`, {
        headers,
        next: { revalidate: 60 },
      })

      if (!response.ok) {
        console.error(`Headless API error for ${collection}: ${response.status}`)
        return []
      }

      const payload = (await response.json()) as { items?: unknown[] }
      const items = payload.items ?? []

      return items
        .map((item) => {
          try {
            return schema.parse(item) as T & { content?: string }
          } catch (error) {
            console.error(`Validation error in headless item:`, error)
            return null
          }
        })
        .filter((item): item is T & { content?: string } => item !== null)
    },
  }
}

/**
 * Provider stubs for future CMS integrations.
 * Each returns an error at runtime until configured — the registry
 * falls back to git-based providers automatically.
 */
export function createSanityProvider<T>(
  _projectId: string,
  _dataset: string,
  _collection: string,
  _schema: z.ZodType<T>,
): ContentProvider<T> {
  return {
    type: 'sanity',
    async getAll() {
      console.warn('Sanity provider not configured. Falling back to empty collection.')
      return []
    },
  }
}

export function createNotionProvider<T>(
  _databaseId: string,
  _schema: z.ZodType<T>,
): ContentProvider<T> {
  return {
    type: 'notion',
    async getAll() {
      console.warn('Notion provider not configured. Falling back to empty collection.')
      return []
    },
  }
}

export function createDecapProvider<T>(
  directory: string,
  schema: z.ZodType<T>,
): ContentProvider<T> {
  // Decap CMS writes to the same git-based MDX files
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { createGitMdxProvider } = require('./git') as typeof import('./git')
  return createGitMdxProvider(directory, schema)
}

export function createContentlayerProvider<T>(
  _collection: string,
): ContentProvider<T> {
  return {
    type: 'contentlayer',
    async getAll() {
      console.warn('Contentlayer provider not configured. Run contentlayer build first.')
      return []
    },
  }
}

export function createPayloadProvider<T>(
  apiUrl: string,
  collection: string,
  schema: z.ZodType<T>,
  apiToken?: string,
): ContentProvider<T> {
  return createHeadlessApiProvider(apiUrl, collection, schema, apiToken)
}
