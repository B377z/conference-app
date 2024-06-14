import React, { useState } from 'react';
import axios from 'axios';

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
    <div>
      <h1>Call for Proposals</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          {errors.title && <div style={{ color: "red" }}>{errors.title}</div>} 
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          {errors.description && <div style={{ color: "red" }}>{errors.description}</div>}
        </div>
        <div>
          <label>Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
          {errors.author && <div style={{ color: "red" }}>{errors.author}</div>}
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
        </div>
        <button type="submit">Submit Proposal</button>
      </form>
    </div>
  );
};

export default ProposalForm;