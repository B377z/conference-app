// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AgendaPage from './components/AgendaPage';
import ProposalForm from './components/ProposalForm';
import './index.css'; // Ensure the CSS file is imported

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/agenda">Agenda</Link></li>
            <li><Link to="/proposals">Call for Proposals</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/agenda" element={<AgendaPage />} />
          <Route path="/proposals" element={<ProposalForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
