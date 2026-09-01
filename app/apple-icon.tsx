import { ImageResponse } from "next/og";
import { ogFonts } from "@/lib/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f6eeea",
          color: "#182620",
          fontFamily: "Archivo Black",
          fontSize: 230,
          lineHeight: 1,
          paddingTop: 70,
        }}
      >
        <span style={{ color: "#d6336c" }}>*</span>
      </div>
    ),
    { ...size, fonts: ogFonts },
  );
}
