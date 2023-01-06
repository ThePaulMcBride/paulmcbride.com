import type { GetStaticProps, NextPage } from "next";
import Container from "components/Container";
import { colophonPage } from ".contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import MDXComponents from "components/MDXComponents";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const colophon = colophonPage;

  return {
    props: {
      colophon,
    },
  };
};

const components = MDXComponents;

const Home: NextPage = ({ colophon }: any) => {
  const Component = useMDXComponent(colophon.body.code);

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
            <Component components={components} />
          </div>
        </div>
      </main>
    </Container>
  );
};

export default Home;
