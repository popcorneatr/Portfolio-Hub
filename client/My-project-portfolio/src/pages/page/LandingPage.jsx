import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";

const LandingPage = () => {
    const navigate = useNavigate();
  
    const handleLogin = () => navigate("/login");
    const handleSignUp = () => navigate("/signup");
  
    return (
      <div className="landing-page">
        <div className="overlay">
          <header>
            <h1 className="header-title">Portfolio Hub</h1>
            <h2 className="header-description">Showcase Your Project Portfolio</h2>
            <p className="header-description">
              Bring your ideas to life and share your skills with the world.
            </p>
          </header>
          <div className="cta-buttons">
            <button onClick={handleLogin} className="cta-button login-button">
              Login
            </button>
            <button onClick={handleSignUp} className="cta-button signup-button">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default LandingPage;
  
