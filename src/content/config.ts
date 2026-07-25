import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    publishedDate: z.date(),
    coverImage: image().optional(),
    coverImageAlt: z.string().optional(),
    linkedinUrl: z.string().url().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const comicsCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    publishedDate: z.date(),
    coverImage: image().optional(),
    coverImageAlt: z.string().optional(),
    panels: z.array(z.object({
      image: image(),
      alt: z.string(),
      caption: z.string().optional(),
    })).min(1),
    linkedinUrl: z.string().url().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  posts: postsCollection,
  comics: comicsCollection,
};
