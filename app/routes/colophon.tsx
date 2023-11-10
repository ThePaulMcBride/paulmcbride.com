import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getFile } from "~/services/file";
import { parseBody } from "~/services/markdown";

export const meta = () => [
	{
		title: "Colophon - Paul McBride",
	},
	{
		name: "description",
		content:
			"A page about the tools I use to make this site and the other sites that inspire me.",
	},
];

export async function loader() {
	const file = await getFile("colophon/content.mdx");
	const content = await parseBody(file);

	return json(
		{ content },
		{
			headers: {
				"Cache-Control":
					"public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
			},
		}
	);
}

export default function ColophonPage() {
	const { content } = useLoaderData<typeof loader>();

	return (
		<div className="max-w-none md:max-w-content mx-auto w-full">
			<h1 className="font-bold text-3xl md:text-5xl tracking-tight text-gray-900 font-serif mb-8">
				Colophon
			</h1>
			<p className="text-gray-600 mb-8 font-body text-xl leading-relaxed md:text-2xl md:leading-relaxed">
				This page includes a list of the tools and technologies I use to make
				this site. It&apos;s also where I&apos;ll list the sites that inspire
				me.
			</p>
			<div
				className="w-full prose prose-lg md:prose-xl max-w-none mb-16 font-body"
				dangerouslySetInnerHTML={{ __html: content }}
			></div>
		</div>
	);
}
