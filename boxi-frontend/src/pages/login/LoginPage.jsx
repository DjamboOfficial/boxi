import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

export const LoginPage = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
              value=""
              onChange={handleUsernameChange}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value=""
              onChange={handlePasswordChange}
            />

            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </>
  );
};
