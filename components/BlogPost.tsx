import Link from "next/link";

import type { PostSummary } from "lib/dataApi";

export default function BlogPost({
  title,
  description,
  slug,
  href,
  teaser,
}: Pick<PostSummary, "title" | "slug" | "href" | "description" | "teaser">) {
  return (
    <article className="w-full mb-12">
      <div className="flex flex-col md:flex-row md:items-center mb-4">
        <Link href={href} className="w-full">
          <h2 className="text-xl font-medium font-serif text-gray-900 md:text-3xl">
            {title}
          </h2>
        </Link>
      </div>
      <p className="text-gray-600 font-body prose md:prose-xl">{teaser}</p>
      <Link
        href={href}
        title={title}
        className="mt-6 flex text-base md:text-xl text-emerald-500 leading-7 rounded-lg hover:text-emerald-700 transition-all h-6 items-center"
      >
        Read post
        <span className="sr-only">: {title}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="h-6 w-6 ml-1"
          aria-hidden="true"
          focusable="false"
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
    </article>
  );
}
