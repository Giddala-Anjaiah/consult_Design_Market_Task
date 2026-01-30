const Client = require('../models/Client');
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Get all clients
exports.getClients = async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add new client
exports.addClient = async (req, res) => {
  try {
    const { name, designation, description } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image' });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'portfolio/clients',
      crop: 'fill',
      width: 300,
      height: 300,
      gravity: 'face'
    });

    const client = new Client({
      name,
      designation,
      description,
      image: {
        public_id: result.public_id,
        url: result.secure_url
      }
    });

    await client.save();
    res.status(201).json(client);
  } catch (error) {
    console.error('Error adding client:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete client
exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    // Delete image from Cloudinary
    await cloudinary.uploader.destroy(client.image.public_id);

    await client.remove();
    res.json({ message: 'Client removed' });
  } catch (error) {
    console.error('Error deleting client:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
