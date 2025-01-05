const express = require('express');
const connectDB = require('../db'); // import the db connection
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const axios = require('axios');
const uploadJsonContent = require('../utils/uploadJsonContent');
const PORT = process.env.PORT || 5000;
const ngrokURL = process.env.NGROK_URL;
require("dotenv").config({ path: '../.env' });

const app = express();
app.use(bodyParser.json());

// Connect to the database
// Connect to the database before setting up routes
connectDB().then(() => {
  console.log('No errors with DB connection.');

  // START SERVER: If running locally, use app.listen
  if (process.env.NODE_ENV !== 'production') {

    // Call the startServer function
    startServer();

  }
}).catch((err) => {
  console.error("Failed to connect to DB:", err);
  process.exit(1); // Exit if DB connection fails
});

const startServer = async () => {
  try {
    // Start the Express server
    app.listen(PORT, async () => {
      console.log(`App running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Error starting server:', err);
  }
};

app.get('/api', (req, res) => {
  res.send('Hello from Express API!');
});


// Listen for JSON object
app.post('/submit-json', async (req, res) => {
  const receivedJson = req.body;

  try {
    // Upload JSON to MongoDB
    const objectId = await uploadJsonContent(receivedJson);

    // Send object ID to the local server
    const localServerApi = ngrokURL + '/process-object'; // Replace with your local server's URL
    const response = await axios.post(localServerApi, { objectId });

    console.log('Received response from local server:', response.data);
    res.send({ message: 'Process initiated successfully', localResponse: response.data });

  } catch (err) {
    console.error('Error processing request:', err);
    res.status(500).send({ error: 'Failed to process request', details: err.message });
  }
});


