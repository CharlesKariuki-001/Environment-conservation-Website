import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Import global styles
import App from './App'; // Import the main App component

const root = ReactDOM.createRoot(document.getElementById('root')); // Access the root div in index.html

root.render(
  <React.StrictMode>
    <App />  {/* Render the App component */}
  </React.StrictMode>
);
