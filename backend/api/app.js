import express from 'express';
import connectDB from '../utils/db.js'; // import the db connection
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import uploadJsonContent from '../utils/uploadJsonContent.js';
import cors from 'cors';

// Load environment variables from .env
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const app = express();
app.use(bodyParser.json());






// ENABLLING CORS (ignore)

// Use CORS middleware globally
const corsOptions = {
  origin: '*', // Or specify your frontend URL in production
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));

// Handle OPTIONS requests (preflight)
app.options('*', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.status(200).end(); // Respond with 200 OK for preflight requests
});







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


