export function formatProjectCategory(category: string): string {
  return category === 'labs'
    ? 'Lab'
    : category === 'open-source'
      ? 'Open Source'
      : category.charAt(0).toUpperCase() + category.slice(1)
}
