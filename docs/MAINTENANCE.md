# Maintenance Guide

## Overview

This guide covers routine maintenance tasks for HA Web Studio, including audits, updates, and troubleshooting.

## Maintenance Scripts

The project includes several maintenance scripts in the `scripts/` directory:

### Content Audit

```bash
pnpm content-audit
```

Checks for:
- Missing required fields (title, description, slug)
- Duplicate titles and descriptions
- Missing authors (for insights)
- Missing reading time (for insights)
- Thin content (under 250 words)
- Missing H1 headings

### Asset Audit

```bash
pnpm asset-audit
```

Checks for:
- Unreferenced assets
- Missing alt text
- Large file sizes (>500KB)
- Duplicate files
- Broken image links
- Naming convention violations

### Link Audit

```bash
pnpm link-audit
```

Checks for:
- Broken internal links
- Localhost links in production
- Non-HTTPS external links
- Orphaned content (no internal links)

### Metadata Audit

```bash
pnpm metadata-audit
```

Checks for:
- Missing required metadata
- SEO title/description length
- Missing published/updated dates
- Missing author (for insights)
- Missing version numbers
- Deprecated draft flag usage

### Dependency Audit

```bash
pnpm dependency-audit
```

Checks for:
- Potentially vulnerable dependencies
- Unused dependencies
- Missing common dependencies
- Package.json script issues
- TypeScript configuration

### Route Audit

```bash
pnpm route-audit
```

Checks for:
- Hardcoded paths in components
- Missing route configurations
- Dynamic route consistency
- App directory structure

### Search Audit

```bash
pnpm search-audit
```

Checks for:
- Search index presence and structure
- Sitemap configuration
- Robots.txt configuration
- RSS/Atom feed presence
- Content SEO issues
- IndexNow configuration

### Run All Audits

```bash
pnpm audit
```

Runs all audits in sequence.

## Scheduled Maintenance

### Weekly

- Run `pnpm audit` to check for issues
- Review analytics dashboard
- Check for broken links
- Monitor performance metrics

### Monthly

- Update dependencies: `pnpm update`
- Review content freshness
- Check for outdated content
- Review and update documentation
- Security audit

### Quarterly

- Major dependency updates
- Content audit and cleanup
- Performance optimization review
- SEO review and improvements
- Backup verification

## Content Maintenance

### Updating Outdated Content

1. Identify outdated content using the freshness check
2. Review content for accuracy
3. Update `updatedAt` timestamp
4. Increment `version` number
5. Add new information if relevant
6. Run content audit
7. Publish changes

### Content Freshness

Content older than 180 days triggers a freshness warning. Review these items:

```bash
# Check for old content
pnpm metadata-audit
```

### Broken Links

Regularly check for broken links:

```bash
pnpm link-audit
```

Fix broken links by:
- Updating the URL
- Removing the link if the target no longer exists
- Adding a redirect if the content moved

### Content Cleanup

Remove or archive content that is:
- No longer relevant
- Outdated and not worth updating
- Duplicate of other content
- Low performing with no value

## Dependency Management

### Updating Dependencies

```bash
# Check for updates
pnpm outdated

# Update all dependencies
pnpm update

# Update specific dependency
pnpm update next
```

### Security Updates

Regularly check for security vulnerabilities:

```bash
# Run security audit
pnpm audit

# Fix vulnerabilities
pnpm audit fix
```

### Major Version Updates

For major version updates (e.g., Next.js 15 → 16):

1. Read the migration guide
2. Update in a feature branch
3. Test thoroughly
4. Run all audits
5. Deploy to preview
6. Monitor for issues
7. Merge to main

## Performance Maintenance

### Image Optimization

Regularly optimize images:

1. Run asset audit to find large images
2. Optimize using tools like Squoosh
3. Convert to WebP where appropriate
4. Update image references
5. Rebuild and test

### Build Optimization

Monitor build times and optimize:

```bash
# Check build time
time pnpm build

# Analyze bundle size
# (use Next.js built-in analyzer)
```

### Cache Management

Clear caches if needed:

```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules and reinstall
rm -rf node_modules
pnpm install

# Clear pnpm cache
pnpm store prune
```

## SEO Maintenance

### Sitemap

The sitemap is automatically generated at `app/sitemap.ts`. Verify it includes all important pages.

### Robots.txt

The robots.txt is automatically generated at `app/robots.ts`. Verify it allows crawling of important pages.

### Structured Data

Check structured data using:
- Google Rich Results Test
- Schema.org validator

### IndexNow

If IndexNow is enabled, verify submissions are working by checking the IndexNow API.

## Backup and Recovery

### Git Backups

The repository is the primary backup. Ensure:

- Regular commits
- Meaningful commit messages
- Tags for releases
- Remote repository synced

### Content Backups

Content is stored in the repository. No separate backup needed.

### Environment Variables

Keep a secure backup of environment variables:
- Store in a password manager
- Document required variables
- Keep preview and production separate

## Troubleshooting

### Build Fails

1. Check error messages
2. Clear caches: `rm -rf .next`
3. Reinstall dependencies: `rm -rf node_modules && pnpm install`
4. Check Node.js version
5. Run type check: `pnpm type-check`

### Content Not Loading

1. Check content status is `published`
2. Verify slug is correct
3. Run content audit
4. Check for validation errors
5. Verify provider configuration

### Images Not Loading

1. Check file exists in `public/`
2. Verify path is correct
3. Check file permissions
4. Run asset audit
5. Clear browser cache

### Analytics Not Working

1. Check environment variables
2. Verify analytics configuration
3. Check browser console for errors
4. Test with debug mode
5. Check Vercel Analytics dashboard

### Automation Not Running

1. Check environment variables
2. Verify API keys are set
3. Check Vercel function logs
4. Test automation tasks manually
5. Verify workflow configuration

## Monitoring

### Vercel Dashboard

Monitor:
- Build status
- Function logs
- Error rates
- Response times
- Bandwidth usage

### Analytics Dashboard

Monitor:
- Traffic patterns
- User behavior
- Conversion rates
- Content performance
- Search traffic

### Uptime Monitoring

Set up uptime monitoring for:
- Homepage
- Key service pages
- Important content pages
- API endpoints (if any)

## Documentation Maintenance

Keep documentation up to date:

- Update this guide when procedures change
- Document new features as they're added
- Update publishing guide for content changes
- Keep architecture documentation current
- Document troubleshooting solutions

## Emergency Procedures

### Site Down

1. Check Vercel status page
2. Check deployment logs
3. Verify DNS configuration
4. Check SSL certificate
5. Rollback if needed

### Content Issue

1. Set status to `draft` or `archived`
2. Fix the issue
3. Run audits
4. Republish
5. Monitor for issues

### Security Issue

1. Identify the vulnerability
2. Patch immediately
3. Update dependencies
4. Rotate secrets if needed
5. Monitor for suspicious activity
6. Document the incident

## Getting Help

- Review this documentation
- Check project architecture: `ARCHITECTURE.md`
- Review content system: `docs/CONTENT-SYSTEM.md`
- Check deployment guide: `docs/DEPLOYMENT.md`
- Contact the development team
- Check Vercel documentation
- Review Next.js documentation
