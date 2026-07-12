#!/usr/bin/env node
import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { readFile, writeFile, copyFile, access } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { extname, basename, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(import.meta.url), '..', '..');
const POSTS_DIR = join(ROOT, 'src', 'content', 'posts');
const IMAGES_DIR = join(POSTS_DIR, '_images');

const rl = createInterface({ input, output });
const ask = (q, def) => rl.question(def ? `${q} [${def}]: ` : `${q}: `).then(v => v.trim() || def || '');

function slugify(s) {
  return s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function todayISO() {
  const d = new Date();
  const pad = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function yamlEscape(s) {
  return `"${s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

async function main() {
  console.log('\nNew LinkedIn post → MDX\n');

  const title = await ask('Title');
  if (!title) { console.error('Title is required.'); process.exit(1); }

  const description = await ask('Description (1-2 sentences for previews)');
  if (!description) { console.error('Description is required.'); process.exit(1); }

  const defaultSlug = slugify(title);
  const slug = slugify(await ask('Slug', defaultSlug));

  const publishedDate = await ask('Published date (YYYY-MM-DD)', todayISO());
  if (!/^\d{4}-\d{2}-\d{2}$/.test(publishedDate)) {
    console.error('Invalid date format.'); process.exit(1);
  }

  const linkedinUrl = await ask('LinkedIn URL (optional)');
  const tagsRaw = await ask('Tags (comma-separated, optional)');
  const tags = tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean) : [];

  const coverImageSrc = await ask('Cover image path (absolute or relative to cwd, optional)');
  let coverImageFrontmatter = '';
  let coverImageAlt = '';
  if (coverImageSrc) {
    const absSrc = resolve(process.cwd(), coverImageSrc);
    if (!existsSync(absSrc)) {
      console.error(`Cover image not found: ${absSrc}`); process.exit(1);
    }
    const ext = extname(absSrc);
    const targetName = `${slug}${ext}`;
    const targetPath = join(IMAGES_DIR, targetName);
    await copyFile(absSrc, targetPath);
    coverImageFrontmatter = `./_images/${targetName}`;
    coverImageAlt = await ask('Cover image alt text', title);
    console.log(`  → copied to ${targetPath}`);
  }

  const bodyFile = await ask('Path to body text file (optional; leave blank to scaffold)');
  let body;
  if (bodyFile) {
    const absBody = resolve(process.cwd(), bodyFile);
    if (!existsSync(absBody)) {
      console.error(`Body file not found: ${absBody}`); process.exit(1);
    }
    body = await readFile(absBody, 'utf8');
  } else {
    body = `\nWrite your post content here.\n`;
  }

  const fmLines = [
    '---',
    `title: ${yamlEscape(title)}`,
    `description: ${yamlEscape(description)}`,
    `publishedDate: ${publishedDate}`,
  ];
  if (coverImageFrontmatter) {
    fmLines.push(`coverImage: ${coverImageFrontmatter}`);
    fmLines.push(`coverImageAlt: ${yamlEscape(coverImageAlt)}`);
  }
  if (linkedinUrl) fmLines.push(`linkedinUrl: ${yamlEscape(linkedinUrl)}`);
  if (tags.length) fmLines.push(`tags: [${tags.map(yamlEscape).join(', ')}]`);
  fmLines.push('---', '');

  const mdx = fmLines.join('\n') + body.trimEnd() + '\n';
  const outPath = join(POSTS_DIR, `${slug}.mdx`);

  if (existsSync(outPath)) {
    const overwrite = (await ask(`${slug}.mdx already exists. Overwrite? (y/N)`)).toLowerCase();
    if (overwrite !== 'y') { console.log('Aborted.'); process.exit(0); }
  }

  await writeFile(outPath, mdx, 'utf8');
  console.log(`\nCreated: ${outPath}`);
  rl.close();
}

main().catch(e => { console.error(e); rl.close(); process.exit(1); });
