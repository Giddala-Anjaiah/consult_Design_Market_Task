const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Controllers
const {
  getProjects,
  addProject,
  deleteProject
} = require('../controllers/projectController');

const {
  getClients,
  addClient,
  deleteClient
} = require('../controllers/clientController');

const {
  submitContact,
  getContacts,
  deleteContact
} = require('../controllers/contactController');

const {
  subscribe,
  getSubscribers,
  unsubscribe
} = require('../controllers/subscriberController');

// Middleware
const { protect } = require('../middleware/auth');

// Multer configuration
const storage = multer.diskStorage({
  filename: function(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

// Admin login route
router.post('/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: 'Please provide username and password' });
    }

    // Find user with password
    const user = await User.findOne({ username }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Public routes
router.get('/projects', getProjects);
router.get('/clients', getClients);
router.post('/contact', submitContact);
router.post('/subscribe', subscribe);
router.get('/unsubscribe/:email', unsubscribe);

// Protected routes (admin)
router.route('/admin/projects')
  .get(protect, getProjects)
  .post(protect, upload.single('image'), addProject);

router.route('/admin/projects/:id')
  .delete(protect, deleteProject);

router.route('/admin/clients')
  .get(protect, getClients)
  .post(protect, upload.single('image'), addClient);

router.route('/admin/clients/:id')
  .delete(protect, deleteClient);

router.route('/admin/contacts')
  .get(protect, getContacts);

router.route('/admin/contacts/:id')
  .delete(protect, deleteContact);

router.route('/admin/subscribers')
  .get(protect, getSubscribers);

module.exports = router;
