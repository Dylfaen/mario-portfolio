import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { projects } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/travaux", "/a-propos", "/contact"];

  return [
    ...pages.map((path) => ({
      url: `${site.url}${path}`,
      lastModified: new Date(),
    })),
    ...projects.map((project) => ({
      url: `${site.url}/travaux/${project.slug}`,
      lastModified: new Date(),
    })),
  ];
}
