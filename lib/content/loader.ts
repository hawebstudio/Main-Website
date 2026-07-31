import type { ContentProvider } from './providers'

export type LoadedContent<T> = T & { content?: string }

export async function loadContentCollection<T>(provider: ContentProvider<T>): Promise<LoadedContent<T>[]> {
  return provider.getAll()
}

export async function loadContentEntry<T extends { slug: string }>(
  provider: ContentProvider<T>,
  slug: string,
): Promise<LoadedContent<T> | null> {
  const entries = await provider.getAll()
  return entries.find((entry) => entry.slug === slug) ?? null
}
