import type { GetStaticProps, NextPage } from "next";
import NotesPage from "components/NotesPage";
import { getNotePage, NoteGroup } from "lib/dataApi";
import { REVALIDATE_SECONDS } from "lib/isr";
import { renderNotePage } from "lib/renderContent";

export const getStaticProps: GetStaticProps = async () => {
  const page = await renderNotePage(await getNotePage());

  return {
    props: {
      items: page.items,
      olderHref: page.nextCursor ? `/notes/after/${page.nextCursor}` : null,
    },
    revalidate: REVALIDATE_SECONDS,
  };
};

const Notes: NextPage<{ items: NoteGroup[]; olderHref?: string }> = ({
  items,
  olderHref,
}) => {
  return <NotesPage items={items} olderHref={olderHref} />;
};

export default Notes;
