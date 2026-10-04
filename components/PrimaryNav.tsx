"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { primaryNav } from "@/content/site";

const sectionAliases: Record<string, string[]> = {
  "/today": ["/dispatches"],
};

export function PrimaryNav() {
  const pathname = usePathname();
  const mobileMenu = useRef<HTMLDetailsElement>(null);

  const closeMobileMenu = () => {
    const menu = mobileMenu.current;
    if (!menu) return;
    const focusWasInside = menu.contains(document.activeElement);
    menu.open = false;
    if (focusWasInside) menu.querySelector("summary")?.focus();
  };

  const isCurrent = (href: string) =>
    pathname === href ||
    pathname.startsWith(`${href}/`) ||
    (sectionAliases[href] ?? []).some((alias) => pathname.startsWith(alias));

  const links = (mobile = false) => (
    <>
      {primaryNav.map((item) => (
        <Link href={item.href} key={`${mobile ? "mobile" : "desktop"}-${item.href}`} aria-current={isCurrent(item.href) ? "page" : undefined}>
          {item.label}
        </Link>
      ))}
      <Link className="search-link" href="/search" aria-current={pathname === "/search" ? "page" : undefined}>
        Search
      </Link>
    </>
  );

  return (
    <>
      <nav className="desktop-nav" aria-label="Primary navigation">{links()}</nav>
      <Link className="header-newsletter" href="/newsletter" aria-current={isCurrent("/newsletter") ? "page" : undefined}>Newsletter <span aria-hidden="true">↗</span></Link>
      <details className="mobile-nav" key={pathname} ref={mobileMenu} onKeyDown={(event) => {
        if (event.key === "Escape" && mobileMenu.current?.open) {
          closeMobileMenu();
        }
      }}>
        <summary>Menu <span aria-hidden="true">+</span></summary>
        <nav aria-label="Mobile navigation" onClick={(event) => {
          // Modified clicks keep the current page and its menu available.
          if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          if ((event.target as HTMLElement).closest("a")) closeMobileMenu();
        }}>{links(true)}</nav>
      </details>
    </>
  );
}
