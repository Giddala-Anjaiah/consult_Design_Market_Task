import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null
  });
  const [preview, setPreview] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('/api/admin/projects', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects(data);
      setLoading(false);
    } catch (err) {
      toast.error('Failed to fetch projects');
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
    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('description', formData.description);
    if (formData.image) {
      formDataObj.append('image', formData.image);
    }

    try {
      const token = localStorage.getItem('token');
      if (editingProject) {
        await axios.put(`/api/admin/projects/${editingProject._id}`, formDataObj, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Project updated successfully');
      } else {
        await axios.post('/api/admin/projects', formDataObj, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Project added successfully');
      }
      fetchProjects();
      setShowModal(false);
      resetForm();
    } catch (err) {
      toast.error('Failed to save project');
    }
  };

  const deleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/admin/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        toast.success('Project deleted successfully');
        fetchProjects();
      } catch (err) {
        toast.error('Failed to delete project');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      image: null
    });
    setPreview('');
    setEditingProject(null);
  };

  if (loading) return <div className="loading">Loading projects...</div>;

  return (
    <div className="admin-projects">
      <div className="admin-header">
        <h1>Manage Projects</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          <FaPlus /> Add Project
        </button>
      </div>

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project._id}>
                <td>
                  <div className="table-image">
                    <img src={project.image.url} alt={project.name} />
                  </div>
                </td>
                <td>{project.name}</td>
                <td>{project.description.substring(0, 100)}...</td>
                <td className="actions">
                  <button className="btn-icon" title="Edit">
                    <FaEdit />
                  </button>
                  <button 
                    className="btn-icon danger" 
                    onClick={() => deleteProject(project._id)}
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

      {/* Add Project Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Add New Project</h2>
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
                  <label>Project Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
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
                  <label>Project Image</label>
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
                    Add Project
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

export default AdminProjects;
