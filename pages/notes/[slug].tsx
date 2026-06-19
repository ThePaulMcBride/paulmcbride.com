import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { format, parseISO } from "date-fns";
import Container from "components/Container";
import MarkdownContent from "components/MarkdownContent";
import NoteMedia from "components/NoteMedia";
import { getAllNoteSummaries, getNote, Note } from "lib/dataApi";
import { REVALIDATE_SECONDS } from "lib/isr";

export const getStaticPaths: GetStaticPaths = async () => {
  const notes = await getAllNoteSummaries();
  const paths = notes.map((note) => ({ params: { slug: note.slug } }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const note = await getNote(params.slug);

  return {
    props: {
      note,
    },
    revalidate: REVALIDATE_SECONDS,
  };
};

const NotePage: NextPage<{ note: Note }> = ({ note }) => {
  const title = `Note from ${format(parseISO(note.date), "do MMMM yyyy")}`;
  const sourceLabel = note.source === "mastodon" ? "Via Mastodon" : "View original source";

  return (
    <Container
      title={`${title} – Paul McBride`}
      description="A short note from Paul McBride."
      date={new Date(note.date).toISOString()}
      type="article"
    >
      <main className="mx-8">
        <article className="w-full mt-8 mb-8 font-body prose prose-lg md:prose-xl md:text-jumbo max-w-none md:max-w-content mx-auto lining-nums">
          <time
            dateTime={note.date}
            className="block text-sm text-emerald-800 opacity-80 mb-4"
          >
            {format(parseISO(note.date), "do MMMM yyyy, HH:mm")}
          </time>
          <MarkdownContent content={note.body} linkHashtags />
          <NoteMedia note={note} className="mt-8" />
          {note.source_url && (
            <p className="mt-8 text-sm">
              <a href={note.source_url} target="_blank" rel="noopener noreferrer">
                {sourceLabel}
              </a>
            </p>
          )}
        </article>
      </main>
    </Container>
  );
};

export default NotePage;
