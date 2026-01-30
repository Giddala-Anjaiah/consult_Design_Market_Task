import React from 'react';
import { Link } from 'react-router-dom';
import ctaImage from '../assets/images/pexels-brett-sayles-2881232.svg';

const CallToAction = () => {
  return (
    <section className="call-to-action">
      <div className="cta-background" style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${ctaImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Business?</h2>
            <p>
              Learn more about our listing process, as well as our additional staging and design work. 
              Let us help you achieve your business goals with our comprehensive solutions.
            </p>
            <Link to="/contact" className="btn btn-primary btn-large">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
