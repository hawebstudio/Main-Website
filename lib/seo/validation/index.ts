import type { PageMetadataInput, SeoValidationResult } from '../types'

export function validateMetadataInput(input: PageMetadataInput): SeoValidationResult {
  const issues: string[] = []
  const warnings: string[] = []
  if (!input.title.trim()) issues.push('Title is required')
  if (!input.description.trim()) issues.push('Description is required')
  if (input.title.length > 70) warnings.push('Title is longer than 70 characters')
  if (input.description.length > 160) warnings.push('Description is longer than 160 characters')
  return { valid: issues.length === 0, issues, warnings }
}
