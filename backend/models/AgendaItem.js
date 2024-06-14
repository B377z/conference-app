// backend/models/AgendaItem.js
const mongoose = require('mongoose');

const AgendaItemSchema = new mongoose.Schema({
  title: String,
  author: String
});

module.exports = mongoose.model('AgendaItem', AgendaItemSchema);
