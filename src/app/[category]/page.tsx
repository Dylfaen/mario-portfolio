import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectsView from "@/components/ProjectsView";
import { selectShowreel, showreelCategories } from "@/content/projects";

type Params = { params: Promise<{ category: string }> };

// Only the categories generated below exist: anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return showreelCategories().map((category) => ({ category }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category } = await params;
  return { title: category };
}

export default async function CategoryShowreelPage({ params }: Params) {
  const { category } = await params;
  const projects = selectShowreel({ category });
  if (projects.length === 0) notFound();

  return (
    <main>
      <ProjectsView projects={projects} category={category} />
    </main>
  );
}
