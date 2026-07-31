import type { z } from 'zod'
import { contentProviderConfig } from '@/config/content'
import type { ContentProvider } from './types'
import { createGitMdxProvider, createGitTsProvider } from './git'
import {
  createHeadlessApiProvider,
  createSanityProvider,
  createNotionProvider,
  createDecapProvider,
  createContentlayerProvider,
  createPayloadProvider,
} from './headless'

export interface CollectionProviderConfig<T> {
  name: string
  gitDirectory?: string
  gitData?: T[]
  schema?: z.ZodType<T>
  headlessCollection?: string
}

/**
 * Provider registry — resolves the active content provider for each collection.
 * Page components consume collections from source.ts, never this registry directly.
 */
export function resolveProvider<T>(config: CollectionProviderConfig<T>): ContentProvider<T> {
  const { type, apiUrl, apiTokenEnvVar, projectId, dataset, databaseId } = contentProviderConfig
  const apiToken = apiTokenEnvVar ? process.env[apiTokenEnvVar] : undefined

  switch (type) {
    case 'git':
      if (config.gitData) return createGitTsProvider(config.gitData)
      if (config.gitDirectory && config.schema) return createGitMdxProvider(config.gitDirectory, config.schema)
      throw new Error(`Git provider requires gitDirectory+schema or gitData for ${config.name}`)

    case 'decap':
      if (!config.gitDirectory || !config.schema) {
        throw new Error(`Decap provider requires gitDirectory+schema for ${config.name}`)
      }
      return createDecapProvider(config.gitDirectory, config.schema)

    case 'sanity':
      if (!projectId || !dataset || !config.schema) {
        throw new Error(`Sanity provider requires projectId, dataset, and schema for ${config.name}`)
      }
      return createSanityProvider(projectId, dataset, config.headlessCollection ?? config.name, config.schema)

    case 'contentlayer':
      return createContentlayerProvider(config.headlessCollection ?? config.name)

    case 'payload':
      if (!apiUrl || !config.schema) {
        throw new Error(`Payload provider requires apiUrl and schema for ${config.name}`)
      }
      return createPayloadProvider(apiUrl, config.headlessCollection ?? config.name, config.schema, apiToken)

    case 'notion':
      if (!databaseId || !config.schema) {
        throw new Error(`Notion provider requires databaseId and schema for ${config.name}`)
      }
      return createNotionProvider(databaseId, config.schema)

    case 'headless-api':
      if (!apiUrl || !config.schema) {
        throw new Error(`Headless API provider requires apiUrl and schema for ${config.name}`)
      }
      return createHeadlessApiProvider(
        apiUrl,
        config.headlessCollection ?? config.name,
        config.schema,
        apiToken,
      )

    default:
      throw new Error(`Unknown content provider type: ${type}`)
  }
}

export { createGitMdxProvider, createGitTsProvider } from './git'
export type { ContentProvider } from './types'
