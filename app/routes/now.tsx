import { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { th } from "date-fns/locale";
import { NowPost } from "~/components/NowPost";
import { listFiles, readFiles } from "~/services/file";
import { parseBody, parseFrontmatter } from "~/services/markdown";

export const meta: MetaFunction = () => {
	return [
		{ title: "Now – Paul McBride" },
		{
			name: "description",
			content:
				"A chronological list of things I've been doing. It will mostly be a monthly summary of how my work and life changes.",
		},
	];
};

export async function loader() {
	const files = await listFiles("now");
	const filePaths = files.map((file) => file.path);
	const fileContents = await readFiles(filePaths);
	const postPromises = fileContents.map(async (file) => {
		const { attributes, body } = parseFrontmatter(file);
		if (!attributes) throw new Error("No attributes found");
		return {
			_id: crypto.randomUUID(),
			...attributes,
			content: await parseBody(body),
		};
	});

	const unsortedPosts = await Promise.all(postPromises);
	const posts = unsortedPosts.sort((a: any, b: any) => {
		const aDate = new Date(a.date);
		const bDate = new Date(b.date);
		return bDate.getTime() - aDate.getTime();
	});
	return { posts };
}

export default function NowPage() {
	const { posts } = useLoaderData<typeof loader>();
	return (
		<div className="max-w-none md:max-w-content mx-auto w-full">
			<h1 className="font-bold text-3xl md:text-5xl tracking-tight text-gray-900 font-serif mb-8">
				Now
			</h1>
			<p className="text-gray-600 mb-16 font-body text-xl leading-relaxed md:text-2xl md:leading-relaxed">
				This is a chronological list of things I&apos;ve been doing. It will
				mostly be a monthly summary of how my work and life changes. It&apos;s
				inspired by Maggie Appleton&apos;s{" "}
				<a
					href="https://maggieappleton.com/now"
					target="_blank"
					rel="noopener noreferrer"
					className="text-emerald-500 hover:text-emerald-600"
				>
					Now page
				</a>
				.
			</p>
			<div className="w-full prose prose-lg md:prose-xl max-w-none mb-16 font-body">
				{posts.map((post) => (
					<NowPost key={post._id} post={post} />
				))}
			</div>
		</div>
	);
}
