import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { config } from "./lib/config.js";
import { applyTheme } from "./lib/theme.js";

applyTheme(config);
document.title = config.tagline
  ? `${config.businessName} — ${config.tagline}`
  : config.businessName;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
