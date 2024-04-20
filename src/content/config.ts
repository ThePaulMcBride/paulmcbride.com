import { z, defineCollection } from "astro:content";

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    date: z.string(),
    lastUpdated: z.string().optional(),
    description: z.string(),
    banner: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});

const now = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string(),
  }),
});

export const collections = {
  posts: posts,
  now,
};
