import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css";
import Axios from "axios";

const SignUp = () => {

  const localhost = "http://localhost:3001";
  const render = "https://portfolio-hub-eapv.onrender.com";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    githubName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      Axios.post(`${render}/user`, formData)
      console.log("Success sign up", formData)
      navigate("/login");
    } catch (error) {
      console.log(error)
    }
    
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h2>Create an Account</h2>
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
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
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
          <div className="form-group">
            <input
              type="text"
              name="githubName"
              placeholder="GitHub Username"
              value={formData.githubName}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>

        <div className="login-redirect">
          <p>
            Already have an account?{" "}
            <span onClick={handleLoginRedirect} className="login-link">
              Log in here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
