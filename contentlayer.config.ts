import {
  defineDocumentType,
  makeSource,
  ComputedFields,
} from "contentlayer/source-files";

import readingTime from "reading-time";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrism from "rehype-prism-plus";

const computedFields: ComputedFields = {
  readingTime: {
    type: "json",
    resolve: (doc: any) => readingTime(doc.body.raw),
  },
  wordCount: {
    type: "number",
    resolve: (doc: any) => doc.body.raw.split(/\s+/gu).length,
  },
  slug: {
    type: "string",
    resolve: (doc: any) => `/${doc._raw.flattenedPath}`,
  },
};

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/*.md*`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true,
    },
    description: {
      type: "string",
      description: "Description of the post",
      required: true,
    },
    date: {
      type: "date",
      description: "The date of the post",
      required: true,
    },
    banner: {
      type: "string",
      description: "The banner image of the post",
      required: true,
    },
    tags: {
      type: "list",
      description: "The tags of the post",
      required: true,
      of: {
        type: "string",
      },
    },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: "data",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      rehypeCodeTitles,
      rehypePrism,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["anchor"],
          },
        },
      ],
    ],
  },
});
