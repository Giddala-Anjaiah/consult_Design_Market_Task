import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isAdmin = localStorage.getItem('token');

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/" className="logo-link">
            <img src="/assets/images/logo.svg" alt="Portfolio Logo" className="logo-img" />
          </Link>
        </div>
        
        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/projects" onClick={() => setIsOpen(false)}>Projects</Link>
          <Link to="/testimonials" onClick={() => setIsOpen(false)}>Testimonials</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
          
          {isAdmin ? (
            <div className="admin-dropdown">
              <button className="admin-btn">
                <FaUser /> Admin
              </button>
              <div className="admin-menu">
                <Link to="/admin" onClick={() => setIsOpen(false)}>Dashboard</Link>
                <Link to="/admin/projects" onClick={() => setIsOpen(false)}>Manage Projects</Link>
                <Link to="/admin/clients" onClick={() => setIsOpen(false)}>Manage Clients</Link>
                <Link to="/admin/contacts" onClick={() => setIsOpen(false)}>View Contacts</Link>
                <Link to="/admin/subscribers" onClick={() => setIsOpen(false)}>View Subscribers</Link>
                <button 
                  onClick={() => {
                    localStorage.removeItem('token');
                    navigate('/');
                    window.location.reload();
                  }}
                  className="logout-btn"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="btn btn-outline">Admin Login</Link>
          )}
        </div>

        <div className="mobile-menu-btn" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </header>
  );
};

export default Header;
