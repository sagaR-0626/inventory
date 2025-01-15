import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link and useNavigate
import videoFile from './video.mp4'; // Import video from the same folder
import logo from './logo.png'; // Import logo image (place logo.png in the same folder)

function LoginPage({ setIsLoggedIn }) {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate(); // Initialize the navigate function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from submitting

    // Basic validation for username and password
    if (formData.username === '' || formData.password === '') {
      alert('Both fields are required!');
      return;
    }

    // Simulate successful login (replace with actual authentication logic)
    if (formData.username === 'user' && formData.password === 'password') {
      // Store login status in localStorage and set state
      localStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
      navigate('/home'); // Redirect to home page
    } else {
      alert('Invalid username or password');
    }
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
        <div style={styles.header}>Inventory Modelling</div>

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
            />
            <input
              style={styles.input}
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
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

// Styles for the LoginPage component
const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#f5f5f5',
    position: 'relative',
  },
  videoContainer: {
    flex: 1,
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // Ensures no overflow issues
  },
  video: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    margin: 0,
    padding: 0,
    border: 0,
    overflow: 'hidden',
  },
  logo: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    width: 'auto',
    height: '30px',
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    position: 'absolute',
    top: '20px',
    left: '50px',
    right: '20px',
    bottom: '30px',
    zIndex: 2,
    overflow: 'hidden',
  },
  header: {
    textAlign: 'center',
    fontSize: '50px',
    fontWeight: 'bold',
    padding: '40px',
    color: '#fff',
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: 'Times New Roman',
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
