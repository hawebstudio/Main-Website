import { extractImageReferences, pathExists, printResult, readContentEntries, readText, walkFiles, type AuditMessage } from '../shared/toolkit.mts'

const messages: AuditMessage[] = []
const sourceFiles = [...walkFiles('app', ['.mts', '.tsx', '.mdx']), ...walkFiles('components', ['.mts', '.tsx', '.mdx'])]
const contentBlobs = [
  ...(await readContentEntries()).map((entry) => ({ file: entry.relativePath, content: `${entry.content}\n${JSON.stringify(entry.data)}` })),
  ...sourceFiles.map((file) => ({ file, content: readText(file) })),
]

for (const blob of contentBlobs) {
  for (const image of extractImageReferences(blob.content)) {
    if (image.src.startsWith('http') || image.src.startsWith('data:')) continue
    if (!image.alt && blob.file.endsWith('.mdx')) messages.push({ level: 'issue', message: `${blob.file}: image missing alt text (${image.src})` })
    if (image.src.startsWith('/') && !pathExists(`public${image.src}`)) {
      messages.push({ level: 'issue', message: `${blob.file}: missing public image ${image.src}` })
    }
  }
}

printResult('Image validation', messages)
