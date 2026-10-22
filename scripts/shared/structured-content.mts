import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'
import type { ContentEntry } from './toolkit.mts'

/**
 * Reads the TypeScript-defined content collections (services, service families,
 * work) as content entries.
 *
 * These modules cannot be imported by a node script: `content/services/index.ts`
 * uses extensionless relative imports and every one of them is written against
 * the `@/` alias. Instead of importing them, their exported object literals are
 * parsed and their literal values evaluated, so the data is exactly what the
 * pages render without executing any of it.
 *
 * Loading `typescript` costs a few hundred milliseconds, so the toolkit reaches
 * this module through a lazy `import()` in `readAllContentEntries()`: scripts
 * that only read MDX never pay for it.
 *
 * Field precedence matches the pages: `seo.title ?? title` and
 * `seo.description ?? description`.
 */

export type LiteralValue =
  | string
  | number
  | boolean
  | null
  | LiteralValue[]
  | { [key: string]: LiteralValue }

interface StructuredSource {
  collection: string
  relativePath: string
  /** Only present for single-file sources; directory sources are expanded. */
  exportName?: string
  url: (slug: string) => string
}

/** Strings that are links or asset paths, not prose, so they stay out of text. */
const NOT_PROSE = /^(?:https?:|mailto:|tel:|\/|#)/

/** Structural fields: identifiers and metadata, not body text. */
const NOT_BODY = new Set(['slug', 'family', 'id', 'seo'])

export function readStructuredContentEntries(): ContentEntry[] {
  const sources: StructuredSource[] = [
    ...walkTypeScript('content/services/families').map((relativePath) => ({
      collection: 'services',
      relativePath,
      url: (slug: string) => `/services/${slug}`,
    })),
    {
      collection: 'service-families',
      relativePath: 'content/services/index.ts',
      exportName: 'serviceFamilies',
      url: (slug: string) => `/services/families/${slug}`,
    },
    {
      collection: 'work',
      relativePath: 'content/work/index.ts',
      exportName: 'projects',
      url: (slug: string) => `/work/${slug}`,
    },
  ]

  const entries = new Map<string, ContentEntry>()

  for (const source of sources) {
    if (!fs.existsSync(source.relativePath)) continue

    const objectLiterals = collectObjectLiterals(
      fs.readFileSync(source.relativePath, 'utf8'),
      source.relativePath,
      source.exportName,
    )

    for (const objectLiteral of objectLiterals) {
      const data = evaluate(objectLiteral)
      if (!isRecord(data)) continue

      const slug = typeof data.slug === 'string' ? data.slug : undefined
      if (!slug) continue

      const seo = isRecord(data.seo) ? data.seo : undefined
      const title =
        (seo && typeof seo.title === 'string' ? seo.title : undefined) ??
        (typeof data.title === 'string' ? data.title : undefined) ??
        slug
      const description =
        (seo && typeof seo.description === 'string' ? seo.description : undefined) ??
        (typeof data.description === 'string' ? data.description : undefined) ??
        ''

      const key = `${source.collection}:${slug}`
      if (entries.has(key)) continue

      entries.set(key, {
        source: 'typescript',
        collection: source.collection,
        filePath: path.resolve(process.cwd(), source.relativePath),
        relativePath: source.relativePath,
        slug,
        title,
        description,
        url: source.url(slug),
        data: data as Record<string, unknown>,
        content: collectProse(data).join('\n\n'),
      })
    }
  }

  return [...entries.values()].sort((a, b) => a.url.localeCompare(b.url))
}

/** Evaluates the literal values of an object literal; anything computed is skipped. */
export function evaluate(node: ts.Expression): LiteralValue | undefined {
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text
  if (ts.isNumericLiteral(node)) return Number(node.text)
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false
  if (node.kind === ts.SyntaxKind.NullKeyword) return null
  if (ts.isParenthesizedExpression(node)) return evaluate(node.expression)

  if (ts.isArrayLiteralExpression(node)) {
    const values: LiteralValue[] = []
    for (const element of node.elements) {
      const value = evaluate(element)
      if (value !== undefined) values.push(value)
    }
    return values
  }

  if (ts.isObjectLiteralExpression(node)) {
    const value: Record<string, LiteralValue> = {}
    for (const property of node.properties) {
      if (!ts.isPropertyAssignment(property)) continue
      const name = propertyName(property)
      if (!name) continue
      const evaluated = evaluate(property.initializer)
      if (evaluated !== undefined) value[name] = evaluated
    }
    return value
  }

  return undefined
}

/**
 * Returns the object literals of the exported array(s) in a TypeScript module.
 * With no `exportName`, every array literal in the file is used — the family
 * modules each export exactly one `Service[]`.
 */
export function collectObjectLiterals(
  source: string,
  fileName: string,
  exportName?: string,
): ts.ObjectLiteralExpression[] {
  const sourceFile = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  const items: ts.ObjectLiteralExpression[] = []

  const visit = (node: ts.Node): void => {
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      (!exportName || node.name.text === exportName) &&
      node.initializer &&
      ts.isArrayLiteralExpression(node.initializer)
    ) {
      for (const element of node.initializer.elements) {
        if (ts.isObjectLiteralExpression(element)) items.push(element)
      }
      return
    }
    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
  return items
}

function collectProse(value: LiteralValue, out: string[] = []): string[] {
  if (typeof value === 'string') {
    const text = value.trim()
    if (text && !NOT_PROSE.test(text)) out.push(text)
    return out
  }
  if (Array.isArray(value)) {
    for (const item of value) collectProse(item, out)
    return out
  }
  if (isRecord(value)) {
    for (const [key, item] of Object.entries(value)) {
      if (!NOT_BODY.has(key)) collectProse(item, out)
    }
  }
  return out
}

function propertyName(node: ts.PropertyAssignment): string | undefined {
  if (ts.isIdentifier(node.name) || ts.isStringLiteral(node.name) || ts.isNoSubstitutionTemplateLiteral(node.name)) {
    return node.name.text
  }
  return undefined
}

function isRecord(value: unknown): value is Record<string, LiteralValue> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function walkTypeScript(relativePath: string): string[] {
  const directory = path.resolve(process.cwd(), relativePath)
  if (!fs.existsSync(directory)) return []

  const files: string[] = []
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue
    const entryPath = path.join(directory, entry.name)
    if (entry.isDirectory()) files.push(...walkTypeScript(path.relative(process.cwd(), entryPath).replace(/\\/g, '/')))
    else if (entry.name.endsWith('.ts') && !entry.name.endsWith('.d.ts')) {
      files.push(path.relative(process.cwd(), entryPath).replace(/\\/g, '/'))
    }
  }
  return files.sort()
}
