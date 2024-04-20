import { z, defineCollection } from "astro:content";

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string(),
    banner: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  posts: posts,
};
