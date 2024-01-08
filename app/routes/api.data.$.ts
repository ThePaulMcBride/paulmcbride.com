import fs from "fs/promises";
import { LoaderFunction, json } from "@remix-run/node";
import { parseBody, parseFrontmatter } from "~/services/markdown";

export const loader: LoaderFunction = async ({ params }) => {
	const filePath = params["*"];

	if (!filePath) {
		throw new Response(null, { status: 404 });
	}

	if (filePath.includes("..")) {
		throw new Response(null, { status: 403 });
	}

	const isDirectory = filePath.endsWith("/");

	if (isDirectory) {
		const paths = await fs.readdir(`./data/${filePath}`).catch(() => {
			throw new Response(null, { status: 404 });
		});

		const files = paths.map((file) => {
			return {
				name: file,
				path: `${filePath}${file}`,
			};
		});

		return json(
			{ files },
			{
				headers: {
					"Cache-Control":
						"stale-while-revalidate=86400, stale-if-error=604800, s-maxage=604800",
				},
			}
		);
	}

	const file = await fs.readFile(`./data/${filePath}`).catch(() => {
		throw new Response(null, { status: 404 });
	});

	const { attributes, body } = parseFrontmatter(file.toString());
	const html = await parseBody(body);

	return json(
		{ attributes, html },
		{
			headers: {
				"Cache-Control":
					"stale-while-revalidate=86400, stale-if-error=604800, s-maxage=604800",
			},
		}
	);
};
