import ScrollProgress from "./components/scrollprogress";
import { Navigation } from "./navigation";

export default function App() {
  return (
    <div className="min-h-screen bg-primary scroll-smooth">
      <ScrollProgress />
      <Navigation />
    </div>
  );
}
