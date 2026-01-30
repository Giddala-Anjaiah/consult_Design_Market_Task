import React from 'react';
import { FaChartLine, FaPaintBrush, FaBullhorn } from 'react-icons/fa';

const WhyChooseUs = () => {
  const services = [
    {
      icon: <FaChartLine />,
      title: 'Potential ROI',
      description: 'Maximize your return on investment with data-driven strategies and comprehensive market analysis tailored to your specific needs.'
    },
    {
      icon: <FaPaintBrush />,
      title: 'Design',
      description: 'Create stunning, user-friendly designs that capture attention and convert visitors into loyal customers with our expert design team.'
    },
    {
      icon: <FaBullhorn />,
      title: 'Marketing',
      description: 'Implement powerful marketing campaigns that reach your target audience and drive measurable results for your business growth.'
    }
  ];

  return (
    <section className="why-choose-us">
      <div className="container">
        <div className="section-header">
          <h2>Why Choose Us?</h2>
          <p>We deliver comprehensive solutions that drive real results</p>
        </div>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
