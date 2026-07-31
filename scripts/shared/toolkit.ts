import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { spawnSync } from 'node:child_process'
import matter from 'gray-matter'

export type IssueLevel = 'issue' | 'warning'

export interface AuditMessage {
  level: IssueLevel
  message: string
}

export interface ContentEntry {
  source: 'mdx' | 'typescript'
  collection: string
  filePath: string
  relativePath: string
  slug: string
  title: string
  description: string
  url: string
  data: Record<string, unknown>
  content: string
}

export const root = process.cwd()
export const reportsDir = 'reports'
export const generatedDir = 'public/generated'
export const searchDir = 'public/search'
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://hawebstudio.com').replace(/\/$/, '')

export const mdxCollections = [
  { name: 'case-studies', dir: 'content/case-studies', route: '/case-studies' },
  { name: 'technologies', dir: 'content/technologies', route: '/technologies' },
  { name: 'insights', dir: 'content/insights', route: '/insights' },
  { name: 'problems', dir: 'content/problems', route: '/problems' },
] as const

const structuredCollections = [
  { name: 'services', file: 'content/services/index.ts', exportName: 'services', route: '/services' },
  { name: 'service-families', file: 'content/services/index.ts', exportName: 'serviceFamilies', route: '/services/families' },
  { name: 'work', file: 'content/work/index.ts', exportName: 'projects', route: '/work' },
] as const

export const staticRoutes = [
  '/',
  '/services',
  '/work',
  '/work/client',
  '/work/personal',
  '/work/internal',
  '/work/labs',
  '/case-studies',
  '/technologies',
  '/insights',
  '/problems',
  '/search',
  '/about',
  '/contact',
  '/ponytail',
] as const

export function resolveRoot(relativePath: string): string {
  return path.resolve(root, relativePath)
}

export function toRelative(filePath: string): string {
  return path.relative(root, filePath).replace(/\\/g, '/')
}

export function assertInsideRoot(filePath: string): void {
  const resolvedRoot = path.resolve(root)
  const resolved = path.resolve(filePath)
  if (resolved !== resolvedRoot && !resolved.startsWith(`${resolvedRoot}${path.sep}`)) {
    throw new Error(`Refusing to access path outside workspace: ${resolved}`)
  }
}

export function pathExists(relativePath: string): boolean {
  return fs.existsSync(resolveRoot(relativePath))
}

export function readText(relativePath: string): string {
  return fs.readFileSync(resolveRoot(relativePath), 'utf8')
}

export function writeText(relativePath: string, value: string): void {
  const filePath = resolveRoot(relativePath)
  assertInsideRoot(filePath)
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, value.endsWith('\n') ? value : `${value}\n`)
}

export function readJson<T>(relativePath: string): T {
  return JSON.parse(readText(relativePath)) as T
}

export function writeJson(relativePath: string, value: unknown): void {
  writeText(relativePath, JSON.stringify(value, null, 2))
}

export function walkFiles(relativePath: string, extensions?: string[]): string[] {
  const directory = resolveRoot(relativePath)
  if (!fs.existsSync(directory)) return []

  const files: string[] = []
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === '.git') continue
    const entryPath = path.join(directory, entry.name)
    const rel = toRelative(entryPath)
    if (entry.isDirectory()) files.push(...walkFiles(rel, extensions))
    else if (!extensions || extensions.includes(path.extname(entry.name))) files.push(rel)
  }
  return files
}

export async function readContentEntries(): Promise<ContentEntry[]> {
  const entries: ContentEntry[] = []

  for (const collection of mdxCollections) {
    for (const relativePath of walkFiles(collection.dir, ['.mdx'])) {
      const filePath = resolveRoot(relativePath)
      const parsed = matter(fs.readFileSync(filePath, 'utf8'))
      const slug = String(parsed.data.slug ?? path.basename(relativePath, '.mdx'))
      const title = String(parsed.data.seo?.title ?? parsed.data.title ?? firstHeading(parsed.content) ?? slug)
      const description = String(parsed.data.seo?.description ?? parsed.data.description ?? '')

      entries.push({
        source: 'mdx',
        collection: collection.name,
        filePath,
        relativePath,
        slug,
        title,
        description,
        url: routeForMdxEntry(collection.name, collection.route, slug, parsed.data),
        data: parsed.data,
        content: parsed.content,
      })
    }
  }

  for (const collection of structuredCollections) {
    const filePath = resolveRoot(collection.file)
    if (!fs.existsSync(filePath)) continue
    const mod = await import(pathToFileURL(filePath).href)
    const items = (mod[collection.exportName] ?? []) as Record<string, unknown>[]

    for (const item of items) {
      if (!item?.slug) continue
      entries.push({
        source: 'typescript',
        collection: collection.name,
        filePath,
        relativePath: collection.file,
        slug: String(item.slug),
        title: String(item.seo?.title ?? item.title ?? item.slug),
        description: String(item.seo?.description ?? item.description ?? ''),
        url: `${collection.route}/${item.slug}`,
        data: item,
        content: [
          item.description,
          item.scope,
          item.context,
          item.challenge,
          item.solution,
          ...(item.faqs ?? []).flatMap((faq: { question: string; answer: string }) => [faq.question, faq.answer]),
        ].filter(Boolean).join('\n\n'),
      })
    }
  }

  return entries.sort((a, b) => a.url.localeCompare(b.url))
}

function routeForMdxEntry(collection: string, route: string, slug: string, data: Record<string, unknown>): string {
  if (collection !== 'technologies') return `${route}/${slug}`
  if (data.kind === 'root') return route
  if (data.kind === 'category') return `${route}/${slug}`
  if (data.category) return `${route}/${data.category}/${slug}`
  return `${route}/${slug}`
}

export function wordCount(value: string): number {
  return stripMarkdown(value).trim().split(/\s+/).filter(Boolean).length
}

export function readingTimeMinutes(value: string): number {
  return Math.max(1, Math.ceil(wordCount(value) / 220))
}

export function stripMarkdown(value: string): string {
  return value
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*]\([^)]+\)/g, ' ')
    .replace(/\[[^\]]+]\([^)]+\)/g, ' ')
    .replace(/[#*_>~-]/g, ' ')
}

export function extractHeadings(markdown: string): Array<{ depth: number; text: string; slug: string }> {
  return markdown
    .split(/\r?\n/)
    .map((line) => /^(#{2,3})\s+(.+)$/.exec(line))
    .filter((match): match is RegExpExecArray => Boolean(match))
    .map((match) => ({ depth: match[1].length, text: match[2].trim(), slug: slugify(match[2]) }))
}

export function extractLinks(value: string): string[] {
  const links = new Set<string>()
  for (const match of value.matchAll(/\[[^\]]+]\(([^)]+)\)/g)) links.add(match[1].trim())
  for (const match of value.matchAll(/href=["']([^"']+)["']/g)) links.add(match[1].trim())
  return [...links].filter((link) => link && !link.startsWith('#') && !link.startsWith('mailto:') && !link.startsWith('tel:'))
}

export function extractImageReferences(value: string): Array<{ src: string; alt?: string }> {
  const images: Array<{ src: string; alt?: string }> = []
  for (const match of value.matchAll(/!\[([^\]]*)]\(([^)]+)\)/g)) images.push({ alt: match[1], src: match[2] })
  for (const match of value.matchAll(/(?:src|image|ogImage):\s*["']([^"']+)["']/g)) images.push({ src: match[1] })
  for (const match of value.matchAll(/<Image[^>]+src=["']([^"']+)["'][^>]*alt=["']([^"']*)["'][^>]*>/g)) {
    images.push({ src: match[1], alt: match[2] })
  }
  return images
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export function absoluteUrl(urlPath: string): string {
  return `${siteUrl}${urlPath.startsWith('/') ? urlPath : `/${urlPath}`}`
}

export function markdownTable(rows: string[][]): string {
  if (!rows.length) return ''
  const [head, ...body] = rows.map((row) => row.map(escapeTableCell))
  return [
    `| ${head.join(' | ')} |`,
    `| ${head.map(() => '---').join(' | ')} |`,
    ...body.map((row) => `| ${row.join(' | ')} |`),
  ].join('\n')
}

export function printResult(title: string, messages: AuditMessage[]): void {
  const issues = messages.filter((item) => item.level === 'issue')
  const warnings = messages.filter((item) => item.level === 'warning')

  if (issues.length) {
    console.error(`${title} failed with ${issues.length} issue(s):`)
    for (const issue of issues) console.error(`- ${issue.message}`)
  }
  if (warnings.length) {
    console.warn(`${title} passed with ${warnings.length} warning(s):`)
    for (const warning of warnings) console.warn(`- ${warning.message}`)
  }
  if (!issues.length && !warnings.length) console.log(`${title} passed.`)
  process.exit(issues.length ? 1 : 0)
}

export function runCommand(command: string, args: string[]): number {
  const result = spawnSync(command, args, { cwd: root, stdio: 'inherit', shell: process.platform === 'win32' })
  return result.status ?? 1
}

export function fail(error: unknown): never {
  const message = error instanceof Error ? error.message : String(error)
  console.error(message)
  process.exit(1)
}

export async function script(title: string, callback: () => Promise<void> | void): Promise<void> {
  try {
    await callback()
  } catch (error) {
    console.error(`${title} failed.`)
    fail(error)
  }
}

function firstHeading(markdown: string): string | undefined {
  return /^#\s+(.+)$/m.exec(markdown)?.[1]?.trim()
}

function escapeTableCell(value: string): string {
  return String(value ?? '').replace(/\|/g, '\\|').replace(/\r?\n/g, '<br>')
}
