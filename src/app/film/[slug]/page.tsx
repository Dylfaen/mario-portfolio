import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Showreel from "@/components/Showreel";
import { getPlayableProject, playableProjects } from "@/content/projects";

type Params = { params: Promise<{ slug: string }> };

// Only films that actually have a video get a page.
export const dynamicParams = false;

export function generateStaticParams() {
  return playableProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  return { title: getPlayableProject(slug)?.title };
}

// One film, fullscreen: the showreel without the filters, the view switch
// or the next arrow, plus a way back.
export default async function FilmPage({ params }: Params) {
  const { slug } = await params;
  const project = getPlayableProject(slug);
  if (!project) notFound();

  return (
    <main>
      <Showreel projects={[project]} single />
    </main>
  );
}
