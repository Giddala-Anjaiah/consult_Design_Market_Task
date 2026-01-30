import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    city: ''
  });
  const [loading, setLoading] = useState(false);

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
        name: formData.fullName,
        email: formData.email,
        phone: formData.mobileNumber,
        city: formData.city,
        message: 'Contact form submission'
      });

      toast.success('Contact form submitted successfully!');
      setFormData({
        fullName: '',
        email: '',
        mobileNumber: '',
        city: ''
      });
    } catch (err) {
      toast.error('Failed to submit form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-form-section">
      <div className="container">
        <div className="contact-form-container">
          <div className="contact-form-header">
            <h2>Get In Touch</h2>
            <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="mobileNumber">Mobile Number</label>
                <input
                  type="tel"
                  id="mobileNumber"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="Enter your mobile number"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                  required
                />
              </div>
            </div>
            
            <div className="form-submit">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
