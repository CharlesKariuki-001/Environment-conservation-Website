import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaLeaf, FaInfoCircle, FaEnvelope } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <NavLink to="/environment-components" activeClassName="active">
          <FaLeaf className="nav-icon" /> Environmental Components
        </NavLink>
        <NavLink to="/about-us" activeClassName="active">
          <FaInfoCircle className="nav-icon" /> About Us
        </NavLink>
        <NavLink to="/contact" activeClassName="active">
          <FaEnvelope className="nav-icon" /> Contact
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
