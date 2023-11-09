import fs from "fs/promises";
import { parseBody, parseFrontmatter } from "~/services/markdown";

export async function getPostList() {
	const filesPaths = await fs.readdir("./data/posts");
	const files = await Promise.all(
		filesPaths.map(async (fileName) => {
			const file = await fs.readFile(`./data/posts/${fileName}`);
			const { attributes, body } = parseFrontmatter(file.toString());
			if (!attributes) {
				throw new Error("Post must have attributes");
			}
			return {
				fileName,
				...attributes,
				slug: `/posts/${fileName.replace(".mdx", "")}`,
			};
		})
	);

	const sortedFiles = files.sort((a: any, b: any) => {
		if (a.date < b.date) {
			return 1;
		} else {
			return -1;
		}
	});

	return sortedFiles;
}

export async function getPost(fileName: string) {
	const file = await fs.readFile(`./data/posts/${fileName}`);
	const { attributes, body } = parseFrontmatter(file.toString());
	if (!attributes) {
		throw new Error("Post must have attributes");
	}
	const html = await parseBody(body);
	return {
		fileName,
		...attributes,
		html,
		slug: `/posts/${fileName.replace(".mdx", "")}`,
	};
}
