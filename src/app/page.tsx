import { homeShowreel, selectShowreel } from "@/content/projects";
import ProjectsView from "@/components/ProjectsView";

// The home page is the showreel and nothing else: one fullscreen video at a
// time, advanced by scrolling, swiping or the round button.
// What it plays is set by `homeShowreel` in the content file.
export default function HomePage() {
  return (
    <main>
      <ProjectsView
        projects={selectShowreel(homeShowreel)}
        category={homeShowreel.category}
        subcategory={homeShowreel.subcategory}
      />
    </main>
  );
}
