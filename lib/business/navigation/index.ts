import type { NavigationGroup, NavigationItem } from '../types'

export const headerNavigation: NavigationItem[] = [
  { label: 'Services', href: '/services' },
  {
    label: 'Work',
    href: '/work',
    children: [
      { label: 'Client Work', href: '/work/client' },
      { label: 'Personal Projects', href: '/work/personal' },
      { label: 'Labs', href: '/work/labs' },
    ],
  },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Insights', href: '/insights' },
  { label: 'About', href: '/about' },
]

export const footerNavigation: NavigationGroup[] = [
  {
    title: 'Studio',
    items: [
      { label: 'About', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Contact', href: '/contact' },
      { label: 'Socials', href: '/socials' },
    ],
  },
  {
    title: 'Work',
    items: [
      { label: 'All Work', href: '/work' },
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'Labs', href: '/work/labs' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { label: 'Insights', href: '/insights' },
      { label: 'Technologies', href: '/technologies' },
      { label: 'Problems We Solve', href: '/problems' },
    ],
  },
]

export const mobileNavigation = headerNavigation

export const breadcrumbRoots = {
  home: { label: 'Home', href: '/' },
  services: { label: 'Services', href: '/services' },
  work: { label: 'Work', href: '/work' },
  caseStudies: { label: 'Case Studies', href: '/case-studies' },
  insights: { label: 'Insights', href: '/insights' },
} as const

export const quickLinks = [
  { label: 'Start a project', href: '/contact' },
  { label: 'View services', href: '/services' },
  { label: 'Read insights', href: '/insights' },
] as const
