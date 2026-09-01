import Link from "next/link";

const nav = [
  ["Today", "/today"],
  ["Guides", "/guides"],
  ["Ingredients", "/ingredients"],
  ["Procedures", "/procedures"],
  ["Culture", "/culture"],
];

export function SiteHeader() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="utility-bar">
        <span>MON 01 SEP 2026</span>
        <span>considered before published · independent · source-linked</span>
        <span>VOL.01 / NO.001</span>
      </div>
      <header className="site-header">
        <Link className="wordmark" href="/" aria-label="Skin Considered home">
          <span>skin</span>
          <strong>considered</strong>
          <i aria-hidden="true">*</i>
          <small>*every claim weighed before it&apos;s printed</small>
        </Link>
        <div className="header-side">
          <p>
            Skincare news, considered carefully.
            <br />
            Global reporting · practical education · no miracle language.
          </p>
          <nav aria-label="Primary navigation">
            {nav.map(([label, href]) => (
              <Link href={href} key={href}>
                {label}
              </Link>
            ))}
            <Link className="search-link" href="/search" aria-label="Search Skin Considered">
              Search <span aria-hidden="true">↗</span>
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}
