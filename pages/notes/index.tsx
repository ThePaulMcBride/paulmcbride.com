import type { GetStaticProps, NextPage } from "next";
import NotesPage from "components/NotesPage";
import { getNotePage, NoteGroup } from "lib/dataApi";
import { REVALIDATE_SECONDS } from "lib/isr";
import { renderMarkdownHtml } from "lib/markdownToHtml";

export const getStaticProps: GetStaticProps = async () => {
  const page = await getNotePage();

  return {
    props: {
      items: await Promise.all(
        page.items.map(async (item) => ({
          notes: await Promise.all(
            item.notes.map(async (note) => ({
              ...note,
              body: await renderMarkdownHtml(note.body, { linkHashtags: true }),
            }))
          ),
        }))
      ),
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
