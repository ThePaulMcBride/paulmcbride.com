import readingTime from "reading-time";

const DATA_API_URL = process.env.DATA_API_URL || "http://localhost:8000";
const PUBLIC_DATA_API_URL =
  process.env.NEXT_PUBLIC_DATA_API_URL || DATA_API_URL;

function trimTrailingSlash(value: string): string {
  return value.replace(/\/$/, "");
}

export function dataAssetUrl(path: string | undefined): string | undefined {
  if (!path) return undefined;
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) return path;

  return `${trimTrailingSlash(PUBLIC_DATA_API_URL)}${path.startsWith("/") ? "" : "/"}${path}`;
}

export type ApiPostSummary = {
  date: string;
  title: string;
  subtitle?: string;
  description: string;
  banner: string;
  lastUpdated?: string;
  status?: string;
  tags?: string[];
  draft?: boolean;
  slug: string;
};

export type ApiPost = ApiPostSummary & {
  body: string;
};

export type PostSummary = ApiPostSummary & {
  href: string;
  readingTime: { text: string };
  teaser: string;
};

export type Post = ApiPost & {
  href: string;
  readingTime: { text: string };
  teaser: string;
  bannerUrl: string;
};

async function fetchData<T>(path: string): Promise<T> {
  const url = `${trimTrailingSlash(DATA_API_URL)}${path}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  return response.json();
}

function postSlug(slug: string): string {
  return slug.replace(/^\/posts\//, "").replace(/^\//, "");
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

function summaryFromApi(post: ApiPostSummary): PostSummary {
  const slug = postSlug(post.slug);

  return {
    ...post,
    slug,
    href: `/posts/${slug}`,
    readingTime: { text: "" },
    teaser: post.description,
  };
}

function postFromApi(post: ApiPost): Post {
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

export async function getAllPosts(): Promise<PostSummary[]> {
  const data = await fetchData<{ posts: ApiPostSummary[] }>("/posts");

  return data.posts.map(summaryFromApi);
}

export async function getPost(slug: string): Promise<Post> {
  const post = await fetchData<ApiPost>(`/posts/${postSlug(slug)}`);

  return postFromApi(post);
}
