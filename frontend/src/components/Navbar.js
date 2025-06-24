import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('authToken');
  const username = localStorage.getItem('username');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 700);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const navStyle = {
    padding: '0.5rem 2rem',
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    position: 'relative',
    zIndex: 20,
  };

  const logoStyle = {
    textDecoration: 'none',
    color: '#1a237e',
    fontWeight: 700,
    fontSize: '2rem',
    letterSpacing: '1px',
  };

  const menuButtonStyle = {
    display: isMobile ? 'block' : 'none',
    background: 'none',
    border: 'none',
    fontSize: '2rem',
    cursor: 'pointer',
    color: '#1a237e',
    marginLeft: '1rem',
  };

  const linksContainerStyle = {
    display: isMobile ? (menuOpen ? 'flex' : 'none') : 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    alignItems: isMobile ? 'flex-start' : 'center',
    position: isMobile ? 'absolute' : 'static',
    top: isMobile ? '60px' : 'auto',
    right: isMobile ? '2rem' : 'auto',
    background: isMobile ? '#fff' : 'none',
    width: isMobile ? '180px' : 'auto',
    boxShadow: isMobile && menuOpen ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
    borderRadius: isMobile ? '8px' : '0',
    padding: isMobile ? '1rem 0.5rem' : '0',
    gap: isMobile ? '0.5rem' : '1.5rem',
    minHeight: isMobile && menuOpen ? '120px' : 'auto',
    zIndex: 30,
    transition: 'all 0.2s',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#3949ab',
    fontWeight: 500,
    fontSize: '1.1rem',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    transition: 'background 0.2s',
    margin: isMobile ? '0.25rem 0' : '0',
    display: 'block',
  };

  const buttonStyle = {
    padding: '0.5rem 1.2rem',
    background: '#3949ab',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 500,
    cursor: 'pointer',
    fontSize: '1rem',
    marginLeft: isMobile ? '0' : '0.5rem',
    marginTop: isMobile ? '0.5rem' : '0',
    transition: 'background 0.2s',
  };

  return (
    <nav style={navStyle}>
      <Link to={isAuthenticated ? "/" : "/login"} style={logoStyle}>
        Notes
      </Link>
      <button
        className="navbar-menu-btn"
        style={menuButtonStyle}
        onClick={() => setMenuOpen((open) => !open)}
        aria-label="Toggle menu"
      >
        {menuOpen ? '✕' : '☰'}
      </button>
      <div
        className="navbar-links"
        style={linksContainerStyle}
        onClick={() => isMobile && setMenuOpen(false)}
      >
        {isAuthenticated ? (
          <>
            <span style={{ color: '#222', fontWeight: 500, marginBottom: isMobile ? '0.5rem' : 0 }}>
              Hi {username || 'User'}👋
            </span>
            {/* <Link to="/" style={linkStyle}>My Notes</Link> */}
            <button onClick={handleLogout} style={buttonStyle}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/signup" style={linkStyle}>Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;








// The Navbar component is a responsive navigation bar for a React app.
// It uses React hooks (useState, useEffect) to manage state and side effects.
// menuOpen controls whether the mobile menu is open.
// isMobile tracks if the screen width is 700px or less, updating on window resize.
// useNavigate from React Router is used to programmatically navigate between routes.
// Authentication status is checked using localStorage for an authToken.
// The username is also retrieved from localStorage.
// Inline style objects are used for styling the navbar and its elements.
// The logo (Notes) links to the home page if authenticated, otherwise to the login page.
// On mobile, a hamburger menu button toggles the menu open/close.
// The navigation links are shown or hidden based on isMobile and menuOpen.
// If authenticated, the navbar greets the user and shows a Logout button.
// If not authenticated, Login and Signup links are shown.
// Clicking Logout removes authentication info from localStorage and redirects to the login page.
// Clicking any link in the mobile menu closes the menu.