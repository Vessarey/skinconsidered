import Link from "next/link";
import { LAST_REVIEWED } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <Link className="footer-wordmark" href="/">
          skin considered<span aria-hidden="true">*</span>
        </Link>
        <p>Independent skincare reporting and education. Not medical advice.</p>
      </div>
      <div className="footer-links">
        <Link href="/about">About</Link>
        <Link href="/methodology">Methodology</Link>
        <Link href="/corrections">Corrections</Link>
        <Link href="/rss.xml">RSS</Link>
        <Link href="/privacy">Privacy</Link>
      </div>
      <div className="footer-meta">
        <span>Sources last reviewed {LAST_REVIEWED}</span>
        <span>© 2026 Skin Considered</span>
      </div>
    </footer>
  );
}
