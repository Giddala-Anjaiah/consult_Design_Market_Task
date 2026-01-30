import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import Login from './pages/Login';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProjects from './pages/admin/Projects';
import AdminClients from './pages/admin/Clients';
import AdminContacts from './pages/admin/Contacts';
import AdminSubscribers from './pages/admin/Subscribers';
import './styles/main.css';
import './styles/admin.css';

function AppContent() {
  const location = useLocation();
  const showFooter = location.pathname === '/';

  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/projects" element={<AdminProjects />} />
          <Route path="/admin/clients" element={<AdminClients />} />
          <Route path="/admin/contacts" element={<AdminContacts />} />
          <Route path="/admin/subscribers" element={<AdminSubscribers />} />
        </Routes>
      </main>
      {showFooter && <Footer />}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
