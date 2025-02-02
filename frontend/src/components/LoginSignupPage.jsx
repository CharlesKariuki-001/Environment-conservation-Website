import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './LoginSignupPage.css';

const LoginSignupPage = ({ type }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',  // New field for email
    address: '' // New field for address
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate that fields are filled, especially for signup
    if (!formData.username || !formData.password || (type === 'signup' && (!formData.email || !formData.address))) {
      setError('Please fill in all required fields!');
      return;
    }

    setIsLoading(true);
    const url = type === 'login' ? '/api/login' : '/api/signup';

    try {
      const response = await axios.post(url, formData);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);  // Store the token in localStorage
        // Redirect based on user role (admin or normal user)
        if (response.data.is_admin) {
          navigate('/admin'); // Redirect to admin page
        } else {
          navigate('/'); // Redirect to home page
        }
      } else {
        setError('Failed to authenticate. Please try again.');
      }

      // Show success message for signup
      if (type === 'signup' && response.data.message) {
        alert('A confirmation email has been sent!');
      }

    } catch (err) {
      // Handle error from backend
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-signup-page">
      <h2>{type === 'login' ? 'Login' : 'Sign Up'}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {type === 'signup' && (
          <>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </>
        )}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : type === 'login' ? 'Login' : 'Sign Up'}
        </button>
      </form>
      {type === 'login' ? (
        <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
      ) : (
        <p>Already have an account? <Link to="/login">Login here</Link></p>
      )}
    </div>
  );
};

export default LoginSignupPage;
