export type FileType = 'image' | 'document' | 'video' | 'audio' | 'archive' | 'other'
export type FileVisibility = 'public' | 'private' | 'internal'
export type StorageProviderName = 'local' | 's3' | 'cloudinary' | 'imagekit' | 'payload' | 'uploadthing'

export interface FileMetadata {
  filename: string
  extension: string
  mimeType: string
  size?: number
  type: FileType
}

export interface ImageMetadata extends FileMetadata {
  type: 'image'
  width?: number
  height?: number
  alt?: string
}

export interface MediaAsset {
  id?: string
  url: string
  alt?: string
  metadata: FileMetadata
  visibility: FileVisibility
}

export interface DocumentAsset extends MediaAsset {
  title: string
  description?: string
}

export interface DownloadAsset extends DocumentAsset {
  trackingId?: string
}

export interface StorageObject {
  key: string
  url: string
  metadata: FileMetadata
}

export interface StorageProvider {
  name: StorageProviderName
  publicUrl: (key: string) => string
}
