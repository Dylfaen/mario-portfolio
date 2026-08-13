import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import {
  playableProjects,
  showreelCategories,
  showreelSubcategories,
} from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/tout",
    ...showreelCategories().map((category) => `/${category}`),
    ...showreelSubcategories().map(
      ({ category, subcategory }) => `/${category}/${subcategory}`,
    ),
    ...playableProjects.map((project) => `/film/${project.slug}`),
  ];

  return paths.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
  }));
}
