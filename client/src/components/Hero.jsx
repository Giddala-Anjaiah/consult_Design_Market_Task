import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import heroImage from '../assets/images/pexels-andres-ayrton-6578391.svg';

const Hero = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    serviceType: ''
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
        phone: formData.phone,
        city: 'Not specified',
        message: `Service Type: ${formData.serviceType}`
      });

      toast.success('Consultation request submitted successfully!');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        serviceType: ''
      });
    } catch (err) {
      toast.error('Failed to submit request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="hero">
      <div className="hero-background" style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Consultation, Design, & Marketing</h1>
              <p>Transform your business with our comprehensive solutions</p>
            </div>
            
            <div className="hero-form">
              <h3>Get a Free Consultation</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                  />
                </div>
                <div className="form-group">
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Service Type</option>
                    <option value="consultation">Consultation</option>
                    <option value="design">Design</option>
                    <option value="marketing">Marketing</option>
                    <option value="all">All Services</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Submitting...' : 'Get a Free Consultation'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
