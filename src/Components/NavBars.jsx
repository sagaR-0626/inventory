import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar'; // Assuming Avatar for profile icon
import './NavBars.css';

function NavBars() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    // Logic for logout (e.g., clear session or token)
    localStorage.removeItem("isLoggedIn"); // Clear the login token
    navigate('/'); // Redirect to home page after logging out
  };

  return (
    <div className="homePage-1">
      <nav className="mainNavbar-1">
        {/* Logo at the top left */}
        <div className="header-logo-1">
          <img src="./Collabridge logo R 1 2 (2).png" alt="Company Logo" style={{ height: '30px', left: '15px', top:'20px' }} />
        </div>

        {/* Navbar Links */}
        <div className="navbar-links">
          {/* Updated Home Button to link to /home */}
          <Link to="/home" className="navbar-link">Home</Link>

          <div className="navbar-dropdown">
            <span className="navbar-link">Data Management</span>
            <div className="dropdown-content">
              <Link to="/data-upload" className="dropdown-item">Data Upload</Link>
            </div>
          </div>

          <div className="navbar-dropdown">
            <span className="navbar-link">Modelling</span>
            <div className="dropdown-content">
              <Link to="/mlr" className="dropdown-item">MLR</Link>
              <Link to="/eoq" className="dropdown-item">EOQ</Link>
              <Link to="/abc-xyz" className="dropdown-item">ABC/XYZ</Link>
              <Link to="/optimization" className="dropdown-item">Optimization</Link>
              <Link to="/scenario-analysis" className="dropdown-item">Scenario Analysis</Link>
            </div>
          </div>

          <div className="navbar-dropdown">
            <span className="navbar-link">Analysis</span>
            <div className="dropdown-content">
              <Link to="/univariate" className="dropdown-item">Univariate</Link>
              <Link to="/bivariate" className="dropdown-item">Bivariate</Link>
              <Link to="/multivariate" className="dropdown-item">Multivariate</Link>
            </div>
          </div>

          {/* Profile Icon and Dropdown */}
          <div className="navbar-dropdown profile-dropdown">
            <Avatar onClick={toggleDropdown} style={{ cursor: 'pointer' }} />
            {dropdownOpen && (
              <div className="dropdown-content">
                <Link to="/profile" className="dropdown-item">Profile</Link>
                <span 
                  className="dropdown-item" 
                  onClick={handleLogout} // Trigger the logout function
                  style={{ cursor: 'pointer' }}
                >
                  Logout
                </span>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBars;
