import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import videoFile from './video.mp4'; // Import video from the same folder
import logo from './logo.png'; // Import logo image (place logo.png in the same folder)

function LoginPage() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login Data:', formData);

    // Here, you can add validation or API calls for authentication
    const { username, password } = formData;

    // Temporary mock login validation
    if (username === 'user' && password === 'password') {
      // Save login state
      localStorage.setItem('isLoggedIn', 'true');

      // Redirect to home
      navigate('/home');
    } else {
      alert('Invalid username or password. Please try again.');
    }
  };

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'flex-end', // Aligns the container to the right
      alignItems: 'center', // Keeps it vertically centered
      height: '100vh',
      backgroundColor: '#f5f5f5',
      paddingRight: '220px', // Optional: Adds some spacing from the right edge
      position: 'relative', // Allows absolute positioning of the logo
    },
    form: {
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: '#fff',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      width: '300px',
    },
    input: {
      width: '100%',
      padding: '10px',
      margin: '10px 0',
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
      marginTop: '20px',
    },
    videoContainer: {
      position: 'absolute',
      top: '100px',
      left: '50px',
      width: '550px',
      height: '450px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      overflow: 'hidden',
    },
    video: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    logo: {
      position: 'absolute',
      top: '20px',
      left: '20px',
      width: 'auto', // Adjust the size of the logo
      height: '30px',
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
      {/* Logo */}
      <img src={logo} alt="Logo" style={styles.logo} />

      {/* Login Form */}
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: '20px', textAlign: 'center', color: '#333' }}>Login</h2>
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

      {/* Video Container */}
      <div style={styles.videoContainer}>
        <video style={styles.video} autoPlay loop muted>
          <source src={videoFile} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}

export default LoginPage;
