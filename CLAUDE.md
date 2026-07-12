# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website for Coding Corgi - a blog for sharing learning materials, software development insights, and LinkedIn posts. Built with Astro 5, TypeScript, and Tailwind CSS. Generates a static site with MDX-based blog posts managed through Astro's Content Collections.

**Site URL**: https://codingcorgi.dev

## Essential Commands

### Development
```bash
npm run dev          # Start dev server at http://localhost:4321
npm run build        # Type-check with astro check, then build for production
npm run preview      # Preview production build locally
```

### Type Checking
```bash
npx astro check      # Run type checking (included in build)
```

## Architecture

### Content Management System
Posts are managed using **Astro Content Collections** with strict TypeScript schemas:
- Schema definition: `src/content/config.ts`
- Posts directory: `src/content/posts/`
- Each post is an MDX file with YAML frontmatter
- Images stored in: `src/content/posts/_images/`

The Content Collections API (`getCollection('posts')`) provides type-safe access to post data and automatically validates frontmatter against the schema.

### Post Schema (src/content/config.ts)
```typescript
{
  title: string              // required
  description: string        // required
  publishedDate: Date        // required (YYYY-MM-DD format)
  coverImage: image()        // optional, validated by Astro
  coverImageAlt: string      // optional
  linkedinUrl: string (url)  // optional
  tags: string[]             // optional
}
```

### Routing & Pages
Astro uses file-based routing in `src/pages/`:
- `/` → `index.astro` (home page)
- `/about` → `about.astro`
- `/posts` → `posts/index.astro` (all posts list)
- `/posts/[slug]` → `posts/[slug].astro` (dynamic post pages)

Dynamic route `[slug].astro` uses `getStaticPaths()` to generate pages at build time from the Content Collections API.

### Component Architecture
- `Layout.astro` - Base layout wrapper with header/footer, used by all pages
- `PostCard.astro` - Reusable post preview component used in post listings
  - Accepts post data as props (title, description, date, coverImage, etc.)
  - Handles optional cover images with fallback styling
  - Displays tags and LinkedIn links when available

### Image Handling
Uses Astro's native image optimization (`astro:assets`):
- **Cover images**: Stored in `_images/`, referenced with relative paths (`./_images/file.jpg`)
- **Inline images**: Import from `_images/` and use `<Image>` component from `astro:assets`
- Astro automatically optimizes images and generates multiple sizes
- Type-safe image validation through Content Collections schema

### Styling System
Tailwind CSS with custom Corgi theme colors:
- `corgi-orange`: #E67E22
- `corgi-brown`: #8B4513
- `corgi-cream`: #FFF8DC

Global styles: `src/styles/global.css`
Tailwind config: `tailwind.config.cjs`

## Adding New Posts

Create MDX file in `src/content/posts/your-slug.mdx`:

```mdx
---
title: "Post Title"
description: "Brief description for preview and SEO"
publishedDate: 2026-05-02
coverImage: ./_images/your-image.jpg
coverImageAlt: "Image description"
linkedinUrl: "https://linkedin.com/posts/your-url"
tags: ["javascript", "tutorial"]
---

# Post Content

Write in Markdown/MDX...
```

**Image workflow**:
1. Save image to `src/content/posts/_images/`
2. Reference in frontmatter: `coverImage: ./_images/filename.jpg`
3. For inline images, import and use `<Image>` component:
```mdx
import { Image } from 'astro:assets';
import myImage from './_images/inline.jpg';

<Image src={myImage} alt="Description" class="rounded-lg" />
```

Posts appear automatically - no registration required. Content Collections handles discovery and validation.

## Build Output

- Static site generated to `dist/`
- Deploy `dist/` to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages)
- All pages pre-rendered at build time (SSG)

## Project Structure Context

```
src/
├── components/
│   ├── Layout.astro         # Base layout (header/footer)
│   └── PostCard.astro       # Post preview cards
├── content/
│   ├── config.ts            # Content Collections schema
│   └── posts/               # MDX blog posts
│       ├── _images/         # Post images
│       └── *.mdx            # Individual posts
├── pages/
│   ├── index.astro          # Home page
│   ├── about.astro          # About page
│   └── posts/
│       ├── index.astro      # Posts listing
│       └── [slug].astro     # Dynamic post pages
└── styles/
    └── global.css           # Global styles + Tailwind
```

## Important Notes

- **Date format**: `publishedDate` must be `YYYY-MM-DD` (e.g., `2026-05-02`)
- **Image paths**: Use relative paths starting with `./` in frontmatter (e.g., `./_images/file.jpg`)
- **Type safety**: Content Collections validates all frontmatter at build time
- **No runtime**: This is a static site - all pages generated at build time via SSG
