import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="not-found">
      <span>404 / no file on record</span>
      <h1>This claim wandered off without its source.<sup>*</sup></h1>
      <p>Try the archive search or return to today’s verified dispatches.</p>
      <div><Link href="/search">Search the archive</Link><Link href="/today">Open today</Link></div>
    </main>
  );
}
