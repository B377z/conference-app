// The handleChange function is attempting to use setFormData and formData, which are not defined.
// To fix this, you should consolidate the state into a single state object and update the handleChange function accordingly.

import React, { useState } from 'react';
import axios from 'axios';
import './ProposalForm.css'; // Import the CSS file for form styling

const ProposalForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    author: '',
    email: '',
  });
  const [errors, setErrors] = useState({}); // Step 1

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.title) tempErrors.title = "Title is required";
    if (!formData.description) tempErrors.description = "Description is required";
    if (!formData.author) tempErrors.author = "Author is required";
    if (!formData.email) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Email is invalid"; // Step 2  
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return; // Step 3
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/proposals`, formData)
      .then(response => {
        alert('Proposal submitted successfully!');
        setFormData({ title: '', description: '', author: '', email: '' });
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
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
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