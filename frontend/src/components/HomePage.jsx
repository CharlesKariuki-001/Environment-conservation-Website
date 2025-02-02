// src/components/HomePage.jsx
import React from 'react';
import EnvironmentComponents from './EnvironmentComponents';

const HomePage = ({ components }) => {
  return (
    <div>
      <section className="intro">
        <h1>Welcome to Nature Net</h1>
        <p>Your platform for environmental conservation.</p>
      </section>
      
      <section className="components-list">
        <h2>Important Environmental Components</h2>
        <EnvironmentComponents components={components} />
      </section>
    </div>
  );
};

export default HomePage;
