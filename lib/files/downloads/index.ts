import type { DownloadAsset } from '../types'

export function downloadUrl(asset: Pick<DownloadAsset, 'url'>): string {
  return asset.url
}

export function downloadTrackingId(asset: DownloadAsset): string {
  return asset.trackingId ?? asset.metadata.filename
}
