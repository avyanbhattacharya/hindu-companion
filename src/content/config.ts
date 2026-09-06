import { defineCollection, z } from 'astro:content';
const bhajans = defineCollection({ type: 'content', schema: z.object({ title: z.string(), titleOriginal: z.string().optional(), language: z.string(), tradition: z.string(), category: z.enum(['bhajan','kirtan','prayer','stotra']), deity: z.string(), author: z.string().optional(), source: z.string(), description: z.string(), featured: z.boolean().default(false) }) });
const guides = defineCollection({ type: 'content', schema: z.object({ title: z.string(), subtitle: z.string(), festival: z.string(), description: z.string(), source: z.string() }) });
export const collections = { bhajans, guides };
