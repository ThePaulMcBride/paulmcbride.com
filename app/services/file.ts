import fs from "fs/promises";

export async function getFile(filePath: string) {
	const file = await fs.readFile(`./data/${filePath}`);
	return file.toString();
}

export async function listFiles(filePath: string) {
	const paths = await fs.readdir(`./data/${filePath}`);
	const files = paths.map((file) => {
		return {
			name: file,
			path: `${filePath}${file}`,
		};
	});

	return files;
}
