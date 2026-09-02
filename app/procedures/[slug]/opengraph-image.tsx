import { getProcedure, gradeCode, procedureProfiles } from "@/lib/content";
import { OG_SIZE, ogImage } from "@/lib/og";

export const alt = "Skin Considered procedure file";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return procedureProfiles.map((profile) => ({ slug: profile.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const profile = getProcedure(slug);

  if (!profile) {
    return ogImage({ eyebrow: "No file on record", title: "This procedure has no file yet.", footer: "Skin Considered" });
  }

  return ogImage({
    eyebrow: `${profile.category} · Grade ${gradeCode(profile.evidenceGrade)}`,
    title: `${profile.name}: cost, downtime, evidence, and risks`,
    footer: `${profile.cost} · ${profile.downtime}`,
    accent: "cobalt",
  });
}
