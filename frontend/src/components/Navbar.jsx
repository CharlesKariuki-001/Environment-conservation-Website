import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; // Using NavLink for active styling
import './Navbar.css';  // Import the Navbar-specific CSS

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="navbar">
      <div className="logo">
        <h2>Nature Net</h2>
      </div>
      {/* Hamburger icon for mobile */}
      <div className="menu-icon" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      {/* Navigation links */}
      <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <NavLink to="/" exact activeClassName="active" aria-label="Go to Home">Home</NavLink>
        <NavLink to="/components" activeClassName="active" aria-label="View Environmental Components">Environmental Components</NavLink>
        <NavLink to="/about" activeClassName="active" aria-label="Learn About Us">About Us</NavLink>
        <NavLink to="/contact" activeClassName="active" aria-label="Contact Us">Contact</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
