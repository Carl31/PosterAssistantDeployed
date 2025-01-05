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


// Connect to the database before setting up routes
// START SERVER: If running locally, use app.listen
if (process.env.NODE_ENV !== 'production') {
  connectDB().then(() => {
    console.log('No errors with DB connection.');



    // Call the startServer function
    startServer();


  }).catch((err) => {
    console.error("Failed to connect to DB:", err);
    process.exit(1); // Exit if DB connection fails
  });
}

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

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // try {
    //   // Ensure DB connection is initialized
    //   await connectDB();
    //   res.status(200).send('Hello from Express API!');
    // } catch (err) {
    //   console.error('Error connecting to DB:', err);
    //   res.status(500).send('Failed to connect to database.');
    // }
    res.status(200).send('Hello from Express API!');
  } else {
    res.status(405).send({ message: 'Method Not Allowed' });
  }
}


