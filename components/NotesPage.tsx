import Link from "next/link";
import { format, parseISO } from "date-fns";
import Container from "components/Container";
import MarkdownContent from "components/MarkdownContent";
import NoteMedia from "components/NoteMedia";
import type { Note, NoteGroup as NoteGroupType } from "lib/dataApi";

function NoteEntry({ note }: { note: Note }) {
  return (
    <article className="flow-root">
      <Link href={note.href} className="block text-sm text-emerald-800 opacity-80 mb-4 no-underline hover:text-emerald-700">
        <time dateTime={note.date}>
          {format(parseISO(note.date), "do MMMM yyyy, HH:mm")}
        </time>
      </Link>
      <MarkdownContent content={note.body} />
      <NoteMedia note={note} />
    </article>
  );
}

function NoteGroup({ item }: { item: NoteGroupType }) {
  return (
    <section className="space-y-12 md:pl-16 md:border-l md:border-dashed md:border-gray-300 transition-colors hover:border-emerald-500">
      {item.notes.map((note) => (
        <NoteEntry key={note.slug} note={note} />
      ))}
    </section>
  );
}

export default function NotesPage({
  items,
  olderHref,
  newerHref,
}: {
  items: NoteGroupType[];
  olderHref?: string;
  newerHref?: string;
}) {
  return (
    <Container
      title="Notes – Paul McBride"
      description="Short notes, links, and social posts from Paul McBride."
    >
      <div className="mx-8">
        <div className="max-w-none md:max-w-content mx-auto w-full">
          <h1 className="font-bold text-3xl md:text-5xl tracking-tight text-gray-900 font-serif mb-8">
            Notes
          </h1>
          <p className="text-gray-600 mb-16 font-body text-xl leading-relaxed md:text-2xl md:leading-relaxed">
            Short updates, links, and thoughts that do not need to be full blog
            posts.
          </p>
          <div className="w-full prose prose-lg md:prose-xl max-w-none mb-16 font-body space-y-20 md:space-y-24">
            {items.map((item) => (
              <NoteGroup key={item.notes.map((note) => note.slug).join(":")} item={item} />
            ))}
          </div>
          <nav
            aria-label="Notes pagination"
            className="flex justify-between gap-4 mb-16 text-emerald-500"
          >
            {newerHref ? (
              <Link href={newerHref} className="hover:text-emerald-700">
                Newer notes
              </Link>
            ) : (
              <span />
            )}
            {olderHref && (
              <Link href={olderHref} className="hover:text-emerald-700">
                Older notes
              </Link>
            )}
          </nav>
        </div>
      </div>
    </Container>
  );
}
