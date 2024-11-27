import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar'; // Assuming Avatar for profile icon

function NavBars() {
  const [dropdownOpen, setDropdownOpen] = useState({ data: false, model: false, analysis: false, profile: false });
  const navigate = useNavigate();
  const dropdownRefs = useRef({}); // To keep track of each dropdown element

  const toggleDropdown = (dropdown) => {
    setDropdownOpen((prevState) => {
      const newState = { ...prevState, [dropdown]: !prevState[dropdown] };
      // Close other dropdowns
      Object.keys(newState).forEach((key) => {
        if (key !== dropdown) newState[key] = false;
      });
      return newState;
    });
  };

  const handleOutsideClick = (event) => {
    // Close dropdowns if clicking outside
    Object.keys(dropdownRefs.current).forEach((key) => {
      if (dropdownRefs.current[key] && !dropdownRefs.current[key].contains(event.target)) {
        setDropdownOpen((prevState) => ({ ...prevState, [key]: false }));
      }
    });
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate('/');
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: '#333',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 20px',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="./Collabridge logo-white R.png"
            alt="Company Logo"
            style={{ height: '30px' }}
          />
        </div>

        {/* Navbar Links */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Home */}
          <Link
            to="/home"
            style={{
              color: 'white',
              textDecoration: 'none',
              marginRight: '40px',
              fontSize: '17px',
              cursor: 'pointer',
              fontFamily: 'Georgia, serif',
            }}
          >
            Home
          </Link>

          {/* Data Management Dropdown */}
          <div
            ref={(el) => (dropdownRefs.current.data = el)}
            style={{ position: 'relative', marginRight: '20px' }}
          >
            <span
              onClick={() => toggleDropdown('data')}
              style={{
                color: 'white',
                textDecoration: 'none',
                fontSize: '17px',
                marginRight:'40px',
                cursor: 'pointer',
                fontFamily: 'Georgia, serif',
              }}
            >
              Data Management
            </span>
            {dropdownOpen.data && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  backgroundColor: 'white',
                  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                  borderRadius: '5px',
                  zIndex: 1001,
                }}
              >
                <Link
                  to="/data-upload"
                  style={{
                    display: 'block',
                    padding: '10px 15px',
                    color: '#333',
                    textDecoration: 'none',
                    fontSize: '14px', 
                    cursor: 'pointer',
                  }}
                >
                  Data Upload
                </Link>
              </div>
            )}
          </div>

          {/* Modeling Dropdown */}
          <div
            ref={(el) => (dropdownRefs.current.model = el)}
            style={{ position: 'relative', marginRight: '20px' }}
          >
            <span
              onClick={() => toggleDropdown('model')}
              style={{
                color: 'white',
                textDecoration: 'none',
                fontSize: '17px',
                marginRight:'40px',
                cursor: 'pointer',
                fontFamily: 'Georgia, serif',
              }}
            >
              Modeling
            </span>
            {dropdownOpen.model && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  backgroundColor: 'white',
                  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                  borderRadius: '5px',
                  zIndex: 1001,
                }}
              >
                <Link
                  to="/mlr"
                  style={{
                    display: 'block',
                    padding: '10px 15px',
                    color: '#333',
                    textDecoration: 'none',
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  MLR
                </Link>
                <Link
                  to="/eoq"
                  style={{
                    display: 'block',
                    padding: '10px 15px',
                    color: '#333',
                    textDecoration: 'none',
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  EOQ
                </Link>
                <Link
                  to="/abc-xyz"
                  style={{
                    display: 'block',
                    padding: '10px 15px',
                    color: '#333',
                    textDecoration: 'none',
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  ABC/XYZ
                </Link>
              </div>
            )}
          </div>

          {/* Analysis Dropdown */}
          <div
            ref={(el) => (dropdownRefs.current.analysis = el)}
            style={{ position: 'relative', marginRight: '20px' }}
          >
            <span
              onClick={() => toggleDropdown('analysis')}
              style={{
                color: 'white',
                textDecoration: 'none',
                fontSize: '17px',
                marginRight:'40px',
                cursor: 'pointer',
                fontFamily: 'Georgia, serif',
              }}
            >
              Analysis
            </span>
            {dropdownOpen.analysis && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  backgroundColor: 'white',
                  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                  borderRadius: '5px',
                  zIndex: 1001,
                }}
              >
                <Link
                  to="/univariate"
                  style={{
                    display: 'block',
                    padding: '10px 15px',
                    color: '#333',
                    textDecoration: 'none',
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  Univariate
                </Link>
                <Link
                  to="/bivariate"
                  style={{
                    display: 'block',
                    padding: '10px 15px',
                    color: '#333',
                    textDecoration: 'none',
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  Bivariate
                </Link>
                <Link
                  to="/multivariate"
                  style={{
                    display: 'block',
                    padding: '10px 15px',
                    color: '#333',
                    textDecoration: 'none',
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  Multivariate
                </Link>
              </div>
            )}
          </div>

          {/* Profile Icon and Dropdown */}
          <div
            ref={(el) => (dropdownRefs.current.profile = el)}
            style={{ position: 'relative' }}
          >
            <Avatar
              onClick={() => toggleDropdown('profile')}
              style={{ cursor: 'pointer', backgroundColor: '#555' }}
            />
            {dropdownOpen.profile && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  minWidth: '160px',
                  backgroundColor: 'white',
                  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                  borderRadius: '5px',
                  zIndex: 1001,
                }}
              >
                <Link
                  to="/profile"
                  style={{
                    display: 'block',
                    padding: '10px 15px',
                    color: '#333',
                    textDecoration: 'none',
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  Profile
                </Link>
                <span
                  onClick={handleLogout}
                  style={{
                    display: 'block',
                    padding: '10px 15px',
                    color: '#333',
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
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
