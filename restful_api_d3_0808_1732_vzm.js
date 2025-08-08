// 代码生成时间: 2025-08-08 17:32:55
// restful_api_d3.js
// This JavaScript file demonstrates how to create a RESTful API interface using Node.js and D3.js

// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const d3 = require('d3');

// Initialize express app
const app = express();

// Set up the port for the server
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON and urlencoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to serve static files
app.use(express.static('public'));

// D3 data example
const data = d3.range(10).map((d, i) => ({
  id: i,
  name: `Item ${i}`,
  value: Math.random() * 100
}));

// GET endpoint to retrieve data
app.get('/api/data', (req, res) => {
  // Send the data as JSON
  res.json(data);
});

// POST endpoint to add new data
app.post('/api/data', (req, res) => {
  try {
    // Validate the request body
    if (!req.body.id || !req.body.name || !req.body.value) {
      throw new Error('Invalid data format');
    }
    
    // Add new data to the array
    data.push(req.body);
    
    // Send the updated data as JSON
    res.json(data);
  } catch (error) {
    // Handle errors and send a 400 status code
    res.status(400).send(error.message);
  }
});

// Error handling middleware
app.use((req, res, next) => {
  res.status(404).send('Endpoint not found');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
