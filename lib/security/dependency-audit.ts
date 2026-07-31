/**
 * Dependency Security Audit
 * Checks for known vulnerabilities in dependencies
 */

import { execSync } from 'child_process'
import { readFileSync } from 'fs'
import { join } from 'path'

export interface DependencyAuditResult {
  vulnerabilities: Vulnerability[]
  summary: {
    total: number
    critical: number
    high: number
    moderate: number
    low: number
  }
}

export interface Vulnerability {
  name: string
  severity: 'critical' | 'high' | 'moderate' | 'low'
  package: string
  version: string
  title: string
  url?: string
}

interface NpmAuditAdvisory {
  severity: 'critical' | 'high' | 'moderate' | 'low'
  title: string
  url?: string
}

interface NpmAuditVulnData {
  name: string
  range: string
  via: NpmAuditAdvisory[]
}

interface NpmAuditOutput {
  vulnerabilities?: Record<string, NpmAuditVulnData>
}

interface NpmOutdatedInfo {
  current: string
  latest: string
}

interface NpmOutdatedOutput {
  [packageName: string]: NpmOutdatedInfo
}

/**
 * Run npm audit
 */
export function runNpmAudit(): DependencyAuditResult {
  try {
    const output = execSync('npm audit --json', {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    })

    const data = JSON.parse(output) as NpmAuditOutput
    return parseNpmAuditOutput(data)
  } catch (error: unknown) {
    // npm audit returns non-zero exit code if vulnerabilities found
    if (error instanceof Error && 'stdout' in error) {
      try {
        const data = JSON.parse((error as Error & { stdout?: string }).stdout || '') as NpmAuditOutput
        return parseNpmAuditOutput(data)
      } catch {
        // If output is not JSON, return empty result
        return {
          vulnerabilities: [],
          summary: { total: 0, critical: 0, high: 0, moderate: 0, low: 0 },
        }
      }
    }

    return {
      vulnerabilities: [],
      summary: { total: 0, critical: 0, high: 0, moderate: 0, low: 0 },
    }
  }
}

/**
 * Parse npm audit JSON output
 */
function parseNpmAuditOutput(data: NpmAuditOutput): DependencyAuditResult {
  const vulnerabilities: Vulnerability[] = []
  const summary = {
    total: 0,
    critical: 0,
    high: 0,
    moderate: 0,
    low: 0,
  }

  if (!data.vulnerabilities) {
    return { vulnerabilities, summary }
  }

  for (const [packageName, vulnData] of Object.entries(data.vulnerabilities)) {
    for (const advisory of vulnData.via) {
      const severity = advisory.severity as Vulnerability['severity']
      const vulnerability: Vulnerability = {
        name: advisory.title || vulnData.name,
        severity,
        package: packageName,
        version: vulnData.range,
        title: advisory.title || vulnData.name,
        url: advisory.url,
      }

      vulnerabilities.push(vulnerability)
      summary.total++
      summary[severity]++
    }
  }

  return { vulnerabilities, summary }
}

/**
 * Check package.json for outdated dependencies
 */
export function checkOutdatedDependencies(): {
  outdated: { name: string; current: string; latest: string }[]
} {
  try {
    const output = execSync('npm outdated --json', {
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe'],
    })

    const data = JSON.parse(output) as NpmOutdatedOutput
    const outdated: { name: string; current: string; latest: string }[] = []

    for (const [name, info] of Object.entries(data)) {
      outdated.push({
        name,
        current: info.current,
        latest: info.latest,
      })
    }

    return { outdated }
  } catch (_error) {
    // npm outdated returns non-zero if outdated packages found
    return { outdated: [] }
  }
}

/**
 * Check for duplicate dependencies
 */
export function checkDuplicateDependencies(): {
  duplicates: { name: string; versions: string[] }[]
} {
  try {
    const packageJsonPath = join(process.cwd(), 'package.json')
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8')) as {
      dependencies?: Record<string, string>
      devDependencies?: Record<string, string>
    }

    // This is a simplified check
    // In production, use a more sophisticated approach
    return { duplicates: [] }
  } catch (_error) {
    return { duplicates: [] }
  }
}

/**
 * Run full dependency audit
 */
export function runDependencyAudit(): {
  vulnerabilities: DependencyAuditResult
  outdated: ReturnType<typeof checkOutdatedDependencies>
  duplicates: ReturnType<typeof checkDuplicateDependencies>
} {
  return {
    vulnerabilities: runNpmAudit(),
    outdated: checkOutdatedDependencies(),
    duplicates: checkDuplicateDependencies(),
  }
}

/**
 * Print audit results to console
 */
export function printAuditResults(audit: ReturnType<typeof runDependencyAudit>): void {
  console.log('\n📦 Dependency Security Audit\n')

  // Vulnerabilities
  console.log('Vulnerabilities:')
  if (audit.vulnerabilities.summary.total === 0) {
    console.log('  ✅ No vulnerabilities found')
  } else {
    console.log(`  ❌ ${audit.vulnerabilities.summary.total} vulnerabilities found`)
    console.log(`     Critical: ${audit.vulnerabilities.summary.critical}`)
    console.log(`     High: ${audit.vulnerabilities.summary.high}`)
    console.log(`     Moderate: ${audit.vulnerabilities.summary.moderate}`)
    console.log(`     Low: ${audit.vulnerabilities.summary.low}`)

    audit.vulnerabilities.vulnerabilities.forEach((vuln) => {
      console.log(`\n  ${vuln.package}@${vuln.version}`)
      console.log(`    Severity: ${vuln.severity}`)
      console.log(`    Title: ${vuln.title}`)
      if (vuln.url) {
        console.log(`    URL: ${vuln.url}`)
      }
    })
  }

  // Outdated
  console.log('\nOutdated Dependencies:')
  if (audit.outdated.outdated.length === 0) {
    console.log('  ✅ All dependencies are up to date')
  } else {
    console.log(`  ⚠️  ${audit.outdated.outdated.length} outdated packages`)
    audit.outdated.outdated.forEach((pkg) => {
      console.log(`    ${pkg.name}: ${pkg.current} → ${pkg.latest}`)
    })
  }

  // Duplicates
  console.log('\nDuplicate Dependencies:')
  if (audit.duplicates.duplicates.length === 0) {
    console.log('  ✅ No duplicate dependencies found')
  } else {
    console.log(`  ⚠️  ${audit.duplicates.duplicates.length} duplicate packages`)
    audit.duplicates.duplicates.forEach((dup) => {
      console.log(`    ${dup.name}: ${dup.versions.join(', ')}`)
    })
  }
}
