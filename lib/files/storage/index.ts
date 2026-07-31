import { createFileMetadata } from '../metadata'
import type { StorageObject, StorageProvider } from '../types'

export function createLocalStorageProvider(basePath = ''): StorageProvider {
  return {
    name: 'local',
    publicUrl: (key) => `${basePath}/${key}`.replace(/\/+/g, '/'),
  }
}

export function storageObject(provider: StorageProvider, key: string, mimeType?: string): StorageObject {
  return {
    key,
    url: provider.publicUrl(key),
    metadata: createFileMetadata(key.split('/').pop() ?? key, mimeType),
  }
}
