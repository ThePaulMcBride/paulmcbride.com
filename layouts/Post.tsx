import Image from "next/image";
import { parseISO, format } from "date-fns";
import * as Tooltip from "@radix-ui/react-tooltip";
import Container from "components/Container";
import type { PropsWithChildren } from "react";
import type { Post } from "contentlayer/generated";
import Subscribe from "components/Subscribe";
import classNames from "classnames";
import statuses from "@data/statuses";
import tags from "@data/tags";

const editUrl = (slug: string) =>
  `https://github.com/ThePaulMcBride/paulmcbride.com/edit/main/data${slug}.mdx`;

function generateschemaOrgJSONLD(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: [`https://paulmcbride.com${post.banner}`],
    datePublished: post.date,
    dateModified: post.lastUpdated || post.date,
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

const headerColor = "bg-emerald-50 bg-opacity-50";

export default function BlogLayout({
  children,
  post,
}: PropsWithChildren<{ post: Post }>) {
  const image = post.bannerUrl
    ? `https://paulmcbride.com${post.bannerUrl}`
    : undefined;

  const schemaOrgJSONLD = generateschemaOrgJSONLD(post);

  return (
    <Container
      title={`${post.title} – Paul McBride`}
      description={post.description}
      image={image}
      date={new Date(post.lastUpdated || post.date).toISOString()}
      type="article"
      navClassName={headerColor}
    >
      <header
        className={classNames(
          "grid grid-cols-main [&>*]:col-start-2 [&>*]:col-end-3 pb-10 px-8",
          headerColor
        )}
      >
        <h1 className="text-3xl font-bold tracking-tight text-gray-800 md:text-[70px] md:leading-[1.1] md:mt-4 font-serif lining-nums">
          {post.title}
        </h1>
        {post.subtitle && (
          <h2 className="text-sm text-emerald-800 opacity-80 uppercase tracking-wide md:text-xl font-bold mt-2 md:mt-4 font-body lining-nums">
            {post.subtitle}
          </h2>
        )}
        <hr className="mt-8 md:mt-10 mb-4" />
        <div className="flex flex-col items-start justify-between w-full mt-2 md:flex-row md:items-center space-y-2 md:space-y-0">
          <div className="flex items-center">
            <p className="text-sm text-emerald-800 opacity-80">
              {"Last updated: "}
              {format(parseISO(post.lastUpdated || post.date), "do MMMM yyyy")}
              {post.status && (
                <Tooltip.Provider delayDuration={0}>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <span className="px-2 py-0.5 uppercase font-bold rounded-full text-lg leading-5">
                        <span className="sr-only">
                          {statuses[post.status].title}
                        </span>
                        {statuses[post.status].icon}
                      </span>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        className="TooltipContent transition-all"
                        collisionPadding={10}
                        sideOffset={12}
                      >
                        <div className="bg-white max-w-xs text-base p-4 rounded-lg shadow-lg transition-all">
                          {statuses[post.status].description}
                        </div>
                        <Tooltip.Arrow className="TooltipArrow fill-white" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </Tooltip.Provider>
              )}
            </p>
          </div>
          <span className="text-sm text-emerald-800 opacity-80">
            {post.readingTime.text}
          </span>
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
      <main className="px-8 mb-12">
        <article className="w-full mt-8 mb-8 font-body prose prose-lg md:prose-xl md:text-jumbo max-w-none md:max-w-content mx-auto lining-nums">
          {children}
        </article>
        {post.tags && (
          <div className="w-full max-w-none md:max-w-content mx-auto mb-8">
            <div className="flex flex-wrap items-center justify-start mt-4 space-x-2 text-sm">
              {post.tags.map((tag) => {
                const tagData = tags[tag];
                if (!tagData) return null;
                return (
                  <a
                    key={tagData.slug}
                    href={`/tags/${tagData.slug}`}
                    className="px-3 py-0.5 bg-emerald-100 text-emerald-700 rounded-full"
                  >
                    {tagData.title}
                  </a>
                );
              })}
            </div>
          </div>
        )}
        <div className="w-full max-w-none md:max-w-content mx-auto">
          <Subscribe />
          <div className="text-sm text-gray-700 col-start-2 ">
            <a href={editUrl(post.slug)} target="_blank" rel="noreferrer">
              Edit on GitHub
            </a>
          </div>
        </div>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: `${JSON.stringify(schemaOrgJSONLD)}`,
        }}
      />
    </Container>
  );
}
