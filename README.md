# Postcards from Nyumbani

A personal museum built with Astro and Tailwind CSS. Four rooms, one voice, no pressure.

---

## Quick Start

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # Static output → /dist
npm run preview    # Preview the build locally
```

---

## Project Structure

```
postcards-from-nyumbani/
│
├── content/                    ← Your Obsidian vault syncs here
│   ├── _template.md            ← Copy this when starting a new post
│   ├── gallery/                ← The Gallery posts
│   ├── library/                ← The Library posts
│   ├── conservatory/           ← The Conservatory posts
│   └── archive/                ← The Archive posts
│
├── public/
│   └── images/                 ← Cover images (referenced as "/images/name.jpg")
│
└── src/
    ├── content/
    │   └── config.ts           ← Typed frontmatter schemas for all rooms
    ├── lib/
    │   └── collections.ts      ← The publish filter + room metadata
    ├── components/
    │   └── Postcard.astro      ← The signature card component
    ├── layouts/
    │   └── BaseLayout.astro    ← Shared header, footer, SEO
    ├── pages/
    │   ├── index.astro         ← Museum entrance
    │   ├── about.astro         ← Curator's note
    │   ├── 404.astro           ← Custom not-found page
    │   ├── gallery/index.astro
    │   ├── library/index.astro
    │   ├── conservatory/index.astro
    │   ├── archive/index.astro
    │   └── [room]/[slug].astro ← Universal post layout (all rooms)
    └── styles/
        └── global.css          ← Fonts, base reset, stamp utilities
```

---

## The Draft System

**The only rule:** posts with `status: "draft"` (or `status: "archived"`, or
no `status` field at all) are completely invisible. They are never given a URL.
They do not exist in the build output.

To publish a post, open it in Obsidian and change one line:

```yaml
status: "draft"      # invisible
↓
status: "published"  # appears on the site
```

Then sync your content folder and rebuild.

---

## Obsidian Workflow

### Recommended Vault Setup

```
Your Obsidian Vault/
└── Museum/              ← Symlink or sync this to /content/
    ├── _template.md
    ├── gallery/
    ├── library/
    ├── conservatory/
    └── archive/
```

**Option A — Symlink (simplest):**
```bash
# From the project root:
ln -sf /path/to/your/obsidian/vault/Museum content
```

**Option B — Obsidian Git:**  
Use the [Obsidian Git](https://github.com/denolehov/obsidian-git) plugin to
commit and push your vault. Set your CI/CD to pull from the same repo.

### Starting a New Post

1. Copy `content/_template.md` to the correct room folder
2. Fill in the frontmatter — delete the fields that don't apply to this room
3. Write in Obsidian as normal
4. When ready: change `status: "draft"` → `status: "published"`
5. Sync / push → rebuild → done

---

## Frontmatter Reference

### All rooms (required)

| Field         | Type     | Description                                          |
|---------------|----------|------------------------------------------------------|
| `title`       | string   | Post title                                           |
| `date`        | date     | Publication date (`YYYY-MM-DD`)                      |
| `description` | string   | One-sentence summary — shown on cards and in SEO     |
| `status`      | string   | `"draft"` or `"published"` — **the gate**            |

### All rooms (optional)

| Field    | Type       | Description                            |
|----------|------------|----------------------------------------|
| `tags`   | string[]   | `["nairobi", "light", "35mm"]`         |
| `cover`  | string     | Path to cover image: `"/images/x.jpg"` |

### Gallery extras

| Field        | Type   | Example                          |
|--------------|--------|----------------------------------|
| `medium`     | string | `"35mm Film"`, `"Watercolour"`   |
| `dimensions` | string | `"A4"`, `"1080×1080"`            |

### Library extras

| Field    | Type   | Example                  |
|----------|--------|--------------------------|
| `author` | string | `"Ngũgĩ wa Thiong'o"`    |
| `year`   | number | `1964`                   |
| `rating` | number | `1`–`5`                  |
| `genre`  | string | `"Literary Fiction"`     |

### Conservatory extras

| Field        | Type   | Example              |
|--------------|--------|----------------------|
| `artist`     | string | `"Bill Evans"`       |
| `album`      | string | `"Waltz for Debby"`  |
| `instrument` | string | `"guitar"`, `"piano"`|
| `key`        | string | `"D minor"`          |

### Archive extras

| Field        | Type   | Example                              |
|--------------|--------|--------------------------------------|
| `mood`       | string | `"tender"`, `"nostalgic"`, `"sharp"` |
| `dedication` | string | `"for K."`                           |

---

## Design Tokens

The full palette lives in `tailwind.config.mjs`. Key values:

| Token        | Hex       | Use                              |
|--------------|-----------|----------------------------------|
| `paper`      | `#FDFCF0` | Page background                  |
| `parchment`  | `#F5F0DC` | Card surfaces                    |
| `vellum`     | `#EDE8D0` | Borders, dividers                |
| `ink`        | `#1C1A14` | Body text                        |
| `charcoal`   | `#2E2B22` | Headings                         |
| `sepia`      | `#5C5240` | Secondary text, captions         |
| `dust`       | `#8C8270` | Metadata, stamps, quiet labels   |
| `postmark`   | `#7A3B2E` | Accent, hover states, rust-red   |

Typography: **EB Garamond** (body) + **DM Sans** (navigation) + **DM Mono** (dates, stamps).

---

## Deployment

### Netlify (recommended for simplicity)

1. Push to GitHub
2. Connect repo to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

To trigger a rebuild when you publish a new post, use Netlify's build hooks
with Obsidian Git's "run shell command on push" feature.

### Cloudflare Pages

Same as above — works out of the box with Astro's default static output.

### Self-hosted

```bash
npm run build
# Upload /dist to any static host (S3, VPS with nginx, etc.)
```

---

## Extending the Museum

### Adding a new room

1. Add a new collection to `src/content/config.ts`
2. Add the room to the `ROOMS` map in `src/lib/collections.ts`
3. Create `src/pages/[newroom]/index.astro`
4. The `[room]/[slug].astro` dynamic route picks it up automatically
5. Create `content/[newroom]/` and start writing

### RSS Feed

Install `@astrojs/rss` and add `src/pages/rss.xml.ts`:

```ts
import rss from '@astrojs/rss';
import { getAllPublished } from '../lib/collections';

export async function GET(context) {
  const posts = await getAllPublished();
  return rss({
    title: 'Postcards from Nyumbani',
    description: 'A personal museum.',
    site: context.site,
    items: posts.map(post => ({
      title:       post.data.title,
      pubDate:     post.data.date,
      description: post.data.description,
      link:        `/${post.collection}/${post.slug}/`,
    })),
  });
}
```

---

*Built quietly. Published slowly. Kept carefully.*
