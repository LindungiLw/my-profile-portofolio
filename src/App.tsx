import ScrollProgress from "./components/ScrollProgress";
import { HeroSection } from "./section/HeroSection";
import { Navigation } from "./Navigation";
import { ProjectsSection } from "./section/ProjectSection";
import { SkillsSection } from "./section/SkillsSection";

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

        <div className="relative h-16 md:h-24 -mt-1 z-10 overflow-hidden bg-[#03346E]">
          <svg
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            className="absolute w-full h-full bottom-0"
          >
            <path
              fill="#021526"
              fillOpacity="1"
              d="M0,224L48,213.3C96,203,192,181,288,186.7C384,192,480,224,576,213.3C672,203,768,149,864,128C960,107,1056,117,1152,133.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>

        {/* 3. Skills */}
        <section id="skills">
          <SkillsSection />
        </section>
      </main>
    </div>
  );
}
