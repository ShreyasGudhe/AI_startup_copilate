import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Features from "./pages/Features.jsx";
import AITool from "./pages/AITool.jsx";
import Home from "./pages/Home.jsx";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/ai" element={<AITool />} />
      </Routes>
    </Router>
  );
}

export default App;