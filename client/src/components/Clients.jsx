import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaQuoteLeft } from 'react-icons/fa';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const { data } = await axios.get('/api/clients');
        setClients(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch clients');
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) return <div className="loading">Loading clients...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <section id="clients" className="section clients">
      <div className="container">
        <div className="section-header">
          <h2>Happy Clients</h2>
          <p>What our clients say about us</p>
        </div>

        <div className="clients-slider">
          {clients.map((client) => (
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

export default Clients;
