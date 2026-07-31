import { contentProviderConfig } from '@/config/content'
import { resolveProvider } from './providers'
import type { ContentProvider } from './providers'
import type { ContentProviderDefinition } from './provider'

export function getContentProviderType() {
  return contentProviderConfig.type
}

export function createRegisteredContentProvider<T>(definition: ContentProviderDefinition<T>): ContentProvider<T> {
  return resolveProvider(definition)
}
