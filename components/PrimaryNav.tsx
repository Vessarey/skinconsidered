"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav } from "@/content/site";

const sectionAliases: Record<string, string[]> = {
  "/today": ["/dispatches"],
};

export function PrimaryNav() {
  const pathname = usePathname();

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
        Search <span aria-hidden="true">↗</span>
      </Link>
    </>
  );

  return (
    <>
      <nav className="desktop-nav" aria-label="Primary navigation">{links()}</nav>
      <details className="mobile-nav">
        <summary>Explore Skin Considered <span aria-hidden="true">+</span></summary>
        <nav aria-label="Mobile navigation">{links(true)}</nav>
      </details>
    </>
  );
}
