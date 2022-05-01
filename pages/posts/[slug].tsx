import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Video from "components/Video";
import { allPosts, Post } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";

export const getStaticPaths: GetStaticPaths = () => {
  const paths: string[] = allPosts.map((post) => post.slug);
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const post: Post = allPosts.find((post) => {
    return post._raw.flattenedPath.replace("posts/", "") === params.slug;
  }) as Post;

  return {
    props: {
      post,
    },
  };
};

const components = { Video };

const Post: NextPage = (props: any) => {
  console.log(props);

  const Component = useMDXComponent(props.post.body.code);

  return (
    <main>
      <article className="prose lg:prose-xl mx-auto">
        <h1>{props.post.title}</h1>
        <Component components={components} />
      </article>
    </main>
  );
};

export default Post;
