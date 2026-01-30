import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaProjectDiagram, FaUsers, FaEnvelope, FaBell, FaPlus, FaUserPlus, FaEye, FaList } from 'react-icons/fa';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    clients: 0,
    contacts: 0,
    subscribers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [projectsRes, clientsRes, contactsRes, subscribersRes] = await Promise.all([
        axios.get('/api/projects'),
        axios.get('/api/clients'),
        axios.get('/api/contact'),
        axios.get('/api/subscribers')
      ]);

      setStats({
        projects: projectsRes.data.length,
        clients: clientsRes.data.length,
        contacts: contactsRes.data.length,
        subscribers: subscribersRes.data.length
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage your website content and view analytics</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <FaProjectDiagram />
          </div>
          <div className="stat-content">
            <h3>{stats.projects}</h3>
            <p>Total Projects</p>
            <Link to="/admin/projects" className="btn btn-sm">Manage</Link>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaUsers />
          </div>
          <div className="stat-content">
            <h3>{stats.clients}</h3>
            <p>Total Clients</p>
            <Link to="/admin/clients" className="btn btn-sm">Manage</Link>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaEnvelope />
          </div>
          <div className="stat-content">
            <h3>{stats.contacts}</h3>
            <p>Contact Forms</p>
            <Link to="/admin/contacts" className="btn btn-sm">View</Link>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FaBell />
          </div>
          <div className="stat-content">
            <h3>{stats.subscribers}</h3>
            <p>Subscribers</p>
            <Link to="/admin/subscribers" className="btn btn-sm">View</Link>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <Link to="/admin/projects" className="btn btn-primary">
            <FaPlus /> Add New Project
          </Link>
          <Link to="/admin/clients" className="btn btn-primary">
            <FaUserPlus /> Add New Client
          </Link>
          <Link to="/admin/contacts" className="btn btn-secondary">
            <FaEye /> View Contacts
          </Link>
          <Link to="/admin/subscribers" className="btn btn-secondary">
            <FaList /> View Subscribers
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
