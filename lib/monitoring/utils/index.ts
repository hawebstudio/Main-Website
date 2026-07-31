export function sampleAllowed(sampleRate = 1): boolean {
  return sampleRate >= 1 || Math.random() <= sampleRate
}
