# HA Web Studio Documentation

Welcome to the HA Web Studio documentation. This site is built as a maintainable, scalable business platform with content management, automation, and operational tooling.

## Quick Links

- [Architecture](ARCHITECTURE.md) - Project architecture and conventions
- [Content System](docs/CONTENT-SYSTEM.md) - Content management and provider abstraction
- [Publishing Guide](docs/PUBLISHING-GUIDE.md) - How to publish content
- [Deployment](docs/DEPLOYMENT.md) - Deployment workflow and procedures
- [Maintenance](docs/MAINTENANCE.md) - Maintenance tasks and procedures
- [Troubleshooting](docs/TROUBLESHOOTING.md) - Common issues and solutions
- [Asset Management](docs/ASSET-MANAGEMENT.md) - Asset conventions and management

## Getting Started

### For Developers

1. **Setup**
   ```bash
   # Install dependencies
   pnpm install
   
   # Start development server
   pnpm dev
   ```

2. **Understand the Architecture**
   - Read [ARCHITECTURE.md](ARCHITECTURE.md)
   - Review the directory structure
   - Understand the component system

3. **Content System**
   - Read [Content System](docs/CONTENT-SYSTEM.md)
   - Learn about content providers
   - Understand editorial workflows

4. **Publishing Content**
   - Read [Publishing Guide](docs/PUBLISHING-GUIDE.md)
   - Use content templates
   - Follow governance rules

### For Content Creators

1. **Learn the Publishing Process**
   - Read [Publishing Guide](docs/PUBLISHING-GUIDE.md)
   - Choose the right content type
   - Use content templates

2. **Content Best Practices**
   - Follow writing guidelines
   - Include required metadata
   - Add alt text to images
   - Link to related content

3. **Quality Assurance**
   - Run content audits
   - Check governance rules
   - Test before publishing

### For Operations

1. **Deployment**
   - Read [Deployment Guide](docs/DEPLOYMENT.md)
   - Follow release checklist
   - Monitor deployments

2. **Maintenance**
   - Read [Maintenance Guide](docs/MAINTENANCE.md)
   - Run scheduled audits
   - Keep dependencies updated

3. **Monitoring**
   - Check analytics dashboard
   - Monitor uptime
   - Review performance metrics

## Project Structure

```
ha-web-studio/
├── app/                      # Next.js app directory
│   ├── (marketing)/         # Public pages
│   ├── (admin)/             # Internal admin pages
│   ├── api/                 # API routes
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── cards/              # Domain-specific cards
│   ├── data/               # Display components
│   ├── layouts/            # Layout primitives
│   ├── navigation/         # Navigation components
│   ├── primitives/         # Low-level building blocks
│   ├── sections/           # Page sections
│   ├── seo/                # SEO components
│   ├── states/             # State components
│   └── ui/                 # shadcn/ui components
├── config/                  # Configuration files
│   ├── content.ts          # Content provider config
│   ├── navigation.ts       # Navigation structure
│   ├── routes.ts           # Route definitions
│   └── site.ts             # Site information
├── content/                 # Content files
│   ├── case-studies/       # Case study MDX files
│   ├── technologies/       # Technology MDX files
│   ├── insights/           # Insight MDX files
│   ├── problems/           # Problem MDX files
│   ├── work/               # Project TypeScript files
│   └── services/           # Service TypeScript files
├── hooks/                   # React hooks
├── lib/                     # Library code
│   ├── analytics/          # Analytics dashboard
│   ├── content/            # Content system
│   │   ├── editorial/      # Editorial workflows
│   │   ├── governance/     # Content governance
│   │   └── providers/      # Content providers
│   ├── data/               # Data utilities
│   ├── motion/             # Motion configurations
│   ├── operations/         # Operations and automation
│   │   └── automation/     # Automation workflows
│   ├── seo/                # SEO utilities
│   └── utils.ts            # Generic utilities
├── public/                  # Static assets
├── scripts/                 # Maintenance scripts
├── docs/                    # Documentation
└── ARCHITECTURE.md          # Architecture documentation
```

## Key Concepts

### Content Providers

The site uses a provider-agnostic content system that supports:
- Git-based MDX files (default)
- Decap CMS
- Sanity
- Contentlayer
- Payload CMS
- Notion
- Headless CMS APIs

Switch providers by setting the `CONTENT_PROVIDER` environment variable.

### Editorial Workflow

Content goes through a structured workflow:
1. **Draft** - Work in progress
2. **Review** - Ready for review
3. **Published** - Live and visible
4. **Archived** - Removed from public view

### Content Governance

Quality checks ensure content meets standards:
- Required metadata
- Internal links
- Image alt text
- SEO optimization
- Content freshness

### Automation

Event-driven workflows automate tasks:
- Sitemap regeneration
- RSS/Atom feed generation
- Search index refresh
- ISR revalidation
- IndexNow submission

## Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server

# Quality
pnpm lint             # Run linter
pnpm type-check       # TypeScript type check
pnpm audit            # Run all audits

# Individual Audits
pnpm content-audit     # Content quality check
pnpm asset-audit      # Asset management check
pnpm link-audit       # Link validation
pnpm metadata-audit   # Metadata validation
pnpm dependency-audit # Dependency check
pnpm route-audit      # Route validation
pnpm search-audit     # SEO and search check
```

## Environment Variables

Required environment variables:

```bash
# Content Provider
CONTENT_PROVIDER=git
CONTENT_API_URL=
CONTENT_API_TOKEN=

# Sanity (if using Sanity provider)
SANITY_PROJECT_ID=
SANITY_DATASET=

# Notion (if using Notion provider)
NOTION_DATABASE_ID=

# Automation
REVALIDATE_SECRET=
INDEXNOW_KEY=
INDEXNOW_ENABLED=false

# Analytics
# Vercel Analytics is automatic
```

## Deployment

The site is deployed on Vercel with GitHub as the source of truth.

- **Production**: Push to `main` branch
- **Preview**: Push to any other branch
- **Rollback**: Use Vercel deployment history

See [Deployment Guide](docs/DEPLOYMENT.md) for details.

## Support

### Documentation

- Start with the relevant guide in this directory
- Check [ARCHITECTURE.md](ARCHITECTURE.md) for system design
- Review code comments and JSDoc

### Troubleshooting

- See [Troubleshooting Guide](docs/TROUBLESHOOTING.md)
- Run diagnostics: `pnpm audit`
- Check logs in Vercel dashboard

### Getting Help

- Contact the development team
- Check GitHub issues
- Review Next.js and Vercel documentation

## Contributing

When contributing to HA Web Studio:

1. Follow the architecture defined in [ARCHITECTURE.md](ARCHITECTURE.md)
2. Use the existing component system
3. Follow the design system conventions
4. Add tests for new features
5. Update documentation
6. Run all audits before committing

## License

This project is private and proprietary to HA Web Studio.
