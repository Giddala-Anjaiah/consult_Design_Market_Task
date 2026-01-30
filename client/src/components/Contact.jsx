import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const { name, email, phone, city, message } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('/api/contact', {
        name,
        email,
        phone,
        city,
        message
      });

      toast.success('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        city: '',
        message: ''
      });
    } catch (err) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="section-header">
          <h2>Get In Touch</h2>
          <p>Feel free to contact us for any questions</p>
        </div>

        <div className="contact-content">
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                placeholder="Your Name"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Your Email"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="tel"
                name="phone"
                value={phone}
                onChange={handleChange}
                placeholder="Your Phone"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="city"
                value={city}
                onChange={handleChange}
                placeholder="Your City"
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                value={message}
                onChange={handleChange}
                placeholder="Your Message"
                rows="5"
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
