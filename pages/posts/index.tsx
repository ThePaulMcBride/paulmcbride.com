import type { NextPage } from "next";
import { allPosts, Post } from "contentlayer/generated";
import Container from "components/Container";
import { useState } from "react";
import BlogPost from "components/BlogPost";

export async function getStaticProps() {
  const posts = allPosts
    .filter((post) => !post.draft)
    .sort((a, b) => {
      return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
    })
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      banner: post.banner,
      description: post.description,
      readingTime: post.readingTime.text,
      teaser: post.teaser,
    }));

  return {
    props: {
      posts,
    },
  };
}

const Posts: NextPage = ({ posts }: any) => {
  const [searchValue, setSearchValue] = useState("");
  const filteredBlogPosts = posts.filter((post: Post) =>
    post.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <Container
      title="Posts – Paul McBride"
      description="Thoughts on the software industry, programming, tech, videography, music, and my personal life."
      headerClassname="red-100"
    >
      <div className="grid grid-cols-main [&>*]:col-start-2 [&>*]:col-end-3 mx-auto mb-16 px-8">
        <h1 className="mb-8 text-3xl font-serif font-bold tracking-tight text-gray-800 md:text-5xl">
          Posts
        </h1>

        {!filteredBlogPosts.length && (
          <p className="mb-4 text-gray-600">No posts found.</p>
        )}
        {filteredBlogPosts.map((post: any) => (
          <BlogPost key={post.title} {...post} />
        ))}
      </div>
    </Container>
  );
};

export default Posts;
