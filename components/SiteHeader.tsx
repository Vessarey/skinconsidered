import Link from "next/link";
import { EDITION } from "@/content/site";
import { formatEditionDate } from "@/lib/content";
import { PrimaryNav } from "./PrimaryNav";

export function SiteHeader() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="utility-bar">
        <span>
          Edition <time dateTime={EDITION.date}>{formatEditionDate(EDITION.date)}</time>
        </span>
        <span>considered before published · independent · source-linked</span>
        <span>
          Vol.{EDITION.volume} / No.{EDITION.number}
        </span>
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
          <PrimaryNav />
        </div>
      </header>
    </>
  );
}
