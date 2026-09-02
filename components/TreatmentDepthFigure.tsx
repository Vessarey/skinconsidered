import type { DepthTarget } from "@/content/types";

/**
 * An original schematic of skin in cross-section with the layers a treatment
 * or topical acts on highlighted. It is a teaching simplification drawn from
 * the design tokens, not a clinical illustration of any device or product.
 */

const LAYERS: { id: DepthTarget; label: string; y: number; height: number; note: string }[] = [
  { id: "surface", label: "Surface (stratum corneum)", y: 22, height: 14, note: "Dead-cell layer: exfoliants, occlusives, cleansers" },
  { id: "epidermis", label: "Epidermis", y: 36, height: 34, note: "Living skin cells and pigment cells" },
  { id: "dermis", label: "Dermis", y: 70, height: 88, note: "Collagen, elastin, vessels, glands" },
  { id: "fat", label: "Subcutaneous fat", y: 158, height: 46, note: "Fat layer and superficial fascia" },
  { id: "muscle", label: "Muscle", y: 204, height: 26, note: "Facial muscles of expression" },
];

const LABELS: Record<DepthTarget, string> = {
  surface: "Surface",
  epidermis: "Epidermis",
  dermis: "Dermis",
  vessels: "Vessels and pigment",
  follicle: "Hair follicle",
  fat: "Fat layer",
  muscle: "Muscle",
  smas: "SMAS and deep tissue",
};

export function TreatmentDepthFigure({ targets, title }: { targets: DepthTarget[]; title: string }) {
  const active = new Set(targets);
  const layerActive = (id: DepthTarget) => active.has(id) || (id === "fat" && active.has("smas")) || (id === "dermis" && (active.has("vessels") || active.has("follicle")));

  return (
    <figure className="depth-figure">
      <svg viewBox="0 0 520 250" role="img" aria-labelledby="depth-title depth-desc" focusable="false">
        <title id="depth-title">{title}</title>
        <desc id="depth-desc">
          Schematic cross-section of skin with the layers this treatment acts on highlighted: {targets.map((target) => LABELS[target]).join(", ")}.
        </desc>
        {/* Skin block */}
        <rect x="20" y="22" width="300" height="208" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />
        {LAYERS.map((layer) => (
          <g key={layer.id}>
            <rect
              x="21"
              y={layer.y}
              width="298"
              height={layer.height}
              fill={layerActive(layer.id) ? "var(--acid)" : layer.id === "fat" ? "#f3e6d8" : layer.id === "muscle" ? "#f0c9d6" : "var(--paper)"}
              opacity={layerActive(layer.id) ? 0.9 : 1}
            />
            <line x1="21" y1={layer.y} x2="319" y2={layer.y} stroke="var(--ink)" strokeWidth="1" strokeDasharray={layer.id === "surface" ? "0" : "3 3"} />
          </g>
        ))}
        {/* Surface texture */}
        <path d="M21 24 q10 -4 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0" fill="none" stroke="var(--ink)" strokeWidth="2" />
        {/* Hair follicle */}
        <path d="M110 22 L112 130 q0 12 10 12 q10 0 10 -12 L134 22" fill={active.has("follicle") ? "var(--acid)" : "none"} stroke="var(--ink)" strokeWidth="1.5" />
        <path d="M122 22 L124 -2" stroke="var(--ink)" strokeWidth="2" />
        <ellipse cx="122" cy="132" rx="10" ry="8" fill={active.has("follicle") ? "var(--raspberry)" : "var(--paper-deep)"} stroke="var(--ink)" strokeWidth="1.5" />
        {/* Vessels */}
        <path d="M200 150 q15 -25 30 -10 t30 -25" fill="none" stroke={active.has("vessels") ? "var(--raspberry)" : "#d9a7b4"} strokeWidth={active.has("vessels") ? 4 : 2.5} strokeLinecap="round" />
        <path d="M240 190 q12 -18 26 -8 t26 -20" fill="none" stroke={active.has("vessels") ? "var(--cobalt)" : "#b7c2e6"} strokeWidth={active.has("vessels") ? 4 : 2.5} strokeLinecap="round" />
        {/* Pigment cells */}
        {[60, 90, 160, 190, 250, 280].map((x) => (
          <circle key={x} cx={x} cy="64" r="3" fill={active.has("vessels") || active.has("epidermis") ? "var(--ink)" : "var(--ink-soft)"} />
        ))}
        {/* Collagen hint */}
        {[90, 110, 130].map((y) => (
          <path key={y} d={`M30 ${y} q20 -6 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0`} fill="none" stroke="var(--hairline)" strokeWidth="1" />
        ))}
        {/* SMAS band */}
        <rect x="21" y="196" width="298" height="8" fill={active.has("smas") ? "var(--violet)" : "#e4d7ef"} />
        {/* Labels */}
        {LAYERS.map((layer) => (
          <g key={`${layer.id}-label`} fontFamily="var(--mono)" fontSize="9" fontWeight={layerActive(layer.id) ? 900 : 700}>
            <line x1="320" y1={layer.y + layer.height / 2} x2="336" y2={layer.y + layer.height / 2} stroke="var(--ink)" strokeWidth="1" />
            <text x="340" y={layer.y + layer.height / 2 + 3} fill="var(--ink)">
              {layer.label.toUpperCase()}
            </text>
            <text x="340" y={layer.y + layer.height / 2 + 14} fill="var(--ink-soft)" fontSize="7" fontWeight="400">
              {layer.note}
            </text>
          </g>
        ))}
        <g fontFamily="var(--mono)" fontSize="9" fontWeight="900">
          <text x="20" y="246" fill="var(--raspberry-dark)">
            HIGHLIGHTED: {targets.map((target) => LABELS[target].toUpperCase()).join(" · ")}
          </text>
        </g>
      </svg>
      <figcaption>
        Where it acts. A schematic, not a picture of any device or product; depth varies with settings, strength, and skin.
      </figcaption>
    </figure>
  );
}
