import ScrollProgress from "./components/ScrollProgress";
import { HeroSection } from "./section/HeroSection";
import { Navigation } from "./Navigation";
import { ProjectsSection } from "./section/ProjectSection";
export default function App() {
  return (
    <div className="min-h-screen bg-primary scroll-smooth">
      <ScrollProgress />
      <Navigation />

      <main>
        <div className="relative w-full overflow-hidden">
          <section id="home">
            <HeroSection />
          </section>
        </div>

        <section id="projects">
          <ProjectsSection />
        </section>
      </main>
    </div>
  );
}
