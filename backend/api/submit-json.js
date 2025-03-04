import axios from 'axios';
import connectDB from '../utils/db.js'; // import the db connection
import uploadJsonContent from '../utils/uploadJsonContent.js';

//const ngrokURL = 'https://your-ngrok-url.com'; // Replace with your actual ngrok URL
const ngrokURL = process.env.NGROK_URL;
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.FRONTEND_URL2
];

export default async function handler(req, res) {
  if (req.method === 'POST') {
    
    // Handle the preflight request
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      // testing: console.log("Allowed origin:", origin);
      
    } // Allow all origins or specify specific origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    try {
      const receivedJson = req.body;
      console.log('Test:', req.body);

      // Connect to DB
      await connectDB();

      // Upload JSON to MongoDB
      const objectId = await uploadJsonContent(receivedJson);

      // Send object ID to the local server without waiting for a response
      const localServerApi = `https://${ngrokURL}/process-object`;
      await axios.post(localServerApi, { objectId })
        .then(() => {
          console.log('Notified local server successfully');
        })
        .catch(err => {
          console.error('Error notifying local server:', err);
          // Notify self-hosted error route
          axios.post(`https://${process.env.DEPLOYED_SERVER_URL}/api/error`, { errReason: 'Failed to notify local server' });
        });

      // Respond to the client immediately
      res.send({ message: 'Process initiated successfully', objectId });
    } catch (err) {
      console.error('Error processing request:', err);
      res.status(500).send({ error: 'Failed to process request', details: err.message });
    }
  } else if (req.method === 'OPTIONS') {
    // Handle the preflight request
    const origin = req.headers.origin;
    console.log("Received a preflight OPTIONS request from:", origin);

    if (allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      //testing: console.log("Allowed origin:", origin);
    } // Allow all origins or specify specific origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.status(200).end(); // Respond with 200 OK and terminate the response
  } else {
    res.status(405).send({ message: 'Method Not Allowed' });
  }
}

