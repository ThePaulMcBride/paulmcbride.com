import readingTime from "reading-time";
import type {
  ApiPost,
  ApiPostSummary,
  Note,
  NoteSummary,
  Post,
  PostSummary,
} from "lib/dataApiTypes";

export function postSlug(slug: string): string {
  return slug.replace(/^\/posts\//, "").replace(/^\//, "");
}

export function noteSlug(slug: string): string {
  return slug.replace(/^\/notes\//, "").replace(/^\//, "");
}

function plainText(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_~\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function teaser(markdown: string): string {
  const text = plainText(markdown);
  const maxLength = 260;

  if (text.length <= maxLength) return text;

  return `${text.slice(0, maxLength).trim()}...`;
}

export function postSummaryFromApi(post: ApiPostSummary): PostSummary {
  const slug = postSlug(post.slug);

  return {
    ...post,
    slug,
    href: `/posts/${slug}`,
    readingTime: { text: "" },
    teaser: post.description,
  };
}

export function postFromApi(post: ApiPost): Post {
  const slug = postSlug(post.slug);

  return {
    ...post,
    slug,
    href: `/posts/${slug}`,
    readingTime: readingTime(post.body),
    teaser: teaser(post.body),
    bannerUrl: post.banner,
  };
}

export function noteSummaryFromApi(
  note: Omit<NoteSummary, "href">
): NoteSummary {
  const slug = noteSlug(note.slug);

  return {
    ...note,
    slug,
    href: `/notes/${slug}`,
  };
}

export function noteFromApi(note: Omit<Note, "href">): Note {
  return {
    ...noteSummaryFromApi(note),
    body: note.body,
  };
}
