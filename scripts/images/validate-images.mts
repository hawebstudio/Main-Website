import { extractImageReferences, pathExists, printResult, readContentEntries, readText, walkFiles, type AuditMessage } from '../shared/toolkit.mts'

const messages: AuditMessage[] = []
const scanned = [
  ...(await readContentEntries()).map((entry) => ({ file: entry.relativePath, body: `${entry.content}\n${JSON.stringify(entry.data)}` })),
  ...walkFiles('app', ['.tsx', '.mts']).map((file) => ({ file, body: readText(file) })),
  ...walkFiles('components', ['.tsx', '.mts']).map((file) => ({ file, body: readText(file) })),
]

for (const item of scanned) {
  for (const image of extractImageReferences(item.body)) {
    if (image.src.startsWith('http') || image.src.startsWith('data:')) continue
    if (image.src.startsWith('/') && !pathExists(`public${image.src}`)) messages.push({ level: 'issue', message: `${item.file}: missing image ${image.src}` })
    if (item.file.endsWith('.mdx') && !image.alt) messages.push({ level: 'issue', message: `${item.file}: missing alt text for ${image.src}` })
  }
}

printResult('Image validation', messages)
