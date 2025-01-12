import express from 'express';
import connectDB from '../utils/db.js'; // import the db connection
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import uploadJsonContent from '../utils/uploadJsonContent.js';

// Load environment variables from .env
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const app = express();
app.use(bodyParser.json());

const cors = require('cors');
const cors = require('cors');

// Note: Don't affect vercel deployment (edit them in vercel.json)
// const corsOptions = {
//     origin: process.env.FRONTEND_URL, // Allow requests from your frontend
//     credentials: true, // Allow cookies and credentials
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
//     allowedHeaders: 'Content-Type,Authorization', // Allowed headers
//     optionsSuccessStatus: 200, // For preflight requests
// };
const corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));


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


