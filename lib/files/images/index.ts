import { responsiveImageSizes } from '../constants'
import type { ImageMetadata } from '../types'
import { createFileMetadata } from '../metadata'
import { imagePath } from '../paths'

export function responsiveImagePaths(filename: string): Record<keyof typeof responsiveImageSizes, string> {
  return Object.fromEntries(
    Object.keys(responsiveImageSizes).map((size) => [size, imagePath(filename)]),
  ) as Record<keyof typeof responsiveImageSizes, string>
}

export function generateImageAlt(filename: string): string {
  return filename
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .trim()
}

export function createImageMetadata(filename: string, input: Partial<ImageMetadata> = {}): ImageMetadata {
  return {
    ...createFileMetadata(filename, input.mimeType ?? 'image/webp'),
    ...input,
    type: 'image',
    alt: input.alt ?? generateImageAlt(filename),
  }
}
