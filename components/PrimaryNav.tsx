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
          mobileMenu.current.open = false;
          mobileMenu.current.querySelector("summary")?.focus();
        }
      }}>
        <summary>Menu <span aria-hidden="true">+</span></summary>
        <nav aria-label="Mobile navigation" onClick={(event) => {
          if ((event.target as HTMLElement).closest("a") && mobileMenu.current) mobileMenu.current.open = false;
        }}>{links(true)}</nav>
      </details>
    </>
  );
}
