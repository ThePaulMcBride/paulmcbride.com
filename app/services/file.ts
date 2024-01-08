import fs from "fs/promises";

export async function readFile(filePath: string) {
	const file = await fs.readFile(`./data/${filePath}`);
	return file.toString();
}

export async function readFiles(filePaths: string[]) {
	const files = await Promise.all(
		filePaths.map(async (filePath) => {
			const file = await fs.readFile(`./data/${filePath}`);
			return {
				path: filePath,
				file: file.toString(),
			};
		})
	);

	return files;
}

export async function listFiles(filePath: string) {
	const paths = await fs.readdir(`./data/${filePath}`);
	const files = paths.map((file) => {
		return {
			name: file,
			path: `${filePath}/${file}`,
		};
	});

	return files;
}
