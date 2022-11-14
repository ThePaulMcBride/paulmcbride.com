import type { NextPage } from "next";
import { allPosts, Post } from "contentlayer/generated";
import Container from "components/Container";
import { useState } from "react";
import BlogPost from "components/BlogPost";
import { client } from "lib/sanity";

export async function getStaticProps() {
  // const posts = allPosts
  //   .filter((post) => !post.draft)
  //   .sort((a, b) => {
  //     return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
  //   })
  //   .map((post) => ({
  //     slug: post.slug,
  //     title: post.title,
  //     banner: post.banner,
  //     description: post.description,
  //     readingTime: post.readingTime.text,
  //     teaser: post.teaser,
  //   }));

  const res = await client.fetch(
    `*[_type == "post"]{slug, title, summary, 'mainImage': mainImage.asset->}`
  );
  const posts: any[] = res.map((post: any) => ({
    slug: `posts/${post.slug.current}`,
    title: post.title,
    banner: post.mainImage,
    description: post.summary,
    teaser: post.summary,
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
    >
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          Posts
        </h1>

        {!filteredBlogPosts.length && (
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            No posts found.
          </p>
        )}
        {filteredBlogPosts.map((post: any) => (
          <BlogPost key={post.title} {...post} />
        ))}
      </div>
    </Container>
  );
};

export default Posts;
