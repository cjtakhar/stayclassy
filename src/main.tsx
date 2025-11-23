import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* basename should match your GitHub repo name */}
    <BrowserRouter basename="/stayclassy">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);