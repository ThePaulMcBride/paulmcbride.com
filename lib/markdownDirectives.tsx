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
