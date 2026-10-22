import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
const journal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/journal' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    category: z.enum(['Seasons', 'Sightings', 'Sable', 'Boran', 'The Land']),
    author: z.enum(['the field guide', 'the reserve']),
    summary: z.string(),
    image: z.string(),
    imageAlt: z.string(),
    caption: z.string().optional(),
    draft: z.boolean().default(true),
  }),
});
export const collections = { journal };
