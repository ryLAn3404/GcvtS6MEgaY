// 代码生成时间: 2025-09-24 05:23:54
// Importing necessary modules for HTTP and D3
const express = require('express');
const bodyParser = require('body-parser');
const D3 = require('d3');

// Creating the Express application
const app = express();
const port = 3000;

// Middleware to parse JSON and urlencoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mock user database
const users = {
  'user1': {
    username: 'user1',
    password: 'password1'
  },
  'user2': {
    username: 'user2',
    password: 'password2'
  }
};

// Function to validate user credentials
function validateUser(username, password) {
  // Check if user exists and password is correct
  const user = users[username];
  if (user && user.password === password) {
    return true;
  }
  return false;
}

// POST route for user login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  try {
    if (!username || !password) {
      throw new Error('Username and password are required.');
    }
    
    const isValid = validateUser(username, password);
    if (!isValid) {
      throw new Error('Invalid credentials.');
    }
    
    // If credentials are valid, send a success response
    res.status(200).json({
      message: 'Login successful.',
      user: {
        username
      }
    });
  } catch (error) {
    // If there's an error, send an error response
    res.status(401).json({
      message: error.message
    });
  }
});

// Starting the server
app.listen(port, () => {
  console.log(`User Login System is running on http://localhost:${port}`);
});