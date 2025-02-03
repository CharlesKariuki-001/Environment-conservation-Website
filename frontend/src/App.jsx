import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css'; // Import global styles

// Import Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import AdminPage from './components/AdminPage';
import LoginSignupPage from './components/LoginSignupPage';
import JoinUsPage from './components/JoinUsPage';
import DonatePage from './components/DonatePage';
import AboutUsPage from './components/AboutUsPage';
import AccountPage from './components/AccountPage';
import ContactPage from './components/ContactPage'; // New Contact Page

const App = () => {
  const [components, setComponents] = useState([]); // State to store environmental components
  const [isAuthenticated, setIsAuthenticated] = useState(false); // For user authentication check

  // Fetch the environmental components from the backend API
  useEffect(() => {
    const backendUrl = 'http://localhost:5000/api/environment-components'; // Replace with your backend URL
    fetch(backendUrl)
      .then((response) => response.json())
      .then((data) => setComponents(data))
      .catch((error) => console.error('Error fetching components:', error));
  }, []);

  // Check if the user is authenticated by checking for a JWT token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true); // If a token exists, user is authenticated
    }
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Display Navbar only if authenticated */}
        {isAuthenticated && <Navbar isAuthenticated={isAuthenticated} />}

        <main>
          <Routes>
            {/* Routes for when the user is not authenticated */}
            {!isAuthenticated ? (
              <>
                <Route path="/login" element={<LoginSignupPage type="login" />} />
                <Route path="/signup" element={<LoginSignupPage type="signup" />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </>
            ) : (
              <>
                {/* Routes for authenticated users */}
                <Route path="/" element={<HomePage components={components} />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/join-us" element={<JoinUsPage />} />
                <Route path="/donate" element={<DonatePage />} />
                <Route path="/about-us" element={<AboutUsPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/contact" element={<ContactPage />} /> {/* New Contact Page Route */}
                <Route path="*" element={<Navigate to="/" />} />
              </>
            )}
          </Routes>
        </main>

        {/* Display Footer only if authenticated */}
        {isAuthenticated && <Footer />}
      </div>
    </Router>
  );
};

export default App;
