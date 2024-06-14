// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI;
console.log('MongoDB URI:', mongoUri); // Debugging: Print the MongoDB URI

mongoose.connect(mongoUri).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Use routes
const proposalRoutes = require('./routes/proposalRoutes');
const agendaRoutes = require('./routes/agendaRoutes');
app.use('/api', proposalRoutes);
app.use('/api', agendaRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

