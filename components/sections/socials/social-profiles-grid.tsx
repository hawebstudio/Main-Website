import { ArrowUpRight } from 'lucide-react'
import { GlassPanel } from '@/components/primitives/glass-panel'
import { Text } from '@/components/primitives/typography'
import type { SocialProfile } from '@/lib/business/types'

interface SocialProfilesGridProps {
  profiles: SocialProfile[]
}

/**
 * SocialProfilesGrid — every social channel with its handle, rendered for
 * the /socials page. The footer only shows the featured subset; this page
 * is the full list.
 */
export function SocialProfilesGrid({ profiles }: SocialProfilesGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {profiles.map((profile) => (
        <a
          key={profile.icon}
          href={profile.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <GlassPanel className="flex items-center justify-between gap-4 p-6 transition-colors group-hover:border-primary/40">
            <div className="flex flex-col gap-1">
              <span className="text-base font-semibold text-foreground">{profile.name}</span>
              {profile.username ? (
                <Text size="sm" tone="muted">
                  @{profile.username}
                </Text>
              ) : null}
            </div>
            <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
          </GlassPanel>
        </a>
      ))}
    </div>
  )
}
