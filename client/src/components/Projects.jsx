import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaArrowRight } from 'react-icons/fa';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get('/api/projects');
        setProjects(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch projects');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div className="loading">Loading projects...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <div className="section-header">
          <h2>Our Projects</h2>
          <p>Check out some of our recent work</p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project._id} className="project-card">
              <div className="project-image">
                <img src={project.image.url} alt={project.name} />
              </div>
              <div className="project-content">
                <h3>{project.name}</h3>
                <p>{project.description.substring(0, 150)}...</p>
                <Link to="#" className="btn btn-link">
                  Read More <FaArrowRight />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
