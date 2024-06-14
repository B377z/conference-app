import React, { useState } from 'react';
import axios from 'axios';
import './ProposalForm.css'; // Import the CSS file for form styling


const ProposalForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({}); // Step 1

  const validateForm = () => {
    let tempErrors = {};
    if (!title) tempErrors.title = "Title is required";
    if (!description) tempErrors.description = "Description is required";
    if (!author) tempErrors.author = "Author is required";
    if (!email) tempErrors.email = "Email is required";         
    else if (!/\S+@\S+\.\S+/.test(email)) tempErrors.email = "Email is invalid"; // Step 2  
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return; // Step 3
    axios.post('/api/proposals', { title, description, author, email })
      .then(response => {
        alert('Proposal submitted successfully!');
        setTitle('');
        setDescription('');
        setAuthor('');
        setEmail('');
        setErrors({}); // Step 5
      })
      .catch(error => console.error('Error submitting proposal:', error));
  };

  return (
    <div className="proposal-form-container">
      <h1>Call for Proposals</h1>
      <p className="description">
        Are you passionate about Cloud, Kubernetes, Docker or other technologies related with the Cloud. 
        Submit your proposal to share your knowledge with our amazing community!
      </p>
      <form onSubmit={handleSubmit} className="proposal-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit Proposal</button>
      </form>
    </div>
  );
};

export default ProposalForm;