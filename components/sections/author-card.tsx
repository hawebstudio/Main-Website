import { Author } from '@/lib/content/types'
import { Heading, Text } from '@/components/primitives/typography'
import { Badge } from '@/components/ui/badge'
import { UserCircle, Link as LinkIcon } from 'lucide-react'

export function AuthorCard({ author }: { author: Author }) {
  return (
    <div className="flex flex-col gap-6 p-8 rounded-3xl bg-secondary/10 border border-border">
      <div className="flex items-center gap-4">
        {/* Placeholder for real Image component if avatar exists */}
        <div className="size-16 rounded-full bg-secondary flex items-center justify-center shrink-0">
          <UserCircle className="size-8 text-muted-foreground" />
        </div>
        <div className="flex flex-col">
          <Heading level={3} size="sm">{author.name}</Heading>
          {author.role && <Text size="sm" tone="muted">{author.role}</Text>}
        </div>
      </div>
      
      {author.bio && <Text>{author.bio}</Text>}
      
      {author.expertise && author.expertise.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {author.expertise.map(skill => (
            <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
          ))}
        </div>
      )}
      
      {author.social && (
        <div className="flex items-center gap-4 mt-2">
          {author.social.twitter && (
            <a href={author.social.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">
              Twitter
            </a>
          )}
          {author.social.github && (
            <a href={author.social.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">
              GitHub
            </a>
          )}
          {author.social.linkedin && (
            <a href={author.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">
              LinkedIn
            </a>
          )}
        </div>
      )}
    </div>
  )
}
