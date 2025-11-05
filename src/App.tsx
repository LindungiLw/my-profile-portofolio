import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollProgress from "./components/ScrollProgress";
import Home from "./pages/home";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen"></div>
      <ScrollProgress />

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
    </Router>
  );
}
