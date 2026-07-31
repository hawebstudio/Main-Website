import { filePaths } from '../constants'

export function joinPublicPath(...parts: string[]): string {
  return `/${parts.map((part) => part.replace(/^\/+|\/+$/g, '')).filter(Boolean).join('/')}`
}

export function imagePath(filename: string): string {
  return joinPublicPath(filePaths.images, filename)
}

export function iconPath(filename: string): string {
  return joinPublicPath(filePaths.icons, filename)
}

export function filePath(filename: string): string {
  return joinPublicPath(filePaths.files, filename)
}

export function ogImagePath(filename: string): string {
  return joinPublicPath(filePaths.og, filename)
}
