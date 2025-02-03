import React from 'react';
import './Footer.css'; // Import the footer styles

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; 2025 Nature Net. All rights reserved.</p>
      <p>
        <a href="https://www.example.com/privacy-policy" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </a> | 
        <a href="https://www.example.com/terms" target="_blank" rel="noopener noreferrer">
          Terms of Service
        </a>
      </p>
    </footer>
  );
};

export default Footer;
