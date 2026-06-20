import type { GetStaticProps, NextPage } from "next";
import NotesPage from "components/NotesPage";
import { getNotePage, Note } from "lib/dataApi";
import { REVALIDATE_SECONDS } from "lib/isr";
import { renderMarkdownHtml } from "lib/markdownToHtml";

export const getStaticProps: GetStaticProps = async () => {
  const page = await getNotePage();

  return {
    props: {
      notes: await Promise.all(
        page.notes.map(async (note) => ({
          ...note,
          body: await renderMarkdownHtml(note.body, { linkHashtags: true }),
        }))
      ),
      olderHref: page.nextCursor ? `/notes/after/${page.nextCursor}` : null,
    },
    revalidate: REVALIDATE_SECONDS,
  };
};

const Notes: NextPage<{ notes: Note[]; olderHref?: string }> = ({
  notes,
  olderHref,
}) => {
  return <NotesPage notes={notes} olderHref={olderHref} />;
};

export default Notes;
