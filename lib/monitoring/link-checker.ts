/**
 * Link Checker
 * Monitors and reports broken links
 */

export interface LinkCheckResult {
  url: string
  status: 'valid' | 'broken' | 'redirect' | 'error'
  statusCode?: number
  error?: string
}

export interface LinkCheckReport {
  total: number
  valid: number
  broken: number
  redirects: number
  errors: number
  links: LinkCheckResult[]
}

/**
 * Check a single link
 */
export async function checkLink(url: string): Promise<LinkCheckResult> {
  try {
    // Skip anchor links and mailto links
    if (url.startsWith('#') || url.startsWith('mailto:') || url.startsWith('tel:')) {
      return { url, status: 'valid' }
    }

    // Skip relative links (will be checked by build process)
    if (url.startsWith('/')) {
      return { url, status: 'valid' }
    }

    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
    })

    const statusCode = response.status

    if (statusCode >= 200 && statusCode < 300) {
      return { url, status: 'valid', statusCode }
    } else if (statusCode >= 300 && statusCode < 400) {
      return { url, status: 'redirect', statusCode }
    } else {
      return { url, status: 'broken', statusCode }
    }
  } catch (error) {
    return {
      url,
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

/**
 * Check multiple links
 */
export async function checkLinks(urls: string[], concurrency = 5): Promise<LinkCheckReport> {
  const results: LinkCheckResult[] = []
  const chunks = []

  // Split into chunks for concurrent processing
  for (let i = 0; i < urls.length; i += concurrency) {
    chunks.push(urls.slice(i, i + concurrency))
  }

  for (const chunk of chunks) {
    const chunkResults = await Promise.all(chunk.map(checkLink))
    results.push(...chunkResults)
  }

  const report: LinkCheckReport = {
    total: results.length,
    valid: results.filter((r) => r.status === 'valid').length,
    broken: results.filter((r) => r.status === 'broken').length,
    redirects: results.filter((r) => r.status === 'redirect').length,
    errors: results.filter((r) => r.status === 'error').length,
    links: results,
  }

  return report
}

/**
 * Extract links from HTML
 */
export function extractLinks(html: string): string[] {
  const linkRegex = /href=["']([^"']+)["']/gi
  const links: string[] = []
  let match

  while ((match = linkRegex.exec(html)) !== null) {
    links.push(match[1])
  }

  return [...new Set(links)] // Remove duplicates
}

/**
 * Print link check report
 */
export function printLinkCheckReport(report: LinkCheckReport): void {
  console.log('\n🔗 Link Check Report\n')
  console.log(`Total links: ${report.total}`)
  console.log(`✅ Valid: ${report.valid}`)
  console.log(`⚠️  Redirects: ${report.redirects}`)
  console.log(`❌ Broken: ${report.broken}`)
  console.log(`🔴 Errors: ${report.errors}`)

  if (report.broken > 0 || report.errors > 0) {
    console.log('\nBroken/Error Links:')
    report.links
      .filter((r) => r.status === 'broken' || r.status === 'error')
      .forEach((link) => {
        console.log(`  ${link.url}`)
        if (link.error) {
          console.log(`    Error: ${link.error}`)
        }
        if (link.statusCode) {
          console.log(`    Status: ${link.statusCode}`)
        }
      })
  }
}
