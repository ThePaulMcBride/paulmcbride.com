import { MetaFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import PostLayout from "~/components/PostLayout";

export const meta: MetaFunction = ({ data, matches }: any) => {
	const post = data.post;
	const title = `${post.attributes.title} – Paul McBride`;
	const description = post.attributes.description || matches[0].description;
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
	const post = await fetch(
		`${process.env.SITE_URL}/api/data/posts/${fileName}`
	).then((res) => res.json());

	return json({ post });
};

export default function PostPage() {
	const { post } = useLoaderData<typeof loader>();
	return <PostLayout post={post.attributes}>{post.html}</PostLayout>;
}
