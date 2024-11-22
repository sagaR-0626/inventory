import React from "react";
import { Link } from "react-router-dom";
import './StartPage.css'; // Import the external CSS file

function StartPage() {
  return (
    <div className="startpage-container">
      {/* Background video */}
      <video autoPlay loop muted className="startpage-background-video">
        <source src="/vedio.mp4" type="video/mp4" />
        {/* You can add other video formats if necessary */}
        Your browser does not support the video tag.
      </video>

      {/* Logo without box */}
      <img
        src="/Collabridge logo-white R.png" // Use the same logo path as in SignupPage
        alt="Logo"
        className="startpage-logo" // Add the class for the logo
      />

      <div className="startpage-content-container">
        <h1>INVENTORY MODELLING</h1>
        <div>
          <Link to="/login" className="startpage-button">Login</Link>
          <Link to="/signup" className="startpage-button">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default StartPage;
