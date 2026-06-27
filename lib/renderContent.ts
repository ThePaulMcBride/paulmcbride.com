import type { NoteGroup, NotePage, NowEntry, Page, Post } from "lib/dataApi";
import { renderMarkdownHtml } from "lib/markdownToHtml";

export async function renderPageContent(page: Page): Promise<Page> {
  return {
    ...page,
    body: await renderMarkdownHtml(page.body),
  };
}

export async function renderPostContent(post: Post): Promise<Post> {
  return {
    ...post,
    body: await renderMarkdownHtml(post.body),
  };
}

export async function renderNowEntries(entries: NowEntry[]): Promise<NowEntry[]> {
  return Promise.all(
    entries.map(async (entry) => ({
      ...entry,
      body: await renderMarkdownHtml(entry.body),
    }))
  );
}

export async function renderNoteGroup(group: NoteGroup): Promise<NoteGroup> {
  return {
    notes: await Promise.all(
      group.notes.map(async (note) => ({
        ...note,
        body: await renderMarkdownHtml(note.body, { linkHashtags: true }),
      }))
    ),
  };
}

export async function renderNoteGroups(groups: NoteGroup[]): Promise<NoteGroup[]> {
  return Promise.all(groups.map(renderNoteGroup));
}

export async function renderNotePage(page: NotePage): Promise<NotePage> {
  return {
    ...page,
    items: await renderNoteGroups(page.items),
  };
}
