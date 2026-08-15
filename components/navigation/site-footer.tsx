import Link from 'next/link'
import { Container } from '@/components/primitives/container'
import { Separator } from '@/components/ui/separator'
import { footerNav } from '@/config/navigation'
import { routes } from '@/config/routes'
import { siteConfig } from '@/config/site'
import { SiteSearch } from '@/components/search/site-search'
import { featuredSocialProfiles } from '@/lib/business/company'

const legalLinks = [
  { label: 'Privacy Policy', href: routes.privacy() },
  { label: 'Terms of Service', href: routes.terms() },
  { label: 'Cookie Policy', href: routes.cookies() },
]

/**
 * SiteFooter — data-driven footer rendered from config/navigation.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <Container size="lg" className="py-12 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="flex max-w-xs flex-col gap-3">
            <Link
              href={routes.home()}
              className="text-sm font-semibold tracking-tight text-foreground"
            >
              {siteConfig.name}
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
            <div className="pt-3">
              <SiteSearch
                variant="footer"
                placeholder="Search services, technologies, case studies..."
                className="max-w-sm"
              />
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerNav.map((group) => (
              <div key={group.title} className="flex flex-col gap-3">
                <h2 className="text-sm font-medium text-foreground">{group.title}</h2>
                <ul className="flex flex-col gap-2">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">Remote-first · Based in India</p>
            <ul className="flex flex-wrap items-center gap-4">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <ul className="flex items-center gap-4">
            {featuredSocialProfiles.map((profile) => (
              <li key={profile.icon}>
                <a
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  {profile.name}
                </a>
              </li>
            ))}
            <li>
              <Link
                href={routes.socials()}
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                All socials
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  )
}
