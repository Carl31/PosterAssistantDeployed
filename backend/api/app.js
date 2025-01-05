const express = require('express');
const connectDB = require('../utils/db'); // import the db connection
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const axios = require('axios');
const uploadJsonContent = require('../utils/uploadJsonContent');
const PORT = process.env.PORT || 5000;
const ngrokURL = process.env.NGROK_URL;
require("dotenv").config({ path: '../.env' });

const app = express();
app.use(bodyParser.json());

// Ensure database connection is established
connectDB().then(() => {
  console.log('Database connected successfully.');
}).catch((err) => {
  console.error('Failed to connect to DB:', err);
});

// Define your routes
app.get('/api', (req, res) => {
  res.status(200).send('Hello from Express API!');
});

app.post('/api/submit-json', async (req, res) => {
  const receivedJson = req.body;

  try {
    // Upload JSON to MongoDB
    const objectId = await uploadJsonContent(receivedJson);

    // Send object ID to the local server
    const localServerApi = `${process.env.NGROK_URL}/process-object`; // Replace with your local server's URL
    const response = await axios.post(localServerApi, { objectId });

    console.log('Received response from local server:', response.data);
    res.status(200).send({
      message: 'Process initiated successfully',
      localResponse: response.data,
    });

  } catch (err) {
    console.error('Error processing request:', err);
    res.status(500).send({ error: 'Failed to process request', details: err.message });
  }
});

// Export the handler
module.exports = app;
