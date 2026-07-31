# Deployment Workflow

## Overview

This document defines the deployment workflow for HA Web Studio. The site is deployed on Vercel with GitHub as the source of truth.

## Deployment Environments

### Production
- **URL**: `https://ha-web-studio.vercel.app` (or custom domain)
- **Branch**: `main`
- **Trigger**: Push to `main` branch
- **Build**: `pnpm build`
- **Output**: `.next` directory

### Preview
- **URL**: `https://<branch-name>.ha-web-studio.vercel.app`
- **Branch**: Any branch except `main`
- **Trigger**: Push to non-`main` branch
- **Build**: `pnpm build`
- **Output**: `.next` directory

## Deployment Process

### Production Deployment

1. **Pre-deployment Checklist**
   ```bash
   # Run all audits
   pnpm audit
   
   # Type check
   pnpm type-check
   
   # Build validation
   pnpm build
   ```

2. **Create Release Branch**
   ```bash
   git checkout -b release/vX.Y.Z
   ```

3. **Update Version**
   - Update version in `package.json`
   - Update CHANGELOG.md

4. **Commit and Push**
   ```bash
   git add .
   git commit -m "Release vX.Y.Z"
   git push origin release/vX.Y.Z
   ```

5. **Create Pull Request**
   - Target: `main` branch
   - Title: `Release vX.Y.Z`
   - Description: Include changelog

6. **Merge to Main**
   - After approval, merge PR
   - Vercel automatically deploys

7. **Verify Deployment**
   - Check Vercel dashboard
   - Test critical pages
   - Verify analytics are working

### Preview Deployment

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature
   ```

2. **Make Changes**
   - Develop feature
   - Test locally

3. **Push to GitHub**
   ```bash
   git push origin feature/your-feature
   ```

4. **Preview URL**
   - Vercel provides preview URL
   - Share with stakeholders for review

5. **Clean Up**
   - Delete branch after merge
   - Preview deployments auto-expire

## Rollback Procedure

### Automatic Rollback

Vercel maintains previous deployments. To rollback:

1. Go to Vercel dashboard
2. Navigate to project
3. Click "Deployments"
4. Find previous successful deployment
5. Click "Promote to Production"

### Manual Rollback

1. **Identify Last Good Commit**
   ```bash
   git log --oneline
   ```

2. **Revert to Commit**
   ```bash
   git revert <commit-hash>
   git push origin main
   ```

3. **Vercel Auto-Deploys**
   - Deployment triggers automatically
   - Previous version restored

## Environment Validation

### Pre-build Validation

```bash
# Check environment variables
pnpm build

# Validate content
pnpm content-audit

# Validate assets
pnpm asset-audit

# Validate links
pnpm link-audit
```

### Post-build Validation

```bash
# Test production build locally
pnpm start

# Check for build errors
# Verify critical pages load
# Test forms and CTAs
```

## Build Validation

### Build Requirements

- Node.js: >= 18.x
- pnpm: >= 8.x
- Memory: >= 4GB recommended
- Build time: ~2-3 minutes

### Build Optimization

- Static generation for all pages
- ISR for dynamic content
- Image optimization enabled
- CSS minification enabled
- Tree shaking enabled

## Release Checklist

Before deploying to production:

- [ ] All audits pass (`pnpm audit`)
- [ ] Type check passes (`pnpm type-check`)
- [ ] Build succeeds locally (`pnpm build`)
- [ ] Content governance checks pass
- [ ] No broken links
- [ ] No missing assets
- [ ] SEO metadata complete
- [ ] Sitemap generates correctly
- [ ] RSS/Atom feeds generate correctly
- [ ] Search index generates correctly
- [ ] Analytics tracking verified
- [ ] Forms tested
- [ ] CTAs tested
- [ ] Responsive design tested
- [ ] Accessibility checked
- [ ] Performance acceptable (Lighthouse score > 90)
- [ ] Environment variables configured
- [ ] Changelog updated

## Monitoring

### Post-Deployment Monitoring

1. **Vercel Dashboard**
   - Build logs
   - Function logs
   - Error rates
   - Response times

2. **Analytics**
   - Traffic patterns
   - Error tracking
   - User behavior

3. **Uptime Monitoring**
   - Site availability
   - Response times
   - SSL certificate

### Error Handling

- **Build Errors**: Check Vercel logs, fix locally, redeploy
- **Runtime Errors**: Check function logs, fix bug, redeploy
- **Performance Issues**: Optimize images, code, or database queries

## CI/CD Integration

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm audit
      - run: pnpm build
```

## Troubleshooting

### Common Issues

**Build Fails**
- Check Node.js version
- Clear cache: `rm -rf .next node_modules`
- Reinstall: `pnpm install`

**Deployment Stuck**
- Check Vercel status page
- Cancel and retry deployment
- Contact Vercel support

**Environment Variables Missing**
- Check Vercel project settings
- Verify variable names match `.env`
- Redeploy after adding variables

**Content Not Updating**
- Check ISR revalidation
- Clear cache: `pnpm build`
- Verify content status is `published`

## Security

### Best Practices

- Never commit `.env` files
- Use environment variables for secrets
- Enable Vercel protection features
- Keep dependencies updated
- Regular security audits
- Enable HTTPS only
- Set appropriate CORS headers

### Secrets Management

- Store secrets in Vercel environment variables
- Rotate secrets regularly
- Use different secrets for preview/production
- Never log secrets

## Performance Optimization

### Build-time Optimization

- Optimize images before upload
- Minify CSS/JS (自动)
- Use static generation where possible
- Implement ISR for dynamic content

### Runtime Optimization

- Enable Vercel Edge Network
- Use Vercel Image Optimization
- Implement caching headers
- Use CDN for static assets

## Disaster Recovery

### Backup Strategy

- Git repository is source of truth
- Vercel maintains deployment history
- Content stored in repository
- Regular database backups (if applicable)

### Recovery Procedure

1. Restore from Git
2. Redeploy to Vercel
3. Verify content integrity
4. Test critical functionality
5. Monitor for issues
