import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post('/api/admin/login', formData);
      
      // Store token in localStorage
      localStorage.setItem('token', data.token);
      
      toast.success('Login successful!');
      navigate('/admin');
      window.location.reload(); // Refresh to update header
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Login failed';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Header />
      <main className="page-content">
        <div className="container">
          <div className="login-container">
            <div className="login-form-wrapper">
              <div className="login-header">
                <h1>Admin Login</h1>
                <p>Sign in to access the admin dashboard</p>
              </div>
              
              <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary login-btn"
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>
              
              <div className="login-footer">
                <p>Default credentials: admin / admin123</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
