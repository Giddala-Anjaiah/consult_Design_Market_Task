import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  return (
    <div className="contact-page">
      <Header />
      <main className="page-content">
        <div className="container">
          <div className="page-header">
            <p>Get in touch with us for your next project</p>
          </div>
          
          <ContactForm />
          
          <div className="contact-info-section">
            <div className="contact-info-grid">
              <div className="contact-info-card">
                <h3>Email</h3>
                <p>info@portfolio.com</p>
              </div>
              <div className="contact-info-card">
                <h3>Phone</h3>
                <p>+1 (555) 123-4567</p>
              </div>
              <div className="contact-info-card">
                <h3>Office</h3>
                <p>123 Business Ave<br />Suite 100<br />New York, NY 10001</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
