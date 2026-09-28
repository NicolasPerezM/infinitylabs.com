import { useId } from "react";
import { SYMBOL_FACES, SYMBOL_VIEWBOX } from "./symbol-paths";
import { cn } from "@/lib/utils";

/**
 * The approved Infinity Labs symbol. Geometry is verbatim from
 * brand/logo/infinity-labs-symbol-256.svg and must not be edited (DEC-006).
 *
 * `color`  – approved gradients (minimum 40px).
 * `mono`   – tonal single-color treatment using currentColor (minimum 24px).
 */

// Verbatim gradient definitions from the approved file, per face index.
const FACE_GRADIENTS = [
  { x1: "101.452", y1: "225.591", x2: "229.54", y2: "119.673", from: "#A662E6", to: "#5ABEFF" },
  { x1: "51.8557", y1: "38.7029", x2: "68.1959", y2: "201.806", from: "#A661E2", to: "#3E4190" },
  { x1: "222.587", y1: "75.2433", x2: "57.2285", y2: "30.653", from: "#5DE7C8", to: "#A661E2" },
] as const;

// Tonal steps for the monochrome treatment (left face darkest, top face lightest).
const MONO_OPACITY = [0.72, 1, 0.48] as const;

// Intro sequence order: left → top → right (clockwise flow of the ribbon).
const INTRO_ORDER = [1, 2, 0] as const;

type Props = {
  size?: number;
  variant?: "color" | "mono";
  /** Play the one-time face sequence on mount (CSS only; disabled under reduced motion). */
  animate?: boolean;
  className?: string;
  title?: string;
  decorative?: boolean;
};

export function LogoMark({ size = 40, variant = "color", animate = false, className, title = "Infinity Labs", decorative = false }: Props) {
  const uid = useId().replace(/[:]/g, "");
  return (
    <svg
      width={size}
      height={size}
      viewBox={SYMBOL_VIEWBOX}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : title}
    >
      {variant === "color" && (
        <defs>
          {FACE_GRADIENTS.map((g, i) => (
            <linearGradient key={i} id={`${uid}-f${i}`} x1={g.x1} y1={g.y1} x2={g.x2} y2={g.y2} gradientUnits="userSpaceOnUse">
              <stop stopColor={g.from} />
              <stop offset="1" stopColor={g.to} />
            </linearGradient>
          ))}
        </defs>
      )}
      {SYMBOL_FACES.map((face, i) => (
        <path
          key={i}
          d={face.d}
          fill={variant === "color" ? `url(#${uid}-f${i})` : "currentColor"}
          fillOpacity={variant === "mono" ? MONO_OPACITY[i] : undefined}
          style={
            animate
              ? { animation: "face-in 520ms var(--ease-out-quart) both", animationDelay: `${INTRO_ORDER.indexOf(i as 0 | 1 | 2) * 140}ms` }
              : undefined
          }
        />
      ))}
    </svg>
  );
}
