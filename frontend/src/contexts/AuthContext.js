import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const username = localStorage.getItem('username');
    return username ? { username } : null;
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('username', userData.username);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('username');
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};



// Imports React, createContext, useContext, and useState from React.
// Creates an AuthContext using React’s createContext to hold authentication data.
// Defines a custom hook useAuth to easily access the AuthContext in other components.
// AuthProvider is a context provider component that wraps its children and manages authentication state.
// Initializes user state from localStorage (checks for the username).
// login function sets the user state and saves the username to localStorage.
// logout function clears the user state and removes username and authToken from localStorage.
// Provides user, login, and logout via AuthContext.Provider to all child components.