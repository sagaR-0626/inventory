import React, { useState } from "react";
import './SignupPage.css'; // Import the CSS file
import './LoginPage.css'; // Reuse the LoginPage CSS for consistent styling

function SignupPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = () => {
    if (!fullName || !email || !password || !confirmPassword) {
      setErrorMessage("Please fill the Details.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    // Clear error message and proceed with signup
    setErrorMessage("");
    localStorage.setItem("isLoggedIn", true);
    alert("Signup successful!");
    // Navigate to the home page (implement navigation logic here)
  };

  return (
    <div className="container">
      {/* Logo section reused from LoginPage */}
      <img
        src="./Collabridge_logo_R_1_2__2_-removebg-preview.png"
        alt="Logo"
        className="logo1"
      />
      <div className="form-container">
        <h1>Signup</h1>
        {errorMessage && <p className="validation-message">{errorMessage}</p>}
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="input"
        />
        <button onClick={handleSignup} className="button">
          Submit
        </button>
      </div>
    </div>
  );
}

export default SignupPage;
