import type { GetStaticProps, NextPage } from "next";
import NotesPage from "components/NotesPage";
import { getNotePage, Note } from "lib/dataApi";
import { REVALIDATE_SECONDS } from "lib/isr";

export const getStaticProps: GetStaticProps = async () => {
  const page = await getNotePage();

  return {
    props: {
      notes: page.notes,
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
