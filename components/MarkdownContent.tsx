import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { dataAssetUrl } from "lib/dataApi";

const components = {
  a: ({ href, children, ...props }: any) => {
    const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));

    if (isInternalLink) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }

    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  },
  img: (props: any) => (
    <img
      src={dataAssetUrl(props.src)}
      alt={props.alt || ""}
      className="rounded-lg"
    />
  ),
  blockquote: ({ children }: any) => (
    <blockquote className="border-l-4 border-gray-200 pl-4 mb-4 [&_p]:mb-0">
      {children}
    </blockquote>
  ),
};

export default function MarkdownContent({ content }: { content: string }) {
  return (
    <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
      {content}
    </ReactMarkdown>
  );
}
