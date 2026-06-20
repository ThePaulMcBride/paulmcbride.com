import rehypePrism from "rehype-prism-plus/common";
import rehypeStringify from "rehype-stringify";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import { dataAssetUrl } from "lib/dataApi";
import { remarkCustomDirectives } from "lib/markdownDirectives";

type ElementNode = {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: ElementNode[];
  value?: string;
};

type RenderMarkdownOptions = {
  linkHashtags?: boolean;
  absolutizeInternalLinks?: boolean;
  renderYouTubeAsLink?: boolean;
};

function linkHashtags(content: string) {
  return content.replace(
    /(^|\s)#([\p{L}\p{N}_]+)/gu,
    (_match, prefix, tag) =>
      `${prefix}[#${tag}](https://indieweb.social/tags/${encodeURIComponent(tag)})`
  );
}

function absoluteUrl(url: string) {
  if (!url.startsWith("/")) return url;

  return `https://paulmcbride.com${url}`;
}

function htmlAttributes(properties: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(properties).map(([key, value]) => [
      key === "className" ? "class" : key,
      value,
    ])
  );
}

function rehypeSiteLinks(options: RenderMarkdownOptions) {
  return (tree: ElementNode) => {
    visit(tree as any, "element", (node: ElementNode) => {
      if (node.tagName === "a") {
        const href = node.properties?.href;
        if (typeof href !== "string") return;

        node.properties = {
          ...node.properties,
          href: options.absolutizeInternalLinks ? absoluteUrl(href) : href,
        };

        if (!href.startsWith("/") && !href.startsWith("#")) {
          node.properties.target = "_blank";
          node.properties.rel = "noopener noreferrer";
        }
      }

      if (node.tagName === "img") {
        const src = node.properties?.src;
        if (typeof src !== "string") return;

        node.properties = {
          ...node.properties,
          src: dataAssetUrl(src),
          alt: typeof node.properties?.alt === "string" ? node.properties.alt : "",
          className: "rounded-lg",
        };
      }
    });
  };
}

function rehypeYouTube(options: RenderMarkdownOptions) {
  return (tree: ElementNode) => {
    visit(tree as any, "element", (node: ElementNode) => {
      if (node.tagName !== "youtube-embed") return;

      const properties = node.properties || {};
      const id = String(properties.videoid || properties.videoId || "");
      const title = String(properties.title || "YouTube video");

      if (!id) {
        node.tagName = "div";
        node.children = [];
        return;
      }

      if (options.renderYouTubeAsLink) {
        node.tagName = "p";
        node.properties = {};
        node.children = [
          {
            type: "element",
            tagName: "a",
            properties: { href: `https://www.youtube.com/watch?v=${id}` },
            children: [{ type: "text", value: `Watch: ${title}` }],
          },
        ];
        return;
      }

      node.tagName = "div";
      node.properties = htmlAttributes({
        className: "relative my-8 aspect-[16/9] overflow-hidden rounded-md",
      });
      node.children = [
        {
          type: "element",
          tagName: "iframe",
          properties: htmlAttributes({
            className: "absolute inset-0 z-0 h-full w-full",
            src: `https://www.youtube.com/embed/${id}`,
            title,
            width: "100%",
            height: "100%",
            frameBorder: "0",
            allow:
              "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
            allowFullScreen: true,
          }),
          children: [],
        },
      ];
    });
  };
}

export async function renderMarkdownHtml(
  markdown: string,
  options: RenderMarkdownOptions = {}
) {
  const content = options.linkHashtags ? linkHashtags(markdown) : markdown;
  const result = await unified()
    .use(remarkParse as any)
    .use(remarkGfm as any)
    .use(remarkDirective as any)
    .use(remarkCustomDirectives as any)
    .use(remarkRehype as any)
    .use(rehypePrism as any)
    .use(rehypeSiteLinks as any, options)
    .use(rehypeYouTube as any, options)
    .use(rehypeStringify as any)
    .process(content);

  return String(result);
}
