export function metaDescription(description: string, maxLength = 160): string {
  const value = description.trim()
  return value.length <= maxLength ? value : `${value.slice(0, maxLength - 3).trim()}...`
}
