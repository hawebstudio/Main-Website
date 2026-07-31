export interface BusinessLink {
  label: string
  href: string
}

export interface SocialProfile {
  name: string
  url: string
  username?: string
  icon: string
  /** Shown in the footer's compact social row; all profiles still appear on /socials. */
  featured?: boolean
}

export interface NavigationItem extends BusinessLink {
  children?: NavigationItem[]
}

export interface NavigationGroup {
  title: string
  items: NavigationItem[]
}

export interface BusinessFaq {
  question: string
  answer: string
}

export interface BrandColor {
  name: string
  value: string
}

export interface BusinessStatistic {
  label: string
  value: number
  suffix?: string
  description?: string
}
