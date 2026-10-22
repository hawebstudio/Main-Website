import { writeFileSync } from 'node:fs'
import { join } from 'node:path'

const url = `http://localhost:3001${process.argv[2] ?? '/favicon.ico'}`

async function main() {
  const raw = await fetch(url)
  const out = {
    url,
    status: raw.status,
    statusText: raw.statusText,
    contentType: raw.headers.get('content-type'),
    contentLength: raw.headers.get('content-length'),
    ok: raw.ok,
  }
  writeFileSync(
    join(process.cwd(), 'tmp', `favicon-check-${Date.now()}.json`),
    JSON.stringify(out, null, 2),
  )
  console.log(JSON.stringify(out))
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
