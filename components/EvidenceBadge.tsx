import Link from "next/link";
import { gradeDefinitions } from "@/content/site";
import type { EvidenceGrade } from "@/content/types";

/**
 * A grade badge that links to its definition, so the meaning is reachable by
 * keyboard, touch, and screen reader rather than hidden in a tooltip.
 */
export function EvidenceBadge({ grade, compact = false }: { grade: EvidenceGrade; compact?: boolean }) {
  const definition = gradeDefinitions[grade];

  return (
    <Link
      className={`evidence-badge grade-${grade.toLowerCase()}${compact ? " compact" : ""}`}
      href={`/methodology#grade-${grade.toLowerCase()}`}
      aria-label={`Evidence grade ${definition.code}, ${definition.label}. ${definition.description} Open the grading method.`}
    >
      <b aria-hidden="true">{definition.code}</b>
      {!compact && <span aria-hidden="true">{definition.label}</span>}
    </Link>
  );
}
