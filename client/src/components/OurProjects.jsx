import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OurProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get('/api/projects');
        setProjects(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const defaultProjects = [
    {
      _id: '1',
      name: 'Consultation',
      description: 'Strategic business consultation to help you make informed decisions and achieve your goals.',
      location: 'Business District',
      image: { url: '/assets/images/pexels-andres-ayrton-6578391.svg' },
      sold: false
    },
    {
      _id: '2',
      name: 'Design',
      description: 'Creative design solutions that make your brand stand out and connect with your audience.',
      location: 'Creative Hub',
      image: { url: '/assets/images/pexels-brett-sayles-2881232-1.svg' },
      sold: false
    },
    {
      _id: '3',
      name: 'Marketing & Design',
      description: 'Integrated marketing and design services for comprehensive brand development.',
      location: 'Marketing Center',
      image: { url: '/assets/images/pexels-brett-sayles-2881232-2.svg' },
      sold: false
    },
    {
      _id: '4',
      name: 'Consultation & Marketing',
      description: 'Combined consultation and marketing strategies for business growth and success.',
      location: 'Business Park',
      image: { url: '/assets/images/pexels-brett-sayles-2881232-3.svg' },
      sold: true
    },
    {
      _id: '5',
      name: 'Full Service Package',
      description: 'Complete business solution including consultation, design, and marketing services.',
      location: 'Service Plaza',
      image: { url: '/assets/images/pexels-brett-sayles-2881232-2.svg' },
      sold: false
    },
    {
      _id: '6',
      name: 'Digital Transformation',
      description: 'Complete digital transformation services for modern businesses.',
      location: 'Tech Valley',
      image: { url: '/assets/images/pexels-fauxels-3182834.svg' },
      sold: false
    }
  ];

  const displayProjects = projects.length > 0 ? projects : defaultProjects;

  if (loading) return <div className="loading">Loading projects...</div>;

  return (
    <section id="projects" className="our-projects">
      <div className="container">
        <div className="projects-grid">
          {displayProjects.map((project) => (
            <div key={project._id} className="project-card">
              <div className="project-image">
                <img src={project.image.url} alt={project.name} />
                {project.sold && (
                  <div className="sold-badge">SOLD</div>
                )}
              </div>
              <div className="project-content">
                <h3>{project.name}</h3>
                <p className="project-location">{project.location}</p>
                <p className="project-description">{project.description}</p>
                <button className="btn btn-primary read-more-btn">
                  READ MORE
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurProjects;
