import { EvidenceGrade, gradeDefinitions } from "@/lib/content";

export function EvidenceBadge({ grade, compact = false }: { grade: EvidenceGrade; compact?: boolean }) {
  const definition = gradeDefinitions[grade];

  return (
    <span className={`evidence-badge grade-${grade.toLowerCase()} ${compact ? "compact" : ""}`} title={definition.description}>
      <b>{grade === "Context" ? "CTX" : grade}</b>
      {!compact && <span>{definition.label}</span>}
    </span>
  );
}
