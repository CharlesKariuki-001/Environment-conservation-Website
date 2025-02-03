import React from "react";
import { Link } from "react-router-dom";
import { FaTree, FaRecycle, FaGlobe, FaUsers, FaHandsHelping } from "react-icons/fa";
import { motion } from "framer-motion";
import "../components/HomePage.css";

const HomePage = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
          Together for a Greener Future!
        </motion.h1>
        <p>Join the movement to protect our environment and ensure a sustainable future.</p>
      </section>

      {/* Key Features */}
      <section className="features">
        <div className="feature-card">
          <FaTree className="icon" />
          <h3>Our Mission</h3>
          <p>Promoting environmental awareness and sustainable living.</p>
        </div>
        <div className="feature-card">
          <FaRecycle className="icon" />
          <h3>Eco-Friendly Tips</h3>
          <p>Learn simple ways to reduce your carbon footprint.</p>
        </div>
        <div className="feature-card">
          <FaGlobe className="icon" />
          <h3>Climate & Weather</h3>
          <p>Understand how weather patterns affect the planet.</p>
        </div>
        <div className="feature-card">
          <FaUsers className="icon" />
          <h3>Community Projects</h3>
          <p>Discover and support local environmental initiatives.</p>
        </div>
      </section>

      {/* Interactive Section */}
      <section className="interactive">
        <motion.div className="interactive-card" whileHover={{ scale: 1.1 }}>
          <h3>Take the Green Pledge</h3>
          <p>Commit to small actions that make a big impact.</p>
        </motion.div>
        <motion.div className="interactive-card" whileHover={{ scale: 1.1 }}>
          <h3>Carbon Footprint Quiz</h3>
          <p>Assess your impact on the environment.</p>
        </motion.div>
      </section>

      {/* Stories Section */}
      <section className="stories">
        <h2>Featured Stories</h2>
        <div className="story-card">
          <h3>How One Village Revived Its Forest</h3>
          <p>Read about a small community making a big difference.</p>
        </div>
        <div className="story-card">
          <h3>10 Ways You Can Help the Planet Today</h3>
          <p>Practical steps you can take right now.</p>
        </div>
      </section>

      {/* Testimonials & Impact */}
      <section className="testimonials">
        <h2>Our Impact</h2>
        <motion.div className="testimonial-card" whileHover={{ scale: 1.05 }}>
          <p>"This platform helped me learn how to conserve water and reduce waste. A game-changer!"</p>
          <h4>- Jane Doe</h4>
        </motion.div>
        <motion.div className="testimonial-card" whileHover={{ scale: 1.05 }}>
          <p>"I joined a tree-planting initiative through this site. Amazing experience!"</p>
          <h4>- John Smith</h4>
        </motion.div>
      </section>

      {/* Call-to-Action Buttons */}
      <section className="cta">
        <Link to="/join-us" className="cta-button join">
          <FaHandsHelping className="icon" /> Join Us
        </Link>
        <Link to="/donate" className="cta-button donate">
          💚 Donate
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
