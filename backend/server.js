// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

const talks = [
  { id: 1, title: 'Introduction to Platforms on Kubernetes', author: 'salaboy' },
  // Add more dummy talks here
];

// Define the /api/agenda endpoint
app.get('/api/agenda', (req, res) => {
  res.json(talks);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
