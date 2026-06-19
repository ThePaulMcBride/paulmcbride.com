import type { GetStaticPaths, GetStaticProps } from "next";
import PostLayout from "layouts/Post";
import MarkdownContent from "components/MarkdownContent";
import { getAllPosts, getPost, Post } from "lib/dataApi";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();
  const paths = posts.map((post) => ({ params: { slug: post.slug } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const post = await getPost(params.slug);

  return {
    props: {
      post,
    },
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
