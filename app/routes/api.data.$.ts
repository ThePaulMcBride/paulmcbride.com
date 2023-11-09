import fs from "fs/promises";
import { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ params }) => {
	const filePath = params["*"];

	const file = await fs.readFile(`./data/${filePath}`).catch(() => {
		throw new Response(null, { status: 404 });
	});

	return new Response(file.toString(), {
		headers: {
			"Content-Type": "text/plain",
			"Cache-Control":
				"stale-while-revalidate=86400, stale-if-error=604800, s-maxage=604800",
		},
	});
};
