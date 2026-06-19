import type { GetStaticProps, NextPage } from "next";
import Container from "components/Container";
import MarkdownContent from "components/MarkdownContent";
import { getNowEntries, NowEntry } from "lib/dataApi";
import { REVALIDATE_SECONDS } from "lib/isr";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const posts = await getNowEntries();

  return {
    props: {
      posts,
    },
    revalidate: REVALIDATE_SECONDS,
  };
};

const NowPostComponent = ({ post }: { post: NowEntry }) => {
  return (
    <section className="md:pl-16 md:border-l md:border-dashed border-gray-300 mb-16">
      <h2 className="font-bold text-2xl md:text-3xl tracking-tight text-gray-900 font-serif mb-4">
        {post.title}
      </h2>
      <MarkdownContent content={post.body} />
    </section>
  );
};

const Home: NextPage<{ posts: NowEntry[] }> = ({ posts }) => {
  return (
    <Container
      title="Now – Paul McBride"
      description="A chronological list of things I've been doing. It will
      mostly be a monthly summary of how my work and life changes."
    >
      <main className="mx-8">
        <div className="max-w-none md:max-w-content mx-auto w-full">
          <h1 className="font-bold text-3xl md:text-5xl tracking-tight text-gray-900 font-serif mb-8">
            Now
          </h1>
          <p className="text-gray-600 mb-16 font-body text-xl leading-relaxed md:text-2xl md:leading-relaxed">
            This is a chronological list of things I&apos;ve been doing. It will
            mostly be a monthly summary of how my work and life changes.
            It&apos;s inspired by Maggie Appleton&apos;s{" "}
            <a
              href="https://maggieappleton.com/now"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-500 hover:text-emerald-600"
            >
              Now page
            </a>
            .
          </p>
          <div className="w-full prose prose-lg md:prose-xl max-w-none mb-16 font-body">
            {posts.map((post) => (
              <NowPostComponent key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </main>
    </Container>
  );
};

export default Home;
