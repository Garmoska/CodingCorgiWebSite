---
name: add-comic
description: Converts a raw comic folder from `comics/comic-NNN/` (zero-padded 3-digit number, containing `comic.md` and `panel-N.jpg` files) into a published Astro Content Collections MDX comic under `src/content/comics/`. Use whenever the user asks to "add", "publish", "import", or "convert" a comic from the `comics/` staging folder, or references a `comics/comic-NNN` directory that isn't yet in `src/content/comics/`.
---

# Add Comic skill

This project stages raw comics in `comics/comic-NNN/` (zero-padded 3-digit number, e.g. `comic-001`, `comic-042`) and publishes them as MDX files in `src/content/comics/` (Astro Content Collections). This skill automates that conversion.

## Input format (staging folder)

Each `comics/comic-NNN/` folder contains:

- `comic.md` — a Markdown file with frontmatter and a panel listing:
  ```md
  ---
  title: "Comic Title"
  description: "Brief description..."
  publishedDate: 2026-07-25
  tags: ["comic", "tag2"]
  ---

  # Panels (in reading order)

  1. **panel-1.jpg** — Panel description with dialogue or action
  2. **panel-2.jpg** — Another panel description
  3. **panel-3.jpg** — Final panel
  ```
- `panel-3.jpg`, `panel-4.jpg`, etc. — the panel images in reading order.

The staging format includes basic frontmatter (title, description, publishedDate, tags) and a body with a numbered list describing each panel. The descriptions contain visual details and dialogue/captions.

## Output format (published comic)

Create `src/content/comics/<slug>.mdx` with this frontmatter (schema in `src/content/config.ts`):

```yaml
---
title: "Comic Title"
description: "Brief description..."
publishedDate: 2026-07-25
coverImage: ./_images/<slug>/panel-3.jpg
coverImageAlt: "Short description of first panel"
panels:
  - image: ./_images/<slug>/panel-3.jpg
    alt: "Expanded description with visual context and dialogue"
  - image: ./_images/<slug>/panel-4.jpg
    alt: "Description of second panel"
  - image: ./_images/<slug>/panel-5.jpg
    alt: "Description of final panel"
tags: ["comic", "tag2"]
---
```

The MDX body should be **empty** — all content is in frontmatter.

Rules:

- **Filename**: `<kebab-slug>.mdx`, where slug is derived from the title (lowercase, hyphens, no punctuation, ~2-5 words). Example: "Deadline!" → `deadline-corgi.mdx` or `deadline.mdx`.
- **title**: copy from staging `comic.md` frontmatter verbatim.
- **description**: copy from staging `comic.md` frontmatter verbatim.
- **publishedDate**: copy from staging `comic.md` frontmatter as-is (YYYY-MM-DD format, unquoted).
- **coverImage**: always `./_images/<slug>/panel-1.jpg` (first panel).
- **coverImageAlt**: derive a short factual description from the first panel's description in the staging body. Focus on the main visual element or action (e.g., "Fairy godmother corgi warning about a deadline").
- **panels**: array of objects with `image` and `alt` fields:
  - `image`: `./_images/<slug>/panel-N.jpg` (relative path).
  - `alt`: expanded description from the staging body's panel list. Add visual context beyond the raw text (e.g., mention character emotions, scene details). These alt texts should be richer than the coverImageAlt.
- **tags**: copy from staging `comic.md` frontmatter. Ensure "comic" tag is present.

Panel parsing:

- Extract numbered panel entries from the body (format: `N. **panel-N.jpg** — description`).
- Convert each entry into a `panels:` array item.
- Preserve the description text but enhance it with visual context (character expressions, scene composition) to make alt text more descriptive for accessibility.
- Maintain panel order.

## Image handling

Copy panel images into a subfolder named after the slug:

```bash
mkdir -p src/content/comics/_images/<slug>
cp comics/comic-NNN/panel-3.jpg src/content/comics/_images/<slug>/panel-3.jpg
cp comics/comic-NNN/panel-4.jpg src/content/comics/_images/<slug>/panel-4.jpg
# ... repeat for all panels
```

Reference them via relative paths in frontmatter: `./_images/<slug>/panel-N.jpg`. Astro's `image()` schema helper validates and optimizes them at build time.

## Procedure

Given a comic number (e.g. `001`, or "all unpublished comics"):

1. Normalize the number to 3-digit zero-padded form (`1` → `001`). The staging folder is `comics/comic-NNN/`.
2. Read `comics/comic-NNN/comic.md` to extract frontmatter and panel list.
3. Detect all panel image files: `comics/comic-NNN/panel-*.jpg` (or `.png`).
4. Derive the slug from the title (kebab-case, 2-5 words).
5. Create the target images directory: `src/content/comics/_images/<slug>/`.
6. Copy all panel images to the target directory, keeping filenames intact (use `cp`, don't move — leave the staging folder intact).
7. Parse the panel list from the body and construct the `panels:` YAML array, enhancing alt text with visual context.
8. Derive `coverImageAlt` from the first panel's description.
9. Write `src/content/comics/<slug>.mdx` with the transformed frontmatter and an empty body.
10. Do NOT modify `src/pages/comics/*.astro` — the listing pages already pull from the collection via `getCollection('comics')`, so new comics appear automatically.
11. After adding one or more comics, run `npx astro check` to confirm the schema validates and the site builds.

## What NOT to do

- Do not add `linkedinUrl` unless the user provides one — the schema treats it as optional.
- Do not touch existing published comics unless asked.
- Do not delete or move files from `comics/comic-NNN/` — that folder is the source of truth for raw content.
- Do not copy body content into the published MDX — comics have empty bodies, all content is in frontmatter.
- Do not add explanatory comments or metadata to the MDX beyond what the schema in `src/content/config.ts` allows — unknown frontmatter keys will fail validation.
- Do not guess panel extensions — inspect the staging folder to detect `.jpg` vs `.png`.

## Example

Input `comics/comic-001/comic.md`:
```md
---
title: "Deadline!"
description: "A fairy godmother warns of a looming deadline..."
publishedDate: 2026-07-25
tags: ["comic"]
---

# Panels (in reading order)

1. **panel-1.jpg** — Fairy godmother corgi points at a clock and pumpkin: "DEADLINE!"
2. **panel-2.jpg** — Tiny corgi swings on the clock's minute hand: "HURRY UP!"
3. **panel-3.jpg** — "BOOM!"
4. **panel-4.jpg** — Corgi-pumpkin: "Well... now I can rest..."
```

Output `src/content/comics/deadline-corgi.mdx`:
```mdx
---
title: "Deadline!"
description: "A fairy godmother warns of a looming deadline..."
publishedDate: 2026-07-25
coverImage: ./_images/deadline-corgi/panel-1.jpg
coverImageAlt: "Fairy godmother corgi warning about a deadline"
panels:
  - image: ./_images/deadline-corgi/panel-1.jpg
    alt: "Fairy godmother corgi points to a clock and pumpkin, saying 'DEADLINE!' to a puzzled corgi at a laptop"
  - image: ./_images/deadline-corgi/panel-2.jpg
    alt: "A tiny corgi swings from the clock's minute hand shouting 'HURRY UP!' while the corgi at the laptop sweats"
  - image: ./_images/deadline-corgi/panel-3.jpg
    alt: "A bright yellow-and-orange 'BOOM!' explosion"
  - image: ./_images/deadline-corgi/panel-4.jpg
    alt: "A pumpkin with corgi ears, eyes, and tail thinks 'Well... now I can rest...'"
tags: ["comic"]
---
```

Images copied to:
- `src/content/comics/_images/deadline-corgi/panel-1.jpg`
- `src/content/comics/_images/deadline-corgi/panel-2.jpg`
- `src/content/comics/_images/deadline-corgi/panel-3.jpg`
- `src/content/comics/_images/deadline-corgi/panel-4.jpg`
