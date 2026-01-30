import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import OurProjects from '../components/OurProjects';

const Projects = () => {
  return (
    <div className="projects-page">
      <Header />
      <main className="page-content">
        <div className="container">
          <div className="page-header">
            <h1>Our Projects</h1>
            <p>Explore our latest work and success stories</p>
          </div>
          
          <OurProjects />
          
          <div className="cta-section">
            <h2>Have a Project in Mind?</h2>
            <p>We'd love to hear about your next project</p>
            <Link to="/contact" className="btn btn-primary">Start a Conversation</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
