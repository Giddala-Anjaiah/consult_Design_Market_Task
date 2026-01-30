import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HappyClients from '../components/HappyClients';

const Testimonials = () => {
  return (
    <div className="testimonials-page">
      <Header />
      <main className="page-content">
        <div className="container">
          <div className="page-header">
            <h1>Client Testimonials</h1>
            <p>See what our clients have to say about working with us</p>
          </div>
          
          <HappyClients />
          
          <div className="cta-section">
            <h2>Join Our Happy Clients</h2>
            <p>Let us help you achieve your business goals</p>
            <Link to="/contact" className="btn btn-primary">Get Started</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Testimonials;
