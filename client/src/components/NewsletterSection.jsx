import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import newsletterImage from '../assets/images/pexels-fauxels-3182834.svg';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('/api/subscribe', { email });
      toast.success('Successfully subscribed to newsletter!');
      setEmail('');
    } catch (err) {
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="newsletter-section" style={{
      backgroundImage: `url(${newsletterImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative'
    }}>
      <div className="container">
        <div className="newsletter-content">
          <div className="newsletter-text">
            <h2>Subscribe to Our Newsletter</h2>
            <p>Get the latest updates, news, and exclusive offers delivered directly to your inbox.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="newsletter-form">
            <div className="newsletter-input-group">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="newsletter-input"
              />
              <button 
                type="submit" 
                className="newsletter-btn"
                disabled={loading}
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
