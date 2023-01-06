import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import cn from "classnames";
import { RSS } from "components/Footer";

import Footer from "components/Footer";
import MobileMenu from "components/MobileMenu";

function NavItem({ href, text }: { href: string; text: string }) {
  const router = useRouter();
  const isActive = router.asPath === href;

  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));

  if (!isInternalLink) {
    return (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={href}
        className="font-normal text-gray-600 hover:font-bold hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg transition-all"
      >
        <span className="capsize">{text}</span>
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        isActive ? "font-bold text-gray-800 " : "font-normal text-gray-600",
        "hidden md:inline-block p-1 sm:px-3 sm:py-2 rounded-lg hover:font-bold transition-all"
      )}
    >
      <span className="capsize">{text}</span>
    </Link>
  );
}

export default function Container(props: any) {
  const [mounted, setMounted] = useState(false);

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  const { children, ...customMeta } = props;
  const router = useRouter();
  const meta = {
    title: "Paul McBride – Developer, nerd, tech enthusiast.",
    description: `Hey, I'm Paul McBride. I make things with code and help others do the same!`,
    image: "https://paulmcbride.com/static/banner.jpeg",
    type: "website",
    ...customMeta,
  };

  return (
    <div className="bg-white">
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`https://paulmcbride.com${router.asPath}`}
        />
        <link
          rel="canonical"
          href={`https://paulmcbride.com${router.asPath}`}
        />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Paul McBride" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@ThePaulMcBride" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        <meta name="summary_large_image" content={meta.image} />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>
      <div
        className={cn("flex flex-col justify-center px-8", props.navClassName)}
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
            <NavItem href="/" text="Home" />
            <NavItem href="/posts" text="Posts" />
            <NavItem href="/now" text="Now" />
            <NavItem
              href="https://egghead.io/q/resources-by-paul-mcbride?af=auhexg"
              text="Lessons"
            />
          </div>
          <span className="w-9 h-9 bg-white/50 rounded-lg flex items-center justify-center  hover:ring-2 ring-gray-200  transition-all">
            <RSS />
          </span>
        </nav>
      </div>
      <main id="skip" className="flex flex-col justify-center">
        {children}
      </main>
      <Footer />
    </div>
  );
}
