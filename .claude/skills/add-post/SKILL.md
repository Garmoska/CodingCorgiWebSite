---
name: add-post
description: Converts a raw post folder from `posts/post-NNN/` (zero-padded 3-digit number, containing `post.md` and an `image.*` file) into a published Astro Content Collections MDX post under `src/content/posts/`. Use whenever the user asks to "add", "publish", "import", or "convert" a post from the `posts/` staging folder, or references a `posts/post-NNN` directory that isn't yet in `src/content/posts/`.
---

# Add Post skill

This project stages raw posts in `posts/post-NNN/` (zero-padded 3-digit number, e.g. `post-001`, `post-042`) and publishes them as MDX files in `src/content/posts/` (Astro Content Collections). This skill automates that conversion.

## Input format (staging folder)

Each `posts/post-NNN/` folder contains:

- `post.md` — a Markdown file with this shape:
  ```
  # <Title>

  Date: DD-Mmm-YYYY   (e.g. 01-Feb-2026)

  ## Text

  <body paragraphs, sometimes with ### subsections>
  ```
- `image.jpg` or `image.png` — the cover illustration.

There is no frontmatter, no LinkedIn URL, and no tags in the source. The body may contain smart quotes (`" "` `' '`), curly braces around inline code (`"var"` → convert to `` `var` `` when it clearly denotes code), and `###` subsections that should be preserved as `##` in the MDX output (since the frontmatter title replaces the top-level `#`).

## Output format (published post)

Create `src/content/posts/post-NNN-<slug>.mdx` with this frontmatter (schema in `src/content/config.ts`):

```yaml
---
title: "<Title>"
description: "<1–2 sentence hook derived from the post body>"
publishedDate: YYYY-MM-DD
coverImage: ./_images/post-NNN.<ext>
coverImageAlt: "<short description>"
tags: ["<tag1>", "<tag2>", "<tag3>"]
---
```

Rules:

- **Filename**: `post-NNN-<kebab-slug>.mdx`, keeping the same zero-padded 3-digit number as the staging folder (e.g. `post-001-...`, `post-042-...`). Slug is derived from the title (lowercase, hyphens, no punctuation, ~2–5 words).
- **title**: use the source `# Title` verbatim. Wrap in double quotes; if the title itself contains double quotes, wrap in single quotes instead (e.g. post-006).
- **description**: a fresh 1–2 sentence summary written by you — do NOT copy the first sentence verbatim. This appears in cards and meta tags.
- **publishedDate**: parse `Date: DD-Mmm-YYYY` and emit `YYYY-MM-DD` (unquoted; Astro's schema parses it as a Date).
- **coverImage**: always `./_images/post-NNN.<ext>` matching the copied image extension.
- **coverImageAlt**: short factual description (e.g. `"Coding Corgi illustration for <topic>"`).
- **tags**: 1–3 short lowercase kebab-case tags inferred from content (e.g. `ai`, `architecture`, `books`, `leadership`). Do not invent tags that aren't supported by the content.

Body rules:

- Drop the `# Title` line (title comes from frontmatter).
- Drop the `Date: ...` line.
- Drop the `## Text` header.
- Preserve paragraph breaks.
- Promote `### Subsection` to `## Subsection`.
- Replace smart quotes with straight quotes.
- Where the source wraps code-like tokens in curly quotes (e.g. `"var"`, `"let"`), convert to backticks (`` `var` ``, `` `let` ``) — but only when it's clearly code/identifiers.
- Keep `P.S.` notes as-is.
- Do NOT paraphrase or shorten the body content — the only edits are formatting.

## Image handling

Copy the source image into the content collection's `_images/` folder, keeping the extension:

```bash
cp posts/post-NNN/image.<ext> src/content/posts/_images/post-NNN.<ext>
```

Reference it via a relative path in frontmatter: `./_images/post-NNN.<ext>`. Astro's `image()` schema helper validates and optimizes it at build time.

## Procedure

Given a post number (e.g. `007`, or "all unpublished posts"):

1. Normalize the number to 3-digit zero-padded form (`7` → `007`). The staging folder is `posts/post-NNN/`.
2. Read `posts/post-NNN/post.md`.
3. Detect the image file: `posts/post-NNN/image.jpg` or `posts/post-NNN/image.png`.
4. Copy the image to `src/content/posts/_images/post-NNN.<ext>` (use `cp`, don't move — leave the staging folder intact).
5. Derive the slug from the title.
6. Write `src/content/posts/post-NNN-<slug>.mdx` following the rules above.
7. Do NOT modify `src/pages/index.astro` or `src/pages/posts/*.astro` — the listing pages already pull from the collection via `getCollection('posts')`, so new posts appear automatically.
8. After adding one or more posts, run `npm run build` (or at least `npx astro check`) to confirm the schema validates and the site builds. If the user prefers speed, `npx astro check` alone is sufficient.

## What NOT to do

- Do not add `linkedinUrl` unless the user provides one — the schema treats it as optional.
- Do not touch existing published posts unless asked.
- Do not delete or move files from `posts/post-NNN/` — that folder is the source of truth for raw content.
- Do not add `<Image>` imports to the MDX body unless the post actually contains inline images (the current staging format only has a cover image).
- Do not add explanatory comments or metadata to the MDX beyond what the schema in `src/content/config.ts` allows — unknown frontmatter keys will fail validation.

## Example

Input `posts/post-003/post.md`:
```
# Attention to Detail

Date: 24-Feb-2026

## Text

Hello everyone! ... "var", "let" ...
```

Output `src/content/posts/post-003-attention-to-detail.mdx`:
```mdx
---
title: "Attention to Detail"
description: "A small JavaScript variable-declaration example that illustrates why attention to detail matters in software development."
publishedDate: 2026-02-24
coverImage: ./_images/post-003.jpg
coverImageAlt: "Coding Corgi chasing global variables"
tags: ["javascript", "code-quality", "fundamentals"]
---

Hello everyone! ... `var`, `let` ...
```
