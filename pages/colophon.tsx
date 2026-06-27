import type { GetStaticProps, NextPage } from "next";
import Container from "components/Container";
import MarkdownContent from "components/MarkdownContent";
import { getPage, Page } from "lib/dataApi";
import { REVALIDATE_SECONDS } from "lib/isr";
import { renderPageContent } from "lib/renderContent";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const colophon = await renderPageContent(await getPage("colophon"));

  return {
    props: {
      colophon,
    },
    revalidate: REVALIDATE_SECONDS,
  };
};

const Home: NextPage<{ colophon: Page }> = ({ colophon }) => {
  return (
    <Container
      title="Colophon – Paul McBride"
      description="A little page about the tools I use to make this site and the other sites that inspire me."
    >
      <main className="mx-8">
        <div className="max-w-none md:max-w-content mx-auto w-full">
          <h1 className="font-bold text-3xl md:text-5xl tracking-tight text-gray-900 font-serif mb-8">
            Colophon
          </h1>
          <p className="text-gray-600 mb-8 font-body text-xl leading-relaxed md:text-2xl md:leading-relaxed">
            This page includes a list of the tools and technologies I use to
            make this site. It&apos;s also where I&apos;ll list the sites that
            inspire me.
          </p>
          <div className="w-full prose prose-lg md:prose-xl max-w-none mb-16 font-body">
            <MarkdownContent content={colophon.body} />
          </div>
        </div>
      </main>
    </Container>
  );
};

export default Home;
