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
      //testing: console.log("Allowed origin:", origin);
    } // Allow all origins or specify specific origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    try {
      const receivedData = req.body;
      const objectId = receivedData.objectId;

      console.log('Received response from local server:', objectId);

      // IF TESTING ORCHESTRATE FUNCTIONS ON LOCAL SERVER - change to false, as testing  function returns json, not object id, so will not be able to search it in db.
      if (true) { // needs to be true for production
        // Connect to DB
        await connectDB();

        // Upload JSON to MongoDB
        const output = await readJsonFile(objectId);
        latestJson = output;

      } else { // for testing only
        latestJson = objectId;
      }


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
      //testing: console.log("Allowed origin:", origin);
    } // Allow all origins or specify specific origins
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    if (latestJson) {
      res.status(200).send({ data: latestJson });
    } else {
      res.status(404).send({ data: 'No data available' });
    }

    // res.status(200).send({ data: latestJson });

    latestJson = null;

  } else if (req.method === 'OPTIONS') {
    // Handle the preflight request
    const origin = req.headers.origin;
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