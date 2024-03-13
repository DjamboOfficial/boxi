import React from "react";
import ReactDOM from "react-dom"; // Correct import statement
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserAuthProvider } from "./contexts/userAuthContext"; // Assuming UserAuthProvider is exported from userAuthContext.js
import { Homepage } from "./pages/homepage/Homepage.jsx";
import { MainLandingPage } from "./pages/main-landing-page/MainLandingPage.jsx";
import { SignupPage } from "./pages/signup/SignupPage.jsx";
import { LoginPage } from "./pages/login/LoginPage.jsx";
import "./index.css";
import "./App.css";

ReactDOM.render(
  // Using render method instead of createRoot
  <React.StrictMode>
    <UserAuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/main-landing-page" element={<MainLandingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </UserAuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
