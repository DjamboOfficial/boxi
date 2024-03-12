import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import { Homepage } from "./pages/homepage/Homepage.jsx";
import { MainLandingPage } from "./pages/main-landin-page/MainLandingPage.jsx";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/main-landing-page" element={<MainLandingPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
