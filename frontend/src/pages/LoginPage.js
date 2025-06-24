import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { login, getCurrentUser } from '../services/api';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState(location.state?.message || '');


  useEffect(() => {
    // If user is already logged in, redirect to home
    if (getCurrentUser()) {
      navigate('/');
    }
    // Clear message after showing it once
    if (location.state?.message) {
        const timer = setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
        return () => clearTimeout(timer);
    }
  }, [navigate, location.state]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage(''); // Clear any existing messages

    if (!username.trim() || !password.trim()) {
      setError('Username and password are required.');
      return;
    }
    setLoading(true);
    try {
      await login({ username, password });
      // The login service already stores the token and username in localStorage
      // console.log('Login successful:', response.data); // Removed for cleaner console
      navigate('/'); // Redirect to the main notes page
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
      console.error('Login error:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Login</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
          />
        </div>
        <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.75rem', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p style={{ marginTop: '1rem', textAlign: 'center' }}>
        Don't have an account? <Link to="/signup">Signup here</Link>
      </p>
    </div>
  );
};

export default LoginPage;







// Imports React hooks (useState, useEffect) and React Router functions (Link, useNavigate, useLocation).
// Imports login and getCurrentUser functions from a local API service.
// Defines the LoginPage functional component for user login.
// Initializes state for username, password, error messages, loading status, and a message from navigation state.
// Uses useEffect to:
// Redirect to home if the user is already logged in.
// Show a one-time message (e.g., after signup) and clear it after 3 seconds.
// Defines handleSubmit to:
// Prevent default form submission.
// Validate that username and password are not empty.
// Call the login API, handle loading state, and redirect to home on success.
// Show error messages if login fails.
// Renders a styled login form with fields for username and password, a login button, and links to the signup page.
// Displays error and success messages above the form.
// Exports the LoginPage component as default.