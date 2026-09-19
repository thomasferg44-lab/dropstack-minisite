import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { config } from "./lib/config.js";
import { applyTheme } from "./lib/theme.js";

// Title, meta and structured data are injected into index.html at build
// time by vite-plugins/seo.js — crawlers don't run this file.
applyTheme(config);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
