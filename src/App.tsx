import ScrollProgress from "./components/ScrollProgress";
import { HeroSection } from "./section/HeroSection";
import { Navigation } from "./Navigation";
export default function App() {
  return (
    <div className="min-h-screen bg-primary scroll-smooth">
      <ScrollProgress />
      <Navigation />

      <main>
        <section id="home">
          <HeroSection />
        </section>
      </main>
    </div>
  );
}
