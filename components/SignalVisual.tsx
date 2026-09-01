export function SignalVisual({
  color,
  label,
  compact = false,
}: {
  color: "raspberry" | "cobalt" | "green" | "violet";
  label: string;
  compact?: boolean;
}) {
  return (
    <div className={`signal-visual visual-${color} ${compact ? "compact" : ""}`} role="img" aria-label={label}>
      <span className="signal-orbit orbit-one" />
      <span className="signal-orbit orbit-two" />
      <span className="signal-orbit orbit-three" />
      <span className="signal-flare" />
      <span className="signal-grid" />
    </div>
  );
}
