import { ImageResponse } from "next/og";
import { SYMBOL_FACES, SYMBOL_VIEWBOX } from "@/components/brand/symbol-paths";
import { siteFacts } from "@/content/site";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export const alt = "Infinity Labs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const GRADIENTS = [
  { x1: "101.452", y1: "225.591", x2: "229.54", y2: "119.673", from: "#A662E6", to: "#5ABEFF" },
  { x1: "51.8557", y1: "38.7029", x2: "68.1959", y2: "201.806", from: "#A661E2", to: "#3E4190" },
  { x1: "222.587", y1: "75.2433", x2: "57.2285", y2: "30.653", from: "#5DE7C8", to: "#A661E2" },
];

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "es";
  const d = getDictionary(locale);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0a0b12", color: "#f4f4f9", padding: 72, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <svg width="96" height="96" viewBox={SYMBOL_VIEWBOX} fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              {GRADIENTS.map((g, i) => (
                <linearGradient key={i} id={`og-f${i}`} x1={g.x1} y1={g.y1} x2={g.x2} y2={g.y2} gradientUnits="userSpaceOnUse">
                  <stop stopColor={g.from} />
                  <stop offset="1" stopColor={g.to} />
                </linearGradient>
              ))}
            </defs>
            {SYMBOL_FACES.map((f, i) => <path key={i} d={f.d} fill={`url(#og-f${i})`} />)}
          </svg>
          <div style={{ fontSize: 44, fontWeight: 600, letterSpacing: -1 }}>{siteFacts.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#9296ae" }}>{d.meta.category}</div>
          <div style={{ fontSize: 64, fontWeight: 600, lineHeight: 1.05, letterSpacing: -2, maxWidth: 1000 }}>{d.meta.tagline}</div>
        </div>
        <div style={{ display: "flex", height: 4, width: "100%", background: "linear-gradient(90deg, #A662E6, #5ABEFF, #5DE7C8)" }} />
      </div>
    ),
    { ...size },
  );
}
