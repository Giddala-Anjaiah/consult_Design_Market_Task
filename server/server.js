require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    // Don't exit the app, continue running
  }
};

connectDB();

// Routes
app.use('/api', require('./routes/api'));

// Root route - always respond
app.get('/', (req, res) => {
  res.json({ 
    message: 'Portfolio Management System API',
    status: 'Running',
    environment: process.env.NODE_ENV || 'development',
    endpoints: ['/health', '/api/projects', '/api/clients']
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Portfolio Management System is running',
    environment: process.env.NODE_ENV || 'development'
  });
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '../client/build');
  
  // Check if build directory exists
  const fs = require('fs');
  if (fs.existsSync(buildPath)) {
    app.use(express.static(buildPath));
    
    app.get('*', (req, res) => {
      res.sendFile(path.join(buildPath, 'index.html'));
    });
  } else {
    // Build doesn't exist, try to build it
    const { exec } = require('child_process');
    console.log('Building frontend...');
    
    exec('cd ../client && npm install && npm run build', (error, stdout, stderr) => {
      if (error) {
        console.error('Build error:', error);
        return;
      }
      console.log('Frontend built successfully');
    });
    
    app.get('*', (req, res) => {
      res.json({ 
        message: 'Portfolio Management System',
        status: 'Building frontend... Please refresh in 3-5 minutes',
        environment: process.env.NODE_ENV || 'development',
        endpoints: ['/health', '/api/projects', '/api/clients'],
        note: 'React frontend is being built automatically. Please wait and refresh.'
      });
    });
  }
} else {
  // For development, serve a simple response
  app.get('*', (req, res) => {
    res.json({ 
      message: 'Portfolio Management System API',
      status: 'Running in development mode',
      endpoints: ['/health', '/api/projects', '/api/clients']
    });
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
