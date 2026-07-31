import type { z } from 'zod'
import type { ContentProviderType } from '@/config/content'

/**
 * Provider-agnostic content source interface.
 * Each CMS adapter implements this contract so page components
 * never depend on a specific content backend.
 */
export interface ContentProvider<T> {
  readonly type: ContentProviderType
  getAll: () => Promise<Array<T & { content?: string }>>
}

export interface ProviderFactoryOptions<T> {
  type: ContentProviderType
  directory?: string
  schema?: z.ZodType<T>
  data?: T[]
  apiUrl?: string
  apiToken?: string
}
