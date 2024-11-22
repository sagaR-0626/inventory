import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import StartPage from "./Components/StartPage";
import LoginPage from "./Components/LoginPage";  // Updated import
import SignupPage from "./Components/SignupPage"; // Updated import
import HomePage from "./Components/HomePage";
import ScenarioAnalysis11 from "./Components/ScenarioAnalysis11";
import ABCXYZscreen from "./Components/ABC-XYZ";
import DataUpload from "./Components/DataUpload";
import DemandFluctuation from "./Components/DemandFluctuation";
import MLR from "./Components/MLR";
import EOQ from "./Components/EOQ";
import Univariate from "./Components/Univariate";
import Bivariate from "./Components/Bivariate";
import Multivariate from "./Components/Multivariate";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(!!loggedIn); // If logged in, set state to true
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <Router>
      <Routes>
        {/* Start Page */}
        <Route
          path="/"
          element={<StartPage />}
        />

        {/* Login Page */}
        <Route
          path="/login"
          element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
        />

        {/* Signup Page */}
        <Route
          path="/signup"
          element={<SignupPage setIsLoggedIn={setIsLoggedIn} />}
        />

        {/* Home Page */}
        <Route
          path="/home"
          element={isLoggedIn ? <HomePage onLogout={handleLogout} /> : <Navigate to="/login" />}
        />

        {/* Protected Routes */}
        <Route
          path="/scenario-analysis"
          element={isLoggedIn ? <ScenarioAnalysis11 /> : <Navigate to="/login" />}
        />
        <Route
          path="/abc-xyz"
          element={isLoggedIn ? <ABCXYZscreen /> : <Navigate to="/login" />}
        />
        <Route
          path="/data-upload"
          element={isLoggedIn ? <DataUpload /> : <Navigate to="/login" />}
        />
        <Route
          path="/demand-fluctuation"
          element={isLoggedIn ? <DemandFluctuation /> : <Navigate to="/login" />}
        />
        <Route
          path="/mlr"
          element={isLoggedIn ? <MLR /> : <Navigate to="/login" />}
        />
        <Route
          path="/eoq"
          element={isLoggedIn ? <EOQ /> : <Navigate to="/login" />}
        />
        <Route
          path="/univariate"
          element={isLoggedIn ? <Univariate /> : <Navigate to="/login" />}
        />
        <Route
          path="/bivariate"
          element={isLoggedIn ? <Bivariate /> : <Navigate to="/login" />}
        />
        <Route
          path="/multivariate"
          element={isLoggedIn ? <Multivariate /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
