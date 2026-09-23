"use client";

import { useState } from "react";
import styles from "./Routines.module.css";

export function RoutineThumbnail({ src, name }: { src: string; name: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <span className={styles.imageFallback}>Vogue Beauty Secrets<br />{name}</span>;
  // Keep publisher-provided YouTube thumbnails on their original host, not in Next's image cache.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={`${name} in Vogue’s Beauty Secrets video`} width={480} height={360} loading="lazy" referrerPolicy="no-referrer" onError={() => setFailed(true)} />;
}

export function RoutineVideo({ videoId, thumbnail, name }: { videoId: string; thumbnail: string; name: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <figure className={styles.video}>
      <div className={styles.player}>
        {loaded ? <iframe src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`} title={`${name} · Vogue Beauty Secrets`} allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /> :
          <button type="button" className={styles.loadVideo} onClick={() => setLoaded(true)} aria-label={`Load ${name}’s original Vogue video`}>
            <RoutineThumbnail src={thumbnail} name={name} />
            <span className={styles.playLabel}><span aria-hidden="true">▶</span> Load original video</span>
          </button>}
      </div>
      <figcaption>
        <span>Video & preview: Vogue / YouTube. {loaded ? "Player unavailable?" : "The YouTube player loads only when you choose."} <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a></span>
        <span className={styles.privacyNote}>Preview images come from YouTube. Loading the player connects to YouTube’s privacy-enhanced service; its own privacy terms apply. {loaded && <button type="button" onClick={() => setLoaded(false)}>Close player</button>}</span>
      </figcaption>
    </figure>
  );
}
