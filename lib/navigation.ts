export type NavLink = {
  href: string;
  text: string;
};

export const primaryNavLinks: NavLink[] = [
  { href: "/", text: "Home" },
  { href: "/posts", text: "Posts" },
  { href: "/notes", text: "Notes" },
  { href: "/now", text: "Now" },
  {
    href: "https://egghead.io/q/resources-by-paul-mcbride?af=auhexg",
    text: "Lessons",
  },
];

export function isActiveNavLink(currentPath: string, href: string) {
  if (!href.startsWith("/")) return false;
  if (href === "/") return currentPath === href;

  return currentPath === href || currentPath.startsWith(`${href}/`);
}
