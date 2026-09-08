"use client";

import { useEffect, useRef } from "react";
import styles from "./error.module.css";

export default function ReaderError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    heading.current?.focus();
  }, [error]);

  return (
    <main id="main-content" className={styles.recovery} aria-labelledby="reader-error-title">
      <p className={styles.eyebrow}>A brief interruption</p>
      <h1 id="reader-error-title" ref={heading} tabIndex={-1}>This page couldn&apos;t load.</h1>
      <p>Try loading it again. If the problem continues, you can explore the latest stories or search for another topic.</p>
      <div className={styles.actions}>
        <button type="button" onClick={() => retry()}>Try again</button>
        {/* Full navigations let readers leave even if client-side routing failed. */}
        <a href="/today">Read the latest</a>
        <a href="/search">Search the site</a>
      </div>
    </main>
  );
}
