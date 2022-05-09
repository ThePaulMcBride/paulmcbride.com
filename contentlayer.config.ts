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
import { remark } from "remark";
import strip from "remark-mdx-to-plain-text";

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
  teaser: {
    type: "string",
    resolve: async (doc: any) => {
      const length = 260;

      const res = await remark().use(strip).process(doc.body.raw);
      let contentText = (res.value as string)
        .trim()
        .replace(/\s+/g, " ")
        .trim();

      const excerpt = contentText.slice(0, length);

      if (contentText.length > length) {
        return excerpt.trim() + "…";
      }

      return excerpt;
    },
  },
};

export const HomePage = defineDocumentType(() => ({
  name: "HomePage",
  filePathPattern: `homepage/about.mdx`,
  contentType: "mdx",
  isSingleton: true,
  fields: [],
}));

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/*.mdx`,
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
  documentTypes: [Post, HomePage],
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
