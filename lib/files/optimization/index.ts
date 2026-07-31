export function preferredImageFormats(): string[] {
  return ['avif', 'webp']
}

export function imageSizesAttribute(maxWidth = 1200): string {
  return `(max-width: ${maxWidth}px) 100vw, ${maxWidth}px`
}
