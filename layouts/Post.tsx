import Image from "next/image";
import { parseISO, format } from "date-fns";

import Container from "components/Container";
// import Subscribe from "components/Subscribe";
// import ViewCounter from "components/ViewCounter";
import type { PropsWithChildren } from "react";
import type { Post } from "contentlayer/generated";

const editUrl = (slug: string) =>
  `https://github.com/ThePaulMcBride/paulmcbride.com/edit/main/data${slug}.mdx`;
const discussUrl = (slug: string) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `https://paulmcbride.com${slug}`
  )}`;

export default function BlogLayout({
  children,
  post,
}: PropsWithChildren<{ post: Post }>) {
  return (
    <Container
      title={`${post.title} – Paul McBride`}
      description={post.description}
      image={`https://paulmcbride.com${post.banner}`}
      date={new Date(post.date).toISOString()}
      type="article"
    >
      <article className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          {post.title}
        </h1>
        <div className="flex flex-col items-start justify-between w-full mt-2 md:flex-row md:items-center">
          <div className="flex items-center">
            <Image
              alt="Paul McBride"
              height={24}
              width={24}
              src="/avatar.jpeg"
              className="rounded-full"
            />
            <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              {"Paul McBride / "}
              {format(parseISO(post.date), "dd MMMM yyyy")}
            </p>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 min-w-32 md:mt-0">
            {post.readingTime.text}
            {/* {` • `}
            <ViewCounter slug={post.slug} /> */}
          </p>
        </div>
        <div className="w-full mt-4 prose dark:prose-dark max-w-none">
          {children}
        </div>
        <div className="mt-8">{/* <Subscribe /> */}</div>
        <div className="text-sm text-gray-700 dark:text-gray-300">
          <a
            href={discussUrl(post.slug)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {"Discuss on Twitter"}
          </a>
          {` • `}
          <a
            href={editUrl(post.slug)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {"Edit on GitHub"}
          </a>
        </div>
      </article>
    </Container>
  );
}
