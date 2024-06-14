// backend/models/Proposal.js
const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema({
    title: String,
    description: String,
    author: String,
    email: String,
    status: { type: String, default: 'pending' }
});

module.exports = mongoose.model('Proposal', proposalSchema);