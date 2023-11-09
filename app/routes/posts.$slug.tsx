import { MetaFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import PostLayout from "~/components/PostLayout";
import { getPost } from "~/services/posts";

export const meta: MetaFunction = ({ data, matches }: any) => {
	const post = data.post;
	const title = `${post.title} – Paul McBride`;
	const description = post.description || matches[0].description;
	return [
		{
			title,
		},
		{
			name: "description",
			content: description,
		},
	];
};

export const loader = async ({ params }: { params: { slug: string } }) => {
	const fileName = `${params.slug}.mdx`;
	const post = await getPost(fileName);
	return json({ post });
};

export default function PostPage() {
	const { post } = useLoaderData<typeof loader>();
	return <PostLayout post={post}>{post.html}</PostLayout>;
}
