import Image from "next/image";
import { parseISO, format } from "date-fns";

import Container from "components/Container";
// import Subscribe from "components/Subscribe";
// import ViewCounter from "components/ViewCounter";
import type { PropsWithChildren } from "react";
import type { Post } from "contentlayer/generated";
import Subscribe from "components/Subscribe";
import classNames from "classnames";

const editUrl = (slug: string) =>
  `https://github.com/ThePaulMcBride/paulmcbride.com/edit/main/data${slug}.mdx`;

function generateschemaOrgJSONLD(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: [`https://paulmcbride.com${post.banner}`],
    datePublished: post.date,
    dateModified: post.date,
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

const headerColor = "bg-teal-50 bg-opacity-50";

export default function BlogLayout({
  children,
  post,
}: PropsWithChildren<{ post: Post }>) {
  const image = post.banner
    ? `https://paulmcbride.com${post.banner}`
    : undefined;

  const schemaOrgJSONLD = generateschemaOrgJSONLD(post);

  return (
    <Container
      title={`${post.title} – Paul McBride`}
      description={post.description}
      image={image}
      date={new Date(post.date).toISOString()}
      type="article"
      navClassName={headerColor}
    >
      <header
        className={classNames(
          "grid grid-cols-main [&>*]:col-start-2 [&>*]:col-end-3 pb-10 px-8",
          headerColor
        )}
      >
        <div>
          <span className="px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-green-100 text-gray-700">
            In Progress
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-gray-800 md:text-[70px] md:leading-[1.1] md:mt-4 dark:text-white font-serif lining-nums">
          {post.title}
        </h1>
        <hr className="mt-12 mb-4" />
        {/* {post.tags && (
          <div className="flex flex-wrap items-center justify-start mt-4 space-x-2 text-sm text-gray-600 dark:text-gray-400">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 rounded dark:bg-gray-800"
              >
                {tag}
              </span>
            ))}
          </div>
        )} */}

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
              {"Paul McBride • Last updated "}
              {format(parseISO(post.date), "do MMMM yyyy")}
            </p>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 min-w-32 md:mt-0">
            {post.readingTime.text}
          </p>
        </div>
        {/* {post.banner && post.bannerUrl && (
          <div className="flex flex-col items-start justify-center w-full mt-8 mb-4 relative aspect-[5/2] rounded-lg overflow-hidden">
            <Image
              alt={post.title}
              src={post.bannerUrl}
              className="object-cover"
              width={post.banner.width}
              height={post.banner.height}
              placeholder="blur"
              blurDataURL={post.banner.blurhashDataUrl}
            />
          </div>
        )} */}
      </header>
      <article className="w-full mb-8 font-body prose prose-xl text-jumbo dark:prose-dark max-w-none grid grid-cols-main !col-start-1 !col-end-4 [&_*]:mt-0 [&_*]:col-start-2 [&_*]:col-end-3 [&_h2]:mt-6 prose-h2:font-serif [&_h3]:mt-6 [&_h3]:font-light prose-h3:font-sans lining-nums px-8">
        {children}
      </article>
      <div className="grid grid-cols-main !col-start-1 !col-end-4 mb-16 [&_*]:col-start-2 [&_*]:col-end-3 px-8">
        <Subscribe />
        <div className="text-sm text-gray-700 dark:text-gray-300 col-start-2 ">
          <a href={editUrl(post.slug)} target="_blank" rel="noreferrer">
            Edit on GitHub
          </a>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `${JSON.stringify(schemaOrgJSONLD)}`,
        }}
      />
    </Container>
  );
}
