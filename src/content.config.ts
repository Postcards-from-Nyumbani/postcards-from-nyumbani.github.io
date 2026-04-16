// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// ── Shared base schema factory ───────────────
// 1. Wrap the base schema in a function so it can accept Astro's image helper
const getBaseSchema = ({ image }: { image: any }) => z.object({
  title:       z.string(),
  date:        z.coerce.date(),
  description: z.string(),
  status:      z.enum(['draft', 'published', 'archived']).default('draft'),
  tags:        z.array(z.string()).optional().default([]),
  
  // 2. THE FIX: Astro now knows this is a file to compress, not just text!
  cover:       image().optional(), 
});

// ── The Gallery ────────────────────────────────
const gallery = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/Nyumbani/gallery" }), // Added /Nyumbani/
  schema: ({ image }) => getBaseSchema({ image }).extend({
    medium:     z.string().optional(),
    dimensions: z.string().optional(), 
  }),
});

// ── The Library ───────────────────────────
const library = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/Nyumbani/library" }),
  schema: ({ image }) => getBaseSchema({ image }).extend({
    author:     z.string(),
    year:       z.number().optional(),
    rating:     z.number().min(1).max(5).optional(),
    genre:      z.string().optional(),
  }),
});

// ── The Conservatory ────────────────────────
const conservatory = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/Nyumbani/conservatory" }),
  schema: ({ image }) => getBaseSchema({ image }).extend({
    artist:     z.string().optional(),
    album:      z.string().optional(),
    instrument: z.string().optional(), 
    key:        z.string().optional(), 
  }),
});

// ── The Archive ────────────────────────────────
const archive = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/Nyumbani/archive" }),
  schema: ({ image }) => getBaseSchema({ image }).extend({
    mood:       z.string().optional(), 
    dedication: z.string().optional(), 
  }),
});

export const collections = { gallery, library, conservatory, archive };