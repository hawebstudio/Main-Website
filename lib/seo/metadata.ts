import type { Metadata } from 'next'
import { buildMetadata } from './metadata-builder'
import { absoluteUrl as createAbsoluteUrl } from './urls'
import type { PageMetadataInput } from './types'

export function createMetadata(input: PageMetadataInput): Metadata {
  return buildMetadata(input)
}

export function absoluteUrl(path: string): string {
  return createAbsoluteUrl(path)
}
