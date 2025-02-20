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
import ContactPage from './components/ContactPage';
import EnvironmentComponents from './components/EnvironmentComponents';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to check authentication state
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // Set authentication state based on token presence
  }, []);

  return (
    <Router>
      <div className="App">
        {isAuthenticated && <Navbar />}

        <main>
          <Routes>
            {/* If user is NOT authenticated, show the login/signup page first */}
            {!isAuthenticated ? (
              <>
                <Route path="/login" element={<LoginSignupPage setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/signup" element={<LoginSignupPage setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="*" element={<Navigate to="/login" />} /> {/* Redirect to login */}
              </>
            ) : (
              <>
                <Route path="/" element={<HomePage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/join-us" element={<JoinUsPage />} />
                <Route path="/donate" element={<DonatePage />} />
                <Route path="/about-us" element={<AboutUsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/environment-components" element={<EnvironmentComponents />} />
                <Route path="*" element={<Navigate to="/" />} /> {/* Redirect to home */}
              </>
            )}
          </Routes>
        </main>

        {isAuthenticated && <Footer />}
      </div>
    </Router>
  );
};

export default App;
