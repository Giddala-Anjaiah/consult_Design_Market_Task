const Project = require('../models/Project');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Get all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add new project
exports.addProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image' });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'portfolio/projects',
      crop: 'fill',
      width: 800,
      height: 600
    });

    const project = new Project({
      name,
      description,
      image: {
        public_id: result.public_id,
        url: result.secure_url
      }
    });

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.error('Error adding project:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(project.image.public_id);

    await project.remove();
    res.json({ message: 'Project removed' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
