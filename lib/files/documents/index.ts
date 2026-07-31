import { createFileMetadata } from '../metadata'
import type { DocumentAsset } from '../types'

export function createDocumentAsset(input: Omit<DocumentAsset, 'metadata'> & { filename: string; mimeType?: string }): DocumentAsset {
  return {
    ...input,
    metadata: createFileMetadata(input.filename, input.mimeType ?? 'application/pdf'),
  }
}
