import { EDITION } from "@/content/site";
import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Skin Considered — global skincare news, weighed before publication";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: "Independent · source-linked · evidence-graded",
    title: "Global skincare news, weighed before it is printed.",
    footer: `Edition Vol.${EDITION.volume} / No.${EDITION.number}`,
    accent: "raspberry",
  });
}
