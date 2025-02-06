import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginSignupPage.css';

const LoginSignupPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Controls login/signup mode
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    address: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Toggle between Login and Signup
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
    setFormData({
      username: '',
      password: '',
      email: '',
      address: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password || (!isLogin && (!formData.email || !formData.address))) {
      setError('Please fill in all required fields!');
      return;
    }

    setIsLoading(true);
    const url = isLogin ? 'http://localhost:5000/api/login' : 'http://localhost:5000/api/signup';

    try {
      const response = await axios.post(url, formData);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        navigate(response.data.is_admin ? '/admin' : '/');
      } else {
        setError('Failed to authenticate. Please try again.');
      }

      if (!isLogin && response.data.message) {
        alert(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-signup-page">
      <div className="form-container">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          {!isLogin && (
            <>
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
              <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
            </>
          )}
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Processing...' : isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button onClick={toggleForm} className="switch-form-btn">
            {isLogin ? ' Sign up here' : ' Login here'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginSignupPage;
