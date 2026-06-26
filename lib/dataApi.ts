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

export type Page = {
  slug: string;
  body: string;
};

export type NowEntry = {
  date: string;
  title: string;
  slug: string;
  body: string;
};

export type NoteMedia = {
  url: string;
  alt: string;
};

export type NoteSummary = {
  date: string;
  source: "manual" | "mastodon";
  source_id: string;
  source_url: string;
  in_reply_to_id?: string;
  in_reply_to_account_id?: string;
  visibility: "public" | "unlisted" | "private" | "direct";
  media?: NoteMedia[];
  tags?: string[];
  slug: string;
  href: string;
};

export type Note = NoteSummary & {
  body: string;
};

export type NoteGroup = {
  notes: Note[];
};

export type NotePage = {
  items: NoteGroup[];
  nextCursor?: string;
  previousCursor?: string;
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

function noteSlug(slug: string): string {
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

export async function getPage(slug: string): Promise<Page> {
  return fetchData<Page>(`/pages/${slug}`);
}

export async function getNowEntries(): Promise<NowEntry[]> {
  const data = await fetchData<{ entries: NowEntry[] }>("/now");

  return data.entries;
}

function noteSummaryFromApi(note: Omit<NoteSummary, "href">): NoteSummary {
  const slug = noteSlug(note.slug);

  return {
    ...note,
    slug,
    href: `/notes/${slug}`,
  };
}

function noteFromApi(note: Omit<Note, "href">): Note {
  return {
    ...noteSummaryFromApi(note),
    body: note.body,
  };
}

export async function getAllNoteSummaries(): Promise<NoteSummary[]> {
  const data = await fetchData<{ notes: Omit<NoteSummary, "href">[] }>("/notes");

  return data.notes.map(noteSummaryFromApi);
}

export async function getNote(slug: string): Promise<Note> {
  const note = await fetchData<Omit<Note, "href">>(`/notes/${noteSlug(slug)}`);

  return noteFromApi(note);
}

export async function getNotePage(
  after?: string,
  pageSize = 25
): Promise<NotePage> {
  const cursor = after ? noteSlug(after) : undefined;
  const search = new URLSearchParams({ limit: String(pageSize) });
  if (cursor) search.set("after", cursor);
  const data = await fetchData<{
    items: { notes: Omit<Note, "href">[] }[];
    next_cursor?: string;
    previous_cursor?: string;
  }>(`/notes/page?${search.toString()}`);

  return {
    items: data.items.map((item) => ({
      notes: item.notes.map(noteFromApi),
    })),
    nextCursor: data.next_cursor,
    previousCursor: data.previous_cursor,
  };
}

export async function getNotePageCursors(pageSize = 25): Promise<string[]> {
  const cursors: string[] = [];
  let page = await getNotePage(undefined, pageSize);

  while (page.nextCursor) {
    cursors.push(page.nextCursor);
    page = await getNotePage(page.nextCursor, pageSize);
  }

  return cursors;
}
