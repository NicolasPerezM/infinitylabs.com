import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  id?: string;
  align?: "left" | "center";
  size?: "xl" | "lg";
  className?: string;
  as?: "h1" | "h2" | "h3";
  children?: ReactNode;
};

export function SectionHeader({ eyebrow, title, lede, id, align = "left", size = "lg", className, as: Tag = "h2", children }: Props) {
  return (
    <div className={cn("reveal flex flex-col gap-4", align === "center" && "items-center text-center", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Tag id={id} className={cn(size === "xl" ? "text-display-xl" : "text-display-lg", "max-w-[22ch] text-text-primary")}>
        {title}
      </Tag>
      {lede && <p className={cn("text-body-lg text-text-secondary", align === "center" ? "max-w-[60ch]" : "prose-measure")}>{lede}</p>}
      {children}
    </div>
  );
}
