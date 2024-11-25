import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css"; // Updated CSS file

function SignupPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSignup = () => {
    if (!fullName || !email || !password || !rePassword) {
      setErrorMessage("Please fill all details.");
      return;
    }

    if (password !== rePassword) {
      setErrorMessage("Passwords don't match.");
      return;
    }

    // Clear error message and show success
    setErrorMessage("");
    setSuccess(true);

    // Simulating successful form submission
    setTimeout(() => {
      alert("Signup successful ✅");
      localStorage.setItem("isLoggedIn", true); // Set login status
      navigate("/home"); // Redirect to login page
    }, 1000);
  };

  return (
    <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
      <div className="row d-flex">
        {/* Left Side (Image and Logo) */}
        <div className="col-lg-6">
          <div className="pb-5">
            <div className="row">
              <img
                src="./Collabridge_logo_R_1_2__2_-removebg-preview.png"
                alt="Logo"
                className="logo1"
              />
            </div>

            <img
              src="https://i.imgur.com/uNGdWHi.png"
              alt="Signup"
              className="image"
            />
          </div>
        </div>

        {/* Right Side (Form) */}
        <div className="col-lg-6">
          <div className="card border-0 px-4 py-5">
            <div className="row mb-4 px-3">
              <h6 className="mb-0 mr-4 mt-2">Create Account</h6>
            </div>

            {/* Error Message */}
            {errorMessage && <div className="error-message">{errorMessage}</div>}

            {/* Full Name Input */}
            <div className="row px-3">
              <input
                className="input mb-4"
                type="text"
                name="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Input */}
            <div className="row px-3">
              <input
                className="input mb-4"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            {/* Password Input */}
            <div className="row px-3">
              <input
                className="input mb-4"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
              />
            </div>

            {/* Re-enter Password Input */}
            <div className="row px-3">
              <input
                className="input mb-4"
                type="password"
                name="rePassword"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
                placeholder="Re-enter your password"
              />
            </div>
            <div className="separator my-3 text-center">
              <small>or</small>
            </div>

            {/* Social Sign-in with Image Icons */}
            <div className="row px-3 mb-4">
              <small className="text-muted">Sign in with</small>
              <div className="social-icons d-flex justify-content-around mt-2">
                <a href="#" className="icon">
                  <img
                    src="./icons8-facebook (1).svg" // Replace with your image path
                    alt="Facebook"
                    className="social-img"
                  />
                </a>
                <a href="#" className="icon">
                  <img
                    src="./google.png" // Replace with your image path
                    alt="Google"
                    className="social-img"
                  />
                </a>
                <a href="#" className="icon">
                  <img
                    src="./icons8-linkedin.svg" // Replace with your image path
                    alt="LinkedIn"
                    className="social-img"
                  />
                </a>
                <a href="#" className="icon">
                  <img
                    src="./twitter.png" // Replace with your image path
                    alt="Twitter"
                    className="social-img"
                  />
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <div className="row mb-3 px-3">
              <button
                type="button"
                className="btn btn-blue text-center"
                onClick={handleSignup}
              >
                Submit
              </button>
            </div>

            {/* Redirect to login */}
            <div className="row mb-4 px-3">
              <small className="font-weight-bold">
                Already have an account?{" "}
                <a className="text-danger" href="/login">
                  Login
                </a>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
