export function robotsDirectives(noIndex?: boolean) {
  return noIndex
    ? { index: false, follow: false }
    : {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-image-preview': 'large' as const,
          'max-video-preview': -1,
          'max-snippet': -1,
        },
      }
}
