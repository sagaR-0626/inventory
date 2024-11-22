import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LoginPage.css'; // Import external CSS

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "test" && password === "pass") {
      localStorage.setItem("isLoggedIn", true);
      navigate("/home");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="container">
      <img
        src="./Collabridge_logo_R_1_2__2_-removebg-preview.png"
        alt="Logo"
        className="logo1"
      />
      <div className="content">
        <div className="form-container">
          <h1>Login</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
          <br />
          <button onClick={handleLogin} className="button">
            Login
          </button>
        </div>

        {/* Empty container with image */}
        <div className="empty-container">
          <img
            src="./IM image login .jpg" // Replace with your image path
            alt="Empty container image"
            className="empty-container-image"
          />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
