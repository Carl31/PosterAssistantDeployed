import readJsonFile from '../utils/readJsonFile.js';
import connectDB from '../utils/db.js'; // import the db connection
const ngrokURL = process.env.NGROK_URL;
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.FRONTEND_URL2
];

let latestJson = null;

export default async function handler(req, res) {
  if (req.method === 'POST') {

    // Handle the preflight request
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      console.log("Allowed origin:", origin);
    } // Allow all origins or specify specific origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    try {
      const receivedData = req.body;
      const objectId = receivedData.objectId;

      console.log('Received response from local server:', objectId);

      // TESTING START
      if (false) { // need to uncomment this line for production
        // Connect to DB
        await connectDB();

        // Upload JSON to MongoDB
        const output = await readJsonFile(objectId);

        latestJson = output;
      }

      latestJson = objectId;


      

      res.send({ message: 'Process initiated successfully' });
    } catch (err) {
      console.error('Error processing request:', err);
      res.status(500).send({ error: 'Failed to process request', details: err.message });
    }
  } else if (req.method === 'GET') {
    // Handle the preflight request
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      console.log("Allowed origin:", origin);
    } // Allow all origins or specify specific origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    if (latestJson) {
      res.status(200).json(latestJson);
    } else {
      res.status(202).json({ message: 'No data available' });
    }

  } else if (req.method === 'OPTIONS') {
    // Handle the preflight request
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      console.log("Allowed origin:", origin);
    } // Allow all origins or specify specific origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.status(200).end(); // Respond with 200 OK and terminate the response
  } else {
    res.status(405).send({ message: 'Method Not Allowed' });
  }
}