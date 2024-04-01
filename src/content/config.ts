// 1. Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";

// 2. Define a `type` and `schema` for each collection
const posts = defineCollection({
	type: "content", // v2.5.0 and later
	schema: z.object({
		title: z.string(),
		tags: z.array(z.string()),
		image: z.string().optional(),
	}),
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
	posts: posts,
};
