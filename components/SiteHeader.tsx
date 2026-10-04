import Link from "next/link";
import { PrimaryNav } from "./PrimaryNav";

export function SiteHeader() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <Link className="wordmark" href="/" prefetch={false} aria-label="Skin Considered home">
          <span>skin</span>
          <strong>considered</strong>
          <i aria-hidden="true">*</i>
        </Link>
        <div className="header-side">
          <PrimaryNav />
        </div>
      </header>
    </>
  );
}
