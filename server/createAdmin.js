const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const adminExists = await User.findOne({ username: 'admin' });
    
    if (!adminExists) {
      const admin = new User({
        username: 'admin',
        password: 'admin123', // Change this to a secure password
        role: 'admin'
      });

      await admin.save();
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
};

createAdmin();