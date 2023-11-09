import { NavLink } from "@remix-run/react";
import cn from "classnames";

export function NavItem({
	href,
	children,
}: {
	href: string;
	children: React.ReactNode;
}) {
	const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));

	if (!isInternalLink) {
		return (
			<a
				target="_blank"
				rel="noopener noreferrer"
				href={href}
				className="font-normal text-gray-600 hover:font-bold hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg transition-all"
			>
				<span className="capsize">{children}</span>
			</a>
		);
	}

	return (
		<NavLink
			to={href}
			className={({ isActive }) =>
				cn(
					isActive ? "font-bold text-gray-800 " : "font-normal text-gray-600",
					"hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:font-bold transition-all"
				)
			}
		>
			<span className="capsize">{children}</span>
		</NavLink>
	);
}
