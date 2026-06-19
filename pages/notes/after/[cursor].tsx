import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import NotesPage from "components/NotesPage";
import {
  getAllNoteSummaries,
  getNotePage,
  getNotePageCursors,
  Note,
} from "lib/dataApi";
import { REVALIDATE_SECONDS } from "lib/isr";

export const getStaticPaths: GetStaticPaths = async () => {
  const cursors = await getNotePageCursors();
  const paths = cursors.map((cursor) => ({ params: { cursor } }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const summaries = await getAllNoteSummaries();
  if (!summaries.some((note) => note.slug === params.cursor)) {
    return {
      notFound: true,
      revalidate: REVALIDATE_SECONDS,
    };
  }

  const page = await getNotePage(params.cursor);

  return {
    props: {
      notes: page.notes,
      olderHref: page.nextCursor ? `/notes/after/${page.nextCursor}` : null,
      newerHref: page.previousCursor
        ? `/notes/after/${page.previousCursor}`
        : "/notes",
    },
    revalidate: REVALIDATE_SECONDS,
  };
};

const NotesAfterPage: NextPage<{
  notes: Note[];
  olderHref?: string;
  newerHref?: string;
}> = ({ notes, olderHref, newerHref }) => {
  return <NotesPage notes={notes} olderHref={olderHref} newerHref={newerHref} />;
};

export default NotesAfterPage;
