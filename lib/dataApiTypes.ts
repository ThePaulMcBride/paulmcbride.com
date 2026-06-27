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
