import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "@remix-run/react";
import faviconUrl from "../public/static/favicons/favicon.ico";
import { LinksFunction, MetaFunction } from "@remix-run/node";
import cn from "classnames";
import styles from "~/tailwind.css";
import globalStyles from "~/global.css";
import Footer, { RSS } from "~/components/Footer";
import { NavItem } from "~/components/NavItem";
import MobileMenu from "~/components/MobileMenu";
import hightlightStyles from "highlight.js/styles/github.css";

export const links: LinksFunction = () => {
	return [
		{ rel: "icon", href: faviconUrl },
		{ rel: "stylesheet", href: styles },
		{ rel: "stylesheet", href: globalStyles },
		{ rel: "stylesheet", href: hightlightStyles },
	];
};

export const meta: MetaFunction = () => {
	return [
		{
			title: "Paul McBride - Developer, nerd, tech enthusiast.",
		},
		{
			name: "description",
			content:
				"Hey, I'm Paul McBride. I make things with code and help others do the same!",
		},
		{
			name: "viewport",
			content: "width=device-width,initial-scale=1,viewport-fit=cover",
		},
	];
};

export default function App() {
	return (
		<html>
			<head>
				<link rel="icon" href="data:image/x-icon;base64,AA" />
				<Meta />
				<Links />
			</head>
			<body className="bg-white text-gray-900 text-jumbo">
				<div>
					<div
						className={cn(
							"flex flex-col justify-center px-8"
							// props.navClassName
						)}
					>
						<nav
							className={cn(
								"flex items-center justify-between w-full relative mx-auto pt-8 pb-8 sm:pb-16 text-gray-900"
							)}
						>
							<a href="#skip" className="skip-nav">
								Skip to content
							</a>
							<div className="ml-[-0.60rem] text-base">
								<MobileMenu />
								<NavItem href="/">Home</NavItem>
								<NavItem href="/posts">Posts</NavItem>
								<NavItem href="/now">Now</NavItem>
								<NavItem href="https://egghead.io/q/resources-by-paul-mcbride?af=auhexg">
									Lessons
								</NavItem>
							</div>
							<span className="w-9 h-9 bg-white/50 rounded-lg flex items-center justify-center  hover:ring-2 ring-gray-200  transition-all">
								<RSS />
							</span>
						</nav>
					</div>
					<main id="skip" className="flex flex-col justify-center">
						<Outlet />
					</main>
					<Footer />
				</div>
				<Scripts />
				<ScrollRestoration />
			</body>
		</html>
	);
}
