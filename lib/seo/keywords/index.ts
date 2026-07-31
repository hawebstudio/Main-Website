export function keywordList(...groups: Array<string[] | undefined>): string[] {
  return [...new Set(groups.flatMap((group) => group ?? []).map((keyword) => keyword.trim()).filter(Boolean))]
}
