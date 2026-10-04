import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="not-found">
      <span>Page not found · 404</span>
      <h1>Let&apos;s find what you came for.</h1>
      <p>This page may have moved, or the address may contain a typo. Search for the topic or explore the latest stories.</p>
      <div><Link href="/search">Search Skin Considered</Link><Link href="/today">Read the latest</Link></div>
    </main>
  );
}
