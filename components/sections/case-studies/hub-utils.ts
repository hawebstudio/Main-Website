import { routes } from '@/config/routes'

export type CaseStudyFilters = Record<string, string | string[] | undefined>

export const caseStudyTypeOptions = [
  { value: 'client', label: 'Client' },
  { value: 'internal', label: 'Internal' },
  { value: 'personal-engineering', label: 'Personal' },
  { value: 'technical-investigation', label: 'Investigation' },
] as const

export const difficultyOptions = [
  { value: 'foundation', label: 'Foundation' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
] as const

export function getSingleValue(value?: string | string[]): string | undefined {
  if (Array.isArray(value)) return value[0]
  return value
}

export function buildCaseStudyFilterHref(current: CaseStudyFilters, key: string, value?: string) {
  const params = new URLSearchParams()

  for (const [existingKey, existingValue] of Object.entries(current)) {
    if (existingKey === key) continue
    if (!existingValue) continue

    if (Array.isArray(existingValue)) {
      for (const item of existingValue) params.append(existingKey, item)
    } else {
      params.set(existingKey, existingValue)
    }
  }

  if (value) params.set(key, value)

  const query = params.toString()
  return query ? `${routes.caseStudies.index()}?${query}` : routes.caseStudies.index()
}

export function normalizeHrefValueToSlug(href: string): string {
  const [path, anchor] = href.split('#')
  if (anchor) return anchor
  return path.replace(/^\//, '').replace(/\//g, '-')
}
