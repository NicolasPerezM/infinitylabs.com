import { Fragment, type CSSProperties } from "react";

/**
 * Splits a headline into words for the "settle" entrance (masked rise + variable-font weight).
 * Server-rendered; the animation is pure CSS (`.word` / `.word-inner`) and disabled under reduced motion.
 * Spaces live between the inline-block word spans so they are never swallowed by the overflow mask.
 */
export function SplitWords({ text, delay = 0, className }: { text: string; delay?: number; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={className} style={{ ["--word-delay" as string]: `${delay}ms` } as CSSProperties}>
      {words.map((w, i) => (
        <Fragment key={i}>
          {i > 0 ? " " : null}
          <span className="word">
            <span className="word-inner" style={{ ["--i" as string]: i } as CSSProperties}>
              {w}
            </span>
          </span>
        </Fragment>
      ))}
    </span>
  );
}
