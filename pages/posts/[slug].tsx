import type { GetStaticPaths, GetStaticProps } from "next";
import PostLayout from "layouts/Post";
import MarkdownContent from "components/MarkdownContent";
import { getAllPosts, getPost, Post } from "lib/dataApi";
import { REVALIDATE_SECONDS } from "lib/isr";
import { renderPostContent } from "lib/renderContent";

type PostParams = {
  slug: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();
  const paths = posts.map((post) => ({ params: { slug: post.slug } }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<{ post: Post }, PostParams> = async ({
  params,
}) => {
  if (!params) {
    return {
      notFound: true,
      revalidate: REVALIDATE_SECONDS,
    };
  }

  const post = await getPost(params.slug);

  return {
    props: {
      post: await renderPostContent(post),
    },
    revalidate: REVALIDATE_SECONDS,
  };
};

const PostComponent = (props: { post: Post }) => {
  return (
    <PostLayout post={props.post}>
      <MarkdownContent content={props.post.body} />
    </PostLayout>
  );
};

export default PostComponent;
