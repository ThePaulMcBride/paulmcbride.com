import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { format, parseISO } from "date-fns";
import Container from "components/Container";
import MarkdownContent from "components/MarkdownContent";
import NoteMedia from "components/NoteMedia";
import { getAllNoteGroups, getNoteGroup, Note, NoteGroup } from "lib/dataApi";
import { REVALIDATE_SECONDS } from "lib/isr";
import { renderNoteGroup } from "lib/renderContent";

type NoteParams = {
  slug: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const groups = await getAllNoteGroups();
  const paths = groups.map((group) => ({
    params: { slug: group.notes[0].slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<
  { group: NoteGroup },
  NoteParams
> = async ({ params }) => {
  if (!params) {
    return {
      notFound: true,
      revalidate: REVALIDATE_SECONDS,
    };
  }

  const group = await getNoteGroup(params.slug);
  const rootNote = group.notes[0];

  if (params.slug !== rootNote.slug) {
    return {
      redirect: {
        destination: rootNote.href,
        permanent: false,
      },
      revalidate: REVALIDATE_SECONDS,
    };
  }

  return {
    props: {
      group: await renderNoteGroup(group),
    },
    revalidate: REVALIDATE_SECONDS,
  };
};

function NoteEntry({ note }: { note: Note }) {
  const sourceLabel = note.source === "mastodon" ? "Via Mastodon" : "View original source";

  return (
    <article className="flow-root">
      <time
        dateTime={note.date}
        className="block text-sm text-emerald-800 opacity-80 mb-4"
      >
        {format(parseISO(note.date), "do MMMM yyyy, HH:mm")}
      </time>
      <MarkdownContent content={note.body} />
      <NoteMedia note={note} className="mt-8" />
      {note.source_url && (
        <p className="mt-8 text-sm">
          <a href={note.source_url} target="_blank" rel="noopener noreferrer">
            {sourceLabel}
          </a>
        </p>
      )}
    </article>
  );
}

const NotePage: NextPage<{ group: NoteGroup }> = ({ group }) => {
  const rootNote = group.notes[0];
  const title = `Note from ${format(parseISO(rootNote.date), "do MMMM yyyy")}`;

  return (
    <Container
      title={`${title} – Paul McBride`}
      description="A short note from Paul McBride."
      date={new Date(rootNote.date).toISOString()}
      type="article"
    >
      <div className="mx-8">
        <div className="w-full mt-8 mb-8 font-body prose prose-lg md:prose-xl md:text-jumbo max-w-none md:max-w-content mx-auto lining-nums space-y-12">
          {group.notes.map((note) => (
            <NoteEntry key={note.slug} note={note} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default NotePage;
