import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import { Homepage } from "./pages/homepage/Homepage.jsx";
import { MainLandingPage } from "./pages/main-landin-page/MainLandingPage.jsx";
import { SignupPage } from "./pages/signup/SignupPage.jsx";
import { LoginPage } from "./pages/login/LoginPage.jsx";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/main-landing-page" element={<MainLandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
