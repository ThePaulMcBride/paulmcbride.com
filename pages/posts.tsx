import type { NextPage } from "next";
import fs from "fs";
import matter from "gray-matter";
import Image from "next/image";
import Link from "next/link";
import { allPosts, Post } from "contentlayer/generated";
import Container from "components/Container";
import { useState } from "react";
import BlogPost from "components/BlogPost";

export async function getStaticProps() {
  const posts = allPosts
    .sort((a, b) => {
      return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
    })
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      banner: post.banner,
      description: post.description,
      readingTime: post.readingTime.text,
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
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          Blog
        </h1>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          {`I've been writing online since 2017, mostly about web development and tech careers.
            In total, I've written ${posts.length} articles on my blog.
            Use the search below to filter by title.`}
        </p>
        <div className="relative w-full mb-4">
          <input
            aria-label="Search articles"
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search articles"
            className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-200 rounded-md dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
          />
          <svg
            className="absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h3 className="mt-8 mb-4 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
          All Posts
        </h3>
        {!filteredBlogPosts.length && (
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            No posts found.
          </p>
        )}
        {filteredBlogPosts.map((post) => (
          <BlogPost key={post.title} {...post} />
        ))}
      </div>
    </Container>
  );
};

export default Posts;
