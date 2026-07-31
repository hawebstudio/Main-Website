# Asset Management System

## Overview

This document defines the asset management conventions for HA Web Studio. Assets include images, documents, icons, and other media files used throughout the website.

## Folder Structure

```
public/
  assets/
    hero/              # Hero images for pages
      services/
      work/
      case-studies/
      insights/
      technologies/
      problems/
    gallery/           # Project galleries and case study images
      projects/
      case-studies/
    og/                # Open Graph images for social sharing
      services/
      work/
      case-studies/
      insights/
      technologies/
      problems/
    icons/             # Custom icons and brand assets
      brand/
      ui/
    documents/         # Downloadable documents
      whitepapers/
      case-studies/
      resources/
```

## Naming Conventions

### Images

- **Format**: `kebab-case`
- **Pattern**: `{entity}-{variant}.{ext}`
- **Examples**:
  - `hero-web-development.jpg`
  - `project-ecommerce-platform-01.jpg`
  - `og-why-performance-matters.png`
  - `icon-react.svg`

### Variants

Use these suffixes for image variants:
- `-hero`: Hero/banner images
- `-thumb`: Thumbnail images
- `-og`: Open Graph/social sharing images
  - `-01`, `-02`, `-03`: Gallery images (numbered sequentially)
- `-dark`, `-light`: Theme-specific variants
- `@2x`, `@3x`: High-DPI variants

### File Sizes

- **Hero images**: Max 500KB, recommended 1920x1080 or similar aspect ratio
- **Gallery images**: Max 300KB each, recommended 1200x800
- **OG images**: Max 200KB, recommended 1200x630 (1.91:1 ratio)
- **Icons**: Max 50KB, SVG preferred
- **Documents**: Max 5MB

## Asset Metadata

### Image Frontmatter (for content-linked images)

When images are referenced in content frontmatter, include alt text:

```yaml
cover:
  src: /assets/hero/services/web-development.jpg
  alt: HA Web Studio web development services hero image
  width: 1920
  height: 1080
```

### Alt Text Requirements

- **Required**: All images must have alt text
- **Descriptive**: Alt text should describe the image content
- **Decorative**: Use empty alt text `alt=""` for purely decorative images
- **Context**: Alt text should consider the surrounding content

## Asset Optimization

### Image Formats

- **Photographs**: WebP (primary), JPEG (fallback)
- **Graphics/Icons**: SVG (preferred), PNG (fallback)
- **Screenshots**: PNG with compression
- **Animated**: GIF (only when animation is necessary)

### Compression Guidelines

- Use tools like `squoosh.app` or ImageOptim
- Target 70-80% quality for JPEG
- Use lossless compression for PNG
- Optimize SVGs with SVGO

### Responsive Images

For critical images, use Next.js Image component with sizes:

```tsx
<Image
  src="/assets/hero/services/web-development.jpg"
  alt="Web development services"
  width={1920}
  height={1080}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
  priority
/>
```

## Asset Auditing

Run the asset audit script periodically:

```bash
pnpm asset-audit
```

This checks for:
- Unreferenced assets
- Missing alt text
- Large file sizes
- Duplicate files
- Broken image links

## Asset Workflow

### Adding New Assets

1. Place asset in appropriate `public/assets/` subdirectory
2. Follow naming conventions
3. Optimize file size
4. Add alt text if referenced in content
5. Run asset audit to verify

### Removing Assets

1. Check for references in content files
2. Check for references in components
3. Remove unused assets
4. Run asset audit to verify cleanup

## Asset CDN and Caching

- Assets are served from Vercel's edge network
- Images are automatically optimized by Next.js Image component
- Cache headers are set via `next.config.mjs`
- Consider using a CDN for large-scale asset delivery in the future

## Future Considerations

- **Asset management system**: Integrate with a DAM (Digital Asset Management) system
- **Image optimization pipeline**: Automated optimization on upload
- **Asset versioning**: Versioned asset URLs for cache busting
- **Asset CDN**: Dedicated CDN for static assets
- **Image generation**: Dynamic OG image generation
