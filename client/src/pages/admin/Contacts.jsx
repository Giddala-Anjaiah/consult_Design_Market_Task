import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaTrash, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('/api/admin/contacts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setContacts(data);
      setLoading(false);
    } catch (err) {
      toast.error('Failed to fetch contacts');
      setLoading(false);
    }
  };

  const deleteContact = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/admin/contacts/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        toast.success('Contact deleted successfully');
        fetchContacts();
      } catch (err) {
        toast.error('Failed to delete contact');
      }
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="loading">Loading contacts...</div>;

  return (
    <div className="admin-contacts">
      <div className="admin-header">
        <h1>Contact Form Submissions</h1>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="contacts-grid">
        {filteredContacts.map((contact) => (
          <div key={contact._id} className="contact-card">
            <div className="contact-header">
              <h3>{contact.name}</h3>
              <button 
                className="btn-icon danger"
                onClick={() => deleteContact(contact._id)}
                title="Delete"
              >
                <FaTrash />
              </button>
            </div>
            
            <div className="contact-info">
              <div className="info-item">
                <FaEnvelope className="icon" />
                <span>{contact.email}</span>
              </div>
              <div className="info-item">
                <FaPhone className="icon" />
                <span>{contact.phone}</span>
              </div>
              <div className="info-item">
                <FaMapMarkerAlt className="icon" />
                <span>{contact.city}</span>
              </div>
            </div>
            
            {contact.message && (
              <div className="contact-message">
                <h4>Message:</h4>
                <p>{contact.message}</p>
              </div>
            )}
            
            <div className="contact-date">
              <small>Submitted: {new Date(contact.createdAt).toLocaleDateString()}</small>
            </div>
          </div>
        ))}
      </div>

      {filteredContacts.length === 0 && (
        <div className="no-results">
          <p>No contacts found</p>
        </div>
      )}
    </div>
  );
};

export default AdminContacts;
