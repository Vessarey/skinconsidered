import { ImageResponse } from "next/og";
import { ogFonts } from "@/lib/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#182620",
          color: "#d6336c",
          fontFamily: "Archivo Black",
          fontSize: 84,
          lineHeight: 1,
          paddingTop: 22,
        }}
      >
        *
      </div>
    ),
    { ...size, fonts: ogFonts },
  );
}
