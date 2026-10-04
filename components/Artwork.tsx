import Image from "next/image";

const ART = {
  "home-hero": { src: "/art/home-hero.jpg", width: 1536, height: 1024 },
  "home-us": { src: "/art/home-us.jpg", width: 1024, height: 1024 },
  "explore-learn": { src: "/art/explore-learn.jpg", width: 1024, height: 1024 },
  "explore-decode": { src: "/art/explore-decode.jpg", width: 1024, height: 1024 },
  "explore-weigh": { src: "/art/explore-weigh.jpg", width: 1024, height: 1024 },
  "explore-lookback": { src: "/art/explore-lookback.jpg", width: 1024, height: 1024 },
  "desk-guides": { src: "/art/desk-guides.jpg", width: 1536, height: 1024 },
  "desk-ingredients": { src: "/art/desk-ingredients.jpg", width: 1536, height: 1024 },
  "desk-trends": { src: "/art/desk-trends.jpg", width: 1536, height: 1024 },
  "desk-culture": { src: "/art/desk-culture.jpg", width: 1536, height: 1024 },
  "desk-procedures": { src: "/art/desk-procedures.jpg", width: 1536, height: 1024 },
  "desk-us": { src: "/art/desk-us.jpg", width: 1536, height: 1024 },
} as const;

export type ArtworkName = keyof typeof ART;

/**
 * Editorial illustration. Decorative by default (alt=""), so screen readers skip it;
 * pass `alt` when the picture carries information the text does not.
 */
export function Artwork({
  name,
  alt = "",
  className = "",
  priority = false,
}: {
  name: ArtworkName;
  alt?: string;
  className?: string;
  priority?: boolean;
}) {
  const art = ART[name];
  const sizes = name.startsWith("explore-")
    ? "(max-width: 900px) 44vw, 21vw"
    : "(max-width: 640px) calc(100vw - 2.5rem), (max-width: 900px) 42vw, 36vw";
  return (
    <figure className={`site-art ${className}`.trim()}>
      <Image
        src={art.src}
        alt={alt}
        width={art.width}
        height={art.height}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
      />
    </figure>
  );
}
