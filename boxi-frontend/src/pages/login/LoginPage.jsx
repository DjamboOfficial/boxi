import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../contexts/userAuthContext";
import "./login.css";
import axios from "axios";

export const LoginPage = () => {
  const { isLoggedIn, setIsLoggedIn } = useUserAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/auth/user/login",
        {
          username,
          password,
        }
      );
      const { token } = response.data;
      localStorage.setItem("token", token);
      setIsLoggedIn(true);
      setUsername(username);
      console.log(username);
      navigate("/");
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <>
      <div className="login-page-container">
        <div className="login-page-form-container">
          <form className="login-form" onSubmit={handleSubmit}>
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

            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </>
  );
};
