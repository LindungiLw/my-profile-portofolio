import ScrollProgress from "./components/scrollprogress";
import { Navigation } from "./navigation";
import { HeroSection } from "./section/herosection";

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
