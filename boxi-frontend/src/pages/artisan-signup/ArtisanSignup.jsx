import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./artisan-signup.css";
import { useArtisanAuth } from "../../contexts/artisanAuthContext";

export const ArtisanSignup = () => {
  const {
    artisanIsLoggedIn,
    setArtisanIsLoggedIn,
    setUsername,
    setEmail,
    setPassword,
  } = useArtisanAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  useEffect(() => {
    console.log("Context Value is:", {
      artisanIsLoggedIn,
      setArtisanIsLoggedIn,
    });
  }, [artisanIsLoggedIn]);

  const handleUsernameChange = (e) => {
    setFormData({ ...formData, username: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setFormData({ ...formData, password: e.target.value });
  };

  const handleEmailChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/artisan/signup",
        formData
      );
      const token = response.data.token;
      console.log(token);
      localStorage.setItem("token", token);
      setArtisanIsLoggedIn(true); // Update authentication state
      setUsername(formData.username);
      navigate("/");
    } catch (error) {
      console.error("Sign up failed: ", error.response.data.message);
    }
  };

  return (
    <div className="signup-page-container">
      <div className="signup-page-form-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleUsernameChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handlePasswordChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleEmailChange}
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};
