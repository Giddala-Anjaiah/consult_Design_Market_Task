import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="about-page">
      <Header />
      <main className="page-content">
        <div className="container">
          <div className="page-header">
            <h1>About Us</h1>
            <p>Learn more about our company and what we do</p>
          </div>
          
          <div className="about-content">
            <div className="about-section">
              <h2>Our Story</h2>
              <p>
                We are a team of dedicated professionals with years of experience in consultation, design, and marketing. 
                Our mission is to help businesses like yours achieve their full potential through innovative solutions 
                and personalized service. We believe in building long-term relationships with our clients and delivering 
                exceptional results that exceed expectations.
              </p>
            </div>
            
            <div className="about-section">
              <h2>Our Mission</h2>
              <p>
                To provide exceptional business solutions that drive growth and success for our clients through 
                innovative strategies, creative design, and data-driven marketing approaches.
              </p>
            </div>
            
            <div className="about-section">
              <h2>Our Values</h2>
              <ul>
                <li><strong>Innovation:</strong> We embrace creativity and cutting-edge solutions</li>
                <li><strong>Integrity:</strong> We conduct business with honesty and transparency</li>
                <li><strong>Excellence:</strong> We strive for the highest quality in everything we do</li>
                <li><strong>Collaboration:</strong> We work as partners with our clients</li>
              </ul>
            </div>
            
            <div className="cta-section">
              <h2>Ready to Work Together?</h2>
              <p>Let's discuss how we can help your business grow</p>
              <Link to="/contact" className="btn btn-primary">Get In Touch</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
