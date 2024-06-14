// backend/routes/agendaRoutes.js
const express = require('express');
const AgendaItem = require('../models/AgendaItem');

const router = express.Router();

// Get all agenda items
router.get('/agenda', async (req, res) => {
  const agendaItems = await AgendaItem.find();
  res.json(agendaItems);
});

module.exports = router;
