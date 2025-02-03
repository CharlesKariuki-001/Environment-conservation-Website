import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AccountPage.css';

const AccountPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      // Fetch user data (Replace with your backend API call)
      fetch('/api/user', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => setUserData(data))
        .catch(err => console.error('Error fetching user data', err));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div className="account-page">
      <h2>Account</h2>
      {isLoggedIn ? (
        <div className="account-details">
          <p><strong>Username:</strong> {userData?.username}</p>
          <p><strong>Email:</strong> {userData?.email}</p>
          <p><strong>Address:</strong> {userData?.address}</p>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="auth-options">
          <p>You are not logged in.</p>
          <Link to="/login">
            <button className="auth-btn">Login</button>
          </Link>
          <Link to="/signup">
            <button className="auth-btn">Sign Up</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
