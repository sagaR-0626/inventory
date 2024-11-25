import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Lazy-loaded components
const LoginPage = React.lazy(() => import("./Components/LoginPage"));
const SignupPage = React.lazy(() => import("./Components/SignupPage"));
const HomePage = React.lazy(() => import("./Components/HomePage"));
const ScenarioAnalysis11 = React.lazy(() => import("./Components/ScenarioAnalysis11"));
const ABCXYZscreen = React.lazy(() => import("./Components/ABC-XYZ"));
const DataUpload = React.lazy(() => import("./Components/DataUpload"));
const DemandFluctuation = React.lazy(() => import("./Components/DemandFluctuation"));
const MLR = React.lazy(() => import("./Components/MLR"));
const EOQ = React.lazy(() => import("./Components/EOQ"));
const Univariate = React.lazy(() => import("./Components/Univariate"));
const Bivariate = React.lazy(() => import("./Components/Bivariate"));
const Multivariate = React.lazy(() => import("./Components/Multivariate"));

// Protected Route Component
function ProtectedRoute({ isLoggedIn, children }) {
  return isLoggedIn ? children : <Navigate to="/login" />;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Initialize state based on localStorage
    return localStorage.getItem("isLoggedIn") === "true";
  });

  useEffect(() => {
    // Synchronize login status with localStorage
    if (isLoggedIn) {
      localStorage.setItem("isLoggedIn", "true");
    } else {
      localStorage.removeItem("isLoggedIn");
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
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

          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <HomePage onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/scenario-analysis"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <ScenarioAnalysis11 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/abc-xyz"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <ABCXYZscreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/data-upload"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <DataUpload />
              </ProtectedRoute>
            }
          />
          <Route
            path="/demand-fluctuation"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <DemandFluctuation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mlr"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <MLR />
              </ProtectedRoute>
            }
          />
          <Route
            path="/eoq"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <EOQ />
              </ProtectedRoute>
            }
          />
          <Route
            path="/univariate"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Univariate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bivariate"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Bivariate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/multivariate"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Multivariate />
              </ProtectedRoute>
            }
          />

          {/* Default Route */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
