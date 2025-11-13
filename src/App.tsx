import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollProgress from "./components/scrollprogress";
import Home from "./pages/homepage";
import { Navigation } from "./navigation";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <ScrollProgress />
        <Navigation />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Home></Home>
              </>
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}
