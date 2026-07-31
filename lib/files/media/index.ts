import { createFileMetadata } from '../metadata'
import type { MediaAsset } from '../types'

export function createMediaAsset(input: Omit<MediaAsset, 'metadata'> & { filename: string; mimeType?: string }): MediaAsset {
  return {
    ...input,
    metadata: createFileMetadata(input.filename, input.mimeType),
  }
}
