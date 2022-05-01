import Link from "next/link";

import type { Post } from "contentlayer/generated";

export default function BlogPost({
  title,
  description,
  slug,
  readingTime,
}: Pick<Post, "title" | "slug" | "description" | "readingTime">) {
  return (
    <Link href={slug}>
      <a className="w-full">
        <div className="w-full mb-8">
          <div className="flex flex-col md:flex-row md:items-center mb-2">
            <h4 className="text-lg font-medium text-gray-900 md:text-xl dark:text-gray-100">
              {title}
            </h4>
            <p className="w-32 mb-4 text-left text-gray-500 md:mb-0 ml-2 hidden md:block">
              - {readingTime}
            </p>
          </div>
          <p className="text-gray-600 dark:text-gray-400">{description}</p>
        </div>
      </a>
    </Link>
  );
}
