# 📝 How to Add LinkedIn Posts to Your Website

This guide shows you how to add your LinkedIn posts to the Coding Corgi website.

## Quick Start

1. Save your LinkedIn post image to `src/content/posts/_images/`
2. Create a new `.mdx` file in `src/content/posts/`
3. Add frontmatter with your post details
4. Copy your LinkedIn post text into the file
5. Done! The post appears automatically

## Step-by-Step Guide

### Step 1: Save Your Image

Download the image from your LinkedIn post and save it:

```
src/content/posts/_images/my-post-image.jpg
```

**Supported formats**: JPG, PNG, WebP, SVG

### Step 2: Create the Post File

Create a new file with a descriptive name:

```
src/content/posts/my-great-insight.mdx
```

Use lowercase, hyphens between words. This becomes your URL: `/posts/my-great-insight`

### Step 3: Add Frontmatter

At the top of your file, add the metadata:

```yaml
---
title: "The Title of Your LinkedIn Post"
description: "A one-sentence summary for SEO and previews"
publishedDate: 2026-05-02
coverImage: ./_images/my-post-image.jpg
coverImageAlt: "Description of what's in the image"
linkedinUrl: "https://www.linkedin.com/posts/your-post-url"
tags: ["software", "development", "learning"]
---
```

**Required fields:**
- `title` - The post title
- `description` - Brief summary
- `publishedDate` - When you published it on LinkedIn (YYYY-MM-DD format)

**Optional fields:**
- `coverImage` - Path to your image (relative path starting with `./_images/`)
- `coverImageAlt` - Description of the image (important for accessibility)
- `linkedinUrl` - Link back to the original LinkedIn post
- `tags` - Array of topics (helps organize your content)

### Step 4: Add Your Content

Below the frontmatter, paste your LinkedIn post text:

```mdx
---
title: "My Post"
description: "Summary"
publishedDate: 2026-05-02
coverImage: ./_images/example.jpg
---

# My Post Title

Your LinkedIn post content goes here.

You can use:
- **Bold text**
- *Italic text*
- Lists (like this one)
- Links: [Click here](https://example.com)
- Code: `inline code`
- And more!

## Subheadings

Organize your content with headings.

> You can even use blockquotes!
```

### Step 5: Preview

Start the dev server if it's not running:

```bash
npm run dev
```

Visit `http://localhost:4321/posts` to see your new post!

## Real-World Example

Here's a complete example of a LinkedIn post:

**File**: `src/content/posts/ai-coding-tools.mdx`

```mdx
---
title: "Why AI Coding Tools Make Me a Better Developer"
description: "Sharing my experience using AI assistants in daily development work"
publishedDate: 2026-04-15
coverImage: ./_images/ai-coding-screenshot.png
coverImageAlt: "Screenshot showing GitHub Copilot suggesting code"
linkedinUrl: "https://www.linkedin.com/posts/evgenyleonov_ai-coding-productivity"
tags: ["ai", "productivity", "tools"]
---

# Why AI Coding Tools Make Me a Better Developer

I've been using AI coding assistants for 6 months now, and I'm convinced they make me a better developer, not a worse one.

Here's why:

## 1. Less Time on Boilerplate

Instead of writing repetitive code, I focus on:
- Architecture decisions
- Business logic
- Edge cases
- Performance optimization

## 2. Learning Accelerator

AI tools expose me to patterns I might not have considered. Every suggestion is a learning opportunity.

## 3. Documentation Made Easy

Writing docs is no longer a chore. AI helps me:
- Generate clear comments
- Create README files
- Write JSDoc annotations

## The Human Element Still Matters

AI is a tool, not a replacement. I still need to:
- Understand what the code does
- Review suggestions critically  
- Make architectural decisions
- Communicate with my team

What's your experience with AI coding tools? Drop a comment!

---

*Originally posted on [LinkedIn](https://www.linkedin.com/posts/evgenyleonov_ai-coding-productivity)*
```

## Adding Multiple Images

If your post has multiple images, you can add them inline:

```mdx
---
title: "Post with Multiple Images"
coverImage: ./_images/cover.jpg
---

import { Image } from 'astro:assets';
import screenshot1 from './_images/screenshot1.png';
import screenshot2 from './_images/screenshot2.png';

# My Post

Here's the first screenshot:

<Image src={screenshot1} alt="First example" class="rounded-lg shadow-md my-6" />

And here's another:

<Image src={screenshot2} alt="Second example" class="rounded-lg shadow-md my-6" />
```

## Markdown Formatting Tips

### Headings
```markdown
# Heading 1 (main title)
## Heading 2 (sections)
### Heading 3 (subsections)
```

### Text Formatting
```markdown
**Bold text**
*Italic text*
***Bold and italic***
~~Strikethrough~~
```

### Links
```markdown
[Link text](https://example.com)
```

### Lists
```markdown
- Bullet point 1
- Bullet point 2
  - Nested point

1. Numbered item 1
2. Numbered item 2
```

### Code
```markdown
Inline code: `const x = 10;`

Code block:
\`\`\`javascript
function hello() {
  console.log("Hello!");
}
\`\`\`
```

### Quotes
```markdown
> This is a quote or callout
```

## Tips for Converting LinkedIn Posts

1. **Copy the text directly** - Most formatting will work as-is
2. **Add line breaks** - LinkedIn's formatting might be different
3. **Convert emojis** - They work in Markdown too! 🎉
4. **Save images separately** - Download them from LinkedIn
5. **Add links** - LinkedIn might auto-link, but add explicit `[text](url)` syntax
6. **Test in preview** - Always check how it looks before deploying

## Common Issues

### Image not showing?
- Check the path: `coverImage: ./_images/filename.jpg`
- Make sure the image file exists in `src/content/posts/_images/`
- File names are case-sensitive!

### Post not appearing?
- Check the frontmatter syntax (YAML is space-sensitive)
- Make sure `publishedDate` is in YYYY-MM-DD format
- Required fields: `title`, `description`, `publishedDate`

### Date format error?
```yaml
# ❌ Wrong
publishedDate: May 2, 2026
publishedDate: 2026/05/02

# ✅ Correct
publishedDate: 2026-05-02
```

## Publishing Workflow

1. **Add your post** following this guide
2. **Test locally** with `npm run dev`
3. **Commit to git**: `git add .` → `git commit -m "Add new post"`
4. **Push to deploy** (if you have auto-deployment set up)

## Need Help?

- Check the example posts in `src/content/posts/`
- Look at the [main README](README.md) for technical details
- Test changes locally before deploying

Happy posting! 🐕
