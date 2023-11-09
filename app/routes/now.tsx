export default function NowPage() {
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
				{/* {posts.map((post: NowPost) => (
					<NowPostComponent key={post._id} post={post} />
				))} */}
			</div>
		</div>
	);
}
