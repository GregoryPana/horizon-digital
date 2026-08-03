import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { preloadCurrentRoute } from "./config/clientRouteLoaders";
import { initializeAnalytics } from "./lib/analytics";
import "./index.css";

// Start only the matching route chunk before React begins rendering. React.lazy
// consumes the same cached import promise and retains the Suspense boundary.
// The route error boundary owns recovery if the shared import promise rejects.
void preloadCurrentRoute(window.location.pathname).catch(() => undefined);

if (import.meta.env.PROD) {
  initializeAnalytics();
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
