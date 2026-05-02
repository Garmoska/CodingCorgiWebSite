import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedDate: z.date(),
    linkedinUrl: z.string().url().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  posts: postsCollection,
};
