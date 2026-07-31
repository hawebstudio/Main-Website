import type { z } from 'zod'
import { contentProviderConfig } from '@/config/content'
import { resolveProvider } from './providers'
import type { ContentProvider } from './providers'

export interface ContentProviderDefinition<T> {
  name: string
  gitDirectory?: string
  gitData?: T[]
  schema?: z.ZodType<T>
  headlessCollection?: string
}

export type ContentProviderType = ReturnType<typeof getActiveContentProviderType>

export function getActiveContentProviderType() {
  return contentProviderConfig.type
}

export function createContentProvider<T>(definition: ContentProviderDefinition<T>): ContentProvider<T> {
  return resolveProvider(definition)
}
