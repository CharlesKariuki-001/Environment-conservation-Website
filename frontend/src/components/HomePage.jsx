// HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaTree, FaRecycle, FaGlobe, FaUsers, FaHandsHelping } from "react-icons/fa";
import { motion } from "framer-motion";
import "../components/HomePage.css";

const HomePage = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
          Together for a Greener Future!
        </motion.h1>
        <p>Join the movement to protect our environment and ensure a sustainable future.</p>
      </section>
      <section className="features">
        {[{ icon: FaTree, title: "Our Mission", desc: "Promoting environmental awareness and sustainable living." },
          { icon: FaRecycle, title: "Eco-Friendly Tips", desc: "Learn simple ways to reduce your carbon footprint." },
          { icon: FaGlobe, title: "Climate & Weather", desc: "Understand how weather patterns affect the planet." },
          { icon: FaUsers, title: "Community Projects", desc: "Discover and support local environmental initiatives." }].map((feature, index) => (
            <motion.div key={index} className="feature-card" whileHover={{ scale: 1.05 }}>
              <feature.icon className="icon" />
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </motion.div>
        ))}
      </section>
    </div>
  );
};

export default HomePage;
