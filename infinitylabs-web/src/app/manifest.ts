import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "browser",
    background_color: "#fafafc",
    theme_color: "#fafafc",
    icons: [{ src: "/brand/infinity-labs-symbol.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
