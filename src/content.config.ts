// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders'; // <-- New v6 import!

// ── Shared base schema ───────────────
const baseSchema = z.object({
  title:       z.string(),
  date:        z.coerce.date(),
  description: z.string(),
  status:      z.enum(['draft', 'published', 'archived']).default('draft'),
  tags:        z.array(z.string()).optional().default([]),
  cover:       z.string().optional(), 
});

// ── The Gallery ────────────────────────────────
const gallery = defineCollection({
  // Tell Astro exactly which folder to load files from
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/gallery" }),
  schema: baseSchema.extend({
    medium:     z.string().optional(),
    dimensions: z.string().optional(), 
  }),
});

// ── The Library ───────────────────────────
const library = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/library" }),
  schema: baseSchema.extend({
    author:     z.string(),
    year:       z.number().optional(),
    rating:     z.number().min(1).max(5).optional(),
    genre:      z.string().optional(),
  }),
});

// ── The Conservatory ────────────────────────
const conservatory = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/conservatory" }),
  schema: baseSchema.extend({
    artist:     z.string().optional(),
    album:      z.string().optional(),
    instrument: z.string().optional(), 
    key:        z.string().optional(), 
  }),
});

// ── The Archive ────────────────────────────────
const archive = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/archive" }),
  schema: baseSchema.extend({
    mood:       z.string().optional(), 
    dedication: z.string().optional(), 
  }),
});

export const collections = { gallery, library, conservatory, archive };