import { metadataDefaults } from './company'

/** Build an absolute URL from the configured canonical base URL. */
export function businessUrl(path = '/'): string {
  return new URL(path, metadataDefaults.canonicalBaseUrl).toString()
}

/** Normalize social profile maps for legacy consumers that expect key-value links. */
export function linkMap<T extends readonly { icon: string; url: string }[]>(profiles: T): Record<T[number]['icon'], string> {
  return Object.fromEntries(profiles.map((profile) => [profile.icon, profile.url])) as Record<T[number]['icon'], string>
}
