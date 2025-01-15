import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import videoFile from './video.mp4'; // Import video from the same folder
import logo from './logo.png'; // Import logo image (place logo.png in the same folder)

function LoginPage() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate(); // Initialize the navigate function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, password } = formData;

    // Trim spaces from username and password to avoid any issues with extra spaces
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    console.log('Username:', trimmedUsername);  // Log the username
    console.log('Password:', trimmedPassword);  // Log the password

    // Check username and password
    if (trimmedUsername === 'Test' && trimmedPassword === 'Password') {
      console.log('Login successful');
      navigate('/home'); // Redirect to homepage
    } else {
      alert('Invalid username or password');
    }
  };

  const styles = {
    container: {
      display: 'flex',
      height: '100vh',
      backgroundColor: '#f5f5f5',
    },
    videoContainer: {
      flex: 1, // Takes half the width of the page
      position: 'relative', // Allows positioning of the logo over the video
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden', // Ensures no overflow issues
    },
    video: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      margin: 0, // Removes any default margins
      padding: 0, // Removes any default padding
      border: 0, // Removes any border
      overflow: 'hidden', // Ensures no overflow issues
    },
    logo: {
      position: 'absolute', // Positions the logo over the video
      top: '20px', // Adjust the vertical position
      left: '20px', // Adjust the horizontal position
      width: 'auto', // Set the logo width
      height: '30px', // Maintain aspect ratio
    },
    mainContainer: {
      display: 'flex',
      flexDirection: 'column', // Stack header and form vertically
      justifyContent: 'center', // Center contents vertically
      alignItems: 'center', // Center contents horizontally
      padding: '20px',
      position: 'absolute',
      top: '20px',
      left: '50px',
      right: '20px',
      bottom: '30px',
      zIndex: '2',
      overflow: 'hidden', // Ensures no overflow issues
    },
    header: {
      textAlign: 'center', // Center align the text
      fontSize: '50px', // Adjust the size of the header
      fontWeight: 'bold', // Make the header bold
      padding: '40px', // Add padding around the header
      color: '#fff', // White text color
      width: '100%',
      boxSizing: 'border-box', // Ensure padding is included in the width
      fontFamily: 'Times New Roman', // Roman font style
      animation: 'fadeIn 2s ease-out', // Apply fade-in animation
    },
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      position: 'relative',
      width: '150%',
    },
    form: {
      width: '350px',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#fff',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    input: {
      width: '100%',
      padding: '10px',
      margin: '10px -10px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      fontSize: '14px',
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
    },
    signUpLink: {
      display: 'block',
      textAlign: 'center',
      marginTop: '10px',
      fontSize: '14px',
      color: '#007bff',
      textDecoration: 'none',
    },
  };

  return (
    <div style={styles.container}>
      {/* Video Section */}
      <div style={styles.videoContainer}>
        <video style={styles.video} autoPlay loop muted>
          <source src={videoFile} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Logo Over Video */}
        <img src={logo} alt="Logo" style={styles.logo} />
      </div>

      {/* Main Content Section: Header + Login Form */}
      <div style={styles.mainContainer}>
        {/* Header Section */}
        <div style={styles.header}>
          Inventory Modelling
        </div>

        {/* Login Form Section */}
        <div style={styles.formContainer}>
          <form style={styles.form} onSubmit={handleSubmit}>
            <h2 style={{ marginBottom: '40px', textAlign: 'center', color: '#333' }}>Login</h2>
            <input
              style={styles.input}
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              style={styles.input}
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit" style={styles.button}>
              Login
            </button>

            {/* SignUp Link */}
            <Link to="/signup" style={styles.signUpLink}>
              Don't have an account? SignUp
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

// Add animation keyframes for fade-in effect
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(-20px); /* Start from above */
    }
    100% {
      opacity: 1;
      transform: translateY(0); /* End in original position */
    }
  }
`, styleSheet.cssRules.length);
