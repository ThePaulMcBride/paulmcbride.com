import type { Plugin } from "unified";

type DirectiveNode = {
  type: string;
  name?: string;
  attributes?: Record<string, string>;
  children?: DirectiveNode[];
  value?: string;
  data?: Record<string, unknown>;
};

function visit(node: DirectiveNode, callback: (node: DirectiveNode) => void) {
  callback(node);

  if (!node.children) return;

  node.children.forEach((child) => visit(child as DirectiveNode, callback));
}

function textContent(node: DirectiveNode): string {
  if (node.value) return node.value;
  if (!node.children) return "";

  return node.children.map(textContent).join("");
}

export const remarkCustomDirectives: Plugin = () => (tree) => {
  visit(tree as DirectiveNode, (node) => {
    if (
      node.type !== "leafDirective" ||
      node.name !== "youtube" ||
      !node.attributes?.id
    ) {
      return;
    }

    node.data = {
      hName: "youtube-embed",
      hProperties: {
        videoid: node.attributes.id,
        title: textContent(node) || "YouTube video",
      },
    };
  });
};

export function YouTubeEmbed({
  videoId,
  videoid,
  title,
}: {
  videoId?: string;
  videoid?: string;
  title?: string;
}) {
  const id = videoId || videoid;
  if (!id) return null;

  return (
    <div className="relative my-8 aspect-[16/9] overflow-hidden rounded-md">
      <iframe
        className="absolute inset-0 z-0 h-full w-full"
        src={`https://www.youtube.com/embed/${id}`}
        title={title || "YouTube video"}
        width="100%"
        height="100%"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export function YouTubeFeedEmbed({
  videoId,
  videoid,
  title,
}: {
  videoId?: string;
  videoid?: string;
  title?: string;
}) {
  const id = videoId || videoid;
  if (!id) return null;

  return (
    <p>
      <a href={`https://www.youtube.com/watch?v=${id}`}>
        Watch: {title || "YouTube video"}
      </a>
    </p>
  );
}
