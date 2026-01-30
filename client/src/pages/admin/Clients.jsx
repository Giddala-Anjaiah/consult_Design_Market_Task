import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';

const AdminClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    description: '',
    image: null
  });
  const [preview, setPreview] = useState('');

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('/api/admin/clients', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setClients(data);
      setLoading(false);
    } catch (err) {
      toast.error('Failed to fetch clients');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file
    });

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('designation', formData.designation);
    formDataToSend.append('description', formData.description);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      await axios.post('/api/admin/clients', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });

      toast.success('Client added successfully');
      setShowModal(false);
      setFormData({ name: '', designation: '', description: '', image: null });
      setPreview('');
      fetchClients();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add client');
    }
  };

  const deleteClient = async (id) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/admin/clients/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        toast.success('Client deleted successfully');
        fetchClients();
      } catch (err) {
        toast.error('Failed to delete client');
      }
    }
  };

  if (loading) return <div className="loading">Loading clients...</div>;

  return (
    <div className="admin-clients">
      <div className="admin-header">
        <h1>Manage Clients</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          <FaPlus /> Add Client
        </button>
      </div>

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client._id}>
                <td>
                  <div className="table-image">
                    <img src={client.image.url} alt={client.name} />
                  </div>
                </td>
                <td>{client.name}</td>
                <td>{client.designation}</td>
                <td>{client.description.substring(0, 100)}...</td>
                <td className="actions">
                  <button className="btn-icon" title="Edit">
                    <FaEdit />
                  </button>
                  <button 
                    className="btn-icon danger" 
                    onClick={() => deleteClient(client._id)}
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Client Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add New Client</h2>
              <button 
                className="close-btn"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Client Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Designation</label>
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    required
                  ></textarea>
                </div>
                <div className="form-group">
                  <label>Client Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                  />
                  {preview && (
                    <div className="image-preview">
                      <img src={preview} alt="Preview" />
                    </div>
                  )}
                </div>
                <div className="form-actions">
                  <button 
                    type="button" 
                    className="btn btn-outline"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Add Client
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminClients;
