import type { Metadata } from "next";
import { redirect } from "next/navigation";
import ProjectsView from "@/components/ProjectsView";
import { homeShowreel, selectShowreel } from "@/content/projects";

export const metadata: Metadata = { title: "Tout" };

// Every featured project, whatever its category. This route exists because `/`
// plays whatever `homeShowreel` narrows it down to, so without it the "Tout"
// filter would have nowhere to point.
export default function AllShowreelPage() {
  // Nothing to duplicate when `/` already shows everything.
  if (!homeShowreel.category && !homeShowreel.subcategory) redirect("/");

  return (
    <main>
      <ProjectsView projects={selectShowreel()} />
    </main>
  );
}
