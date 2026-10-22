import fs from 'node:fs'
import path from 'node:path'
import { registerHooks } from 'node:module'
import { fileURLToPath, pathToFileURL } from 'node:url'

/**
 * Resolver hooks for importing application modules from tests.
 *
 * `lib/` imports its own siblings without extensions (`../constants`), which
 * node's ESM resolver rejects, and several modules use the `@/` alias. This
 * mirrors what `next build` does. Import it before a **dynamic** import of any
 * application module: static imports are resolved before this file is evaluated,
 * so the hooks would arrive too late.
 */
registerHooks({
  resolve(specifier, context, nextResolve) {
    const candidates = (base: string) => [`${base}.ts`, `${base}.tsx`, path.join(base, 'index.ts')]

    if (specifier.startsWith('@/')) {
      const base = path.resolve(process.cwd(), specifier.slice(2))
      for (const candidate of candidates(base)) {
        if (fs.existsSync(candidate)) return { url: pathToFileURL(candidate).href, shortCircuit: true }
      }
    }

    if ((specifier.startsWith('./') || specifier.startsWith('../')) && context.parentURL?.startsWith('file:')) {
      const base = path.resolve(path.dirname(fileURLToPath(context.parentURL)), specifier)
      for (const candidate of candidates(base)) {
        if (fs.existsSync(candidate)) return { url: pathToFileURL(candidate).href, shortCircuit: true }
      }
    }

    return nextResolve(specifier, context)
  },
})
