import Image from "next/legacy/image";
import { parseISO, format } from "date-fns";

import Container from "components/Container";
// import Subscribe from "components/Subscribe";
// import ViewCounter from "components/ViewCounter";
import type { PropsWithChildren } from "react";
import type { Post } from "contentlayer/generated";
import Subscribe from "components/Subscribe";

const editUrl = (slug: string) =>
  `https://github.com/ThePaulMcBride/paulmcbride.com/edit/main/data${slug}.mdx`;
const discussUrl = (slug: string) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `https://paulmcbride.com${slug}`
  )}`;

function generateschemaOrgJSONLD(post: any) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: [post.banner.url],
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: [
      {
        "@type": "Person",
        name: "Paul McBride",
        sameAs: [
          "https://twitter.com/thepaulmcbride",
          "https://github.com/thepaulmcbride",
          "https://paulmcbride.com",
        ],
      },
    ],
  };
}

export default function BlogLayout({
  children,
  post,
}: PropsWithChildren<{ post: any }>) {
  const image = post.banner ? post.banner.url : undefined;

  const schemaOrgJSONLD = generateschemaOrgJSONLD(post);

  return (
    <Container
      title={`${post.title} – Paul McBride`}
      description={post.description}
      image={image}
      date={new Date(post.publishedAt).toISOString()}
      type="article"
    >
      <header className="grid grid-cols-main [&>*]:col-start-2 [&>*]:col-end-3">
        <h1 className="text-3xl font-bold tracking-tight text-gray-800 md:text-[70px] md:leading-[1.1] md:mt-4 dark:text-white font-serif lining-nums">
          {post.title}
        </h1>
        {/* <div className="flex flex-col items-start justify-between w-full mt-6 md:flex-row md:items-center">
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
              {format(parseISO(post.publishedAt), "do MMMM yyyy")}
            </p>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 min-w-32 md:mt-0">
            {post.estimatedReadingTime} min read
          </p>
        </div> */}
        {/* {post.banner && (
          <div className="flex flex-col items-start justify-center w-full mt-8 mb-4 relative aspect-[5/2] rounded-lg overflow-hidden">
            <Image
              alt={post.title || post.banner.altText}
              src={`${post.banner.url}`}
              layout="fill"
              className="object-cover"
              width={post.banner.metadata.dimensions.width}
              height={post.banner.metadata.dimensions.height}
            />
          </div>
        )} */}
      </header>
      <article className="w-full mb-8 font-body prose prose-xl text-jumbo dark:prose-dark max-w-none grid grid-cols-main !col-start-1 !col-end-4 [&_*]:mt-0 [&_*]:col-start-2 [&_*]:col-end-3 [&_h2]:mt-6 prose-h2:font-serif [&_h3]:mt-6 [&_h3]:font-light prose-h3:font-sans lining-nums">
        {children}
      </article>
      {/* <div className="grid grid-cols-main mb-16">
        <Subscribe />
        <div className="text-sm text-gray-700 dark:text-gray-300 col-start-2">
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
            Edit on GitHub
          </a>
        </div>
      </div> */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `${JSON.stringify(schemaOrgJSONLD)}`,
        }}
      />
    </Container>
  );
}
