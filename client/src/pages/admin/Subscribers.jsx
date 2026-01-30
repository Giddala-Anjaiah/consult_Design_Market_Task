import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaTrash, FaEnvelope, FaDownload } from 'react-icons/fa';

const AdminSubscribers = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('/api/admin/subscribers', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSubscribers(data);
      setLoading(false);
    } catch (err) {
      toast.error('Failed to fetch subscribers');
      setLoading(false);
    }
  };

  const deleteSubscriber = async (id) => {
    if (window.confirm('Are you sure you want to delete this subscriber?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/admin/subscribers/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        toast.success('Subscriber deleted successfully');
        fetchSubscribers();
      } catch (err) {
        toast.error('Failed to delete subscriber');
      }
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Email', 'Subscribed Date'],
      ...subscribers.map(sub => [
        sub.email,
        new Date(sub.subscribedAt).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'subscribers.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredSubscribers = subscribers.filter(subscriber =>
    subscriber.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="loading">Loading subscribers...</div>;

  return (
    <div className="admin-subscribers">
      <div className="admin-header">
        <h1>Newsletter Subscribers</h1>
        <div className="header-actions">
          <button 
            className="btn btn-primary"
            onClick={exportToCSV}
            disabled={subscribers.length === 0}
          >
            <FaDownload /> Export CSV
          </button>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search subscribers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="subscribers-grid">
        {filteredSubscribers.map((subscriber) => (
          <div key={subscriber._id} className="subscriber-card">
            <div className="subscriber-header">
              <div className="email-info">
                <FaEnvelope className="icon" />
                <span>{subscriber.email}</span>
              </div>
              <button 
                className="btn-icon danger"
                onClick={() => deleteSubscriber(subscriber._id)}
                title="Delete"
              >
                <FaTrash />
              </button>
            </div>
            
            <div className="subscriber-date">
              <small>Subscribed: {new Date(subscriber.subscribedAt).toLocaleDateString()}</small>
            </div>
          </div>
        ))}
      </div>

      {filteredSubscribers.length === 0 && (
        <div className="no-results">
          <p>No subscribers found</p>
        </div>
      )}
    </div>
  );
};

export default AdminSubscribers;
