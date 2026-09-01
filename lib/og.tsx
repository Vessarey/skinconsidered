import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { AccentColor } from "@/content/types";

/* Fonts are read once at module scope; they do not depend on request data. */
const displayFont = await readFile(join(process.cwd(), "node_modules/@fontsource/archivo-black/files/archivo-black-latin-400-normal.woff"));
const monoFont = await readFile(join(process.cwd(), "node_modules/@fontsource/space-mono/files/space-mono-latin-700-normal.woff"));

export const OG_SIZE = { width: 1200, height: 630 };

/* Exact design tokens from globals.css */
const tokens = {
  paper: "#f6eeea",
  ink: "#182620",
  raspberry: "#d6336c",
  cobalt: "#2049c7",
  green: "#1f7a3d",
  violet: "#7451c8",
};

export const ogFonts = [
  { name: "Archivo Black", data: displayFont, weight: 400 as const, style: "normal" as const },
  { name: "Space Mono", data: monoFont, weight: 700 as const, style: "normal" as const },
];

export function ogImage({
  eyebrow,
  title,
  footer,
  accent = "raspberry",
}: {
  eyebrow: string;
  title: string;
  footer: string;
  accent?: AccentColor;
}) {
  const fontSize = title.length > 90 ? 46 : title.length > 60 ? 56 : 68;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          background: tokens.paper,
          color: tokens.ink,
          fontFamily: "Archivo Black",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "Space Mono",
            fontSize: 22,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          <span style={{ color: tokens[accent] }}>{eyebrow}</span>
          <span>Considered before published</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize,
            lineHeight: 0.95,
            letterSpacing: -3,
            textTransform: "uppercase",
            maxWidth: 1040,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            borderTop: `6px solid ${tokens.ink}`,
            paddingTop: 24,
            fontFamily: "Space Mono",
            fontSize: 22,
            textTransform: "uppercase",
          }}
        >
          <span>{footer}</span>
          <div style={{ display: "flex", fontFamily: "Archivo Black", fontSize: 44, letterSpacing: -3, textTransform: "none" }}>
            <span>skin</span>
            <span style={{ color: tokens.raspberry, marginLeft: 12 }}>considered</span>
            <span>*</span>
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: ogFonts },
  );
}
