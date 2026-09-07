import { defineCollection, z } from 'astro:content';

const bhajans = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    titleOriginal: z.string().optional(),
    language: z.string(),
    tradition: z.string().optional(),
    traditions: z.array(z.string()).default([]),
    category: z.enum(['bhajan', 'kirtan', 'prayer', 'stotra']),
    deity: z.string(),
    author: z.string().optional(),
    description: z.string(),
    featured: z.boolean().default(false),

    // Minimal editorial model
    source: z.string(), // Work title, author/tradition, and/or stable reference URL
    contentOrigin: z.enum(['traditional-source', 'original-site-writing', 'permission', 'link-only']),
    status: z.enum(['draft', 'published']).default('draft'),
    reviewedOn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),

    // Devotional content fields
    originalText: z.string().optional(),
    transliteration: z.string().optional(),
    englishMeaning: z.string().optional(),
    tags: z.array(z.string()).default([])
  })
});

const guides = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    festival: z.string(),
    description: z.string(),
    source: z.string()
  })
});

export const collections = { bhajans, guides };
