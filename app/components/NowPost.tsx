export function NowPost({ post }: { post: any }) {
	return (
		<section className="md:pl-16 md:border-l md:border-dashed border-gray-300 mb-16">
			<h2 className="font-bold text-2xl md:text-3xl tracking-tight text-gray-900 font-serif mb-4">
				{post.title}
			</h2>
			<div dangerouslySetInnerHTML={{ __html: post.content }} />
		</section>
	);
}
