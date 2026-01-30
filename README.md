# Portfolio Management System

A full-stack web application for managing portfolio projects, clients, contacts, and newsletter subscribers with React frontend and Node.js backend.

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Prerequisites](#prerequisites)
5. [Project Structure](#project-structure)
6. [Backend Setup](#backend-setup)
7. [Frontend Setup](#frontend-setup)
8. [Database Setup](#database-setup)
9. [Admin Setup](#admin-setup)
10. [Running the Application](#running-the-application)
11. [Usage Guide](#usage-guide)
12. [API Endpoints](#api-endpoints)
13. [Troubleshooting](#troubleshooting)
14. [Deployment](#deployment)

## 🎯 Project Overview

This Portfolio Management System allows administrators to:
- Manage projects (add, edit, delete with image upload)
- Manage client testimonials (add, edit, delete with image upload)
- View and manage contact form submissions
- View and manage newsletter subscribers
- Display portfolio content on a beautiful landing page

## ✨ Features

### Frontend Features
- **Responsive Design**: Works on all devices
- **Modern UI**: Clean, professional interface
- **Navigation**: Smooth routing between pages
- **Contact Form**: User inquiries with validation
- **Newsletter Subscription**: Email collection system
- **Admin Panel**: Complete management dashboard
- **Image Upload**: Drag-and-drop image support
- **Toast Notifications**: User feedback system

### Backend Features
- **RESTful API**: Complete CRUD operations
- **Authentication**: JWT-based admin authentication
- **File Upload**: Image handling with Multer
- **Data Validation**: Input validation and error handling
- **Security**: Password hashing and protected routes
- **Database**: MongoDB integration with Mongoose

### Admin Panel Features
- **Dashboard**: Statistics and quick actions
- **Project Management**: Add/edit/delete projects
- **Client Management**: Add/edit/delete client testimonials
- **Contact Management**: View/delete contact submissions
- **Subscriber Management**: View/delete/export subscribers

## 🛠 Technology Stack

### Frontend
- **React 18**: Modern JavaScript library
- **React Router**: Client-side routing
- **Axios**: HTTP client for API calls
- **React Toastify**: Notification system
- **CSS3**: Custom styling with responsive design

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: Object Data Modeling
- **JWT**: Authentication tokens
- **bcryptjs**: Password hashing
- **Multer**: File upload handling
- **CORS**: Cross-origin resource sharing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software
- **Node.js** (v16 or higher)
- **npm** (comes with Node.js)
- **MongoDB** (v4.4 or higher)
- **Git** (for version control)

### Installation Check
```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check MongoDB installation
mongod --version
```

## 📁 Project Structure

```
mini/
├── client/                 # React frontend
│   ├── public/
│   │   └── assets/
│   │       └── images/     # Image assets
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── styles/        # CSS files
│   │   └── App.js         # Main app component
│   └── package.json
├── server/                # Node.js backend
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── server.js         # Main server file
│   └── package.json
├── README.md             # This file
└── .env                  # Environment variables
```

## 🚀 Backend Setup

### Step 1: Navigate to Server Directory
```bash
cd server
```

### Step 2: Install Backend Dependencies
```bash
npm install express mongoose cors dotenv bcryptjs jsonwebtoken multer
```

### Step 3: Create Environment Variables
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Step 4: Start MongoDB
```bash
# On Windows
net start MongoDB

# On macOS/Linux
sudo systemctl start mongod

# Or start manually
mongod
```

### Step 5: Create Admin User
```bash
node createAdmin.js
```
This will create an admin user with:
- **Username**: `admin`
- **Password**: `admin123`

### Step 6: Start Backend Server
```bash
npm start
```
The backend will run on `http://localhost:5000`

## 🎨 Frontend Setup

### Step 1: Navigate to Client Directory
```bash
cd client
```

### Step 2: Install Frontend Dependencies
```bash
npm install react-router-dom axios react-toastify
```

### Step 3: Copy Image Assets
Ensure all images are in `client/public/assets/images/`:
- Logo files
- Project images
- Client testimonial images
- Background images

### Step 4: Start Frontend Development Server
```bash
npm start
```
The frontend will run on `http://localhost:3000`

## 🗄 Database Setup

### MongoDB Configuration
1. **Install MongoDB** if not already installed
2. **Start MongoDB service**
3. **Create Database**: The app automatically creates a `portfolio` database
4. **Collections**: Automatically created when you first use the app:
   - `users` - Admin authentication
   - `projects` - Portfolio projects
   - `clients` - Client testimonials
   - `contacts` - Contact form submissions
   - `subscribers` - Newsletter subscribers

### Verify Database Connection
```bash
# Check if MongoDB is running
mongo

# In MongoDB shell
show dbs
use portfolio
show collections
```

## 🔐 Admin Setup

### Default Admin Credentials
- **Username**: `admin`
- **Password**: `admin123`

### Login Process
1. Navigate to `http://localhost:3000/login`
2. Enter admin credentials
3. Successful login redirects to admin dashboard
4. Token stored in localStorage for session management

### Security Features
- **Password Hashing**: All passwords are hashed with bcrypt
- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Admin routes require authentication
- **Session Management**: Tokens expire after 24 hours

## 🏃 Running the Application

### Method 1: Separate Terminals (Recommended)
Open two separate terminal windows:

**Terminal 1 - Backend:**
```bash
cd server
npm start
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

### Method 2: Concurrently (Alternative)
Install concurrently in root directory:
```bash
npm install concurrently --save-dev
```

Add to root `package.json`:
```json
{
  "scripts": {
    "start": "concurrently \"npm run server\" \"npm run client\"",
    "server": "cd server && npm start",
    "client": "cd client && npm start"
  }
}
```

Then run:
```bash
npm start
```

### Access Points
- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:5000`
- **Admin Login**: `http://localhost:3000/login`
- **Admin Dashboard**: `http://localhost:3000/admin`

## 📖 Usage Guide

### For Visitors
1. **Home Page**: View portfolio projects and client testimonials
2. **Contact Form**: Submit inquiries with name, email, phone, and city
3. **Newsletter**: Subscribe to updates via email
4. **Navigation**: Browse different sections smoothly

### For Administrators
1. **Login**: Access admin panel with credentials
2. **Dashboard**: View statistics and quick actions
3. **Manage Projects**: Add/edit/delete portfolio projects
4. **Manage Clients**: Add/edit/delete client testimonials
5. **View Contacts**: See and delete contact submissions
6. **Manage Subscribers**: View, delete, or export subscriber lists

### Adding Projects
1. Go to Admin Dashboard → Manage Projects
2. Click "Add Project" button
3. Fill in project details:
   - Project Name
   - Description
   - Upload Image (required)
4. Click "Save Project"

### Adding Client Testimonials
1. Go to Admin Dashboard → Manage Clients
2. Click "Add Client" button
3. Fill in client details:
   - Client Name
   - Designation
   - Testimonial
   - Upload Image (required)
4. Click "Save Client"

## 🔌 API Endpoints

### Public Endpoints
```javascript
GET    /api/projects          // Get all projects
GET    /api/clients           // Get all client testimonials
POST   /api/contact           // Submit contact form
POST   /api/subscribe         // Subscribe to newsletter
GET    /api/unsubscribe/:email // Unsubscribe from newsletter
```

### Admin Endpoints (Authentication Required)
```javascript
POST   /api/admin/login       // Admin login
GET    /api/admin/projects   // Get all projects (admin)
POST   /api/admin/projects   // Add new project
DELETE /api/admin/projects/:id // Delete project
GET    /api/admin/clients    // Get all clients (admin)
POST   /api/admin/clients    // Add new client
DELETE /api/admin/clients/:id // Delete client
GET    /api/admin/contacts   // Get all contacts
DELETE /api/admin/contacts/:id // Delete contact
GET    /api/admin/subscribers // Get all subscribers
DELETE /api/admin/subscribers/:id // Delete subscriber
```

### Request/Response Examples

#### Login Request
```javascript
POST /api/admin/login
{
  "username": "admin",
  "password": "admin123"
}
```

#### Login Response
```javascript
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64a7b8c9d1e2f3g4h5i6j7k8",
    "username": "admin",
    "role": "admin"
  }
}
```

#### Add Project Request
```javascript
POST /api/admin/projects
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "name": "New Project",
  "description": "Project description",
  "image": <file>
}
```

## 🔧 Troubleshooting

### Common Issues and Solutions

#### 1. Port Already in Use
```bash
# Find process using port
netstat -ano | findstr :3000  # Windows
lsof -i :3000                  # macOS/Linux

# Kill process
taskkill /PID <PID> /F         # Windows
kill -9 <PID>                  # macOS/Linux
```

#### 2. MongoDB Connection Error
```bash
# Check MongoDB status
net start MongoDB               # Windows
brew services start mongodb    # macOS
sudo systemctl start mongod    # Linux

# Check if MongoDB is running
mongosh --eval "db.adminCommand('ismaster')"
```

#### 3. Login "Invalid Credentials" Error
- Verify admin user exists: `node createAdmin.js`
- Check MongoDB connection
- Ensure `.env` file has correct `JWT_SECRET`
- Restart backend server after changes

#### 4. Images Not Displaying
- Ensure images are in `client/public/assets/images/`
- Check file paths in components
- Verify image formats (SVG, JPG, PNG supported)

#### 5. CORS Errors
- Backend should have CORS enabled
- Check if frontend is running on port 3000
- Verify backend is running on port 5000

#### 6. Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# For frontend
cd client
npm install
```

### Debug Mode
Enable debug logging by setting:
```bash
# Backend
DEBUG=* npm start

# Frontend (in browser console)
localStorage.setItem('debug', 'true')
```

## 🚀 Deployment

### Production Build

#### Frontend Build
```bash
cd client
npm run build
```

#### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb://your-production-db-url
JWT_SECRET=your-production-jwt-secret
```

### Deployment Options

#### 1. Vercel (Frontend) + MongoDB Atlas (Database)
```bash
# Deploy frontend to Vercel
cd client
npm install -g vercel
vercel --prod

# Update MongoDB URI in .env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
```

#### 2. Heroku (Full Stack)
```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your-mongodb-uri
heroku config:set JWT_SECRET=your-jwt-secret

# Deploy
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

#### 3. DigitalOcean/AWS
- Use Docker containers
- Set up reverse proxy with Nginx
- Configure SSL certificates
- Set up process manager (PM2)

### Docker Deployment
Create `Dockerfile` in root:
```dockerfile
# Multi-stage build
FROM node:16-alpine as builder

# Frontend build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Backend setup
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install
COPY server/ ./
COPY --from=builder /app/client/build ./public

EXPOSE 5000
CMD ["npm", "start"]
```

## 📝 Development Notes

### Code Style
- Use ES6+ features
- Follow React best practices
- Implement proper error handling
- Use meaningful variable names
- Add comments for complex logic

### Security Considerations
- Never commit `.env` files
- Use strong JWT secrets
- Validate all inputs
- Implement rate limiting
- Use HTTPS in production

### Performance Optimization
- Implement image lazy loading
- Use React.memo for expensive components
- Optimize bundle size
- Implement caching strategies
- Use CDN for static assets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Email: support@portfolio.com
- Check the troubleshooting section above

---

**Happy Coding! 🎉**
