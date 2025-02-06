import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './AccountPage.css';

const AccountPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      axios
        .get('http://localhost:5000/api/user', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUserData(response.data);
        })
        .catch((err) => {
          setError('Failed to fetch user data');
          setIsLoggedIn(false);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/loginsignup'); // Redirect to login/signup page
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="account-page">
      <h2>Account</h2>
      {error && <p className="error-message">{error}</p>}
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
          <Link to="/loginsignup">
            <button className="auth-btn">Login / Sign Up</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
