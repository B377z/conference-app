// src/components/AgendaPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AgendaPage = () => {
    const [talks, setTalks] = useState([]);
    
    useEffect(() => {
        // Fetch the approved talks from the backend
        axios.get('/api/agenda')
        .then(response => setTalks(response.data))
        .catch(error => console.error('Error fetching talks:', error));
    } , []);

    return (
        <div>
            <h1>Agenda</h1>
            <ul>
                {talks.map(talk => (
                    <li key={talk.id}>{talk.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default AgendaPage;