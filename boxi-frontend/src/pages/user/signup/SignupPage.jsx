import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../../contexts/userAuthContext";
import axios from "axios";
import "./signup.css";

export const SignupPage = () => {
  const {
    isLoggedIn,
    setIsLoggedIn,
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
  } = useUserAuth();

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  useEffect(() => {
    console.log("Context Value is:", { isLoggedIn, setIsLoggedIn });
  }, [isLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/user/signup",
        {
          username,
          password,
          email,
        }
      );
      const token = response.data.token;
      console.log(token);
      localStorage.setItem("token", token);
      setIsLoggedIn(true); // Update authentication state
      setUsername(username);
      navigate("/main-landing-page");
    } catch (error) {
      console.error("Sign up failed: ", error.response.data.message);
    }
  };

  return (
    <>
      <div className="signup-page-container">
        <div className="signup-page-form-container">
          <form className="signup-form" onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleUsernameChange}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </>
  );
};
