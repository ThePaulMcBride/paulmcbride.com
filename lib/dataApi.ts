import { fetchData } from "lib/dataApiClient";
import {
  noteFromApi,
  noteSlug,
  noteSummaryFromApi,
  postFromApi,
  postSlug,
  postSummaryFromApi,
} from "lib/dataApiMappers";
import type {
  ApiPost,
  ApiPostSummary,
  Note,
  NoteGroup,
  NotePage,
  NoteSummary,
  NowEntry,
  Page,
  Post,
  PostSummary,
} from "lib/dataApiTypes";

export { dataAssetUrl } from "lib/dataAssets";
export type {
  ApiPost,
  ApiPostSummary,
  Note,
  NoteGroup,
  NoteMedia,
  NotePage,
  NoteSummary,
  NowEntry,
  Page,
  Post,
  PostSummary,
} from "lib/dataApiTypes";

export async function getAllPosts(): Promise<PostSummary[]> {
  const data = await fetchData<{ posts: ApiPostSummary[] }>("/posts");

  return data.posts.map(postSummaryFromApi);
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

export async function getAllNoteSummaries(): Promise<NoteSummary[]> {
  const data = await fetchData<{ notes: Omit<NoteSummary, "href">[] }>("/notes");

  return data.notes.map(noteSummaryFromApi);
}

export async function getNote(slug: string): Promise<Note> {
  const group = await getNoteGroup(slug);

  return group.notes[0];
}

export async function getNoteGroup(slug: string): Promise<NoteGroup> {
  const group = await fetchData<{ notes: Omit<Note, "href">[] }>(
    `/notes/${noteSlug(slug)}`
  );

  return {
    notes: group.notes.map(noteFromApi),
  };
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

export async function getAllNoteGroups(pageSize = 100): Promise<NoteGroup[]> {
  const groups: NoteGroup[] = [];
  let page = await getNotePage(undefined, pageSize);

  groups.push(...page.items);

  while (page.nextCursor) {
    page = await getNotePage(page.nextCursor, pageSize);
    groups.push(...page.items);
  }

  return groups;
}
