import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaLeaf, FaInfoCircle, FaEnvelope, FaUserCircle } from 'react-icons/fa'; // Import icons
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="navbar">
      <div className="logo">
        <h2>Nature Net</h2>
      </div>

      <div className="menu-icon" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <NavLink to="/" exact activeClassName="active">
          <FaHome className="nav-icon" /> Home
        </NavLink>
        <NavLink to="/components" activeClassName="active">
          <FaLeaf className="nav-icon" /> Environmental Components
        </NavLink>
        <NavLink to="/about" activeClassName="active">
          <FaInfoCircle className="nav-icon" /> About Us
        </NavLink>
        <NavLink to="/contact" activeClassName="active">
          <FaEnvelope className="nav-icon" /> Contact
        </NavLink>

        {/* Account Link with User Icon */}
        <NavLink to="/account" className="account-link">
          <FaUserCircle className="nav-icon" /> Account
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
