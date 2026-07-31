import { headers } from 'next/headers'
import type { JsonLdObject } from '@/lib/seo/json-ld'

interface JsonLdProps {
  data: JsonLdObject | JsonLdObject[]
}

export async function JsonLd({ data }: JsonLdProps) {
  const items = Array.isArray(data) ? data : [data]
  const nonce = (await headers()).get('x-nonce') ?? undefined

  return (
    <>
      {items.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          nonce={nonce}
          // React intentionally never reflects `nonce` back into the DOM's
          // nonce *attribute* (only the JS property) so it can't be read
          // off the rendered HTML by an attacker/extension. That means the
          // browser reports the attribute as "" even though the property
          // is set correctly, which React's hydration diff flags as a
          // mismatch. It's a known false positive (see
          // https://github.com/vercel/next.js/issues/77952) — the script
          // still executes with the right nonce either way.
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  )
}
