import type { APIContext } from "astro";
import { getEntry } from "astro:content";
import generateOgImage from "../../../utils/og-template";

export async function GET({ params, request }: APIContext) {
  const { slug } = params;
  if (!slug) {
    return new Response("Not found", { status: 404 });
  }

  const post = await getEntry("posts", slug);
  if (!post) {
    return new Response("Not found", { status: 404 });
  }

  const title = post.data.title;
  const date = new Date(post.data.lastUpdated || post.data.date);
  const image = await generateOgImage(title, date);

  return new Response(image);
}
