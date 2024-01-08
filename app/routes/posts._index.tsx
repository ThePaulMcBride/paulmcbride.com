import { LoaderFunctionArgs, MetaFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import BlogPost from "~/components/BlogPost";
import { getPostList } from "~/services/posts";

export const meta: MetaFunction = () => {
	return [
		{ title: "Posts – Paul McBride" },
		{
			name: "description",
			content:
				"Thoughts on the software industry, programming, tech, and my personal life.",
		},
	];
};

export async function loader() {
	const posts = await getPostList();

	return json({
		posts,
	});
}

export default function PostsPage() {
	const { posts } = useLoaderData<typeof loader>();

	return (
		<div className="grid grid-cols-main [&>*]:col-start-2 [&>*]:col-end-3 mx-auto mb-16 px-8">
			<h1 className="mb-8 text-3xl font-serif font-bold tracking-tight text-gray-800 md:text-5xl">
				Posts
			</h1>

			{!posts.length && <p className="mb-4 text-gray-600">No posts found.</p>}
			{posts.map((post: any) => (
				<BlogPost key={post.slug} {...post} />
			))}
		</div>
	);
}
