import path from 'path'
import matter from 'gray-matter'
import type { z } from 'zod'
import type { ContentProvider } from './types'
import type { Dirent } from 'fs'

/**
 * Git-based content provider.
 * Reads MDX files from the repository filesystem.
 * This is the default provider and maps to the current workflow.
 *
 * `fs` is imported dynamically (not statically at module scope) because
 * Turbopack flips a page's compiled server bundle to ESM output whenever a
 * module it statically imports both `import`s `fs`/`node:fs` AND calls a
 * sync `fs.X()` function. With `"type": "module"` in package.json, an
 * ESM-emitted bundle can't be loaded by Vercel's CommonJS launcher
 * (___next_launcher.cjs), which crashes every route with ERR_REQUIRE_ESM
 * since this provider sits in the import graph of nearly every page.
 * A dynamic `import('node:fs')` inside the async function keeps the fs
 * usage out of the static import graph, so the page bundle stays CJS.
 * See https://github.com/vercel/next.js/discussions/91663
 */
export function createGitMdxProvider<T>(
  directory: string,
  schema: z.ZodType<T>,
): ContentProvider<T> {
  return {
    type: 'git',
    async getAll() {
      const fs = await import('node:fs')
      const contentDirectory = directory.replace(/^content[\\/]/, '')
      const dirPath = path.join(process.cwd(), 'content', contentDirectory)

      if (!fs.existsSync(dirPath)) return []

      const files = walkMdxFiles(fs, dirPath)
      const entries: Array<T & { content?: string }> = []

      for (const file of files) {
        const filePath = path.join(dirPath, file)
        const fileContent = fs.readFileSync(filePath, 'utf8')
        const { data, content } = matter(fileContent)

        try {
          const fallbackSlug = path.basename(file, '.mdx')
          const relativePath = file.replace(/\\/g, '/')
          const dataWithSlug = { slug: fallbackSlug, contentPath: relativePath, ...data }
          const validatedData = schema.parse(dataWithSlug)
          entries.push({ ...validatedData, content } as T & { content?: string })
        } catch (error) {
          console.error(`Validation error in ${filePath}:`, error)
        }
      }

      return entries
    },
  }
}

function walkMdxFiles(fs: typeof import('node:fs'), directory: string, base = directory): string[] {
  const files: string[] = []

  for (const entry of fs.readdirSync(directory, { withFileTypes: true }) as Dirent[]) {
    const entryPath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      files.push(...walkMdxFiles(fs, entryPath, base))
      continue
    }
    if (entry.name.endsWith('.mdx')) files.push(path.relative(base, entryPath))
  }

  return files
}

/**
 * Git-based TypeScript content provider.
 * Used for structured content defined directly in code.
 */
export function createGitTsProvider<T>(data: T[]): ContentProvider<T> {
  return {
    type: 'git',
    async getAll() {
      return data as Array<T & { content?: string }>
    },
  }
}
