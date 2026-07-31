import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { z } from 'zod'
import type { ContentProvider } from './types'

/**
 * Git-based content provider.
 * Reads MDX files from the repository filesystem.
 * This is the default provider and maps to the current workflow.
 */
export function createGitMdxProvider<T>(
  directory: string,
  schema: z.ZodType<T>,
): ContentProvider<T> {
  return {
    type: 'git',
    async getAll() {
      const contentDirectory = directory.replace(/^content[\\/]/, '')
      const dirPath = path.join(process.cwd(), 'content', contentDirectory)

      if (!fs.existsSync(dirPath)) return []

      const files = walkMdxFiles(dirPath)
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

function walkMdxFiles(directory: string, base = directory): string[] {
  const files: string[] = []

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      files.push(...walkMdxFiles(entryPath, base))
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
