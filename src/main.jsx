/**
 * Renders the main application component in the root element of the document.
 * @param {HTMLElement} rootElement - The root element to render the application in.
 * @returns {void}
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Navbar from "./components/Navbar.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
