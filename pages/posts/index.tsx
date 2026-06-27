import type { GetStaticProps, NextPage } from "next";
import Container from "components/Container";
import { useState } from "react";
import BlogPost from "components/BlogPost";
import { getAllPosts, PostSummary } from "lib/dataApi";
import { REVALIDATE_SECONDS } from "lib/isr";

type PostsProps = {
  posts: PostSummary[];
};

export const getStaticProps: GetStaticProps<PostsProps> = async () => {
  const posts = await getAllPosts();

  return {
    props: {
      posts,
    },
    revalidate: REVALIDATE_SECONDS,
  };
};

const Posts: NextPage<PostsProps> = ({ posts }) => {
  const [searchValue, setSearchValue] = useState("");
  const filteredBlogPosts = posts.filter((post: PostSummary) =>
    post.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <Container
      title="Posts – Paul McBride"
      description="Thoughts on the software industry, programming, tech, videography, music, and my personal life."
    >
      <div className="grid grid-cols-main [&>*]:col-start-2 [&>*]:col-end-3 mx-auto mb-16 px-8">
        <h1 className="mb-8 text-3xl font-serif font-bold tracking-tight text-gray-800 md:text-5xl">
          Posts
        </h1>

        {!filteredBlogPosts.length && (
          <p className="mb-4 text-gray-600">No posts found.</p>
        )}
        {filteredBlogPosts.map((post) => (
          <BlogPost key={post.title} {...post} />
        ))}
      </div>
    </Container>
  );
};

export default Posts;
