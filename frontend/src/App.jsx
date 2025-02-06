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
import ContactPage from './components/ContactPage'; 
import EnvironmentComponents from './components/EnvironmentComponents'; // ✅ Import EnvironmentComponents

const App = () => {
  const [components, setComponents] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false); 

  // Fetch the environmental components from the backend API
  useEffect(() => {
    const backendUrl = 'http://localhost:5000/api/environment-components'; 
    fetch(backendUrl)
      .then((response) => response.json())
      .then((data) => setComponents(data))
      .catch((error) => console.error('Error fetching components:', error));
  }, []);

  // Check if the user is authenticated by checking for a JWT token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true); 
    }
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Only show Navbar if authenticated */}
        {isAuthenticated && <Navbar isAuthenticated={isAuthenticated} />}

        <main>
          <Routes>
            {/* Routes for users not authenticated */}
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
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/environment-components" element={<EnvironmentComponents />} />
                
                {/* Fallback route */}
                <Route path="*" element={<Navigate to="/" />} />
              </>
            )}
          </Routes>
        </main>

        {/* Only show Footer if authenticated */}
        {isAuthenticated && <Footer />}
      </div>
    </Router>
  );
};

export default App;
