import { getIngredient, gradeCode, ingredients } from "@/lib/content";
import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Skin Considered topical file";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return ingredients.map((ingredient) => ({ slug: ingredient.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ingredient = getIngredient(slug);

  if (!ingredient) {
    return ogImage({ eyebrow: "No file on record", title: "This topical has no file yet.", footer: "Skin Considered" });
  }

  return ogImage({
    eyebrow: `${ingredient.family} · ${ingredient.status} · Grade ${gradeCode(ingredient.evidence)}`,
    title: `${ingredient.name}: uses, evidence, and side effects`,
    footer: ingredient.jobs.slice(0, 3).join(" · "),
    accent: "green",
  });
}
