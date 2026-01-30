import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
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
    <section className="newsletter">
      <div className="container">
        <div className="newsletter-content">
          <h3>Subscribe to Our Newsletter</h3>
          <p>Stay updated with our latest news and offers</p>
          
          <form onSubmit={handleSubmit} className="newsletter-form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            <button type="submit" className="btn" disabled={loading}>
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
