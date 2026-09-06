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
    source: z.string(), // Source edition
    sourceEdition: z.string().optional(),
    description: z.string(),
    featured: z.boolean().default(false),

    // Richer schema additions
    originalText: z.string().optional(),
    transliteration: z.string().optional(),
    englishMeaning: z.string().optional(),
    translationStatus: z.enum(['not-translated', 'draft', 'in-review', 'reviewed', 'complete']).default('complete'),
    rightsStatus: z.enum(['public-domain', 'permission-granted', 'original-work', 'link-only']).default('public-domain'),
    reviewer: z.string().optional(),
    tags: z.array(z.string()).default([]),

    // Explicit publication state
    status: z.enum(['verified', 'draft', 'needs-review', 'not-published']).default('verified')
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
