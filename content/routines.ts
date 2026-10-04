/** First-person media, not clinical evidence. Products and dates belong to the linked recording. */
export type RoutineProfile = {
  slug: string; name: string; angle: string; description: string; sourceDate: string;
  reviewed: string; videoId: string; thumbnail: string; sourceUrl: string;
  disclosure: string; takeaway: string;
  products: { name: string; role: string; note: string }[];
  related: { href: string; label: string }[];
  sources: { label: string; url: string }[];
};

export const routineEvidenceSource = "https://www.aad.org/public/everyday-care/skin-care-basics/care/skin-care-budget";

export const routines: RoutineProfile[] = [
  {
    slug: "hailey-bieber", name: "Hailey Bieber", angle: "The morning prep edit",
    description: "Rhode layers, a sunscreen step, and the difference between skin prep and a skincare essential.",
    sourceDate: "2025-07-30", reviewed: "2026-09-08", videoId: "9wdisivSWYU",
    thumbnail: "https://i.ytimg.com/vi/9wdisivSWYU/hqdefault.jpg",
    sourceUrl: "https://www.vogue.com/video/watch/beauty-secrets-hailey-bieber-2025",
    disclosure: "Bieber founded Rhode. This is a founder demonstrating her own brand, not an independent product comparison.",
    takeaway: "Separate the look from the essentials. A mist and a milky layer are not a required pair. A basic routine can center on gentle cleansing, moisturizer, and sun protection; extra layers should earn their place for you.",
    products: [
      { name: "Rhode Glazing Mist", role: "Face mist", note: "Shown before her milky skincare layer." },
      { name: "Rhode Glazing Milk", role: "Skin prep", note: "Part of her pre-makeup preparation." },
      { name: "Sunscreen — product not identified", role: "Sun protection", note: "She mentions sunscreen; the transcript does not identify the exact product." },
    ],
    related: [{ href: "/guides/routine-from-zero", label: "Build a routine around the basics" }, { href: "/ingredients/sunscreen", label: "What to look for in sunscreen" }],
    sources: [{ label: "Vogue · original video and transcript", url: "https://www.vogue.com/video/watch/beauty-secrets-hailey-bieber-2025" }, { label: "Vogue on YouTube · July 30, 2025", url: "https://www.youtube.com/watch?v=9wdisivSWYU" }],
  },
  {
    slug: "dua-lipa", name: "Dua Lipa", angle: "A founder’s layered routine",
    description: "A cleanser, vitamin C, and her own DUA skincare line—with the brand relationship in view.",
    sourceDate: "2025-11-04", reviewed: "2026-09-08", videoId: "SE0D5XZQ6wk",
    thumbnail: "https://i.ytimg.com/vi/SE0D5XZQ6wk/hqdefault.jpg",
    sourceUrl: "https://www.vogue.com/video/watch/beauty-secrets-dua-lipa",
    disclosure: "Lipa presents her DUA line, developed with Augustinus Bader. A founder’s explanation is useful context, not independent proof of performance.",
    takeaway: "Treat this as a menu, not a prescription. Multiple serums are not a baseline requirement, and using more products can increase irritation. Decide what you want a step to do before adding another one.",
    products: [
      { name: "DUA Balancing Cream Cleanser", role: "Cleanser", note: "One of the products from her own line." },
      { name: "iS Clinical Pro-Heal Serum", role: "Vitamin C step", note: "Named in the recording as her vitamin C serum." },
      { name: "DUA Supercharged Glow Complex", role: "Serum", note: "A separate layer in her demonstration." },
      { name: "DUA Renewal Cream", role: "Moisturizer", note: "Her cream step before makeup." },
    ],
    related: [{ href: "/ingredients/vitamin-c", label: "Vitamin C: what the evidence supports" }, { href: "/guides/routine-from-zero", label: "What a basic routine actually needs" }],
    sources: [{ label: "Vogue · original video and transcript", url: "https://www.vogue.com/video/watch/beauty-secrets-dua-lipa" }, { label: "Vogue on YouTube · November 4, 2025", url: "https://www.youtube.com/watch?v=SE0D5XZQ6wk" }],
  },
  {
    slug: "issa-rae", name: "Issa Rae", angle: "The dry-skin conversation",
    description: "A familiar cleanser, petrolatum for lips, and sunscreen alongside a more elaborate routine.",
    sourceDate: "2023-07-21", reviewed: "2026-09-08", videoId: "e3pw82z0RMQ",
    thumbnail: "https://i.ytimg.com/vi/e3pw82z0RMQ/hqdefault.jpg",
    sourceUrl: "https://www.vogue.com/article/beauty-secrets-issa-rae",
    disclosure: "The full video includes Sienna Naturals, a brand Rae co-owns. Vogue’s accompanying article contains affiliate shopping links. These are selected skincare steps, not every product in the video.",
    takeaway: "An expensive routine is not a prerequisite. Gentle cleansing, moisturizer, and sun protection can form a simple foundation. Keep a celebrity’s personal results separate from what a product has been shown to do.",
    products: [
      { name: "Cetaphil Gentle Skin Cleanser", role: "Cleanser", note: "Identified in Vogue’s accompanying product list." },
      { name: "Vaseline 100% Pure Petroleum Jelly", role: "Lip care", note: "Applied to her lips in the routine." },
      { name: "Supergoop! Unseen Sunscreen SPF 40", role: "Sun protection", note: "The sunscreen listed with the 2023 recording." },
    ],
    related: [{ href: "/ingredients/petrolatum", label: "Petrolatum, explained" }, { href: "/guides/skin-barrier-explained", label: "Understand your skin barrier" }],
    sources: [{ label: "Vogue · accompanying article and product list", url: "https://www.vogue.com/article/beauty-secrets-issa-rae" }, { label: "Vogue on YouTube · July 21, 2023", url: "https://www.youtube.com/watch?v=e3pw82z0RMQ" }, { label: "Vogue · Rae’s Sienna Naturals ownership", url: "https://www.vogue.com/slideshow/issa-rae-shares-how-she-learned-to-love-her-hair-from-college-to-co-owning-sienna-naturals" }],
  },
];

export function routineDate(date: string) {
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(date + "T00:00:00Z"));
}
