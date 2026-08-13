import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectsView from "@/components/ProjectsView";
import { selectShowreel, showreelSubcategories } from "@/content/projects";

type Params = { params: Promise<{ category: string; subcategory: string }> };

// Only the pairs generated below exist: anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return showreelSubcategories();
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category, subcategory } = await params;
  return { title: `${category} · ${subcategory}` };
}

export default async function SubcategoryShowreelPage({ params }: Params) {
  const { category, subcategory } = await params;
  const projects = selectShowreel({ category, subcategory });
  if (projects.length === 0) notFound();

  return (
    <main>
      <ProjectsView projects={projects} category={category} subcategory={subcategory} />
    </main>
  );
}
