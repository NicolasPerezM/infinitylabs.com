import type { MetadataRoute } from "next";
import { siteFacts } from "@/content/site";
import { getDictionary } from "@/i18n/dictionaries";

export default function manifest(): MetadataRoute.Manifest {
  const d = getDictionary("es");
  return {
    name: siteFacts.name,
    short_name: siteFacts.name,
    description: d.meta.description,
    start_url: "/es",
    display: "browser",
    background_color: "#f7f5f0",
    theme_color: "#f7f5f0",
    icons: [{ src: "/brand/infinity-labs-symbol.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
