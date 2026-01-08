import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Story from "./pages/Story";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/startup-story" element={<Story />} />
    </Routes>
  );
};

export default App;
