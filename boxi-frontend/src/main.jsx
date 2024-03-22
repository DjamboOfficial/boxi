import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { UserAuthProvider } from "./contexts/userAuthContext";
import { ArtisanAuthProvider } from "./contexts/artisanAuthContext"; // Import ArtisanAuthProvider
import { Homepage } from "./pages/homepage/Homepage.jsx";
import { MainLandingPage } from "./pages/main-landing-page/MainLandingPage.jsx";
import { SignupPage } from "./pages/user/signup/SignupPage.jsx";
import { LoginPage } from "./pages/user/login/LoginPage.jsx";
import { ArtisanLogin } from "./pages/artisan/artisan-login/ArtisanLogin.jsx";
import { ArtisanSignup } from "./pages/artisan/artisan-signup/artisanSignup.jsx";
import { ArtisanDashboard } from "./pages/artisan/artisan-dashboard/ArtisanDashboardPage.jsx";
import { Payment } from "./pages/user/Payment.jsx";
import { Completion } from "./pages/user/Completion.jsx";
import Cart from "./pages/user/cart/Cart.jsx";

import "./index.css";
import "./App.css";

const stripePromise = loadStripe(
  "pk_test_51OwiTQC5FkCdH38ro0r2M31xf1ybvmTk4Bbxhikn5NPT4cHd8jkJnQYeP5zNFFHHo2dqppwzOxJCw36AnAaXI8kr00H3sQJDMp"
);

ReactDOM.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      {/* Wrap both UserAuthProvider and ArtisanAuthProvider */}
      <UserAuthProvider>
        <ArtisanAuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/main-landing-page" element={<MainLandingPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/artisan-dashboard"
                element={<ArtisanDashboard />}
              ></Route>
              <Route path="/artisanLogin" element={<ArtisanLogin />}></Route>
              <Route path="/artisanSignup" element={<ArtisanSignup />}></Route>
              <Route path="/cart" element={<Cart />}></Route>
              <Route path="/payment" element={<Payment />}></Route>
              <Route path="/completion" element={<Completion />}></Route>

              <Route
                path="/artisan-dashboard"
                element={<ArtisanDashboard />}
              ></Route>
            </Routes>
          </Router>
        </ArtisanAuthProvider>
      </UserAuthProvider>
    </Elements>
  </React.StrictMode>,
  document.getElementById("root")
);
