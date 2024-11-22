import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import Axios from "axios"

const Login = () => {

  const localhost = "http://localhost:3001";
  const render = "https://portfolio-hub-eapv.onrender.com";

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await Axios.post(`${render}/user/login`, formData)
      const { token } = response.data;
      localStorage.setItem("token", token);
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
 
    
  };

  const handleSignUpRedirect = () => {
    navigate("/signup"); 
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Log In
          </button>
        </form>
        <div className="redirect-options">
          <p>
            Don't have an account?{" "}
            <span onClick={handleSignUpRedirect} className="signup-link">
              Sign Up
            </span>
          </p>
          <p>
            <span className="forgot-password">Forgot Password?</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
