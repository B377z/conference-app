// src/components/AgendaPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AgendaPage = () => {
    const [talks, setTalks] = useState([]);
    
    useEffect(() => {
        // Fetch the approved talks from the backend
        axios.get('http://localhost:5000/api/agenda')
        .then(response => setTalks(response.data))
        .catch(error => console.error('Error fetching talks:', error));
    } , []);

    return (
        <div>
          <h1>Agenda</h1>
          {talks.length === 0 ? (
            <p>There are no confirmed talks just yet.</p>
          ) : (
            <ul>
              {talks.map(talk => (
                <li key={talk.id}>{talk.title} by {talk.author}</li>
              ))}
            </ul>
          )}
        </div>
      );
};

export default AgendaPage;