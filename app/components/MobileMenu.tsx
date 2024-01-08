import cn from "classnames";
import { useState, useEffect } from "react";
import styles from "~/mobile-menu.module.css";
import { Link } from "@remix-run/react";

export default function MobileMenu() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	function toggleMenu() {
		if (isMenuOpen) {
			setIsMenuOpen(false);
			document.body.style.overflow = "";
		} else {
			setIsMenuOpen(true);
			document.body.style.overflow = "hidden";
		}
	}

	useEffect(() => {
		return function cleanup() {
			document.body.style.overflow = "";
		};
	}, []);

	return (
		<>
			<button
				className={cn(styles.burger, "visible md:hidden")}
				aria-label="Toggle menu"
				type="button"
				onClick={toggleMenu}
			>
				<MenuIcon data-hide={isMenuOpen} />
				<CrossIcon data-hide={!isMenuOpen} />
			</button>
			{isMenuOpen && (
				<div className="bg-white px-8 fixed inset-0 z-10">
					<ul
						className={cn(
							styles.menu,
							"flex flex-col z-10 bg-white relative top-[5rem]",
							isMenuOpen && styles.menuRendered
						)}
					>
						<li
							className="border-b border-gray-300 text-gray-900 text-sm font-semibold"
							style={{ transitionDelay: "150ms" }}
						>
							<Link to="/" className="flex w-auto pb-4">
								Home
							</Link>
						</li>
						<li
							className="border-b border-gray-300 text-gray-900 text-sm font-semibold"
							style={{ transitionDelay: "175ms" }}
						>
							<Link to="/posts" className="flex w-auto pb-4">
								Posts
							</Link>
						</li>
						<li
							className="border-b border-gray-300 text-gray-900 text-sm font-semibold"
							style={{ transitionDelay: "200ms" }}
						>
							<Link to="/now" className="flex w-auto pb-4">
								Now
							</Link>
						</li>
						<li
							className="border-b border-gray-300 text-gray-900 text-sm font-semibold"
							style={{ transitionDelay: "225ms" }}
						>
							<a
								href="https://egghead.io/q/resources-by-paul-mcbride?af=auhexg"
								className="flex w-auto pb-4"
								target="_blank"
								rel="noopener noreferrer"
							>
								Lessons
							</a>
						</li>
					</ul>
				</div>
			)}
		</>
	);
}

function MenuIcon(props: JSX.IntrinsicElements["svg"]) {
	return (
		<svg
			className="h-5 w-5 absolute text-gray-900 z-20"
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			{...props}
		>
			<path
				d="M2.5 7.5H17.5"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M2.5 12.5H17.5"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function CrossIcon(props: JSX.IntrinsicElements["svg"]) {
	return (
		<svg
			className="h-5 w-5 absolute text-gray-900 z-20"
			viewBox="0 0 24 24"
			width="24"
			height="24"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
			fill="none"
			shapeRendering="geometricPrecision"
			{...props}
		>
			<path d="M18 6L6 18" />
			<path d="M6 6l12 12" />
		</svg>
	);
}
