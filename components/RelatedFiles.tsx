import Link from "next/link";
import type { RelatedFile } from "@/lib/content";

export function RelatedFiles({ files, title = "Related files", id = "related-title" }: { files: RelatedFile[]; title?: string; id?: string }) {
  if (!files.length) return null;

  return (
    <section className="related-files" aria-labelledby={id}>
      <h2 id={id}>{title}</h2>
      <ul>
        {files.map((file) => (
          <li key={file.href}>
            <Link href={file.href}>
              <small>{file.kind}</small>
              <span>{file.title}</span>
              <em>{file.meta}</em>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
