// src/components/AgendaPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AgendaPage.css'; // Create and import CSS for styling

const AgendaPage = () => {
  const [agendaItems, setAgendaItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/agenda')
      .then(response => setAgendaItems(response.data))
      .catch(error => console.error('Error fetching agenda items:', error));
  }, []);

  return (
    <div className="agenda-container">
      <h1>Agenda</h1>
      {agendaItems.length === 0 ? (
        <p>No talks confirmed yet.</p>
      ) : (
        <ul>
          {agendaItems.map(item => (
            <li key={item._id}>{item.title} by {item.author}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AgendaPage;
