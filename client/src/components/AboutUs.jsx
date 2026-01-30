import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <section className="about-us">
      <div className="container">
        <div className="section-header">
          
        </div>
        
        <div className="about-content">
          <div className="about-text">
            <p>
              We are a team of dedicated professionals with years of experience in consultation, design, and marketing. 
              Our mission is to help businesses like yours achieve their full potential through innovative solutions 
              and personalized service. We believe in building long-term relationships with our clients and delivering 
              exceptional results that exceed expectations.
            </p>
            <Link to="/about" className="btn btn-primary">
              Learn More
            </Link>
          </div>
          
          <div className="about-image">
            <img src="/assets/images/pexels-fauxels-3182834.svg" alt="About Us" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
