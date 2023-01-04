import Link from "next/link";

import type { Post } from "contentlayer/generated";

export default function BlogPost({
  title,
  description,
  slug,
  teaser,
  readingTime,
}: Pick<Post, "title" | "slug" | "description" | "readingTime" | "teaser">) {
  return (
    <div className="w-full mb-12">
      <div className="flex flex-col md:flex-row md:items-center mb-4">
        <Link href={slug} className="w-full">
          <h4 className="text-lg font-medium font-serif text-gray-900 md:text-2xl">
            {title}
          </h4>
        </Link>
      </div>
      <p className="text-gray-600 text-base font-body">{teaser}</p>
      <Link
        href={slug}
        title={title}
        className="mt-6 flex text-emerald-500 leading-7 rounded-lg hover:text-emerald-700 transition-all h-6 items-center text-base"
      >
        Read post
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-6 w-6 ml-1"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.5 12h-15m11.667-4l3.333 4-3.333-4zm3.333 4l-3.333 4 3.333-4z"
          />
        </svg>
      </Link>
    </div>
  );
}
