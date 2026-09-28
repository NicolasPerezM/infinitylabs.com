import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  size?: "content" | "prose" | "wide";
};

export function Container({ children, className, as: Tag = "div", size = "content" }: Props) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-gutter",
        size === "content" && "max-w-content",
        size === "prose" && "max-w-prose",
        size === "wide" && "max-w-[88rem]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
