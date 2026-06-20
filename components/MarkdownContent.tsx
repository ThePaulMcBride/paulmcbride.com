export default function MarkdownContent({ content }: { content: string }) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
