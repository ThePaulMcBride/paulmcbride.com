import parseFrontMatter from "front-matter";
import hljs from "highlight.js";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";

export function parseFrontmatter(input: string) {
	return parseFrontMatter(input);
}

export async function parseBody(input: string) {
	const marked = new Marked();
	marked.use(
		markedHighlight({
			langPrefix: "hljs language-",
			highlight(code, lang) {
				const language = hljs.getLanguage(lang) ? lang : "plaintext";
				return hljs.highlight(code, { language }).value;
			},
		})
	);

	return marked.parse(input);
}
