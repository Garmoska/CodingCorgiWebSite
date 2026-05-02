# 🐕 Coding Corgi Website

Personal website for sharing learning materials, blog posts, and software development insights. Built with **Astro**, **TypeScript**, and **Tailwind CSS**.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:4321` to see your site.

### Build for Production

```bash
# Build static site
npm run build

# Preview production build
npm run preview
```

## 📝 Adding New Posts

Posts are stored as MDX files in `src/content/posts/`. To add a new post:

1. Create a new file: `src/content/posts/your-post-slug.mdx`
2. Add frontmatter at the top:

```yaml
---
title: "Your Post Title"
description: "Brief description for preview and SEO"
publishedDate: 2026-05-02
linkedinUrl: "https://linkedin.com/posts/your-url" # optional
tags: ["javascript", "tutorial"] # optional
---
```

3. Write your content in Markdown below the frontmatter
4. The post will automatically appear on the site!

### Example Post Structure

```mdx
---
title: "Understanding JavaScript Closures"
description: "A practical guide to closures with real-world examples"
publishedDate: 2026-05-02
linkedinUrl: "https://linkedin.com/posts/example"
tags: ["javascript", "fundamentals"]
---

# Understanding JavaScript Closures

Your content here...

## Section 1

More content...
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Layout.astro         # Base layout with header/footer
│   └── PostCard.astro       # Post preview component
├── content/
│   ├── config.ts            # Content Collections schema
│   └── posts/               # Your MDX blog posts
│       └── welcome.mdx      # Sample post
├── pages/
│   ├── index.astro          # Home page
│   ├── about.astro          # About page
│   └── posts/
│       ├── index.astro      # Posts list
│       └── [slug].astro     # Individual post pages
└── styles/
    └── global.css           # Global styles & Tailwind
```

## 🎨 Customization

### Colors

Corgi-themed colors are defined in `tailwind.config.cjs`:
- `corgi-orange`: #E67E22
- `corgi-brown`: #8B4513
- `corgi-cream`: #FFF8DC

### Styling

- Global styles: `src/styles/global.css`
- Tailwind config: `tailwind.config.cjs`
- Layout component: `src/components/Layout.astro`

## 🌐 Deployment

The site builds to static HTML/CSS/JS. Deploy to any static host:

- **Netlify**: Connect repo, build command: `npm run build`, publish directory: `dist`
- **Vercel**: Import repo, Vercel auto-detects Astro
- **GitHub Pages**: Use GitHub Actions with Astro's official deployment guide
- **Cloudflare Pages**: Connect repo, build command: `npm run build`, output: `dist`

## 📚 Tech Stack

- **Astro 5**: Static site framework
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **MDX**: Markdown with JSX support
- **Content Collections**: Type-safe content management

## 📖 Learn More

- [Astro Documentation](https://docs.astro.build)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [Tailwind CSS](https://tailwindcss.com)
- [MDX](https://mdxjs.com)

## 👤 Author

**Evgeny Leonov**

---

Built with ❤️ by a corgi who codes 🐕
