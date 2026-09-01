import Link from "next/link";

export function SectionHeading({
  eyebrow,
  title,
  note,
  href,
  linkLabel = "See all",
}: {
  eyebrow?: string;
  title: string;
  note?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <span>{eyebrow}</span>}
        <h2>{title}</h2>
        {note && <p>{note}</p>}
      </div>
      {href && (
        <Link href={href}>
          {linkLabel} <span aria-hidden="true">→</span>
        </Link>
      )}
    </div>
  );
}
