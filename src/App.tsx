import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import "./styles/styles.scss";

function App() {
  return (
    <Router>
      <div>
        <h1 className="header">News | Nexus - The Hub of Global Stories</h1>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
