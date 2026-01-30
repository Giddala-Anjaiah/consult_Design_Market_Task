import React from 'react';
import Hero from '../components/Hero';
import WhyChooseUs from '../components/WhyChooseUs';
import AboutUs from '../components/AboutUs';
import OurProjects from '../components/OurProjects';
import HappyClients from '../components/HappyClients';
import ContactForm from '../components/ContactForm';
import NewsletterSection from '../components/NewsletterSection';
import CallToAction from '../components/CallToAction';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <Hero />

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* About Us Section */}
      <AboutUs />

      {/* Our Projects Section */}
      <OurProjects />

      {/* Happy Clients Section */}
      <HappyClients />

      {/* Contact Form Section */}
      <ContactForm />

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Call to Action Section */}
      <CallToAction />
    </div>
  );
};

export default Home;
