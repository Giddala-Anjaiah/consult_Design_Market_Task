import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    setLoading(true);

    try {
      await axios.post('/api/subscribe', { email });
      toast.success('Subscribed successfully!');
      setEmail('');
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to subscribe';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-grid">
            {/* Logo and Description */}
            <div className="footer-section">
              <div className="logo">
                <Link to="/">ConsultPro</Link>
              </div>
              <p>Transform your business with expert consultation, design, and marketing solutions.</p>
              <div className="social-links">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <FaFacebook />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <FaTwitter />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin />
                </a>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/projects">Projects</Link></li>
                <li><Link to="/testimonials">Testimonials</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="footer-section">
              <h4>Newsletter</h4>
              <p>Subscribe to get updates on our latest projects and insights.</p>
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            </div>
          </div>
          
          <div className="copyright">
            &copy; {currentYear} ConsultPro. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
