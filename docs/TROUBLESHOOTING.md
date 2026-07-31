# Troubleshooting Guide

## Common Issues and Solutions

This guide covers common issues you may encounter while working with HA Web Studio.

## Build Issues

### Build Fails with TypeScript Errors

**Symptoms:**
- `pnpm build` fails with TypeScript errors
- Type errors in console

**Solutions:**
```bash
# Run type check to see all errors
pnpm type-check

# Fix type errors in your code
# Common fixes:
# - Add missing imports
# - Fix type annotations
# - Update types from dependencies
```

### Build Fails with Module Not Found

**Symptoms:**
- Error: "Module not found"
- Build fails during dependency resolution

**Solutions:**
```bash
# Clear cache and reinstall
rm -rf .next node_modules
pnpm install

# Check if dependency exists
pnpm list <package-name>

# Install missing dependency
pnpm add <package-name>
```

### Build Fails with Memory Error

**Symptoms:**
- "JavaScript heap out of memory"
- Build crashes during compilation

**Solutions:**
```bash
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" pnpm build

# Or set environment variable
export NODE_OPTIONS="--max-old-space-size=4096"
```

### Build is Slow

**Symptoms:**
- Build takes longer than expected
- Development server is slow

**Solutions:**
```bash
# Clear Next.js cache
rm -rf .next

# Check for large dependencies
pnpm why <package>

# Optimize images before adding
# Use static generation where possible
```

## Content Issues

### Content Not Appearing on Site

**Symptoms:**
- Content file exists but doesn't show on site
- Page returns 404

**Solutions:**
```bash
# Check content status is 'published'
# Verify slug matches filename
# Run content audit
pnpm content-audit

# Check for validation errors
# Verify frontmatter is valid YAML
```

### Governance Checks Failing

**Symptoms:**
- Content won't publish
- Governance errors in console

**Solutions:**
```bash
# Check governance rules in lib/content/governance/validation.ts
# Common issues:
# - Missing required fields
# - Missing alt text on images
# - No internal links
# - Content too short (<250 words)
# - Missing H1 heading

# Fix issues and retry
```

### Images Not Loading

**Symptoms:**
- Images show as broken
- 404 errors for image paths

**Solutions:**
```bash
# Check image exists in public/ directory
# Verify path is correct (starts with /)
# Run asset audit
pnpm asset-audit

# Common path issues:
# Wrong: ./assets/image.jpg
# Right: /assets/image.jpg
```

### Content Validation Errors

**Symptoms:**
- Zod validation errors in console
- Content fails to load

**Solutions:**
```bash
# Check schema in lib/content/schemas.ts
# Verify frontmatter matches schema
# Common issues:
# - Wrong data type
# - Missing required field
# - Invalid slug format (must be kebab-case)

# Fix frontmatter and retry
```

## Deployment Issues

### Deployment Fails on Vercel

**Symptoms:**
- Vercel build fails
- Error in deployment logs

**Solutions:**
```bash
# Check deployment logs in Vercel dashboard
# Common issues:
# - Environment variables missing
# - Build timeout
# - Dependency installation failure

# Test build locally
pnpm build

# Check environment variables in Vercel project settings
```

### Preview Deployment Not Working

**Symptoms:**
- Preview URL returns errors
- Changes not visible in preview

**Solutions:**
```bash
# Check branch is pushed to GitHub
# Verify Vercel is connected to repository
# Check preview deployment logs
# Ensure build succeeds locally
```

### Environment Variables Not Available

**Symptoms:**
- `process.env.VARIABLE` is undefined
- Features relying on env vars don't work

**Solutions:**
```bash
# Check .env file exists
# Verify variable names match
# Add variables in Vercel project settings
# Redeploy after adding variables

# Never commit .env file
# Use different values for preview/production
```

### ISR Revalidation Not Working

**Symptoms:**
- Content changes not reflected
- Old content still showing

**Solutions:**
```bash
# Check REVALIDATE_SECRET is set
# Verify API route exists at app/api/revalidate
# Test revalidation manually:
curl -X POST https://your-domain.com/api/revalidate \
  -H "Authorization: Bearer $REVALIDATE_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"paths": ["/", "/insights"]}'

# If not configured, rebuild to pick up changes
```

## Performance Issues

### Slow Page Load Times

**Symptoms:**
- Pages take long to load
- Lighthouse score is low

**Solutions:**
```bash
# Optimize images
# Use Next.js Image component
# Enable compression
# Check bundle size
# Use static generation where possible

# Run Lighthouse audit
# Check Vercel Analytics for performance data
```

### High Memory Usage

**Symptoms:**
- Server uses too much memory
- Functions timeout

**Solutions:**
```bash
# Optimize data fetching
# Use pagination for large lists
- Cache expensive operations
# Use streaming for large responses
# Check for memory leaks
```

### Database Connection Issues

**Symptoms:**
- Database errors in logs
- Data not loading

**Solutions:**
```bash
# Check database credentials
# Verify database is accessible
# Check connection pool settings
# Test connection manually
# Check database logs
```

## SEO Issues

### Pages Not Indexed

**Symptoms:**
- Pages not appearing in search results
- Google Search Console shows errors

**Solutions:**
```bash
# Check robots.txt allows crawling
# Verify sitemap includes pages
# Check for noindex/noarchive tags
# Submit sitemap to Google Search Console
# Check for crawl errors in GSC
```

### Sitemap Not Generating

**Symptoms:**
- /sitemap.xml returns error
- Sitemap missing pages

**Solutions:**
```bash
# Check app/sitemap.ts exists
# Verify sitemap configuration
# Test sitemap locally
# Check for build errors
# Rebuild and redeploy
```

### Structured Data Errors

**Symptoms:**
- Rich results test shows errors
- Schema validation fails

**Solutions:**
```bash
# Check JSON-LD in components/seo/
# Validate with Google Rich Results Test
# Verify schema.org syntax
# Check for required fields
# Test with structured data testing tool
```

## Automation Issues

### Automation Not Triggering

**Symptoms:**
- Published content doesn't trigger automation
- Sitemap not regenerating

**Solutions:**
```bash
# Check automation configuration in config/content.ts
# Verify event handlers are registered
# Check Vercel function logs
# Test automation manually
# Verify environment variables
```

### IndexNow Not Submitting

**Symptoms:**
- URLs not submitted to search engines
- IndexNow errors in logs

**Solutions:**
```bash
# Check INDEXNOW_KEY is set
# Verify INDEXNOW_ENABLED is true
# Test IndexNow API manually
# Check API key is valid
# Verify URL format is correct
```

### Search Index Not Refreshing

**Symptoms:**
- New content not in search
- Search results outdated

**Solutions:**
```bash
# Check search-index.json exists
# Verify search index generation
# Run search audit
pnpm search-audit

# Manually regenerate search index
pnpm build
```

## Development Issues

### Hot Reload Not Working

**Symptoms:**
- Changes not reflected in browser
- Need to refresh manually

**Solutions:**
```bash
# Restart dev server
# Check file watcher limits
# Clear .next cache
# Check for syntax errors
# Verify file is being watched
```

### TypeScript Errors in IDE

**Symptoms:**
- Red squiggles in code
- IDE shows type errors

**Solutions:**
```bash
# Restart TypeScript server in IDE
# Run type check: pnpm type-check
# Update TypeScript: pnpm add -D typescript@latest
# Check tsconfig.json configuration
# Clear IDE cache
```

### Import Path Errors

**Symptoms:**
- Module not found errors
- Import paths not resolving

**Solutions:**
```bash
# Check tsconfig.json paths configuration
# Use @/ alias for project imports
# Verify file exists at path
# Check for case sensitivity
# Restart TypeScript server
```

## Git Issues

### Merge Conflicts

**Symptoms:**
- Git merge fails with conflicts
- Can't push changes

**Solutions:**
```bash
# Resolve conflicts manually
# Use merge tool
# Test after resolving
# Commit resolved changes
# Push to remote
```

### Large File Issues

**Symptoms:**
- Git push fails with large file error
- Repository too large

**Solutions:**
```bash
# Use Git LFS for large files
# Remove large files from history
# Add to .gitignore
# Use external storage for assets
# Optimize repository size
```

## Getting Help

### Check Documentation

- Architecture: `ARCHITECTURE.md`
- Content System: `docs/CONTENT-SYSTEM.md`
- Publishing Guide: `docs/PUBLISHING-GUIDE.md`
- Deployment: `docs/DEPLOYMENT.md`
- Maintenance: `docs/MAINTENANCE.md`

### Run Diagnostics

```bash
# Run all audits
pnpm audit

# Type check
pnpm type-check

# Build test
pnpm build
```

### Check Logs

- Vercel deployment logs
- Browser console
- Server logs
- Function logs

### External Resources

- Next.js documentation
- Vercel documentation
- GitHub issues
- Stack Overflow
- Community forums

### Contact Team

If you can't resolve the issue:

1. Document the problem
2. Include error messages
3. List steps to reproduce
4. Note what you've tried
5. Contact the development team
