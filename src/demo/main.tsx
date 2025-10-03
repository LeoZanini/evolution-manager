import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "../providers/ThemeProvider";

import "../styles/globals.css";
import TestPage from "./pages/TestPage";
import HomePage from "./pages/HomePage";
import InstanceControllerPage from "./pages/InstanceControllerPage";
import StandaloneTestPage from "./pages/StandaloneTestPage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/standalone" element={<StandaloneTestPage />} />
          <Route
            path="/controller/:instanceId"
            element={<InstanceControllerPage />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
