import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaProjectDiagram, FaUsers, FaEnvelope, FaNewspaper } from 'react-icons/fa';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    clients: 0,
    contacts: 0,
    subscribers: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        
        const [projectsRes, clientsRes, contactsRes, subscribersRes] = await Promise.all([
          axios.get('/api/admin/projects', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('/api/admin/clients', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('/api/admin/contacts', {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get('/api/admin/subscribers', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        setStats({
          projects: projectsRes.data.length,
          clients: clientsRes.data.length,
          contacts: contactsRes.data.length,
          subscribers: subscribersRes.data.length
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch dashboard data');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="admin-dashboard">
      <h1>Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <FaProjectDiagram />
          </div>
          <h3>Projects</h3>
          <p className="count">{stats.projects}</p>
          <Link to="/admin/projects" className="btn btn-sm">
            Manage Projects
          </Link>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaUsers />
          </div>
          <h3>Clients</h3>
          <p className="count">{stats.clients}</p>
          <Link to="/admin/clients" className="btn btn-sm">
            Manage Clients
          </Link>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaEnvelope />
          </div>
          <h3>Contacts</h3>
          <p className="count">{stats.contacts}</p>
          <Link to="/admin/contacts" className="btn btn-sm">
            View Contacts
          </Link>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaNewspaper />
          </div>
          <h3>Subscribers</h3>
          <p className="count">{stats.subscribers}</p>
          <Link to="/admin/subscribers" className="btn btn-sm">
            View Subscribers
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
