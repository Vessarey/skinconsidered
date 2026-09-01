"use client";

import { useEffect, useRef } from "react";

/** Writes the progress transform directly, so scrolling never re-renders React. */
export function ReadingProgress() {
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max <= 0 ? 0 : Math.min(1, window.scrollY / max);
      if (bar.current) bar.current.style.transform = `scaleX(${progress})`;
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="reading-progress" aria-hidden="true">
      <span ref={bar} />
    </div>
  );
}
