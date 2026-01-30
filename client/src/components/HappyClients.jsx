import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaQuoteLeft } from 'react-icons/fa';

const HappyClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const { data } = await axios.get('/api/clients');
        setClients(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching clients:', err);
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const defaultClients = [
    {
      _id: '1',
      name: 'Emily Chen',
      designation: 'CEO, TechStart',
      description: 'Working with this team was an incredible experience. They transformed our business strategy and helped us achieve remarkable growth.',
      image: { url: '/assets/images/pexels-brett-sayles-2881232-1.svg' }
    },
    {
      _id: '2',
      name: 'Robert Williams',
      designation: 'Founder, Creative Agency',
      description: 'Their design work is exceptional. They understood our vision perfectly and delivered beyond our expectations.',
      image: { url: '/assets/images/pexels-andres-ayrton-6578391.svg' }
    },
    {
      _id: '3',
      name: 'Lisa Anderson',
      designation: 'Marketing Director, StartupCo',
      description: 'The marketing strategies they implemented increased our conversion rates by 150%. Highly recommended!',
      image: { url: '/assets/images/pexels-brett-sayles-2881232-3.svg' }
    }
  ];

  const displayClients = clients.length > 0 ? clients : defaultClients;

  if (loading) return <div className="loading">Loading testimonials...</div>;

  return (
    <section id="clients" className="happy-clients">
      <div className="container">
        <div className="clients-grid">
          {displayClients.map((client) => (
            <div key={client._id} className="client-card">
              <div className="client-image">
                <img src={client.image.url} alt={client.name} />
              </div>
              <div className="client-content">
                <FaQuoteLeft className="quote-icon" />
                <p className="client-testimonial">{client.description}</p>
                <div className="client-info">
                  <h4>{client.name}</h4>
                  <span>{client.designation}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HappyClients;
