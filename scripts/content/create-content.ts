import fs from 'node:fs'
import path from 'node:path'
import { root, slugify } from '../shared/toolkit.ts'

const [, , type, ...titleParts] = process.argv
const title = titleParts.join(' ').trim()

if (!type || !title) {
  console.error('Usage: node --experimental-strip-types scripts/content/create-content.ts <insights|problems|case-studies|technologies> "Title"')
  process.exit(1)
}

const allowed = new Set(['insights', 'problems', 'case-studies', 'technologies'])
if (!allowed.has(type)) throw new Error(`Unsupported content type: ${type}`)

const slug = slugify(title)
const filePath = path.join(root, 'content', type, `${slug}.mdx`)
if (fs.existsSync(filePath)) throw new Error(`Content already exists: ${filePath}`)

fs.writeFileSync(filePath, `---\ntitle: "${title}"\ndescription: ""\nslug: "${slug}"\nstatus: "draft"\nupdatedAt: "${new Date().toISOString()}"\n---\n\n# ${title}\n`)
console.log(`Created ${path.relative(root, filePath)}`)
