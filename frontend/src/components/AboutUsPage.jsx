import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import './AboutUsPage.css'; // Import the CSS file for styling

const AboutUsPage = () => {
  return (
    <div className="about-us-container">
      <h1>About Us</h1>
      <section className="about-section">
        <h2>Who We Are</h2>
        <p>
          Nature Net is a leading organization dedicated to educating and empowering people to protect our planet. 
          Through awareness campaigns, tree planting initiatives, and environmental education, we aim to make a difference.
          We believe in the collective power of individuals to preserve the Earth for future generations.
        </p>
      </section>
      
      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to inspire environmental responsibility by offering hands-on programs, resources, and global outreach. 
          We focus on environmental education, climate change awareness, and practical steps for conservation.
        </p>
      </section>

      <section className="vision-section">
        <h2>Our Vision</h2>
        <p>
          To create a sustainable world where everyone understands their role in protecting nature and lives in harmony with the environment.
        </p>
      </section>

      <section className="team-section">
        <h2>Our Team</h2>
        <p>
          We are a diverse group of environmental enthusiasts, educators, and conservationists committed to bringing positive change. 
          Our team is passionate about promoting sustainability and has extensive experience in environmental research and community outreach.
        </p>
      </section>

      <section className="social-media">
        <h2>Follow Us</h2>
        <div className="social-icons">
          <a href="https://www.facebook.com" className="social-icon" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={30} />
          </a>
          <a href="https://twitter.com" className="social-icon" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={30} />
          </a>
          <a href="https://www.instagram.com" className="social-icon" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={30} />
          </a>
          <a href="https://www.linkedin.com" className="social-icon" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={30} />
          </a>
          <a href="https://www.youtube.com" className="social-icon" target="_blank" rel="noopener noreferrer">
            <FaYoutube size={30} />
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
