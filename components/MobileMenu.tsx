import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import useDelayedRender from "use-delayed-render";
import { useState, useEffect, useRef } from "react";
import styles from "styles/mobile-menu.module.css";
import { isActiveNavLink, primaryNavLinks } from "lib/navigation";

const MOBILE_NAV_ID = "mobile-navigation";

function isInternalLink(href: string) {
  return href.startsWith("/") || href.startsWith("#");
}

export default function MobileMenu() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const { mounted: isMenuMounted, rendered: isMenuRendered } = useDelayedRender(
    isMenuOpen,
    {
      enterDelay: 20,
      exitDelay: 300,
    }
  );

  function closeMenu({ returnFocus = false } = {}) {
    setIsMenuOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  }

  function toggleMenu() {
    setIsMenuOpen((open) => !open);
  }

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return function cleanup() {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;

    function handleMenuKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMenu({ returnFocus: true });
        return;
      }

      if (event.key !== "Tab") return;

      const button = buttonRef.current;
      const links = Array.from(
        navRef.current?.querySelectorAll<HTMLAnchorElement>("a[href]") || []
      );
      const focusableItems = button ? [button, ...links] : links;
      if (!focusableItems.length) return;

      const firstItem = focusableItems[0];
      const lastItem = focusableItems[focusableItems.length - 1];

      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    }

    document.addEventListener("keydown", handleMenuKeyDown);
    return () => document.removeEventListener("keydown", handleMenuKeyDown);
  }, [isMenuOpen]);

  return (
    <>
      <button
        ref={buttonRef}
        className={cn(styles.burger, "visible md:hidden")}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-controls={MOBILE_NAV_ID}
        aria-expanded={isMenuOpen}
        type="button"
        onClick={toggleMenu}
      >
        <MenuIcon data-hide={isMenuOpen} aria-hidden="true" focusable="false" />
        <CrossIcon
          data-hide={!isMenuOpen}
          aria-hidden="true"
          focusable="false"
        />
      </button>
      {isMenuMounted && (
        <div className="bg-white px-8 fixed inset-0 z-10">
          <nav
            ref={navRef}
            id={MOBILE_NAV_ID}
            aria-label="Mobile navigation"
          >
            <ul
              className={cn(
                styles.menu,
                "flex flex-col z-10 bg-white relative top-[5rem]",
                isMenuRendered && styles.menuRendered
              )}
            >
              {primaryNavLinks.map((link, index) => (
                <li
                  key={link.href}
                  className="border-b border-gray-300 text-gray-900 text-sm font-semibold"
                  style={{ transitionDelay: `${150 + index * 25}ms` }}
                >
                  {isInternalLink(link.href) ? (
                    <Link
                      href={link.href}
                      aria-current={
                        isActiveNavLink(router.asPath, link.href)
                          ? "page"
                          : undefined
                      }
                      className="flex w-auto pb-4"
                      onClick={() => closeMenu()}
                    >
                      {link.text}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="flex w-auto pb-4"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => closeMenu()}
                    >
                      {link.text}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
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
