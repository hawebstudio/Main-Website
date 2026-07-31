import type { FileMetadata, FileType } from '../types'

const imageExtensions = new Set(['jpg', 'jpeg', 'png', 'webp', 'avif', 'gif', 'svg'])
const documentExtensions = new Set(['pdf', 'doc', 'docx', 'txt', 'md'])
const archiveExtensions = new Set(['zip', 'rar', '7z'])

export function fileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() ?? ''
}

export function fileTypeFromExtension(extension: string): FileType {
  if (imageExtensions.has(extension)) return 'image'
  if (documentExtensions.has(extension)) return 'document'
  if (archiveExtensions.has(extension)) return 'archive'
  return 'other'
}

export function createFileMetadata(filename: string, mimeType = 'application/octet-stream', size?: number): FileMetadata {
  const extension = fileExtension(filename)
  return {
    filename,
    extension,
    mimeType,
    size,
    type: fileTypeFromExtension(extension),
  }
}
