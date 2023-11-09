import { Link } from "@remix-run/react";
import Subscribe from "~/components/Subscribe";

export default function HomePage() {
	return (
		<>
			<div className="grid grid-cols-main [&>*]:col-start-2 [&>*]:col-end-3 border-gray-200 mx-auto pb-16 px-8 w-full">
				<div className="flex flex-col-reverse sm:flex-row items-start">
					<div className="flex flex-col pr-8 md:max-w-[80%]">
						<h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-1 text-gray-900 font-serif">
							Paul McBride
						</h1>
						<h2 className="text-gray-700 mb-4 text-xl md:text-2xl md:leading-relaxed">
							Senior JavaScript Developer
						</h2>
						<p className="text-gray-600 mb-16 font-body text-xl leading-relaxed md:text-2xl md:leading-relaxed">
							Hey, I&apos;m Paul. I&apos;m a software developer and instructor
							who loves using code to solve problems and bring ideas to life!
						</p>
					</div>
					<div className="w-[80px] sm:w-[176px] relative mb-8 sm:mb-0 mr-auto">
						<img
							alt="Paul McBride"
							height={176}
							width={176}
							src="/avatar.jpeg"
							className="rounded-full"
						/>
					</div>
				</div>
				<h3 className="font-bold text-2xl md:text-4xl tracking-tight text-gray-900 font-serif mb-2">
					About
				</h3>
				<div className="w-full prose prose-base md:prose-xl max-w-none mb-16 font-body">
					{/* <Component components={components} /> */}
				</div>
				<h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-8 text-gray-900 font-serif">
					Featured Posts
				</h3>
				<div className="flex flex-col">
					{/* {posts.map((post: any) => (
					<BlogPost
						key={post.slug}
						title={post.title}
						slug={post.slug}
						description={post.description}
						readingTime={post.readingTime}
						teaser={post.teaser}
					/>
				))} */}
				</div>
				<Link
					to="/posts"
					className="flex my-8 text-emerald-500 leading-7 rounded-lg hover:text-emerald-700 transition-all h-6 items-center"
				>
					Read all posts
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						className="h-6 w-6 ml-1"
					>
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M17.5 12h-15m11.667-4l3.333 4-3.333-4zm3.333 4l-3.333 4 3.333-4z"
						/>
					</svg>
				</Link>

				<Subscribe />
			</div>
		</>
	);
}
