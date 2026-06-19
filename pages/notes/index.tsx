import type { GetStaticProps, NextPage } from "next";
import NotesPage from "components/NotesPage";
import { getNotePage, Note } from "lib/dataApi";

export const getStaticProps: GetStaticProps = async () => {
  const page = await getNotePage();

  return {
    props: {
      notes: page.notes,
      olderHref: page.nextCursor ? `/notes/after/${page.nextCursor}` : null,
    },
  };
};

const Notes: NextPage<{ notes: Note[]; olderHref?: string }> = ({
  notes,
  olderHref,
}) => {
  return <NotesPage notes={notes} olderHref={olderHref} />;
};

export default Notes;
