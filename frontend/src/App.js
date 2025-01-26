import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ProtectedApp from './pages/ProtectedApp';
import LoginPage from './pages/LoginPage';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // Replace history with useNavigate

  // For debugging
  // useEffect(() => {
  //   console.log('Authentication state has changed:', isAuthenticated);
  // }, [isAuthenticated]);

  useEffect(() => {
    // Check localStorage for authentication state on page load
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true); // Set the authentication state based on localStorage
    }
  }, []);


  // Define the onLogin function to handle authentication
  const handleLogin = (username, password) => {
    // Simulate a login check (replace with actual authentication logic)
    if (username === `${process.env.REACT_APP_USERNAME}` && password === `${process.env.REACT_APP_PASSWORD}`) {
      setIsAuthenticated(true); // Set authentication status to true
      localStorage.setItem('isAuthenticated', 'true'); // Save the authentication state to localStorage
      navigate('/');  // Navigate to home (protected route) on successful login
    } else {
      alert('Invalid credentials');
    }
  };

  return (

    <Routes>
      {/* Public Login Route */}
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/" replace /> : <LoginPage onLogin={handleLogin} />
        }
      />
  
      {/* Protected Application */}
      <Route
        path="/*"
        element={
          isAuthenticated ? <ProtectedApp /> : <Navigate to="/login" replace />
        }
      />
    </Routes>
  
    
  );
};

export default App;
