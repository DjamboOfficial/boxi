import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserAuthProvider } from "./contexts/userAuthContext";
import { ArtisanAuthProvider } from "./contexts/artisanAuthContext"; // Import ArtisanAuthProvider
import { Homepage } from "./pages/homepage/Homepage.jsx";
import { MainLandingPage } from "./pages/main-landing-page/MainLandingPage.jsx";
import { SignupPage } from "./pages/user/signup/SignupPage.jsx";
import { LoginPage } from "./pages/user/login/LoginPage.jsx";
import { ArtisanLogin } from "./pages/artisan/artisan-login/ArtisanLogin.jsx";
import { ArtisanSignup } from "./pages/artisan/artisan-signup/artisanSignup.jsx";
import { ArtisanDashboard } from "./pages/artisan/artisan-dashboard/ArtisanDashboardPage.jsx";

import "./index.css";
import "./App.css";

ReactDOM.render(
  <React.StrictMode>
    {/* Wrap both UserAuthProvider and ArtisanAuthProvider */}
    <UserAuthProvider>
      <ArtisanAuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/main-landing-page" element={<MainLandingPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/artisanLogin" element={<ArtisanLogin />}></Route>
            <Route path="/artisanSignup" element={<ArtisanSignup />}></Route>
            <Route
              path="/artisan-dashboard"
              element={<ArtisanDashboard />}
            ></Route>
          </Routes>
        </Router>
      </ArtisanAuthProvider>
    </UserAuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
